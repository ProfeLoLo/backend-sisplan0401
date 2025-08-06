const express = require('express');
const router = express.Router();
const { consultarPresupuesto, actualizarPresupuesto } = require('../controllers/presupuesto.controller');

router.get('/', consultarPresupuesto);           // Consulta general
router.put('/:id', actualizarPresupuesto);       // Actualizar monto ejecutado

module.exports = router;
