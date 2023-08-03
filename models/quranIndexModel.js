const quranIndex = require('../storage/resources/quranIndex.json')
const Sura = require('./suraModel.js')

function createIndexDetails() {
    return quranIndex.map((fileName) => {
        let sura = new Sura(fileName)
        return {
            fileName: fileName,
            numberOfLetters: sura.getNumberOfLetters(),
            numberOfWords: sura.getNumberOfWords(),
            numberOfVerses: sura.getNumberOfVerses(),
            verseNumberToQuran: sura.getVerseNumberToQuran()
        }
    })
}

module.exports = createIndexDetails();


