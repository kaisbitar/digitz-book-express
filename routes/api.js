const express = require("express");
const router = express.Router();
const {
  getQuranModel,
  getQuranIndex,
  getWithTashkeel,
  getSuraDetails,
  getScraper,
  getRoots,
} = require("../controllers/QuranController");
//
router.get("/api/quran-model", getQuranModel);
router.get("/api/quran-index", getQuranIndex);
router.get("/api/with-tashkeel", getWithTashkeel);
router.get("/api/view/sura-details/:fileName", getSuraDetails);
router.get(`/api/scrape/:word`, getScraper);
router.get("/api/roots", getRoots);

module.exports = router;
