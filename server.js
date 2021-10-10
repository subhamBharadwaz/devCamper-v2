const express = require("express");
const dotEnv = require("dotenv").config({ path: "./config/config.env" });
const morgan = require("morgan");
const connectDB = require("./config/db");

// Database connection
connectDB();

// Route files
const bootcamps = require("./routes/bootcamps");

const app = express();

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Mount routers
app.use("/api/v2/bootcamps", bootcamps);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.error(`Error: ${err.message}`);

  // Close server and exit process
  server.close(() => process.exit(1)); //exit(1) = exit with failure
});
