const express = require('express');
const router = express.Router();
const {
  getActividades,
  getActividadById,
  createActividad,
  updateActividad,
  deleteActividad
} = require('../controllers/actividades.controller');

// 🔍 Obtener todas las actividades
router.get('/', async (req, res) => {
  try {
    await getActividades(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener actividades' });
  }
});

// 🔍 Obtener una actividad por ID
router.get('/:id', async (req, res) => {
  try {
    await getActividadById(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener actividad por ID' });
  }
});

// 🆕 Crear una nueva actividad
router.post('/', async (req, res) => {
  try {
    await createActividad(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear actividad' });
  }
});

// ✏️ Actualizar actividad por ID
router.put('/:id', async (req, res) => {
  try {
    await updateActividad(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar actividad' });
  }
});

// 🗑 Eliminar actividad por ID
router.delete('/:id', async (req, res) => {
  try {
    await deleteActividad(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar actividad' });
  }
});

module.exports = router;
