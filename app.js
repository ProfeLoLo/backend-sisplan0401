// backend/app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta raíz para evitar "Cannot GET /"
app.get('/', (req, res) => {
  res.send('🚀 API de SisPlan0401WEB funcionando correctamente');
});

// Rutas
const actividadesRoutes = require('./src/routes/actividades.routes');
const presupuestoRoutes = require('./src/routes/presupuesto.routes');
const reportesRoutes = require('./src/routes/reportes.routes');
const consultasRoutes = require('./src/routes/consultas.routes');

app.use('/api/actividadespoa', actividadesRoutes);
app.use('/api/presupuesto', presupuestoRoutes);
app.use('/api/reportes', reportesRoutes);
app.use('/api/consultas', consultasRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor backend iniciado en puerto ${PORT}`);
});
