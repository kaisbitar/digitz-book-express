const QuranService = require("./QuranService.js");

class Sura {
  constructor(fileName) {
    this.fileName = fileName;
  }

  getNumberOfWords() {
    let count = 0;
    QuranService.getSura(this.fileName).map((obj) => {
      count += obj.verseText.split(" ").length;
    });
    return count;
  }

  getNumberOfLetters() {
    let count = 0;
    QuranService.getSura(this.fileName).map((obj) => {
      count += obj.verseText.replace(/\s/g, "").length;
    });
    return count;
  }

  getNumberOfVerses() {
    return QuranService.getSura(this.fileName).length;
  }

  getVerseNumberToQuran() {
    return QuranService.getSura(this.fileName)[0].verseNumberToQuran;
  }

  getWordsPositions() {
    let positions = {};
    this.getSuraText()
      .join(" ")
      .split(" ")
      .map((word, pos) => {
        if (!positions[word]) positions[word] = [];
        positions[word].push(pos + 1);
      });
    return positions;
  }

  getSuraText() {
    let results = [];
    QuranService.getSura(this.fileName).filter((obj) => {
      if (this.fileName === "000المصحف") results.push(obj.verseText);
      else if (obj.fileName === this.fileName) {
        results.push(obj.verseText);
      }
    });
    return results;
  }
}

module.exports = Sura;
