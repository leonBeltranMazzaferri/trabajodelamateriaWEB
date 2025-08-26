
// VARIABLES GLOBALES

let productos = [];
let carrito = [];
let favoritos = [];


// SINCRONIZAR CON LOCALSTORAGE

function syncCarrito() {
  try {
    carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  } catch {
    carrito = [];
  }
}

function syncFavoritos() {
  try {
    favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
  } catch {
    favoritos = [];
  }
}

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function guardarFavoritos() {
  localStorage.setItem("favoritos", JSON.stringify(favoritos));
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


// CARRITO

function agregarAlCarritoConCantidad(id, cantidad) {
  syncCarrito();

  const producto = productos.find(p => Number(p.id) === Number(id));
  if (!producto) return alert("Producto no encontrado");

  const existente = carrito.find(p => Number(p.id) === Number(id));
  if (existente) {
    existente.cantidad += cantidad;
    alert(`Cantidad de "${producto.nombre}" aumentada a ${existente.cantidad}`);
  } else {
    carrito.push({ ...producto, cantidad });
    alert(`Producto "${producto.nombre}" agregado al carrito, cantidad: ${cantidad}`);
  }

  guardarCarrito();
  mostrarCarrito();
}

function mostrarCarrito() {
  const container = document.getElementById("carrito-container");
  if (!container) return;

  syncCarrito();
  container.innerHTML = "<h2>Carrito</h2>";

  if (carrito.length === 0) {
    container.innerHTML += "<p>El carrito está vacío.</p>";
    return;
  }

  let totalGeneral = 0;

  carrito.forEach(p => {
    const subtotal = Number(p.precio) * Number(p.cantidad);
    totalGeneral += subtotal;

    const div = document.createElement("div");
    div.classList.add("producto-carrito");
    div.innerHTML = `
      <img src="${p.imagen}" alt="${p.nombre}" width="80">
      <div>
        <p><strong>${p.nombre}</strong></p>
        <p>Precio unitario: $${p.precio}</p>
        <p>
          Cantidad: 
          <input type="number" min="1" value="${p.cantidad}" id="cart-cantidad-${p.id}" style="width:60px">
          <button onclick="actualizarCantidad(${p.id})">Actualizar</button>
        </p>
        <p>Subtotal: $${subtotal}</p>
        <button onclick="eliminarDelCarrito(${p.id})">Eliminar</button>
      </div>
    `;
    container.appendChild(div);
  });

  const totalDiv = document.createElement("div");
  totalDiv.style.marginTop = "20px";
  totalDiv.style.fontWeight = "bold";
  totalDiv.innerHTML = `Total general: $${totalGeneral}`;
  container.appendChild(totalDiv);
}

function actualizarCantidad(id) {
  const input = document.getElementById(`cart-cantidad-${id}`);
  let nuevaCantidad = parseInt(input?.value, 10);
  if (isNaN(nuevaCantidad) || nuevaCantidad < 1) nuevaCantidad = 1;

  syncCarrito();
  const producto = carrito.find(p => Number(p.id) === Number(id));
  if (producto) {
    producto.cantidad = nuevaCantidad;
    guardarCarrito();
    mostrarCarrito();
  }
}

function eliminarDelCarrito(id) {
  syncCarrito();
  carrito = carrito.filter(p => Number(p.id) !== Number(id));
  guardarCarrito();
  mostrarCarrito();
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
  const container = document.getElementById("favoritos-container");
  if (!container) return;

  syncFavoritos();
  container.innerHTML = "<h2>Favoritos</h2>";

  if (favoritos.length === 0) {
    container.innerHTML += "<p>No tienes productos en favoritos.</p>";
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
  let cantidad = parseInt(input?.value, 10);
  if (isNaN(cantidad) || cantidad < 1) cantidad = 1;

  const existente = carrito.find(p => Number(p.id) === Number(id));
  if (existente) {
    existente.cantidad += cantidad;
  } else {
    carrito.push({ ...producto, cantidad });
  }

  guardarCarrito();
  alert(`"${producto.nombre}" agregado al carrito (${cantidad} unidades)`);
  mostrarCarrito();
}


//GALERÍA DE PRODUCTOS

function cargarProductos() {
  const galeria = document.getElementById("galeria");
  if (!galeria) return;

  galeria.innerHTML = "";

  productos.forEach(producto => {
    const div = document.createElement("div");
    div.classList.add("item");

    div.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}" tabindex="0"/>
      <h2>${producto.nombre}</h2>
      <h3>${producto.descripcion}</h3>
      <p><strong>$${producto.precio}</strong></p>
      <input type="number" id="gal-cantidad-${producto.id}" min="1" value="1" style="width:60px">
      <button id="btn-agregar-${producto.id}">Agregar al carrito</button>
      <button id="btn-fav-${producto.id}" style="color:red; font-size:20px;">❤️</button>
    `;

    galeria.appendChild(div);

    document.getElementById(`btn-agregar-${producto.id}`).addEventListener("click", () => {
      let cantidad = parseInt(document.getElementById(`gal-cantidad-${producto.id}`).value, 10);
      if (isNaN(cantidad) || cantidad < 1) cantidad = 1;
      agregarAlCarritoConCantidad(producto.id, cantidad);
    });

    document.getElementById(`btn-fav-${producto.id}`).addEventListener("click", () => {
      agregarAFavoritos(producto);
    });
  });
}

// INICIALIZACIÓN

document.addEventListener("DOMContentLoaded", () => {
  syncCarrito();
  syncFavoritos();
  cargarProductosDesdeJSON(cargarProductos);
  mostrarCarrito();
  mostrarFavoritos();
});
