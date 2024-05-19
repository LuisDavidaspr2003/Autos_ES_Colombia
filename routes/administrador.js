// routes/administradorRoutes.js

const express = require('express');
const router = express.Router();
const administradorController = require('../controllers/administrador');

// Rutas para el controlador de administradores

// Agregar un nuevo usuario administrador
router.post('/usuarios/agregar', administradorController.agregarUsuario);

// Eliminar un usuario administrador
router.delete('/usuarios/:id', administradorController.eliminarUsuario);

// Listar todos los usuarios del sistema
router.get('/usuarios', administradorController.listarUsuarios);

// Agregar un nuevo administrador al sistema
router.post('/administradores/agregar', administradorController.agregarAdministrador);

// Agregar un nuevo vehículo al sistema
router.post('/vehiculos/agregar', administradorController.agregarVehiculo);



module.exports = router;
