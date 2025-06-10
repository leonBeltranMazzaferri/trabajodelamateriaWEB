document.addEventListener("DOMContentLoaded", function () {
  const botonEliminar = document.querySelector(".eliminar-item");
  const carritoItems = document.getElementById("carrito-items");
  const totalFinal = document.getElementById("total-final");
  const carritoCuenta = document.getElementById("carrito-cuenta");

  botonEliminar.addEventListener("click", function () {
    carritoItems.innerHTML = ""; // Elimina el producto del carrito
    totalFinal.innerText = "0.00"; // Resetea el total
    carritoCuenta.innerText = "0"; // Resetea la cantidad de productos
  });
});