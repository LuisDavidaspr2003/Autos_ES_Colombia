// routes/entradas_salidas.js

const express = require('express');
const router = express.Router();
const entradasSalidasController = require('../controllers/entradas_salidas');

// Rutas para registrar entrada y salida de vehículos
router.post('/entradas', entradasSalidasController.registrarEntrada);
router.post('/salidas/:placa', entradasSalidasController.registrarSalida);

module.exports = router;
