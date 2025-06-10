document.addEventListener("DOMContentLoaded", actualizarCarritoVisual);

function agregarAlCarrito(nombre, precio) {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  carrito.push({ name: nombre, price: precio });
  localStorage.setItem('carrito', JSON.stringify(carrito));

  alert(`${nombre} fue agregado al carrito.`);
  actualizarCarritoVisual();
}

function actualizarCarritoVisual() {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  let cuenta = carrito.length;
  let total = carrito.reduce((suma, item) => suma + item.price, 0);

  document.getElementById('carrito-cuenta').textContent = cuenta;
  document.getElementById('carrito-total').textContent = total.toFixed(2);
}
