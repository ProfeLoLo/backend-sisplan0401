const express = require('express');
const router = express.Router();
const db = require('../models/database');
const { exportarPDF, exportarWord } = require('../utils/exportar');

router.get('/pdf', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM actividadespoa');
  await exportarPDF(rows, res);
});

router.get('/word', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM actividadespoa');
  await exportarWord(rows, res);
});

module.exports = router;
