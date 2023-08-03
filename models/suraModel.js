const oneQuranFile = require('./quranModel.js')

class Sura {
    constructor (fileName) {
        this.fileName = fileName;
    }
    extractSura () {
        let results = [];
        if (this.fileName === '000المصحف') return oneQuranFile
        oneQuranFile.filter(obj => {
            if (obj.fileName === this.fileName) {
                results.push(obj);
            }
        })
        return results;
    }
    getNumberOfWords () {
        let count = 0;
        this.extractSura().map((obj) => {
            count += obj.verseText.split(' ').length
        });
        return count;
    }
    getNumberOfLetters () {
        let count = 0;
        this.extractSura().map((obj) => {
            count += obj.verseText.replace(/\s/g, '').length
        })
        return count;
    }
    getNumberOfVerses () {
        return this.extractSura().length;
    }
    getVerseNumberToQuran () {
        return this.extractSura()[0].verseNumberToQuran
    }
    getWordsPositions () {
        let positions = {}
        this.getSuraText().join(' ').split(' ').map((word, pos) => {
            if(!positions[word]) positions[word] = []
            positions[word].push(pos + 1)
        })
        return positions
    }
    getSuraText () {
        let results = [];
        oneQuranFile.filter(obj => {
            if (this.fileName === '000المصحف') results.push(obj.verseText)
            else if (obj.fileName === this.fileName) {
                results.push(obj.verseText);
            }
        })
        return results;
    }

}
module.exports = Sura