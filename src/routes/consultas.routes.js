const express = require('express');
const router = express.Router();
const db = require('../models/database');

router.get('/cantidad', async (req, res) => {
  const { unidad, trimestre, area } = req.query;
  const [rows] = await db.query(
    `SELECT COUNT(*) AS cantidad FROM actividadespoa WHERE Unidad = ? AND Trimestre = ? AND Area = ?`,
    [unidad, trimestre, area]
  );
  res.json(rows[0]);
});

module.exports = router;
