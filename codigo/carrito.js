

// Funciones del carrito

function agregarAlCarritoConCantidad(id, cantidad) {
  const producto = productos.find(p => Number(p.id) === Number(id));
  if (!producto) {
    alert("Producto no encontrado");
    console.log("Intento de agregar producto que no existe:", id);
    return;
  }

  const existente = carrito.find(p => Number(p.id) === Number(id));
  if (existente) {
    existente.cantidad += cantidad;
    console.log(`Cantidad de "${producto.nombre}" aumentada a ${existente.cantidad}`);
    alert(`Cantidad de "${producto.nombre}" aumentada a ${existente.cantidad}`);
  } else {
    carrito.push({ ...producto, cantidad });
    console.log(`Producto "${producto.nombre}" agregado al carrito, cantidad: ${cantidad}`);
    alert(`Producto "${producto.nombre}" agregado al carrito, cantidad: ${cantidad}`);
  }

  guardarCarrito();
  mostrarCarrito();
}

function mostrarCarrito() {
  const container = document.getElementById("carrito-container");
  if (!container) return;

  let carritoActual = [];
  try {
    carritoActual = JSON.parse(localStorage.getItem("carrito")) || [];
  } catch {
    carritoActual = [];
  }

  container.innerHTML = "<h2>Carrito</h2>";

  if (carritoActual.length === 0) {
    container.innerHTML += "<p>El carrito está vacío.</p>";
    return;
  }

  carritoActual.forEach(p => {
    const div = document.createElement("div");
    div.classList.add("producto-carrito");
    div.innerHTML = `
      <img src="${p.imagen}" alt="${p.nombre}" width="80">
      <div>
        <p><strong>${p.nombre}</strong></p>
        <p>Precio: $${p.precio}</p>
        <p>Cantidad: ${p.cantidad}</p>
        <input type="number" min="1" value="${p.cantidad}" id="cantidad-${p.id}" style="width:50px">
        <button onclick="actualizarCantidad(${p.id})">Actualizar Cantidad</button>
        <button onclick="eliminarDelCarrito(${p.id})">Eliminar</button>
      </div>
    `;
    container.appendChild(div);
  });
}

function actualizarCantidad(id) {
  const input = document.getElementById(`cantidad-${id}`);
  let nuevaCantidad = parseInt(input.value);
  if (isNaN(nuevaCantidad) || nuevaCantidad < 1) nuevaCantidad = 1;

  const producto = carrito.find(p => Number(p.id) === id);
  if (producto) {
    producto.cantidad = nuevaCantidad;
    console.log(`Cantidad de "${producto.nombre}" actualizada a ${nuevaCantidad}`);
    alert(`Cantidad de "${producto.nombre}" actualizada a ${nuevaCantidad}`);
    guardarCarrito();
    mostrarCarrito();
  }
}

function eliminarDelCarrito(id) {
  const producto = carrito.find(p => Number(p.id) === id);
  carrito = carrito.filter(p => Number(p.id) !== id);
  guardarCarrito();
  mostrarCarrito();
  console.log(`Producto "${producto.nombre}" eliminado del carrito`);
  alert(`Producto "${producto.nombre}" eliminado del carrito`);
}


// Funciones de favoritos


// Cargar productos desde JSON

let productos = [];

function cargarProductosDesdeJSON() {
  fetch("data/data.json")
    .then(response => response.json())
    .then(data => {
      productos = data;
      cargarProductos();
    })
    .catch(error => console.error("Error al cargar productos:", error));
}

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
      <input type="number" id="cantidad-${producto.id}" min="1" value="1" style="width:50px">
      <button id="btn-agregar-${producto.id}">Agregar al carrito</button>
      <button id="btn-fav-${producto.id}" style="color:red; font-size:20px;">❤️</button>
    `;

    galeria.appendChild(div);

    document.getElementById(`btn-agregar-${producto.id}`).addEventListener("click", () => {
      const inputCantidad = document.getElementById(`cantidad-${producto.id}`);
      let cantidad = parseInt(inputCantidad.value);
      if (isNaN(cantidad) || cantidad < 1) cantidad = 1;

      agregarAlCarritoConCantidad(producto.id, cantidad);
    });

    document.getElementById(`btn-fav-${producto.id}`).addEventListener("click", () => {
      agregarAFavoritos(producto);
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  cargarProductosDesdeJSON();
  mostrarCarrito();
});
