import cors from "cors";
import path from "path";
import express from "express";
import sequenceRouter from "./routes/sequence.route.js";
import authRouter from "./routes/auth.js";
import { corsOptions } from "./config/cors.config.js";
import { AppError } from "./utils/AppError.js";

const app = express();

// Ensure JWT_SECRET is set
if (!process.env.JWT_SECRET) {
  throw new AppError('JWT_SECRET is not set in environment variables', 500);
}

// Log all requests with more details
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  next();
});

// CORS configuration
app.use(cors(corsOptions));

app.set("trust proxy", 1);
app.use(express.json({ limit: "16kb" }));

// Routes
app.use("/api/auth", authRouter);
app.use("/api/sequence", sequenceRouter);

// Serve static files
app.use(express.static("public"));
app.use(express.static(path.join(path.resolve(), "../frontend/dist")));

// Catch-all route
app.get("*", (req, res) => {
  res.sendFile(path.join(path.resolve(), "../frontend/dist/index.html"));
});

// Error handling middleware
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    });
  } else {
    // Production mode
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message
      });
    } else {
      // Programming or unknown errors
      console.error('ERROR 💥', err);
      res.status(500).json({
        status: 'error',
        message: 'Something went wrong!'
      });
    }
  }
});

export { app };
