// backend/src/models/tablaPOAcompleto.model.js
const db = require('../database');

exports.getTablaCompleta = async () => {
  const [rows] = await db.query('SELECT * FROM TablaPOAcompleto');
  return rows;
};
