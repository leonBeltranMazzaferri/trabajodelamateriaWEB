   let favoritos = [];
    try {
      favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    } catch {
      favoritos = [];
    }

    const container = document.getElementById("favoritos-container");

    if (favoritos.length === 0) {
      container.innerHTML = "<p>No hay productos favoritos.</p>";
    } else {
      favoritos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("item");
        div.innerHTML = `
          <img src="${producto.imagen}" alt="${producto.nombre}" width="80">
          <h2>${producto.nombre}</h2>
          <h3>${producto.descripcion}</h3>
          <p>Precio: $${producto.precio}</p>
          <button onclick="eliminarFavorito(${producto.id})">Eliminar de favoritos</button>
        `;
        container.appendChild(div);
      });
    }

    function eliminarFavorito(id) {
      const index = favoritos.findIndex(p => p.id === id);
      if (index > -1) {
        console.log(`"${favoritos[index].nombre}" eliminado de favoritos`);
        favoritos.splice(index, 1);
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
        location.reload();
      }
    }