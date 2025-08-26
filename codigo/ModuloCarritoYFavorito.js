
// VARIABLES GLOBALES

let carrito = [];
let favoritos = [];
let productos = []; 


// SINCRONIZAR CON LOCALSTORAGE

function syncCarrito() {
  try {
    carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  } catch {
    carrito = [];
  }
}

function syncFavoritos() {
  try {
    favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
  } catch {
    favoritos = [];
  }
}

function guardarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

function guardarFavoritos() {
  localStorage.setItem('favoritos', JSON.stringify(favoritos));
}


// CARGAR PRODUCTOS DESDE JSON

function cargarProductosDesdeJSON(callback) {
  fetch("data/data.json")
    .then(res => res.json())
    .then(data => {
      productos = data;
      if (callback) callback();
    })
    .catch(err => console.error("Error cargando productos:", err));
}

// FAVORITOS

function agregarAFavoritos(producto) {
  syncFavoritos();
  const existe = favoritos.find(p => Number(p.id) === Number(producto.id));
  if (existe) {
    alert(`"${producto.nombre}" ya está en favoritos ❤️`);
    return;
  }
  favoritos.push(producto);
  guardarFavoritos();
  alert(`"${producto.nombre}" agregado a favoritos ❤️`);
  mostrarFavoritos();
}

function eliminarDeFavoritos(id) {
  syncFavoritos();
  favoritos = favoritos.filter(p => Number(p.id) !== Number(id));
  guardarFavoritos();
  mostrarFavoritos();
}

function mostrarFavoritos() {
  syncFavoritos();
  const container = document.getElementById("favoritos-container");
  if (!container) return;

  // Limpiar container antes de renderizar
  container.innerHTML = "";

  if (favoritos.length === 0) {
    container.innerHTML += "<p>No hay productos en favoritos.</p>";
    return;
  }

  favoritos.forEach(p => {
    const div = document.createElement("div");
    div.classList.add("producto-favorito");
    div.innerHTML = `
      <img src="${p.imagen}" alt="${p.nombre}" width="80">
      <div>
        <p><strong>${p.nombre}</strong></p>
        <p>Precio: $${p.precio}</p>
        <input type="number" id="fav-cantidad-${p.id}" min="1" value="1" style="width:50px">
        <button onclick="agregarDesdeFavoritos(${p.id})">Agregar al carrito 🛒</button>
        <button onclick="eliminarDeFavoritos(${p.id})">Quitar ❌</button>
      </div>
    `;
    container.appendChild(div);
  });
}


// AGREGAR DESDE FAVORITOS AL CARRITO

function agregarDesdeFavoritos(id) {
  syncCarrito();
  syncFavoritos();

  const producto = favoritos.find(p => Number(p.id) === Number(id));
  if (!producto) return alert("Producto no encontrado en favoritos");

  const input = document.getElementById(`fav-cantidad-${id}`);
  let cantidad = parseInt(input.value);
  if (isNaN(cantidad) || cantidad < 1) cantidad = 1;

  const existente = carrito.find(p => Number(p.id) === Number(id));
  if (existente) {
    existente.cantidad += cantidad;
  } else {
    carrito.push({ ...producto, cantidad });
  }

  guardarCarrito();
  alert(`"${producto.nombre}" agregado al carrito (${cantidad} unidades)`);
}


// INICIALIZACIÓN

document.addEventListener("DOMContentLoaded", () => {
  syncFavoritos();
  syncCarrito();
  cargarProductosDesdeJSON(mostrarFavoritos);
});
