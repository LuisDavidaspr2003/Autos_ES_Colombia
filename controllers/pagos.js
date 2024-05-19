const pagosModule = require('../models/pagos'); // Importar el módulo de gestión de pagos

// Controlador para procesar el pago de un usuario
async function procesarPago(req, res) {
    const { id_usuario, id_vehiculo, monto_pagado, metodo_pago } = req.body;
    const resultado = await pagosModule.procesarPago(id_usuario, id_vehiculo, monto_pagado, metodo_pago);
    res.json(resultado);
}

// Exportar los controladores para que estén disponibles para otros archivos
module.exports = {
    procesarPago
};
