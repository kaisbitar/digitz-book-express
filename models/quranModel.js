function createQuranObj () {
    const allSurasDataRaw = require('../storage/resources/allSurasDataRaw.json')
    const sanatize = require('./sanatizerModel')

    return allSurasDataRaw.map(verse => {
        return {
            fileName: `${convertToThreeDigits(verse.suraNumber)}${verse.sura}`,
            verseIndex: verse.verseNumber,
            verseNumberToQuran: verse.verseNumberToQuran,
            verseText: sanatize(verse.verseText)   
        }
    })
}
function convertToThreeDigits (number) {
    return number.toLocaleString('en-US', {
        minimumIntegerDigits: 3, 
        useGrouping: false
    })
}

module.exports = createQuranObj()