require('dotenv').config();
const express = require('express');
const cors = require('cors');
const murtisRouter = require('./routes/murtis');
const ordersRouter = require('./routes/orders');
const adminRouter = require('./routes/admin');
const authRouter = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json({ limit: '2mb' }));

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/murtis', murtisRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/admin', adminRouter);
app.use('/api/auth', authRouter);

app.post('/api/payments/razorpay-order', (req, res) => {
  res.json({ orderId: 'rzp_order_placeholder', amount: req.body.amount || 0 });
});

app.get('/api/stock/stream', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const interval = setInterval(() => {
    const payload = {
      timestamp: new Date().toISOString(),
      updated: Math.floor(Math.random() * 20) + 1
    };
    res.write(`data: ${JSON.stringify(payload)}\n\n`);
  }, 8000);

  req.on('close', () => {
    clearInterval(interval);
  });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
