const express = require('express');
const { query } = require('../db');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const {
      userName,
      phone,
      address,
      murtiId,
      quantity,
      totalPrice,
      paymentMethod
    } = req.body;

    if (!userName || !phone || !address || !murtiId || !quantity || !totalPrice || !paymentMethod) {
      res.status(400).json({ error: 'Missing order details.' });
      return;
    }

    const result = await query(
      `INSERT INTO orders (user_name, phone, address, murti_id, quantity, total_price, payment_method)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [userName, phone, address, murtiId, quantity, totalPrice, paymentMethod]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create order.' });
  }
});

module.exports = router;
