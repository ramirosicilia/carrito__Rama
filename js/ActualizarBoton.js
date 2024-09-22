
import {agregarProducto} from"./AgregarCarrito.js"

export function actualizarBoton(producto) {
    // Buscar ambos botones en la interfaz: agregar y eliminar
    let botones = document.querySelectorAll(`[data-id="${producto.id}"]`);
  
    botones.forEach(boton => {
      if (producto.stock <= 0) {
        // Actualizar contenido y estilo de los botones
        boton.innerHTML = 'Sin stock';
        boton.style.opacity = '.6';
        boton.style.backgroundColor=' #ca4949 '
  
        // Deshabilitar ambos botones
        boton.disabled = true;
      }
    });
  
    // Mostrar alerta con Toastify
    Toastify({
      text: `El producto ${producto.nombre} está agotado.`,
      duration: 3000,
      close: true,
      gravity: "top",
      position: "center",
      stopOnFocus: true,
      style: {
        background: "linear-gradient(to right, #ff5722, #f44336)",
        borderRadius: "2rem",
        padding: "2rem 4rem",
        textTransform: "uppercase",
        fontSize: "1.5rem"
      },
      offset: { x: 0, y: '8rem' }
    }).showToast(); 

   agregarProducto()
  }
  

  