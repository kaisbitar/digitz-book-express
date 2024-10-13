const Sura = require("./suraService.js");
const rawQuranIndex = require("../storage/resources/quranIndex.json");

class IndexService {
  static getIndex() {
    return rawQuranIndex.map((fileName, index) => {
      let sura = new Sura(fileName);
      return {
        suraNumber: fileName.replace(/[ء-٩]/g, "").replace(/\s/g, ""),
        suraName: fileName.replace(/[0-9]/g, ""),
        fileName: fileName,
        numberOfVerses: sura.getNumberOfVerses(),
        numberOfWords: sura.getNumberOfWords(),
        numberOfLetters: sura.getNumberOfLetters(),
        verseNumberToQuran: sura.getVerseNumberToQuran(),
      };
    });
  }
}

module.exports = IndexService;
