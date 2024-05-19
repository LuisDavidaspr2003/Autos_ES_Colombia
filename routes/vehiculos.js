const express = require('express');
const router = express.Router();
const vehiculosController = require('../controllers/vehiculos');

// Rutas para el controlador de vehículos

// Agregar un nuevo vehículo al sistema
router.post('/', vehiculosController.agregarVehiculo);

// Eliminar un vehículo del sistema por su placa
router.delete('/:placa', vehiculosController.eliminarVehiculo);

// Obtener todos los vehículos del sistema
router.get('/', vehiculosController.obtenerVehiculos);

module.exports = router;
