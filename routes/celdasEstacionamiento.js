const express = require('express');
const router = express.Router();
const celdasEstacionamientoController = require('../controllers/celdasEstacionamiento');

// Rutas para el controlador de celdas de estacionamiento

// Obtener todas las celdas de estacionamiento disponibles
router.get('/disponibles', celdasEstacionamientoController.obtenerCeldasDisponibles);

// Obtener todas las celdas de estacionamiento no disponibles
router.get('/no-disponibles', celdasEstacionamientoController.obtenerCeldasNoDisponibles);

// Asignar una celda de estacionamiento a un vehículo
router.post('/asignar', celdasEstacionamientoController.asignarCeldaEstacionamiento);

// agregar una celda de estacionamiento
router.post('/agregar-celda', celdasEstacionamientoController.agregarCeldaEstacionamiento);


module.exports = router;
