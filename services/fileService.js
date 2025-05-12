const fs = require("fs");
const path = require("path");
const QuranService = require("./QuranService.js");
const Sura = require("./suraService.js");
const IndexService = require("./indexService.js");

class FileService {
  constructor() {
    this.baseDir = path.join(process.cwd(), "storage", "deliverables");
  }

  async writeContent(filePath, content) {
    const fullPath = path.join(this.baseDir, filePath);
    try {
      if (fs.existsSync(fullPath)) {
        await fs.promises.unlink(fullPath);
        console.log(`File at ${filePath} removed!`);
      }
      await fs.promises.writeFile(fullPath, JSON.stringify(content));
      console.log(`File ${filePath} created!`);
    } catch (err) {
      console.error(`Error writing file ${filePath}:`, err);
      throw err;
    }
  }

  async createIndexFile() {
    try {
      const indexData = IndexService.getIndex();
      await this.writeContent("quranIndexModel.json", indexData);
    } catch (err) {
      console.error("Error creating index file:", err);
    }
  }

  async createQuranFile() {
    try {
      const quranData = QuranService.getAllQuran();
      await this.writeContent("quranModel.json", quranData);
    } catch (err) {
      console.error("Error creating Quran file:", err);
    }
  }

  async createWordsDetails() {
    const quranIndex = require("../storage/resources/quranIndex.json");
    for (const fileName of quranIndex) {
      const sura = new Sura(fileName);
      try {
        await this.writeContent(`suras-details/${fileName}.json`, {
          wordIndexes: sura.getWordsPositions(),
        });
      } catch (err) {
        console.error(`Error creating words details for ${fileName}:`, err);
      }
    }
  }

  async createAllFiles() {
    console.log("Creating all files...");
    try {
      await this.createQuranFile();
    } catch (err) {
      console.error("Error Quran file:", err);
    }
    try {
      await this.createIndexFile();
    } catch (err) {
      console.error("Error creating index file:", err);
    }
    // try {
    //   await this.createWordsDetails();
    // } catch (err) {
    //   console.error("Error creating words details:", err);
    // }
  }
}

module.exports = FileService;
