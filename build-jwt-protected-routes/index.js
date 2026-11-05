import express from "express";
import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";

const app = express();

app.use(express.json());

// ربط المسارات (يجب أن يكون بعد تعريف app)
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

// معالج الأخطاء (يجب أن يكون في النهاية بعد كل الراوترز)
app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  res.status(statusCode).json({ error: err.message });
});

const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});