const express = require('express');
const cors = require('cors');
const { sequelize } = require('./db');
const employeesRouter = require('./routes/employees');

const app = express();

const allowedOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173';
app.use(cors({ origin: allowedOrigin }));
app.use(express.json());

app.get('/healthz', (_req, res) => res.json({ ok: true }));

app.use('/employees', employeesRouter);

const port = process.env.PORT || 4000;

(async () => {
  try {
    // For existing tables, do NOT force. In dev you can use { alter: true }.
    await sequelize.authenticate();
    // await sequelize.sync(); // optional in dev only
    app.listen(port, () => console.log(`API listening on :${port}`));
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
})();