const express = require("express");
const apiRoutes = require("./routes/api");
const webRoutes = require("./routes/services");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./docs/swagger.json");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Define allowed origins
const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? ["https://rusul.net", "http://rusul.net"]
    : [
        "http://localhost:3000",
        "http://localhost:8080",
        "http://localhost:2000",
      ];

// Updated CORS configuration
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Error handling for CORS
app.use((err, req, res, next) => {
  if (err.message === "Not allowed by CORS") {
    res.status(403).json({
      error: "CORS not allowed for this origin",
    });
  } else {
    next(err);
  }
});

// Routes
app.use(apiRoutes);
app.use(webRoutes);

// Services route
app.post("/services/create", (req, res) => {
  res.status(201).json({ message: "Files created successfully." });
});

// 404 handler
app.use((req, res) => {
  res.status(404).send("Route doesn't exist");
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error:
      process.env.NODE_ENV === "production"
        ? "Internal Server Error"
        : err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`Allowed origins: ${allowedOrigins.join(", ")}`);
});
