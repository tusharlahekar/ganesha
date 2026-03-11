const express = require('express');
const { query } = require('../db');

const router = express.Router();

const buildFilters = (params) => {
  const clauses = [];
  const values = [];

  if (params.material) {
    values.push(params.material);
    clauses.push(`material = $${values.length}`);
  }

  if (params.category) {
    values.push(params.category);
    clauses.push(`category = $${values.length}`);
  }

  if (params.color) {
    values.push(params.color);
    clauses.push(`color = $${values.length}`);
  }

  if (params.price_min) {
    values.push(Number(params.price_min));
    clauses.push(`price >= $${values.length}`);
  }

  if (params.price_max) {
    values.push(Number(params.price_max));
    clauses.push(`price <= $${values.length}`);
  }

  if (params.height_min) {
    values.push(Number(params.height_min));
    clauses.push(`height >= $${values.length}`);
  }

  if (params.height_max) {
    values.push(Number(params.height_max));
    clauses.push(`height <= $${values.length}`);
  }

  if (params.available === 'true') {
    clauses.push('stock_quantity > 0');
  }

  return { clauses, values };
};

router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 24, sort = 'popularity' } = req.query;
    const { clauses, values } = buildFilters(req.query);

    const offset = (Number(page) - 1) * Number(limit);
    const orderByMap = {
      popularity: 'stock_quantity DESC',
      price: 'price ASC',
      newest: 'created_at DESC'
    };
    const orderBy = orderByMap[sort] || orderByMap.popularity;

    const whereClause = clauses.length ? `WHERE ${clauses.join(' AND ')}` : '';

    const { rows } = await query(
      `SELECT * FROM murtis ${whereClause} ORDER BY ${orderBy} LIMIT $${values.length + 1} OFFSET $${values.length + 2}`,
      [...values, Number(limit), offset]
    );

    const countResult = await query(
      `SELECT COUNT(*) FROM murtis ${whereClause}`,
      values
    );

    res.json({
      data: rows,
      meta: {
        total: Number(countResult.rows[0].count),
        page: Number(page),
        limit: Number(limit)
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Unable to load murtis.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const result = await query('SELECT * FROM murtis WHERE id = $1', [req.params.id]);
    if (!result.rows[0]) {
      res.status(404).json({ error: 'Murti not found.' });
      return;
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Unable to load murti.' });
  }
});

router.get('/:id/recommendations', async (req, res) => {
  try {
    const result = await query(
      `SELECT * FROM murtis
       WHERE id <> $1
       ORDER BY RANDOM()
       LIMIT 6`,
      [req.params.id]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Unable to load recommendations.' });
  }
});

module.exports = router;
