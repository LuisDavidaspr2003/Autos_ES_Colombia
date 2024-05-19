// routes/usuariosRoutes.js

const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuarios');

// Rutas para el controlador de usuarios

// Registrar entrada de vehículo
router.post('/entrada', usuariosController.registrarEntrada);

// Registrar salida de vehículo
router.post('/salida', usuariosController.registrarSalida);

// Gestionar pago

module.exports = router;
