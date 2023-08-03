
const express = require('express')
const router = express.Router()
const gloablDir = process.cwd()


router.get('/api/quran-model', (req, res) => {
    res.sendFile('./storage/deliverables/quranModel.json', { root: gloablDir });
})
router.get('/api/quran-index', (req, res) => {
    res.sendFile('./storage/deliverables/quranIndexModel.json', { root: gloablDir })
})
router.get('/api/with-tashkeel', (req, res) => {
    res.sendFile('./storage/resources/allVersesWithTashkeel.json', { root: gloablDir })
})
router.get('/api/view/sura-details/:fileName', (req, res) => {
    // res.send(req.params.fileName)
    res.sendFile(`./storage/deliverables/suras-details/${req.params.fileName}.json`, { root: gloablDir })
})


module.exports = router