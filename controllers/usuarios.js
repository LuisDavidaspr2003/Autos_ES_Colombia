// usuariosController.js

const usuarios = require('../models/usuarios'); // Importar el módulo de usuarios



// Controlador para registrar la entrada de un vehículo
async function registrarEntrada(req, res) {
    const { placa, marcaModelo, tipoServicio } = req.body;
    const resultado = await usuarios.registrarEntrada(placa, marcaModelo, tipoServicio);
    res.json(resultado);
}

// Controlador para registrar la salida de un vehículo
async function registrarSalida(req, res) {
    const { placa } = req.body;
    const resultado = await usuarios.registrarSalida(placa);
    res.json(resultado);
}



// Exportar los controladores para que estén disponibles en otras partes de la aplicación
module.exports = {
    registrarEntrada,
    registrarSalida,
    
};
