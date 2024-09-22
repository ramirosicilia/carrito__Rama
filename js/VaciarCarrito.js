import { vaciar, overlayContainer, carritoID, containerTotal, productosActualizados } from "./carrito.js"; 

vaciar.addEventListener('click', vaciarCarrito);

function vaciarCarrito() {
  if (productosActualizados.length > 0) {
      // Mostrar el modal de confirmación
      Swal.fire({
          title: '¿Estás seguro?',
          text: `Se van a borrar ${productosActualizados.length} productos.`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Sí, vaciar',
          cancelButtonText: 'No, cancelar',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          customClass: {
              container: 'swal2-container',
              popup: 'swal2-popup'
          }
      }).then((result) => {
          if (result.isConfirmed) {
              // Vaciar el carrito
              productosActualizados.length = 0;
              carritoID.length = 0; 
              localStorage.setItem('Productos-Actualizados', JSON.stringify(productosActualizados));
              
              // Mostrar el mensaje de "Carrito vacío" después de vaciar el carrito
              overlayContainer.innerHTML = 'Carrito vacío ☹️';
              containerTotal.style.display = 'none';

              // Reiniciar la pantalla después de 2 segundos
              setTimeout(() => {
                  window.location.reload();
              }, 800);
          }
      });
  } else {
    Swal.fire({
        title: 'Carrito vacío',
        text: 'No hay productos para comprar.',
        icon: 'info',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#3085d6',
    });
  }
}

// CSS adicional para personalizar el modal y overlay
const style = document.createElement('style');
style.innerHTML = `
  .swal2-container {
      z-index: 10000; /* Asegúrate de que este valor sea mayor que el z-index del overlay */
      position: absolute; /* Asegúrate de que el modal esté en una capa superior */
  }
  .swal2-popup {
      width: 600px; /* Ancho del modal */
      padding: 2rem;
      text-align: center;
      border-radius: 1rem;
  }
  .swal2-title {
      font-size: 2rem; /* Tamaño de fuente del título */
  }
  .swal2-html-container {
      font-size: 1.25rem; /* Tamaño de fuente del texto */
  }
  /* Estilo para el overlay */
  .overlay {
      z-index: 1000; /* Asegúrate de que este valor sea menor que el z-index del modal */
  }
`;
document.head.appendChild(style);
