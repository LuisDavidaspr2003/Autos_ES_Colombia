const administradorModule = require('../models/administrador');

// Controlador para agregar un nuevo usuario al sistema
async function agregarUsuario(req, res) {
    const { nombre, correo, telefono, tipo } = req.body;
    const resultado = await administradorModule.agregarUsuario(nombre, correo, telefono, tipo);
    res.json(resultado);
}

// Controlador para listar todos los usuarios del sistema
async function listarUsuarios(req, res) {
    const resultado = await administradorModule.listarUsuarios();
    res.json(resultado);
}

// Controlador para eliminar un usuario del sistema
async function eliminarUsuario(req, res) {
    const { idUsuario } = req.params;
    const resultado = await administradorModule.eliminarUsuario(idUsuario);
    res.json(resultado);
}

// Controlador para agregar un nuevo administrador al sistema
async function agregarAdministrador(req, res) {
    const { nombre, correo, telefono } = req.body;
    const resultado = await administradorModule.agregarAdministrador(nombre, correo, telefono);
    res.json(resultado);
}

// Controlador para agregar un nuevo vehículo al sistema
async function agregarVehiculo(req, res) {
    const { placa, marca, modelo } = req.body;
    const resultado = await administradorModule.agregarVehiculo(placa, marca, modelo);
    res.json(resultado);
}




module.exports = {
    agregarUsuario,
    listarUsuarios,
    eliminarUsuario,
    agregarAdministrador,
    agregarVehiculo,
 
};
