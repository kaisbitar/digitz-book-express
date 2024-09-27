const quranIndex = require("../storage/resources/quranIndex.json");
const Sura = require("./suraModel.js");

function createIndexDetails() {
  return quranIndex.map((fileName, index) => {
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

module.exports = createIndexDetails();
