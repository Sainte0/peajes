const express = require('express');
const router = express.Router();
const Peaje = require('../models/peaje');

// Formulario para agregar un peaje
router.get('/agregar', (req, res) => {
  res.render('agregar_peaje');
});

// Ejemplo de ruta para renderizar una vista
router.get('/peajes', async (req, res) => {
  try {
    const peajes = await Peaje.find();
    res.render('peajes', { peajes }); // Renderiza el archivo peajes.ejs desde el directorio views
  } catch (err) {
    res.status(500).send(err);
  }
});


// Endpoint para procesar la solicitud de agregar un peaje
router.post('/agregar', async (req, res) => {
  const { ubicacion, tarifa, vehiculos } = req.body;
  const nuevoPeaje = new Peaje({ ubicacion, tarifa, vehiculos });
  try {
    await nuevoPeaje.save();
    res.redirect('/peajes');
  } catch (err) {
    res.status(400).send(err);
  }
});

// Listar todos los peajes
router.get('/', async (req, res) => {
  try {
    const peajes = await Peaje.find();
    res.render('peajes', { peajes });
  } catch (err) {
    res.status(500).send(err);
  }
});

// Eliminar un peaje por ID
router.post('/eliminar/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Peaje.findByIdAndDelete(id);
    res.redirect('/peajes');
  } catch (err) {
    res.status(500).send(err);
  }
});



module.exports = router;
