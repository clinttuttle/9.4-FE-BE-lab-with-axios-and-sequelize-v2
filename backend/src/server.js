const { sequelize } = require('./db');
const employeesRouter = require('./routes/employees');


// const express = require('express');
// const cors = require('cors');

// const app = express();

// Allow multiple origins (localhost for dev, Azure for prod)
// const allowedOrigins = process.env.CORS_ORIGIN 
//   ? process.env.CORS_ORIGIN.split(',').map(o => o.trim())
//   : ['http://localhost:5173'];


// app.use(cors({ 
//   origin: (origin, callback) => {
//     // Allow requests with no origin (like mobile apps, curl, Postman)
//     if (!origin) return callback(null, true);
//     if (allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   }
// }));
// app.use(express.json());

// app.get('/healthz', (_req, res) => res.json({ ok: true }));

// app.use('/employees', employeesRouter);

// const port = process.env.PORT || 4000;

// (async () => {
//   try {
//     // For existing tables, do NOT force. In dev you can use { alter: true }.
//     await sequelize.authenticate();
//     // await sequelize.sync(); // optional in dev only
//     app.listen(port, () => console.log(`API listening on :${port}`));
//   } catch (err) {
//     console.error('Failed to start server:', err);
//     process.exit(1);
//   }
// })();

// server.js (or app setup file)
import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());

const allowedOrigins = [
  'https://green-hill-01033e010.3.azurestaticapps.net',
  // add dev origin if needed:
  'http://localhost:5173'
];

// If you don't use cookies (no credentials), this is simplest:
app.use(cors({
  origin: allowedOrigins,
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
  // credentials should be false if you are NOT using cookies
  credentials: false,
  maxAge: 600
}));

// For legacy preflight quirks (optional but safe):
app.options('*', cors());

// Your routes
app.get('/employees', (req, res) => { /* ... */ });

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`API on :${port}`));
``