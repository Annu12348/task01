import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import userRoutes from "./routes/user.routes.js"
import errorHandlingMiddleware from './middleware/errorHandling.middleware.js';
import productRoutes from "./routes/product.routes.js"

const allowedOrigins = [
  "http://localhost:3000",
  "https://ecommerce-weld-eight-hu35wtmvl7.vercel.app",
];

const app = express();
app.use(express.json())
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(cookieParser())

app.use("/api/auth", userRoutes)
app.use("/api/product", productRoutes)

app.use(errorHandlingMiddleware)

export default app;