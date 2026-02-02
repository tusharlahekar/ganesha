const productGrid = document.getElementById('productGrid');
const productSelect = document.getElementById('productSelect');
const orderButton = document.getElementById('orderButton');
const orderStatus = document.getElementById('orderStatus');

const formatPrice = (cents) => `₹${(cents / 100).toFixed(2)}`;

const renderProducts = (products) => {
  productGrid.innerHTML = '';
  productSelect.innerHTML = '';

  products.forEach((product) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${product.image_url || 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80'}" alt="${product.name}" />
      <div class="card-content">
        <span class="badge">${product.category || 'Collection'}</span>
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <div class="price">${formatPrice(product.price_cents)}</div>
      </div>
    `;
    productGrid.appendChild(card);

    const option = document.createElement('option');
    option.value = product.id;
    option.textContent = `${product.name} · ${formatPrice(product.price_cents)}`;
    productSelect.appendChild(option);
  });
};

const loadProducts = async () => {
  const response = await fetch('/api/products');
  const products = await response.json();
  renderProducts(products);
};

orderButton.addEventListener('click', async () => {
  orderStatus.textContent = '';
  const payload = {
    customerName: document.getElementById('customerName').value.trim(),
    customerEmail: document.getElementById('customerEmail').value.trim(),
    items: [
      {
        productId: Number(productSelect.value),
        quantity: Number(document.getElementById('quantity').value) || 1
      }
    ]
  };

  const response = await fetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    orderStatus.textContent = 'Please fill in your details so we can contact you.';
    return;
  }

  const data = await response.json();
  orderStatus.textContent = `Order received! Your reference is #${data.id}.`;
});

loadProducts();
