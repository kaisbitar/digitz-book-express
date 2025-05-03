// scripts/createRootsAndDerivatives.js

const fs = require("fs");
const path = require("path");

const WORD_ROOTS_PATH = path.join(
  __dirname,
  "../storage/resources/wordRoots.json"
);

const getRootsAndDerivatives = async () => {
  try {
    const wordRootsContent = await fs.promises.readFile(
      WORD_ROOTS_PATH,
      "utf8"
    );
    const wordRoots = JSON.parse(wordRootsContent);

    const rootsAndDerivatives = wordRoots.words.map((entry) => {
      return {
        word: entry.word,
        derivatives: [],
        count: entry.count,
      };
    });
    console.log(rootsAndDerivatives[0]);
    return rootsAndDerivatives;
  } catch (error) {
    console.error("Error creating rootsAndDerivatives.json:", error);
    throw error;
  }
};

module.exports = { getRootsAndDerivatives };
