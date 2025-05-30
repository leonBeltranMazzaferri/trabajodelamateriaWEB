document.querySelector('#header').innerHTML = `
  <div class="header-left">
    <button id="searchBtn"><img src="images/search-alt.png" alt="lupa"></button>
    <button id="cartBtn"><img src="images/cart.png" alt="carrito"></button>
  </div>
  <h1 class="titulo">SUO</h1>
  <div class="header-right">
    <button id="menuBtn"><img src="images/menu-close.png" alt="menú"></button>
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
