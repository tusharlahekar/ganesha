const express = require('express');
const multer = require('multer');
const { query } = require('../db');
const { authenticate } = require('../middleware/auth');

const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

router.use(authenticate);

router.get('/orders', async (req, res) => {
  try {
    const { rows } = await query('SELECT * FROM orders ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Unable to load orders.' });
  }
});

router.get('/murtis', async (req, res) => {
  try {
    const { rows } = await query('SELECT * FROM murtis ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Unable to load murtis.' });
  }
});

router.post('/murtis', async (req, res) => {
  try {
    const {
      name,
      price,
      height,
      weight,
      material,
      category,
      color,
      description,
      imageUrls,
      stockQuantity,
      isEcoFriendly
    } = req.body;

    if (!name || !price || !height || !weight || !material || !category || !color || !description || !imageUrls) {
      res.status(400).json({ error: 'Missing murti details.' });
      return;
    }

    const result = await query(
      `INSERT INTO murtis
        (name, price, height, weight, material, category, color, description, image_urls, stock_quantity, is_eco_friendly)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       RETURNING *`,
      [name, price, height, weight, material, category, color, description, imageUrls, stockQuantity || 0, !!isEcoFriendly]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create murti.' });
  }
});

router.patch('/murtis/:id', async (req, res) => {
  try {
    const fields = [
      'name',
      'price',
      'height',
      'weight',
      'material',
      'category',
      'color',
      'description',
      'image_urls',
      'stock_quantity',
      'is_eco_friendly'
    ];

    const updates = [];
    const values = [];

    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        values.push(req.body[field]);
        updates.push(`${field} = $${values.length}`);
      }
    });

    if (!updates.length) {
      res.status(400).json({ error: 'No updates provided.' });
      return;
    }

    values.push(req.params.id);

    const result = await query(
      `UPDATE murtis SET ${updates.join(', ')} WHERE id = $${values.length} RETURNING *`,
      values
    );

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Unable to update murti.' });
  }
});

router.delete('/murtis/:id', async (req, res) => {
  try {
    await query('DELETE FROM murtis WHERE id = $1', [req.params.id]);
    res.json({ deleted: true });
  } catch (error) {
    res.status(500).json({ error: 'Unable to delete murti.' });
  }
});

router.post('/murtis/bulk-csv', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'CSV file is required.' });
      return;
    }

    const content = req.file.buffer.toString('utf-8');
    const rows = content.trim().split('\n');
    const inserts = rows.slice(1).map((line) => line.split(','));

    for (const row of inserts) {
      const [name, price, height, weight, material, category, color, description, imageUrls, stockQuantity, isEcoFriendly] = row;
      await query(
        `INSERT INTO murtis
          (name, price, height, weight, material, category, color, description, image_urls, stock_quantity, is_eco_friendly)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
        [
          name,
          Number(price),
          Number(height),
          Number(weight),
          material,
          category,
          color,
          description,
          imageUrls.split('|'),
          Number(stockQuantity),
          isEcoFriendly === 'true'
        ]
      );
    }

    res.json({ inserted: inserts.length });
  } catch (error) {
    res.status(500).json({ error: 'Unable to process CSV.' });
  }
});

router.post('/uploads', upload.array('images', 50), async (req, res) => {
  const files = req.files || [];
  const urls = files.map((file, index) => ({
    name: file.originalname,
    url: `https://cdn.example.com/uploads/${Date.now()}-${index}-${file.originalname}`
  }));
  res.json({ uploaded: urls });
});

router.get('/analytics', async (req, res) => {
  try {
    const totalOrders = await query('SELECT COUNT(*) FROM orders');
    const totalRevenue = await query('SELECT COALESCE(SUM(total_price), 0) AS revenue FROM orders');
    const lowStock = await query('SELECT COUNT(*) FROM murtis WHERE stock_quantity < 5');

    res.json({
      totalOrders: Number(totalOrders.rows[0].count),
      totalRevenue: Number(totalRevenue.rows[0].revenue),
      lowStock: Number(lowStock.rows[0].count)
    });
  } catch (error) {
    res.status(500).json({ error: 'Unable to load analytics.' });
  }
});

module.exports = router;
