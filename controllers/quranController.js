require("dotenv").config();

const gloablDir = process.cwd();
const scrapeWebsite = require("../services/scraperService");

exports.getQuranModel = (req, res) => {
  res.sendFile("./storage/deliverables/quranModel.json", { root: gloablDir });
};

exports.getQuranIndex = (req, res) => {
  res.sendFile("./storage/deliverables/quranIndexModel.json", {
    root: gloablDir,
  });
};

exports.getWithTashkeel = (req, res) => {
  res.sendFile("./storage/resources/allVersesWithTashkeel.json", {
    root: gloablDir,
  });
};

exports.getSuraDetails = (req, res) => {
  res.sendFile(
    `./storage/deliverables/suras-details/${req.params.fileName}.json`,
    { root: gloablDir }
  );
};

exports.getRoots = (req, res) => {
  res.sendFile("./storage/deliverables/roots.json", { root: gloablDir });
};

exports.getScraper = async (req, res) => {
  console.log("Scraper called");
  const word = req.params.word;
  const url = process.env.SCRAPE_URL_FORMAT.replace("{word}", word);
  try {
    const data = await scrapeWebsite(url);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error fetching the website" });
  }
};
