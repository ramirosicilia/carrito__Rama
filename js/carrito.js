
// carrito.js
import { musica, detenerMusica } from './musica.js'; // Importar funciones de música

export let productosActualizados = localStorage.getItem('Productos-Actualizados') ? JSON.parse(localStorage.getItem('Productos-Actualizados')) : []; 
export let carritoID = [];
export let overlayContainer = document.querySelector('.overlay__container');
export const containerTotal = document.querySelector('.container__total');
export let vaciar = document.getElementById('vaciar'); 
export let iconCart = document.getElementById('icon-cart');
export const overlay = document.getElementById('overlay'); 

function crearBotones() {
    let boton = document.createElement('button');
    boton.innerHTML = 'Agregar';
    boton.classList.add('botones__agregar');
    return boton;
}

export function recibirDataID(datos) {
    let carrito = document.getElementById('carrito-compras');
    let botones;

    for (let i = 0; i < datos.length; i++) {
        const contenedorDiv = document.createElement('div');
        contenedorDiv.classList.add('tarjeta');
        let color = document.createElement('p');
        let precio = document.createElement('p');

        contenedorDiv.innerHTML += `
            <h2 class="titulo__tarjeta">${datos[i].nombre}</h2>
            <img class="imagenes__tarjeta" src="${datos[i].imagen}" alt="">
        `;
        color.textContent = 'Color: ' + datos[i].color;
        precio.textContent = '$' + datos[i].precio;
        color.classList.add('color__tarjeta');
        precio.classList.add('precio');
        
        botones = crearBotones();
        botones.dataset.id = i;
        contenedorDiv.appendChild(color);
        contenedorDiv.appendChild(precio);
        contenedorDiv.appendChild(botones);
        
        carrito.append(contenedorDiv);
    }

    carritoID = datos.map((elemento, index) => {
        elemento.id = index;
        return { ...elemento };
    });

    actualizarValorTotal();
}

export async function actualizarOverlay() {
    overlayContainer.innerHTML = ''; // Limpiar el contenido del overlay antes de añadir los productos actualizados

    if (productosActualizados.length > 0) {
        for (const producto of productosActualizados) { 
            overlayContainer.innerHTML += `
                <div class="overlay__flex" id="producto-${producto.id}">
                    <div class="overlay__tarjeta-1 ${producto.stock === 0 ? 'active' : ''}">
                        <h2 class="imagen__nombre">${producto.nombre}</h2>
                        <img class="imagen__producto" src="${producto.imagen}" alt="">
                        <p class="imagen__precio">Precio unitario: $${producto.precio}</p>
                        <span class="stock">Stock: ${producto.stock}</span>
                    </div>
                    <div class="overlay__tarjeta-2">
                        <span class="cantidad">Cantidad: ${producto.cantidad}</span>
                        <div class="contenedor__botonera">
                            <button type="button" class=${producto.stock>0?'agregar__boton':'boton__disabled'} data-id="${producto.id}" ${producto.stock === 0 ? 'disabled' : ''}>${producto.stock<1?'Sin stock':'Agregar'}</button>
                            <button type="button" class="eliminar__boton" data-id="${producto.id}">Eliminar</button>
                        </div>
                    </div>
                </div>
            `; 
        }

        // Reagregar los event listeners después de actualizar el overlay
        localStorage.setItem("Productos-Actualizados", JSON.stringify(productosActualizados));
        agregarProducto();
        eliminarProducto();

        // Reproducir música cuando se abre el overlay solo si no se está reproduciendo ya
        try {
            await musica();
        } catch (error) {
            console.error(error);
        }

        // Desplazarse a la última tarjeta añadida
       let ultimaTarjeta=productosActualizados[productosActualizados.length-1] 
       let tarjetaID=document.getElementById(`producto-${ultimaTarjeta.id}`) 
       tarjetaID.scrollIntoView({
        behavior:'smooth',
        block:'center'
       })

    } 
     else {
        overlayContainer.innerHTML = 'Carrito vacío ☹️'; 
        containerTotal.style.display = 'none';
    }

    overlay.classList.add('active');
}


export function actualizarValorTotal() {
    let total = productosActualizados.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0);
    document.querySelector('.valor__total').textContent = `Valor total: $${total}`; 
    return total;
}

document.getElementById('icon-overlay').addEventListener('click', () => {
    overlay.classList.remove('active');
    // Detener la música cuando se cierra el overlay
    detenerMusica();
});

// Manejo de datos del carrito
import { agregarProducto } from './AgregarCarrito.js';
import { eliminarProducto } from './EliminarCarrito.js';
import { activarBoton } from './ActivarBotones.js';


let carrito = document.getElementById('carrito__compras');

(async () => {
    try {
        let response = await fetch('./js/carrito.json');
       let data = await response.json(); 
  
        recibirDataID(data);
        activarBoton();
    } catch (err) {
        console.error('Error al recibir los productos', { message: 'error' });
    }
})();
