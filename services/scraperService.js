require("dotenv").config();

const axios = require("axios");
const cheerio = require("cheerio");

const scrapeWebsite = async (url) => {
  try {
    console.log("Starting scrape process for URL:", url);

    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const extractedData = $(process.env.SCRAPE_WEBSITE_CSS_TARGET)
      .map((_, element) => $(element).text().trim())
      .get();

    return extractedData;
  } catch (error) {
    console.error("Error in scrapeWebsite function:", error);
    throw error;
  }
};

module.exports = scrapeWebsite;
