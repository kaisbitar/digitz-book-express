const Sura = require("./suraService.js");
const rawQuranIndex = require("../storage/resources/quranIndex.json");

class IndexService {
  static getIndex() {
    return rawQuranIndex.map((fileName, index) => {
      let sura = new Sura(fileName);
      return {
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
