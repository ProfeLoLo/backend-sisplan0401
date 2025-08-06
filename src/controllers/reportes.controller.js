// backend/src/controllers/reportes.controller.js
const PDFDocument = require('pdfkit');
const fs = require('fs');

exports.exportarPDF = async (req, res) => {
  const doc = new PDFDocument();
  const filePath = './reportes/reporte.pdf';
  doc.pipe(fs.createWriteStream(filePath));
  doc.text('Reporte de Actividades POA');
  doc.end();
  res.download(filePath);
};

exports.exportarWord = async (req, res) => {
  const filePath = './reportes/reporte.docx';
  fs.writeFileSync(filePath, 'Reporte de Actividades POA');
  res.download(filePath);
};
