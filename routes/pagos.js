// routes/pagosRoutes.js

const express = require('express');
const router = express.Router();
const pagosController = require('../controllers/pagos');

// Rutas para el controlador de pagos

// Procesar el pago de un usuario
router.post('/', pagosController.procesarPago);

module.exports = router;
