const express = require('express');
const Employee = require('../models/Employee');

const router = express.Router();

// GET /employees - list all employees
router.get('/api', async (_req, res) => {
  try {
    const employees = await Employee.findAll({ order: [['employee_id', 'ASC']] });
    res.json(employees);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error listing employees' });
  }
});

// POST /employees - add a new employee
router.post('/api', async (req, res) => {
  try {
    const { first_name, last_name, email, birthdate, salary } = req.body;
    const newEmp = await Employee.create({
      first_name,
      last_name,
      email,
      birthdate: birthdate || null,
      salary: salary !== undefined && salary !== '' ? Number(salary) : null,
    });
    res.status(201).json(newEmp);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error creating employee' });
  }
});

module.exports = router;