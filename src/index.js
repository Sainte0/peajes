const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const peajeRoutes = require('./routes/peajeRoutes')
const path = require('path')

const app = express()
const port = 3000

// Middleware
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

// Conexión a MongoDB
mongoose
  .connect('mongodb+srv://sainte:sainte1234@bd2.kg7kjxl.mongodb.net/')
  .then(() => console.log('Conectado a MongoDB'))
  .catch((err) => console.error('Error al conectar a MongoDB', err))

// Rutas
app.use('/peajes', peajeRoutes)

// Ruta principal
app.get('/', (req, res) => {
  res.render('index')
})

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`)
})
