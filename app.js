const express = require("express");
const apiRoutes = require("./routes/api");
const webRoutes = require("./routes/services");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./docs/swagger.json");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration
app.use(
  cors({
    origin: process.env.CORS_ORIGINS,
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Documentation - moved under /app prefix
app.use("/app/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes - all prefixed with /app
app.use("/app", apiRoutes);
app.use("/app", webRoutes);

// Services endpoint - moved under /app prefix
app.post("/app/services/create", (req, res) => {
  res.status(201).json({ message: "Files created successfully." });
});

// 404 handler
app.use((req, res) => {
  res.status(404).send("Route doesn't exist");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
