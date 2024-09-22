
import { iconCart } from './carrito.js'; 
import { actualizarOverlay, actualizarValorTotal, productosActualizados } from './carrito.js';

export function eliminarProducto() {
  let eliminarBoton = document.querySelectorAll('.eliminar__boton'); // Botones de eliminar en el carrito

  eliminarBoton.forEach(botonEliminar => {
    botonEliminar.addEventListener('click', () => {
      let idProducto = parseInt(botonEliminar.dataset.id);
      let producto = productosActualizados.find(p => p.id === idProducto);

      if (producto) {
        // Disminuir cantidad si es mayor a 1 o eliminar producto si es 1
        if (producto.cantidad > 1) {
          producto.cantidad--;
          producto.stock++;

          iconCart.innerHTML = productosActualizados.reduce((acc, prod) => acc + prod.cantidad, 0);

          // Verificar si el stock se ha agotado
         
        } else {
          // Eliminar producto del carrito si la cantidad es 1
          productosActualizados.splice(productosActualizados.findIndex(p => p.id === idProducto), 1);
          iconCart.innerHTML = productosActualizados.reduce((acc, prod) => acc + prod.cantidad, 0);

          // Desactivar el botón al eliminar el producto
          botonEliminar.classList.add('boton-desactivado');
          botonEliminar.disabled = true;
          console.log('Botón desactivado al eliminar:', botonEliminar);
        }

        localStorage.setItem('Productos-Actualizados', JSON.stringify(productosActualizados));
        actualizarOverlay();
        actualizarValorTotal();
      }
    });
  });
}
