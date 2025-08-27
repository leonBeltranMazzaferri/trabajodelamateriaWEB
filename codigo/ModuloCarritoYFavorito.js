

let carrito = [];
let favoritos = [];

try {
  carrito = JSON.parse(localStorage.getItem('carrito')) || [];
} catch {
  carrito = [];
  localStorage.removeItem('carrito');
}

try {
  favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
} catch {
  favoritos = [];
  localStorage.removeItem('favoritos');
}

function guardarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

function guardarFavoritos() {
  localStorage.setItem('favoritos', JSON.stringify(favoritos));
}

function actualizarCantidad(id) {
  const input = document.getElementById(`cantidad-${id}`);
  let nuevaCantidad = parseInt(input.value);
  if (isNaN(nuevaCantidad) || nuevaCantidad < 1) nuevaCantidad = 1;

  const producto = carrito.find(p => Number(p.id) === Number(id));
  if (producto) {
    producto.cantidad = nuevaCantidad;
    guardarCarrito();
    mostrarCarrito();
  }
}

function mostrarCarrito() {
  const container = document.getElementById("carrito-container");
  container.innerHTML = "<h2>Carrito</h2>";

  if (carrito.length === 0) {
    container.innerHTML += "<p>El carrito está vacío.</p>";
    return;
  }

  carrito.forEach(p => {
   
  });
}

