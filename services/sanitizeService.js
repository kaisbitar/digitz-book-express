// This is a sanitize service to adhere to the Quran Othmani text
const replacements = {
  يء: "ي",
  ءا: "آ",
  ويءادم: "ويآدم",
  يادم: "يآدم",
  ءادم: "آدم",
  لءآدم: "لآدم",
  رآ: "رءا",
  تبوآ: "تبوءا",
  جزآ: "جزءا",
  ورآ: "ورءا",
  ترآ: "ترءا",
  سوآ: "سوءا",
  ردآ: "ردءا",
  يستء: "يست",
  الءن: "الن",
  ألءن: "ألن",
  آلءن: "آلن",
  لءي: "لي",
  لءو: "لو",
  بءو: "بؤ",
  سءو: "سؤ",
  كءو: "كؤ",
  هءو: "هؤ",
  فءو: "فؤ",
  زءو: "زؤ",
  نءو: "نؤ",
  تءو: "تؤ",
  طءو: "طؤ",
  كءي: "كي",
  زءي: "زي",
  سءي: "سي",
  بءي: "بي",
  سء: "س",
  ىه: "يه",
  ىل: "يل",
  ىك: "يك",
  ىة: "ية",
  تىن: "تين",
  أفءدة: "أفدة",
  والأفءدة: "والأفدة",
  أنجىنا: "أنجينا",
  أفءدتهم: "أفدتهم",
  تجءرون: "تجرون",
  المستءخرين: "المستخرين",
  شطءه: "شطه",
  استءذن: "استذن",
  استءذنوك: "استذنوك",
  ووقىنا: "ووقينا",
  لخطءين: "لخطين",
  يجءرون: "يجرون",
  جءروا: "جروا",
  قرءان: "قرآن",
  تءخر: "تخر",
};

module.exports = function Sanatize(sentence) {
  return sentence
    .split(" ")
    .map((text) => {
      for (const [key, value] of Object.entries(replacements)) {
        text = text.replace(new RegExp(key, "g"), value);
      }
      return text;
    })
    .join(" ");
};

module.exports.sanitizeWithTashkeel = function (sentence) {
  const tashkeelPattern = /[\u064B-\u065F\u0670]/g;

  return sentence
    .split(" ")
    .map((text) => {
      let sanitizedText = text;
      for (const [key, value] of Object.entries(replacements)) {
        const keyChars = key.split("");
        const regexPattern = keyChars
          .map((char) => char + "[\u064B-\u065F\u0670]*")
          .join("");
        const regex = new RegExp(regexPattern, "g");

        sanitizedText = sanitizedText.replace(regex, (match) => {
          const tashkeelMarks = match.match(tashkeelPattern) || [];
          let result = value;
          tashkeelMarks.forEach((mark, index) => {
            result =
              result.slice(0, index + 1) + mark + result.slice(index + 1);
          });
          return result;
        });
      }
      return sanitizedText;
    })
    .join(" ");
};

// Test the function
const sanitizeWithTashkeel = require("./sanitizeService").sanitizeWithTashkeel;
const allVersesWithTashkeel = require("../storage/resources/allVersesWithTashkeel.json");

console.log(
  sanitizeWithTashkeel(allVersesWithTashkeel[960 - 1]),
  "فَلَنَسْءَلَنَّ الَّذِينَ أُرْسِلَ إِلَيْهِمْ وَلَنَسْءَلَنَّ الْمُرْسَلِينَ"
);
