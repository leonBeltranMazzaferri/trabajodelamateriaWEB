
function agregarAFavoritos(producto) {
  const existe = favoritos.find(p => p.id === producto.id);
  if (existe) {
    alert(`"${producto.nombre}" ya está en favoritos`);
    console.log(`"${producto.nombre}" ya estaba en favoritos`);
    return;
  }
  favoritos.push(producto);
  guardarFavoritos();
  alert(`"${producto.nombre}" agregado a favoritos`);
  console.log(`"${producto.nombre}" agregado a favoritos`);
}
