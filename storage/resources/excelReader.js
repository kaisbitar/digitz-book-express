const XLSX = require("xlsx");
const fs = require("fs");

function readExcelFile(filePath, sheetName = null) {
  const workbook = XLSX.readFile(filePath);
  const sheet = sheetName || workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheet];
  const data = XLSX.utils.sheet_to_json(worksheet);
  return data;
}

function extractField(data, fieldName) {
  if (!Array.isArray(data)) return [];
  return data.map((row) => row[fieldName]).filter(Boolean);
}

// Function to check if a word is Arabic
function isArabicWord(word) {
  // Arabic Unicode range: \u0600-\u06FF
  const arabicRegex = /^[\u0600-\u06FF]+$/;
  return arabicRegex.test(word);
}

// Function to remove tashkeel (diacritics) from Arabic text
function removeTashkeel(text) {
  return text.replace(/[\u064B-\u065F]/g, "");
}

// Function to check if a word consists of a single letter (after removing tashkeel)
function isSingleLetter(word) {
  return removeTashkeel(word).length === 1;
}

// Function to check if a character should be combined with previous word
function shouldCombineWithPrevious(word) {
  const normalized = removeTashkeel(word);
  return normalized === "ء";
}

// Function to check if a word is a complete word (not a partial)
function isCompleteWord(word) {
  const normalized = removeTashkeel(word);
  return normalized.length >= 3;
}

// Function to process words and combine single letters appropriately
function processWords(words) {
  const cleanedWords = [];
  let currentSequence = [];

  // Clean and normalize input words
  words = words
    .map((word) => (word ? word.trim().replace(/-/g, "") : ""))
    .map((word) => word || "");

  for (let i = 0; i < words.length; i++) {
    const currentWord = words[i];

    // Skip empty strings but maintain the sequence
    if (!currentWord) {
      // If we have a sequence and hit an empty string, process the sequence
      if (currentSequence.length > 0) {
        const combined = currentSequence.join("");
        if (isCompleteWord(combined)) {
          cleanedWords.push(combined);
        } else {
          // If it's not a complete word, check the next non-empty word
          let nextWord = "";
          for (let j = i + 1; j < words.length && !nextWord; j++) {
            if (words[j]) nextWord = words[j];
          }
          if (nextWord && !isCompleteWord(nextWord)) {
            // Keep the sequence if next word is also partial
            continue;
          } else {
            cleanedWords.push(combined);
          }
        }
        currentSequence = [];
      }
      continue;
    }

    // Skip if not Arabic
    if (!isArabicWord(currentWord)) {
      continue;
    }

    // If current word should be combined with previous word
    if (shouldCombineWithPrevious(currentWord)) {
      if (cleanedWords.length > 0) {
        const lastWord = cleanedWords.pop();
        cleanedWords.push(lastWord + currentWord);
      } else {
        currentSequence.push(currentWord);
      }
      continue;
    }

    // If current word is a single letter or partial word
    if (isSingleLetter(currentWord)) {
      currentSequence.push(currentWord);
      continue;
    }

    // If we have a sequence and encounter a non-single letter word
    if (currentSequence.length > 0) {
      const combined = currentSequence.join("");
      // Only combine if the current word is not a complete word
      if (!isCompleteWord(currentWord)) {
        cleanedWords.push(combined + currentWord);
      } else {
        cleanedWords.push(combined);
        cleanedWords.push(currentWord);
      }
      currentSequence = [];
    } else {
      cleanedWords.push(currentWord);
    }
  }

  // Handle any remaining sequence
  if (currentSequence.length > 0) {
    cleanedWords.push(currentSequence.join(""));
  }

  return cleanedWords;
}

// Function to extract verse number from Arabic verse text
function extractVerseNumber(verseText) {
  // Match the number between the last pair of Arabic parentheses ﴿number﴾
  const match = verseText && verseText.match(/﴿(\d+)﴾/);
  return match ? match[1] : null;
}

const data = readExcelFile("quran-roots.xlsx");

// Log the first row to see the structure
console.log("First row structure:", Object.keys(data[0]));
console.log("First row data:", data[0]);

// Create a map to track word counts and their source entries
const wordInfo = new Map();

// Process all entries
data.forEach((entry) => {
  if (!entry.RootWords) return;

  // Split by comma but don't filter empty strings yet
  const words = entry.RootWords.split(",").map((word) =>
    word ? word.trim() : ""
  );

  // Process the words
  const cleanedWords = processWords(words);

  // Store each cleaned word with its source entry
  cleanedWords.forEach((word) => {
    if (!wordInfo.has(word)) {
      wordInfo.set(word, {
        count: 0,
        entries: [],
      });
    }
    const info = wordInfo.get(word);
    info.count++;
    info.entries.push({
      suraNumber: entry["Sura Number"],
      verse: entry.Detail,
      rootWords: entry.RootWords,
      verseIndex: extractVerseNumber(entry.Detail),
    });
  });
});

// Convert map to array of objects
const wordData = Array.from(wordInfo.entries()).map(([word, info]) => ({
  word,
  count: info.count,
  entries: info.entries,
}));

// Sort by count in descending order
wordData.sort((a, b) => b.count - a.count);

// Create output data
const outputData = {
  totalWords: wordData.length,
  words: wordData,
};

// Save to file
fs.writeFileSync("wordRoots.json", JSON.stringify(outputData, null, 2), "utf8");

console.log("\nResults saved to wordRoots.json");
console.log("Total Unique Arabic Words:", wordData.length);
console.log("\nTop 10 most frequent words:");
console.log(
  wordData.slice(0, 10).map((item) => ({
    word: item.word,
    count: item.count,
    sampleEntries: item.entries.slice(0, 2), // Show first 2 entries as sample
  }))
);
