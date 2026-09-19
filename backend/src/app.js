import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import userRoutes from "./routes/user.routes.js"
import errorHandlingMiddleware from './middleware/errorHandling.middleware.js';

const app = express();
app.use(express.json())
app.use(
    cors({
      origin: [
        "http://localhost:3000"
      ],
      credentials: true,
    })
  );
app.use(cookieParser())

app.use("/api/auth", userRoutes)

app.use(errorHandlingMiddleware)

export default app;