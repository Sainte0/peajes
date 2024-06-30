const express = require('express')
const router = express.Router()
const Peaje = require('../models/peaje')

// Formulario para agregar un peaje
router.get('/agregar', (req, res) => {
  res.render('agregar_peaje')
})

// Renderizar vista peaje
router.get('/peajes', async (req, res) => {
  try {
    const peajes = await Peaje.find()
    res.render('peajes', { peajes })
  } catch (err) {
    res.status(500).send(err)
  }
})

// Renderizar vista peaje seleccionado para editar
router.get('/editar/:id', async (req, res) => {
  const { id } = req.params
  try {
    const peaje = await Peaje.findById(id)
    if (peaje) {
      res.render('editar_peaje', { peaje })
    } else {
      res.status(404).send('Peaje no encontrado')
    }
  } catch (err) {
    res.status(500).send('Error del servidor')
  }
})

// Endpoint agregar un peaje
router.post('/agregar', async (req, res) => {
  const { patente, ubicacion, tarifa, tipo_vehiculo } = req.body
  const nuevoPeaje = new Peaje({ patente, ubicacion, tarifa, tipo_vehiculo })
  try {
    await nuevoPeaje.save()
    res.redirect('/peajes')
  } catch (err) {
    res.status(400).send(err)
  }
})

// Endpoint listar todos los peajes
router.get('/', async (req, res) => {
  try {
    const peajes = await Peaje.find()
    res.render('peajes', { peajes })
  } catch (err) {
    res.status(500).send(err)
  }
})

// Endpoint eliminar peaje por ID
router.post('/eliminar/:id', async (req, res) => {
  const { id } = req.params
  try {
    await Peaje.findByIdAndDelete(id)
    res.redirect('/peajes')
  } catch (err) {
    res.status(500).send(err)
  }
})

// Ruta el formulario de edición de un peaje

router.post('/editar/:id', async (req, res) => {
  const { id } = req.params
  const { patente, ubicacion, tarifa, tipo_vehiculo } = req.body

  try {
    await Peaje.findByIdAndUpdate(id, {
      patente,
      ubicacion,
      tarifa,
      tipo_vehiculo,
    })
    res.redirect('/peajes')
  } catch (err) {
    res.status(400).send('Error al actualizar el peaje')
  }
})

module.exports = router
