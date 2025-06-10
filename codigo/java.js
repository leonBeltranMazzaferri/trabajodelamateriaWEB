document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.getElementById("carrito-items");
    const cuentaSpan = document.getElementById("carrito-cuenta");
    const totalSpan = document.getElementById("carrito-total");
    const totalFinal = document.getElementById("total-final");
    const botonComprar = document.getElementById("boton-comprar");
  
    // Campos del formulario
    const formCompra = document.getElementById("form-compra");
    const inputNombre = document.getElementById("nombre");
    const inputApellido = document.getElementById("apellido");
    const inputDNI = document.getElementById("dni");
    const inputEmail = document.getElementById("email");
    const mensajeGracias = document.getElementById("mensaje-gracias");
  
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  
    function renderizarCarrito() {
      contenedor.innerHTML = "";
      let total = 0;
  
      if (carrito.length === 0) {
        contenedor.innerHTML = "<p>El carrito está vacío.</p>";
        botonComprar.style.display = "none";
        if (formCompra) formCompra.style.display = "none";
      } else {
        carrito.forEach((item, index) => {
          const div = document.createElement("div");
          div.className = "producto";
          div.innerHTML = `
            <p><strong>${item.name}</strong> - $${item.price.toFixed(2)}
              <button class="btn-eliminar" data-index="${index}">Eliminar</button>
            </p>
          `;
          contenedor.appendChild(div);
          total += item.price;
        });
  
        botonComprar.style.display = "inline-block";
        if (formCompra) formCompra.style.display = "block";
      }
  
      cuentaSpan.textContent = carrito.length;
      totalSpan.textContent = total.toFixed(2);
      totalFinal.textContent = total.toFixed(2);
  
      // Agregar event listener a botones eliminar
      document.querySelectorAll(".btn-eliminar").forEach(btn => {
        btn.addEventListener("click", () => {
          const index = parseInt(btn.getAttribute("data-index"));
          carrito.splice(index, 1);
          localStorage.setItem("carrito", JSON.stringify(carrito));
          renderizarCarrito();
          validarFormulario(); // actualizar estado botón comprar
        });
      });
    }
  
    // Validar que los campos obligatorios estén completos y carrito no vacío
    function validarFormulario() {
      if (!formCompra) return;
  
      const nombreValido = inputNombre.value.trim() !== "";
      const apellidoValido = inputApellido.value.trim() !== "";
      const dniValido = inputDNI.value.trim() !== "";
      const emailValido = inputEmail.value.trim() !== "";
  
      botonComprar.disabled = !(nombreValido && apellidoValido && dniValido && emailValido && carrito.length > 0);
    }
  
    // Escuchar cambios en inputs para validar
    if (formCompra) {
      [inputNombre, inputApellido, inputDNI, inputEmail].forEach(input => {
        input.addEventListener("input", validarFormulario);
      });
  
      // Evento submit del formulario
      formCompra.addEventListener("submit", (e) => {
        e.preventDefault();
  
        alert("¡Gracias por tu compra!");
        if (mensajeGracias) mensajeGracias.style.display = "block";
        formCompra.style.display = "none";
        contenedor.innerHTML = "";
        botonComprar.style.display = "none";
  
        localStorage.removeItem("carrito");
        carrito = [];
        cuentaSpan.textContent = 0;
        totalSpan.textContent = "0.00";
        totalFinal.textContent = "0.00";
      });
    }
  
    renderizarCarrito();
    validarFormulario();
  });