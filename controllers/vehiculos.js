const vehiculosModule = require('../models/vehiculos'); // Importar el módulo de gestión de vehículos

// Controlador para agregar un nuevo vehículo al sistema
async function agregarVehiculo(req, res) {
    const { placa, marca, modelo, horaEntrada, tipoServicio, estado, idUsuario } = req.body;
    const resultado = await vehiculosModule.agregarVehiculo(placa, marca, modelo, horaEntrada, tipoServicio, estado, idUsuario);
    res.json(resultado);
}

// Controlador para eliminar un vehículo del sistema por su placa
async function eliminarVehiculo(req, res) {
    const { placa } = req.params;
    const resultado = await vehiculosModule.eliminarVehiculo(placa);
    res.json(resultado);
}

// Controlador para obtener todos los vehículos del sistema
async function obtenerVehiculos(req, res) {
    const resultado = await vehiculosModule.obtenerVehiculos();
    res.json(resultado);
}

// Exportar los controladores para que estén disponibles para otros archivos
module.exports = {
    agregarVehiculo,
    eliminarVehiculo,
    obtenerVehiculos
};
