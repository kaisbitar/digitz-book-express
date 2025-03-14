const express = require("express");
const apiRoutes = require("./routes/api");
const webRoutes = require("./routes/services");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./docs/swagger.json");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: process.env.CORS_ORIGINS,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(apiRoutes);
app.use(webRoutes);
app.use((req, res) => {
  res.status(404).send("Route doesn't exist");
});

app.post("/services/create", (req, res) => {
  res.status(201).json({ message: "Files created successfully." });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
