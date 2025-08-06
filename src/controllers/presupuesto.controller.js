const db = require('../models/database');

exports.consultarPresupuesto = async (req, res) => {
  const [rows] = await db.query('SELECT * FROM TablaPOAcompleto');
  res.json(rows);
};

exports.actualizarPresupuesto = async (req, res) => {
  const { id } = req.params;
  const { montoUsado } = req.body;

  const [[registro]] = await db.query('SELECT MontoEjecutado, MontoRestante FROM TablaPOAcompleto WHERE Id = ?', [id]);

  if (!registro) return res.status(404).json({ error: 'Registro no encontrado' });
  if (montoUsado > registro.MontoRestante) return res.status(400).json({ error: 'Monto excede lo disponible' });

  const nuevoEjecutado = registro.MontoEjecutado + montoUsado;
  const nuevoRestante = registro.MontoRestante - montoUsado;

  await db.query('UPDATE TablaPOAcompleto SET MontoEjecutado = ?, MontoRestante = ? WHERE Id = ?', [nuevoEjecutado, nuevoRestante, id]);
  res.json({ mensaje: 'Presupuesto actualizado' });
};
