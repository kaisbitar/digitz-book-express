const express = require("express");
const router = express.Router();
const gloablDir = process.cwd();
const axios = require("axios");
const https = require("https");
const agent = new https.Agent({ rejectUnauthorized: false });

router.get("/api/quran-model", (req, res) => {
  res.sendFile("./storage/deliverables/quranModel.json", { root: gloablDir });
});
router.get("/api/quran-index", (req, res) => {
  res.sendFile("./storage/deliverables/quranIndexModel.json", {
    root: gloablDir,
  });
});
router.get("/api/with-tashkeel", (req, res) => {
  res.sendFile("./storage/resources/allVersesWithTashkeel.json", {
    root: gloablDir,
  });
});
router.get("/api/view/sura-details/:fileName", (req, res) => {
  res.sendFile(
    `./storage/deliverables/suras-details/${req.params.fileName}.json`,
    { root: gloablDir }
  );
});

const scrapeWebsite = require("./test");
router.get(`/api/scrape/:word`, async (req, res) => {
  const word = req.params.word;
  // const url = `http://www.baheth.info/find/web/${word}?sources=القاموس المحيط`;
  const url = `https://www.arabicterminology.com/?search=${word}&book=معجم الغني`;
  //www.baheth.info/find/web/${word}?sources=القاموس المحيط
  //   const url = `https://www.almaany.com/ar/dict/ar-ar/${word}`;
  http: try {
    const data = await scrapeWebsite(url);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error fetching the website" });
  }
});

module.exports = router;
