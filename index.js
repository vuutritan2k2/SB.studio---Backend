import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"; // 🆕 Quan trọng
import connectDB from "./config/connectdb.js";
import userRouter from "./route/userRouter.js"; // 🆕 nhớ thêm đuôi .js nếu xài ES module
import galleryRouter from "./route/galleryRouter.js"; // 🆕 nhớ thêm đuôi .js nếu xài ES module
import foodRouter from "./route/foodRouter.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONT_END_URL,
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // 🆕 THÊM VÀO NẾU DÙNG request.cookies
app.use(morgan('dev'));

// Test route
app.get('/', (req, res) => {
  res.json({ message: "Server is running" });
});

// Routes
app.use('/api/user', userRouter); // phải khai trước khi listen
app.use('/api/gallery', galleryRouter); // phải khai trước khi listen
app.use('/api/food', foodRouter); // phải khai trước khi listen

// Kết nối DB và khởi động server
const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
  });
}).catch((err) => {
  console.error('Database connection failed:', err.message);
});
