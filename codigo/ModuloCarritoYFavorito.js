
// Manejo de carrito y favoritos

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

