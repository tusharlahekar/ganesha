const path = require('path');
const fs = require('fs');
const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 3000;
const DB_PATH = path.join(__dirname, 'data', 'ganesha.db');
const SCHEMA_PATH = path.join(__dirname, 'db', 'schema.sql');
const SEED_PATH = path.join(__dirname, 'db', 'seed.sql');

if (!fs.existsSync(path.dirname(DB_PATH))) {
  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
}

const db = new sqlite3.Database(DB_PATH);

const runSqlFile = (filePath) =>
  new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, sql) => {
      if (err) {
        reject(err);
        return;
      }
      db.exec(sql, (execErr) => {
        if (execErr) {
          reject(execErr);
          return;
        }
        resolve();
      });
    });
  });

const bootstrapDatabase = async () => {
  await runSqlFile(SCHEMA_PATH);
  await runSqlFile(SEED_PATH);
};

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/products', (req, res) => {
  const query = `
    SELECT products.*, categories.name AS category
    FROM products
    LEFT JOIN categories ON categories.id = products.category_id
    WHERE products.is_active = 1
    ORDER BY products.created_at DESC
  `;

  db.all(query, (err, rows) => {
    if (err) {
      res.status(500).json({ error: 'Unable to load products.' });
      return;
    }
    res.json(rows);
  });
});

app.get('/api/products/:id', (req, res) => {
  db.get(
    `SELECT products.*, categories.name AS category
     FROM products
     LEFT JOIN categories ON categories.id = products.category_id
     WHERE products.id = ?`,
    [req.params.id],
    (err, row) => {
      if (err) {
        res.status(500).json({ error: 'Unable to load product.' });
        return;
      }
      if (!row) {
        res.status(404).json({ error: 'Product not found.' });
        return;
      }
      res.json(row);
    }
  );
});

app.post('/api/orders', (req, res) => {
  const { customerName, customerEmail, items } = req.body;
  if (!customerName || !customerEmail || !Array.isArray(items) || items.length === 0) {
    res.status(400).json({ error: 'Missing order details.' });
    return;
  }

  const productIds = items.map((item) => item.productId);
  db.all(
    `SELECT id, price_cents FROM products WHERE id IN (${productIds.map(() => '?').join(',')})`,
    productIds,
    (err, products) => {
      if (err) {
        res.status(500).json({ error: 'Unable to create order.' });
        return;
      }
      const priceMap = new Map(products.map((p) => [p.id, p.price_cents]));
      const preparedItems = items.map((item) => {
        const price = priceMap.get(item.productId);
        return {
          ...item,
          price_cents: price,
          line_total_cents: price * item.quantity
        };
      });

      const total = preparedItems.reduce((sum, item) => sum + item.line_total_cents, 0);

      db.run(
        'INSERT INTO orders (customer_name, customer_email, total_cents) VALUES (?, ?, ?)',
        [customerName, customerEmail, total],
        function insertOrder(orderErr) {
          if (orderErr) {
            res.status(500).json({ error: 'Unable to create order.' });
            return;
          }
          const orderId = this.lastID;
          const stmt = db.prepare(
            'INSERT INTO order_items (order_id, product_id, quantity, line_total_cents) VALUES (?, ?, ?, ?)'
          );
          preparedItems.forEach((item) => {
            stmt.run(orderId, item.productId, item.quantity, item.line_total_cents);
          });
          stmt.finalize(() => {
            res.status(201).json({ id: orderId, total_cents: total });
          });
        }
      );
    }
  );
});

app.get('/api/admin/orders', (req, res) => {
  const query = `
    SELECT id, customer_name, customer_email, total_cents, status, created_at
    FROM orders
    ORDER BY created_at DESC
  `;
  db.all(query, (err, rows) => {
    if (err) {
      res.status(500).json({ error: 'Unable to load orders.' });
      return;
    }
    res.json(rows);
  });
});

app.get('/api/admin/products', (req, res) => {
  db.all('SELECT * FROM products ORDER BY created_at DESC', (err, rows) => {
    if (err) {
      res.status(500).json({ error: 'Unable to load products.' });
      return;
    }
    res.json(rows);
  });
});

app.post('/api/admin/products', (req, res) => {
  const { name, description, price_cents, image_url, category_id, is_active } = req.body;
  if (!name || !description || !price_cents) {
    res.status(400).json({ error: 'Missing product details.' });
    return;
  }
  db.run(
    `INSERT INTO products (name, description, price_cents, image_url, category_id, is_active)
     VALUES (?, ?, ?, ?, ?, ?)` ,
    [name, description, price_cents, image_url, category_id || null, is_active ? 1 : 0],
    function insertProduct(err) {
      if (err) {
        res.status(500).json({ error: 'Unable to create product.' });
        return;
      }
      res.status(201).json({ id: this.lastID });
    }
  );
});

app.patch('/api/admin/products/:id', (req, res) => {
  const { name, description, price_cents, image_url, category_id, is_active } = req.body;
  db.run(
    `UPDATE products
     SET name = COALESCE(?, name),
         description = COALESCE(?, description),
         price_cents = COALESCE(?, price_cents),
         image_url = COALESCE(?, image_url),
         category_id = COALESCE(?, category_id),
         is_active = COALESCE(?, is_active)
     WHERE id = ?`,
    [name, description, price_cents, image_url, category_id, is_active, req.params.id],
    function updateProduct(err) {
      if (err) {
        res.status(500).json({ error: 'Unable to update product.' });
        return;
      }
      res.json({ updated: this.changes });
    }
  );
});

app.delete('/api/admin/products/:id', (req, res) => {
  db.run('DELETE FROM products WHERE id = ?', [req.params.id], function deleteProduct(err) {
    if (err) {
      res.status(500).json({ error: 'Unable to delete product.' });
      return;
    }
    res.json({ deleted: this.changes });
  });
});

bootstrapDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Ganesha site running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to bootstrap database', err);
    process.exit(1);
  });
