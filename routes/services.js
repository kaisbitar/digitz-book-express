const express = require('express')
const router = express.Router()
const gloablDir = process.cwd()



router.get('/', (req, res) => {
    res.sendFile('./views/home.html', { root: gloablDir })
});

router.get('/services/run', (req, res, next) => {
    require('../services/resourcesService.js')
    // res.send('<a href="/">Home</a>')
    res.writeHead(302, {
        'Location': '/'
      });
    res.end();
})

module.exports = router