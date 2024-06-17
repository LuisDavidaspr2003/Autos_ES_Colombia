const vehiculosModule = require('../models/vehiculos');

// Controlador para agregar un nuevo vehículo al sistema
async function agregarVehiculo(req, res) {
    const { placa, marca, modelo, horaEntrada, tipoServicio, estado, idUsuario } = req.body;
    try {
        const resultado = await vehiculosModule.agregarVehiculo(placa, marca, modelo, horaEntrada, tipoServicio, estado, idUsuario);
        res.status(200).json(resultado);
    } catch (error) {
        console.error('Error al agregar vehículo:', error);
        res.status(500).json({ success: false, message: 'Error interno al agregar vehículo' });
    }
}

// Controlador para eliminar un vehículo del sistema por su placa
async function eliminarVehiculo(req, res) {
    const { placa } = req.params;
    try {
        const resultado = await vehiculosModule.eliminarVehiculo(placa);
        if (resultado.success) {
            res.status(200).json(resultado);
        } else {
            res.status(404).json(resultado); // Devuelve 404 si el vehículo no se encuentra
        }
    } catch (error) {
        console.error('Error al eliminar vehículo:', error);
        res.status(500).json({ success: false, message: 'Error interno al eliminar vehículo' });
    }
}

// Controlador para obtener todos los vehículos del sistema
async function obtenerVehiculos(req, res) {
    try {
        const resultado = await vehiculosModule.obtenerVehiculos();
        res.status(200).json(resultado);
    } catch (error) {
        console.error('Error al obtener vehículos:', error);
        res.status(500).json({ success: false, message: 'Error interno al obtener vehículos' });
    }
}

module.exports = {
    agregarVehiculo,
    eliminarVehiculo,
    obtenerVehiculos
};
