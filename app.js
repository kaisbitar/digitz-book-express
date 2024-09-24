const express = require('express')
const apiRoutes = require('./routes/api')
const webRoutes = require('./routes/services')

const app = express()
const cors = require('cors')

app.use(
  cors({
    origin: ['http://localhost:8080', 'http://localhost:8000'],
  }),
)

app.use(apiRoutes)
app.use(webRoutes)

app.use((req, res) => {
  res.status(404).send('Route doesnt exist')
})

app.listen(3000)
