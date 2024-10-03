// scraper.js
const puppeteer = require("puppeteer");

const scrapeWebsite = async (url) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    console.log("page", page);
    const extractedData = await page.evaluate(() => {
      return Array.from(document.querySelectorAll(".view-content")).map(
        (element) => element.textContent.trim()
      );
    });

    await browser.close();
    return extractedData;
  } catch (error) {
    console.error("Error fetching the website:", error);
  }
};

module.exports = scrapeWebsite;
