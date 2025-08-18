
let carrito = [];
try {
  carrito = JSON.parse(localStorage.getItem('carrito')) || [];
} catch (e) {
  carrito = [];
  localStorage.removeItem('carrito');
}


function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);

  if (!producto) {
    console.log('Producto no encontrado');
    alert('Producto no encontrado');
    return;
  }

  const productoExistente = carrito.find(p => p.id === id);
  if (productoExistente) {
    console.log(`Este producto "${producto.nombre}" ya ha sido agregado al carrito.`);
    alert(`Este producto "${producto.nombre}" ya ha sido agregado`);
    return;
  }

  carrito.push(producto);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  console.log('Producto agregado al carrito:', producto);
  alert(`Producto "${producto.nombre}" agregado al carrito`);
  mostrarCarrito();
}


function mostrarCarrito() {
  const carritoContainer = document.getElementById('carrito-container');
  if (!carritoContainer) return;


  let carritoActual = [];
  try {
    carritoActual = JSON.parse(localStorage.getItem('carrito')) || [];
  } catch (e) {
    carritoActual = [];
  }

  carritoContainer.innerHTML = '';

  if (carritoActual.length === 0) {
    carritoContainer.innerHTML = '<p>El carrito está vacío.</p>';
    return;
  }

  carritoActual.forEach(producto => {
    const div = document.createElement('div');
    div.classList.add('producto-carrito');
    div.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}" width="80">
      <p>${producto.nombre}</p>
      <p>$${producto.precio}</p>
    `;
    carritoContainer.appendChild(div);
  });
}

function cargarProductos() {
  const galeria = document.getElementById('galeria');
  if (!galeria) return;

  galeria.innerHTML = '';

  productos.forEach(producto => {
    const div = document.createElement('div');
    div.classList.add('item');
    div.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}" tabindex="0"/>
      <h2>${producto.nombre}</h2>
      <h3>${producto.descripcion}</h3>
      <p>$${producto.precio}</p>
      <button onclick="agregarAlCarrito(${producto.id})">Agregar</button>
    `;
    galeria.appendChild(div);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  cargarProductos();
  mostrarCarrito();
});
