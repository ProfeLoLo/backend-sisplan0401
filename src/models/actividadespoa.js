const db = require('./db');

const ActividadesPOA = {
  // 🔍 Obtener todas las actividades
  obtenerTodos: async () => {
    const [rows] = await db.query('SELECT * FROM actividadespoa');
    return rows;
  },

  // 🔍 Obtener una actividad por ID
  obtenerPorId: async (id) => {
    const [[row]] = await db.query('SELECT * FROM actividadespoa WHERE Id = ?', [id]);
    return row || null;
  },

  // 🆕 Crear una nueva actividad
  crear: async (actividad) => {
    const { descripcion, unidad, area, participantes, involucrados, trimestre } = actividad;

    // Validación básica
    if (!descripcion || !unidad || !area || !trimestre) {
      throw new Error('Campos obligatorios faltantes');
    }

    const query = `
      INSERT INTO actividadespoa 
      (DescripcionActividad, Unidad, Area, Participantes, Involucrados, Trimestre)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const valores = [descripcion, unidad, area, participantes || 0, involucrados || 0, trimestre];
    await db.query(query, valores);
  },

  // 🗑 Eliminar actividad por ID
  eliminarPorId: async (id) => {
    const resultado = await db.query('DELETE FROM actividadespoa WHERE Id = ?', [id]);
    return resultado[0].affectedRows > 0;
  },

  // ✏️ Actualizar actividad por ID
  actualizarPorId: async (id, datos) => {
    const { descripcion, unidad, area, participantes, involucrados, trimestre } = datos;

    const query = `
      UPDATE actividadespoa 
      SET DescripcionActividad=?, Unidad=?, Area=?, Participantes=?, Involucrados=?, Trimestre=? 
      WHERE Id=?
    `;
    const valores = [descripcion, unidad, area, participantes, involucrados, trimestre, id];
    const resultado = await db.query(query, valores);
    return resultado[0].affectedRows > 0;
  },

  // 🔍 Buscar por texto en descripción
  buscarPorDescripcion: async (texto) => {
    const [rows] = await db.query(
      'SELECT * FROM actividadespoa WHERE DescripcionActividad LIKE ?',
      [`%${texto}%`]
    );
    return rows;
  }
};

module.exports = ActividadesPOA;
