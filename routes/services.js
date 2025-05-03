const express = require("express");
const router = express.Router();
const FileService = require("../services/fileService.js");

router.post("/services/create", async (req, res, next) => {
  const fileService = new FileService();

  try {
    await fileService.createAllFiles();
    res.status(201).json({ message: "Files created successfully." });
  } catch (err) {
    console.error("Error during file creation:", err);
    next(err);
  }
});

router.post("/services/create-word-roots", async (req, res, next) => {
  const fileService = new FileService();

  try {
    await fileService.createRootsAndDerivativesFile();
    res
      .status(201)
      .json({ message: "rootsAndDerivatives.json created successfully." });
  } catch (err) {
    console.error("Error during RootsAndDerivatives file creation:", err);
    next(err);
  }
});

module.exports = router;
