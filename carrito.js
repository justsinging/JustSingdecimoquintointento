// Cart logic
document.addEventListener('DOMContentLoaded', () => {
  const cartBtn = document.getElementById('cart-btn');
  const cartModal = document.getElementById('cart-modal');
  const closeCart = document.getElementById('close-cart');
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  const cartCount = document.getElementById('cart-count');
  const clearCartBtn = document.getElementById('clear-cart');

  // Cart state
  let cart = [];

  // Load cart from localStorage
  function loadCart() {
    const stored = localStorage.getItem('cart');
    cart = stored ? JSON.parse(stored) : [];
  }

  // Save cart to localStorage
  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  // Update cart count and modal
  function updateCartUI() {
    // Update icon count
    cartCount.textContent = cart.reduce((sum, item) => sum + item.qty, 0);

    // Render modal
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<p>El carrito está vacío.</p>';
      cartTotal.textContent = '';
      clearCartBtn.disabled = true;
    } else {
      clearCartBtn.disabled = false;
      cartItemsContainer.innerHTML = '';
      cart.forEach(item => {
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
          <img src="${item.img}" alt="${item.nombre}">
          <div class="cart-item-title">${item.nombre}</div>
          <div class="cart-item-qty">${item.qty}</div>
          <div class="cart-item-precio">$${item.precio * item.qty}</div>
          <button class="cart-item-remove" data-id="${item.id}">&times;</button>
        `;
        cartItemsContainer.appendChild(div);
      });
      const total = cart.reduce((sum, item) => sum + item.precio * item.qty, 0);
      cartTotal.textContent = 'Total: $' + total;
    }
  }

  // Add product to cart
  function addToCart(product) {
    const idx = cart.findIndex(item => item.id === product.id);
    if (idx > -1) {
      cart[idx].qty += 1;
    } else {
      cart.push({...product, qty: 1});
    }
    saveCart();
    updateCartUI();
  }

  // Remove product from cart
  function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    updateCartUI();
  }

  // Clear cart
  clearCartBtn.addEventListener('click', () => {
    cart = [];
    saveCart();
    updateCartUI();
  });

  // Open cart modal
  cartBtn.addEventListener('click', (e) => {
    e.preventDefault();
    cartModal.style.display = 'flex';
    updateCartUI();
  });
// Cart logic
document.addEventListener('DOMContentLoaded', () => {
  // ...variables anteriores...
  const paymentMethod = document.getElementById('payment-method');
  const finishOrderBtn = document.getElementById('finish-order');

  // ...código previo...

  // Finalizar compra por WhatsApp
  finishOrderBtn.addEventListener('click', () => {
    if (cart.length === 0) {
      alert('El carrito está vacío');
      return;
    }
    // Número de WhatsApp (con código de país, sin signos, ejemplo: 5491133445566)
    const phone = '5491160424928'; // <-- CAMBIA ESTE NÚMERO POR EL TUYO

    // Construir mensaje
    let message = '*¡Hola! Quiero confirmar mi compra:*\n';
    cart.forEach(item => {
      message += `- ${item.nombre} x${item.qty} ($${item.precio * item.qty})\n`;
    });
    const total = cart.reduce((sum, item) => sum + item.precio * item.qty, 0);
    message += `Total: $${total}\n`;
    message += `Método de pago: ${paymentMethod.value}\n`;
    message += '\nMi nombre: \nMi dirección: \n';

    // Codifica el mensaje para URL
    const encodedMsg = encodeURIComponent(message);
    window.open(`https://wa.me/${phone}?text=${encodedMsg}`, '_blank');
  });

  // ...resto del código...
});
  // Close cart modal
  closeCart.addEventListener('click', () => {
    cartModal.style.display = 'none';
  });
  cartModal.addEventListener('click', (e) => {
    if (e.target === cartModal) cartModal.style.display = 'none';
  });

  // Delegate remove button
  cartItemsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('cart-item-remove')) {
      const id = e.target.getAttribute('data-id');
      removeFromCart(id);
    }
  });

  // Add to cart button
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', function() {
      const parent = this.closest('.producto');
      const product = {
        id: parent.getAttribute('data-id'),
        nombre: parent.getAttribute('data-nombre'),
        precio: Number(parent.getAttribute('data-precio')),
        img: parent.getAttribute('data-img')
      };
      addToCart(product);
    });
  });

  // On load
  loadCart();
  updateCartUI();
});
