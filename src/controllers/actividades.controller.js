const db = require('../models/database');

exports.getActividades = async (req, res) => {
  const [rows] = await db.query('SELECT * FROM actividadespoa');
  res.json(rows);
};

exports.getActividadById = async (req, res) => {
  const { id } = req.params;
  const [[row]] = await db.query('SELECT * FROM actividadespoa WHERE Id = ?', [id]);
  if (!row) return res.status(404).json({ error: 'Actividad no encontrada' });
  res.json(row);
};

exports.createActividad = async (req, res) => {
  const { descripcion, unidad, area, participantes, involucrados, trimestre } = req.body;
  if (!descripcion || !unidad || !area || !trimestre) {
    return res.status(400).json({ error: 'Campos obligatorios faltantes' });
  }
  await db.query(
    'INSERT INTO actividadespoa (DescripcionActividad, Unidad, Area, Participantes, Involucrados, Trimestre) VALUES (?, ?, ?, ?, ?, ?)',
    [descripcion, unidad, area, participantes, involucrados, trimestre]
  );
  res.json({ mensaje: 'Actividad registrada correctamente' });
};

exports.updateActividad = async (req, res) => {
  const { id } = req.params;
  const { descripcion, unidad, area, participantes, involucrados, trimestre } = req.body;
  await db.query(
    'UPDATE actividadespoa SET DescripcionActividad=?, Unidad=?, Area=?, Participantes=?, Involucrados=?, Trimestre=? WHERE Id=?',
    [descripcion, unidad, area, participantes, involucrados, trimestre, id]
  );
  res.json({ mensaje: 'Actividad actualizada correctamente' });
};

exports.deleteActividad = async (req, res) => {
  const { id } = req.params;
  await db.query('DELETE FROM actividadespoa WHERE Id = ?', [id]);
  res.json({ mensaje: 'Actividad eliminada correctamente' });
};

