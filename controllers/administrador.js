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
    const { id } = req.params;

    try {
        const resultado = await administradorModule.eliminarUsuario(id);

        if (resultado.success) {
            return res.status(200).json(resultado);
        } else {
            return res.status(404).json(resultado); // Devuelve 404 si el usuario no se encuentra
        }
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        return res.status(500).json({ success: false, message: 'Error interno al eliminar usuario' });
    }
}

// Controlador para agregar un nuevo administrador al sistema
async function agregarAdministrador(req, res) {
    const { nombre, correo, telefono } = req.body;
    const resultado = await administradorModule.agregarAdministrador(nombre, correo, telefono);
    res.json(resultado);
}

// Controlador para listar todos los administradores del sistema
async function listarAdministradores(req, res) {
    const resultado = await administradorModule.listarAdministradores();
    res.json(resultado);
}

module.exports = {
    agregarUsuario,
    listarUsuarios,
    eliminarUsuario,
    agregarAdministrador,
    listarAdministradores
};
