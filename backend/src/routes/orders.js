const express = require('express');
const { query } = require('../db');

const router = express.Router();
const demoOrders = [];

const isUuid = (value) => {
  if (typeof value !== 'string') return false;
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
};

const buildWhatsAppUrl = (order, phone) => {
  const orderDate = new Date(order.created_at).toLocaleString('en-IN');
  const text = [
    'New Order Enquiry',
    `Order ID: ${order.id}`,
    `Customer: ${order.user_name}`,
    `Phone: ${order.phone}`,
    `Address: ${order.address}`,
    `Quantity: ${order.quantity}`,
    `Total: INR ${order.total_price}`,
    `Payment: ${order.payment_method}`,
    `Placed: ${orderDate}`
  ].join('\n');
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
};

const createDemoOrder = ({
  userName,
  phone,
  address,
  murtiId,
  quantity,
  totalPrice,
  paymentMethod
}) => {
  const id = `demo-${Date.now()}`;
  const order = {
    id,
    user_name: userName,
    phone,
    address,
    murti_id: isUuid(murtiId) ? murtiId : null,
    quantity: Number(quantity),
    total_price: Number(totalPrice),
    payment_method: paymentMethod,
    order_status: 'pending',
    created_at: new Date().toISOString(),
    source: 'demo'
  };
  demoOrders.unshift(order);
  return order;
};

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

    if (!userName || !phone || !address || !quantity || !totalPrice || !paymentMethod) {
      res.status(400).json({ error: 'Missing order details.' });
      return;
    }

    let orderRecord;
    try {
      const result = await query(
        `INSERT INTO orders (user_name, phone, address, murti_id, quantity, total_price, payment_method)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         RETURNING *`,
        [
          userName,
          phone,
          address,
          isUuid(murtiId) ? murtiId : null,
          quantity,
          totalPrice,
          paymentMethod
        ]
      );
      orderRecord = result.rows[0];
    } catch (databaseError) {
      orderRecord = createDemoOrder({
        userName,
        phone,
        address,
        murtiId,
        quantity,
        totalPrice,
        paymentMethod
      });
    }

    const storePhone = (process.env.STORE_WHATSAPP_NUMBER || '').replace(/\D/g, '');
    const whatsappUrl = buildWhatsAppUrl(orderRecord, storePhone);
    res.status(201).json({ order: orderRecord, whatsappUrl });
  } catch (error) {
    res.status(500).json({ error: 'Unable to create order.' });
  }
});

module.exports = router;
