const allSurasDataRaw = require("../storage/resources/allSurasDataRaw.json");
const allVersesWithTashkeel = require("../storage/resources/allVersesWithTashkeel.json");
const textSanitizer = require("./sanitizeService.js");
const sanitizeWithTashkeel =
  require("./sanitizeService.js").sanitizeWithTashkeel;

class QuranService {
  static getAllQuran() {
    return allSurasDataRaw.map((verse) => ({
      fileName: `${this.convertToThreeDigits(verse.suraNumber)}${verse.sura}`,
      verseIndex: verse.verseNumber,
      verseNumberToQuran: verse.verseNumberToQuran,
      // verseText: textSanitizer(verse.verseText),
      verseText: sanitizeWithTashkeel(
        allVersesWithTashkeel[verse.verseNumberToQuran - 1]
      ),
    }));
  }

  static getSura(fileName) {
    let results = [];
    if (fileName === "000المصحف") return this.getAllQuran();
    this.getAllQuran().filter((obj) => {
      if (obj.fileName === fileName) {
        results.push(obj);
      }
    });
    return results;
  }

  static convertToThreeDigits(number) {
    return number.toLocaleString("en-US", {
      minimumIntegerDigits: 3,
      useGrouping: false,
    });
  }
}

module.exports = QuranService;
