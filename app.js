import express, { json } from "express";
import { router as listRoutes } from "./routes/list.js";
import { ExpressError } from "./expressError.js";

const app = express();

app.use(express.json());
app.use("/list", listRoutes);

/* 404 handler */

app.use(function (req, res, next) {
  return new ExpressError("Not Found", 404);
});

/** general error handler */

app.use((err, req, res, next) => {
  res.status(err.status || 500);

  return res.json({
    error: err.message,
  });
});

export default app;
