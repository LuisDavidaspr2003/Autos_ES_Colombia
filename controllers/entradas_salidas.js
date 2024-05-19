const entradasSalidasModule = require('../models/entradas_salidas'); // Importar el módulo de registro de entradas y salidas

// Controlador para registrar la entrada de un vehículo al parqueadero
async function registrarEntrada(req, res) {
    const { placa, marca, modelo, tipoServicio, idUsuario } = req.body;
    const resultado = await entradasSalidasModule.registrarEntrada(placa, marca, modelo, tipoServicio, idUsuario);
    res.json(resultado);
}

// Controlador para registrar la salida de un vehículo del parqueadero
async function registrarSalida(req, res) {
    const { placa } = req.params;
    const resultado = await entradasSalidasModule.registrarSalida(placa);
    res.json(resultado);
}

// Exportar los controladores para que estén disponibles para otros archivos
module.exports = {
    registrarEntrada,
    registrarSalida
};
