const PDFDocument = require('pdfkit');
const fs = require('fs');
const docx = require('docx');
const { Document, Packer, Paragraph, Table, TableRow, TableCell, TextRun } = docx;

exports.exportarPDF = async (data, res) => {
  const doc = new PDFDocument();
  res.setHeader('Content-Type', 'application/pdf');
  doc.pipe(res);

  doc.fontSize(16).text('REPORTE DE ACTIVIDADES', { align: 'center' });

  data.forEach(act => {
    doc.moveDown().fontSize(12).text(`${act.DescripcionActividad} - ${act.Unidad} - ${act.Area} - ${act.Trimestre}`);
  });

  doc.end();
};

exports.exportarWord = async (data, res) => {
  const doc = new Document();
  const rows = [
    new TableRow({
      children: ['Actividad', 'Unidad', 'Área', 'Trimestre'].map(text => new TableCell({ children: [new Paragraph(text)] }))
    }),
    ...data.map(act => new TableRow({
      children: [
        new TableCell({ children: [new Paragraph(act.DescripcionActividad || '')] }),
        new TableCell({ children: [new Paragraph(act.Unidad || '')] }),
        new TableCell({ children: [new Paragraph(act.Area || '')] }),
        new TableCell({ children: [new Paragraph(act.Trimestre || '')] })
      ]
    }))
  ];

  doc.addSection({ children: [new Paragraph('REPORTE DE ACTIVIDADES'), new Table({ rows })] });
  const buffer = await Packer.toBuffer(doc);

  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
  res.setHeader('Content-Disposition', 'attachment; filename=actividades.docx');
  res.send(buffer);
};
