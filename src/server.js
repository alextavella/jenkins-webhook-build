const express = require('express')
const app = express()
const cors = require('cors')

const MeDoeController = require('./controllers/MedoeController')
const ViaController = require('./controllers/ViaController')

app.use(cors())

app.get('/', (req, res) => res.status(200).send('OK'))
app.get('/medoe/:branch/:version', MeDoeController.build)
app.get('/via/:branch/:brand/:env', ViaController.build)

app.listen(3333, () => console.log('Listening http://localhost:3333'))