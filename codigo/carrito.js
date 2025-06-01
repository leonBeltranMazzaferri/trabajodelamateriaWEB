const carrito = [];
const carritoItems = document.getElementById('carrito-items');
const totalCarrito = document.getElementById('total-carrito');
const carritoPanel = document.getElementById('carrito-panel');

function toggleCart() {
  carritoPanel.classList.toggle('visible');
}

function agregarAlCarrito(nombre, precio) {
  carrito.push({ nombre, precio });
  renderCarrito();
  if (!carritoPanel.classList.contains('visible')) {
    carritoPanel.classList.add('visible');
  }
}

function renderCarrito() {
  carritoItems.innerHTML = '';
  let total = 0;

  carrito.forEach((producto, index) => {
    total += producto.precio;
    const li = document.createElement('li');
    li.innerHTML = `
      ${producto.nombre} - $${producto.precio.toFixed(2)}
      <button onclick="eliminarDelCarrito(${index})" style="color:red; background:none; border:none; cursor:pointer;">✖</button>
    `;
    carritoItems.appendChild(li);
  });

  totalCarrito.textContent = total.toFixed(2);
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  renderCarrito();
}

function vaciarCarrito() {
  carrito.length = 0;
  renderCarrito();
}
