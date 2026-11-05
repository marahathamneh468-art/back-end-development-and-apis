import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", (_req, res) => {
  res.sendFile(import.meta.dirname + "/views/index.html");
});

// Do not change code above this line

// --- استخدام النمط الصحيح للمسار لتجنب خطأ path-to-regexp ---
app.get("/api/:date", processTimestamp);
app.get("/api/", processTimestamp);

function processTimestamp(req, res) {
  let dateString = req.params.date;
  let date;

  // إذا لم يتم إدخال تاريخ (عند زيارة /api/)، خذ الوقت الحالي
  if (!dateString) {
    date = new Date();
  } else {
    // إذا كان الإدخال عبارة عن أرقام فقط (Unix timestamp بالميلي ثانية)
    if (!isNaN(dateString) && /^\d+$/.test(dateString)) {
      date = new Date(parseInt(dateString));
    } else {
      // وإلا قم بتحليله كـ Date string عادي
      date = new Date(dateString);
    }
  }

  // التحقق مما إذا كان التاريخ غير صالح (Invalid Date)
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // إرجاع النتيجة بالشكل المطلوب
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
}
// -----------------------------------------------------------

// Do not change code below this line

const PORT = 8000;
const listener = app.listen(PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});