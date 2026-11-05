import express from "express";
import authRoutes from "./routes/auth.js";
import watchlistRoutes from "./routes/watchlist.js";
const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/watchlist", watchlistRoutes);
app.listen(process.env.PORT || 3000);
