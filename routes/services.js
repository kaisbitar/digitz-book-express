const express = require("express");
const router = express.Router();

router.post("/services/create", async (req, res, next) => {
  const FileService = require("../services/fileService.js");
  const fileService = new FileService();

  try {
    await fileService.createAllFiles();
    res.status(201).json({ message: "Files created successfully." });
  } catch (err) {
    console.error("Error during file creation:", err);
    next(err);
  }
});

module.exports = router;
