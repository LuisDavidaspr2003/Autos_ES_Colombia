const express = require('express');
const router = express.Router();
const administradorController = require('../controllers/administrador');

// Rutas para usuarios
router.post('/usuarios/agregar', administradorController.agregarUsuario);
router.get('/usuarios', administradorController.listarUsuarios);
router.delete('/usuarios/:id', administradorController.eliminarUsuario);

// Rutas para administradores
router.post('/administradores/agregar', administradorController.agregarAdministrador);
router.get('/administradores', administradorController.listarAdministradores);

module.exports = router;
