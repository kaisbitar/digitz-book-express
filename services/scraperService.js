require("dotenv").config();

const puppeteer = require("puppeteer");

const scrapeWebsite = async (url) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const extractedData = await page.evaluate((cssSelector) => {
      return Array.from(document.querySelectorAll(cssSelector)).map((element) =>
        element.textContent.trim()
      );
    }, process.env.SCRAPE_WEBSITE_CSS_TARGET);

    await browser.close();
    return extractedData;
  } catch (error) {
    console.error("Error fetching the website:", error);
  }
};

module.exports = scrapeWebsite;
