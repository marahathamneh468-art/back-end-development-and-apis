import http from "http";
import fs from "fs";
import { WebSocketServer } from "ws";

const PORT = 3001;

// 1. إنشاء خادم HTTP
const server = http.createServer((req, res) => {
  fs.readFile("./public/index.html", (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Error loading page");
      return;
    }
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  });
});

// 2. إنشاء خادم الـ WebSocket
const wss = new WebSocketServer({ server });

// 3. الاستماع لحدث الاتصال
wss.on("connection", (socket, req) => {
  // 4. استخراج اسم المستخدم وبث رسالة الانضمام
  const username = new URL(req.url, "http://localhost").searchParams.get("username");
  
  if (username) {
    const joinMessage = JSON.stringify({ type: "system", text: `${username} joined` });
    wss.clients.forEach((client) => {
      if (client.readyState === client.OPEN) {
        client.send(joinMessage);
      }
    });
  }

  // 5. الاستماع للرسائل وبثها للجميع
  socket.on("message", (data) => {
    try {
      const parsedData = JSON.parse(data.toString());
      const chatMessage = JSON.stringify({
        type: "chat",
        username: parsedData.username,
        text: parsedData.text,
      });
      wss.clients.forEach((client) => {
        if (client.readyState === client.OPEN) {
          client.send(chatMessage);
        }
      });
    } catch (err) {
      console.error("Invalid message format", err);
    }
  });

  // 6. الاستماع لانقطاع الاتصال وبث رسالة المغادرة
  socket.on("close", () => {
    if (username) {
      const leaveMessage = JSON.stringify({ type: "system", text: `${username} left` });
      wss.clients.forEach((client) => {
        if (client.readyState === client.OPEN) {
          client.send(leaveMessage);
        }
      });
    }
  });
});

// 7. تشغيل السيرفر
server.listen(PORT, () => {
  console.log(`Chat server running at http://localhost:${PORT}`);
});

export { server };