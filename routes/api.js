const express = require("express");
const router = express.Router();
const {
  getQuranModel,
  getQuranIndex,
  getWithTashkeel,
  getSuraDetails,
  getScraper,
} = require("../controllers/QuranController");
const {
  getRootsAndDerivatives,
} = require("../controllers/wordsRootsController");

router.get("/api/quran-model", getQuranModel);
router.get("/api/quran-index", getQuranIndex);
router.get("/api/with-tashkeel", getWithTashkeel);
router.get("/api/view/sura-details/:fileName", getSuraDetails);
router.get(`/api/scrape/:word`, getScraper);
router.get("/api/roots-and-derivatives", getRootsAndDerivatives);
module.exports = router;
