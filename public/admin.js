const ordersTableBody = document.querySelector('#ordersTable tbody');
const productsTableBody = document.querySelector('#productsTable tbody');
const addProductButton = document.getElementById('addProduct');
const productStatus = document.getElementById('productStatus');

const formatPrice = (cents) => `₹${(cents / 100).toFixed(2)}`;

const loadOrders = async () => {
  const response = await fetch('/api/admin/orders');
  const orders = await response.json();
  ordersTableBody.innerHTML = '';

  orders.forEach((order) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>#${order.id}</td>
      <td>${order.customer_name}<br /><span class="notice">${order.customer_email}</span></td>
      <td>${formatPrice(order.total_cents)}</td>
      <td>${order.status}</td>
    `;
    ordersTableBody.appendChild(row);
  });
};

const loadProducts = async () => {
  const response = await fetch('/api/admin/products');
  const products = await response.json();
  productsTableBody.innerHTML = '';

  products.forEach((product) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${product.name}</td>
      <td>${formatPrice(product.price_cents)}</td>
      <td>${product.is_active ? 'Active' : 'Hidden'}</td>
      <td><button data-id="${product.id}">Remove</button></td>
    `;
    row.querySelector('button').addEventListener('click', async () => {
      await fetch(`/api/admin/products/${product.id}`, { method: 'DELETE' });
      loadProducts();
    });
    productsTableBody.appendChild(row);
  });
};

addProductButton.addEventListener('click', async () => {
  productStatus.textContent = '';
  const payload = {
    name: document.getElementById('productName').value.trim(),
    description: document.getElementById('productDescription').value.trim(),
    price_cents: Number(document.getElementById('productPrice').value),
    image_url: document.getElementById('productImage').value.trim(),
    is_active: true
  };

  const response = await fetch('/api/admin/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    productStatus.textContent = 'Missing required product details.';
    return;
  }

  document.getElementById('productName').value = '';
  document.getElementById('productDescription').value = '';
  document.getElementById('productPrice').value = '';
  document.getElementById('productImage').value = '';
  productStatus.textContent = 'Product added!';
  loadProducts();
});

loadOrders();
loadProducts();
