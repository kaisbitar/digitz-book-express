
function createIndexFile() {
    const quranIndexModel = require('../models/quranIndexModel')
    writeContent(`/storage/deliverables/quranIndexModel.json`, quranIndexModel)
}
function createQuranFile() {
    const quranModel = require('../models/quranModel')
    writeContent(`/storage/deliverables/quranModel.json`, quranModel)
} 
function createWordsDetails() {
    const quranIndex = require('../storage/resources/quranIndex.json')
    const Sura = require('../models/suraModel')
    quranIndex.map(fileName => {
        let sura = new Sura(fileName)
        writeContent(`/storage/deliverables/suras-details/${fileName}.json`, {wordIndexes: sura.getWordsPositions()})
    })
}
async function writeContent(path, content) {
    const fs = require('fs')
    const gloablDir = process.cwd()
    if (fs.existsSync(`${gloablDir}${path}`)) {
        await fs.unlink(`${gloablDir}${path}`, (err) => {
            if(err) throw new Error(err);
            console.log(`File at ${path} Removed!`);
        })
    }
    fs.writeFile(`${gloablDir}${path}`, JSON.stringify(content), (err) => {
        if (err) return console.log(err)
        console.log(`File ${path} created!`);
    });
}
module.exports = createQuranFile(), createIndexFile(), createWordsDetails()