
const informacion = document.getElementById('seccion-info');
const carritoCompras = document.getElementById("carrito-compras");
const lupa = document.getElementById('lupa');

let entrada = true;

lupa.addEventListener('click', () => {
  if (entrada) {
    // Oculta la información y muestra el carrito
    informacion.style.display = 'none';
    carritoCompras.style.display = 'grid';
    // Desliza suavemente hacia el carrito de compras
    carritoCompras.scrollIntoView({
      behavior: 'smooth', // Animación suave
      block: 'start' // Alinea la sección al inicio de la vista
    });
  } else {
    // Muestra la información y oculta el carrito
    informacion.style.display = 'flex';
    carritoCompras.style.display = 'none';
    // Desliza suavemente hacia la información
    informacion.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
  entrada = !entrada; // Alterna el estado
});
