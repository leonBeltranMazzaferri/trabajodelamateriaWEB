document.querySelector('#header').innerHTML = `
  <div class="header-left">
    <button id="searchBtn">
      <img src="images/search-alt.png" alt="lupa">
    </button>

    <a href="index.html">
      <button id="user">
        <img src="images/medal-star.png" alt="user">
      </button>
    </a>

    <a href="carrito.html">
      <button id="cartBtn">
        <img src="images/cart.png" alt="carrito">
      </button>
    </a>

    <a href="favoritos.html">
      <button id="cartBtn">
        <img src="images/heart.png" alt="carrito">
      </button>
    </a>
  </div>

  <h1 class="titulo">SUO</h1>

  <div class="header-right">
    <a href="login.html">
      <button id="userBtn">
        <img src="images/user-square.png" alt="usuario">
      </button>
    </a>
    <a href="admin.html">
      <button id="Admin">
        <img src="images/star-circle.png" alt="admin">
      </button>
    </a>
    <button id="menuBtn">
      <img src="images/menu-close.png" alt="menú">
    </button>
  </div>
`;

document.querySelector('#nav').innerHTML = `
  <ul>
    <li>link 1</li>
    <li>link 2</li>
  </ul>
`;

document.querySelector('#footer').innerHTML = `
  <h1 class="titulo">leon beltran -- belen martinez -- brisa farias</h1>
`;

document.getElementById('menuBtn').addEventListener('click', () => {
  const nav = document.getElementById('nav');
  nav.classList.toggle('hidden');
});

// Mostrar el modal del carrito al hacer clic en el botón de carrito
document.querySelectorAll('#cartBtn')[0].addEventListener('click', function(e) {
  e.preventDefault();
  document.getElementById('carrito-modal').classList.remove('hidden');
});

// Cerrar el modal del carrito
document.getElementById('close-carrito').addEventListener('click', function() {
  document.getElementById('carrito-modal').classList.add('hidden');
});
