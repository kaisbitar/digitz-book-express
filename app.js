const express = require("express");
const apiRoutes = require("./routes/api");
const serviceRoutes = require("./routes/services");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./docs/swagger.json");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Add error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ error: err.message });
});

app.use(
  cors({
    origin: process.env.CORS_ORIGINS,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Add logging to see which routes are being registered
console.log("Registering routes...");
app.use("/", apiRoutes);
app.use("/", serviceRoutes);

app.use((req, res) => {
  console.log(`404: ${req.method} ${req.url}`);
  res.status(404).send("Route doesn't exist");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
