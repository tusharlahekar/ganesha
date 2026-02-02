const express = require('express');
const jwt = require('jsonwebtoken');
const { query } = require('../db');

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ error: 'Missing credentials.' });
      return;
    }

    const result = await query('SELECT * FROM admin_users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user || password !== process.env.ADMIN_PASSWORD) {
      res.status(401).json({ error: 'Invalid credentials.' });
      return;
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '8h'
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Unable to sign in.' });
  }
});

module.exports = router;
