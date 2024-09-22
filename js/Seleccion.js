import { carritoID, productosActualizados} from "./carrito.js";  
import {activarBoton} from "./ActivarBotones.js"



const informacion = document.getElementById('seccion-info');
const carritoFiltrado= document.getElementById("carrito-filtrado");
const seleccionar = document.getElementById("seleccionar");  
 let seleccion=document.querySelector(".select") 
 console.log(seleccion)

function crearBotones() {
    let boton = document.createElement('button');
    boton.innerHTML = 'Agregar';
    boton.classList.add('botones__agregar');
    return boton; 
}    

   

seleccion.addEventListener('click', (e) => { 
    if (e.target.value === "Todos") {  
        informacion.style.display = 'none';
        carritoFiltrado.style.display = 'grid';  

        console.log(e.target);
        todosLosProducts();
    } 
}, { once: true });  


 function todosLosProducts(){  
    carritoFiltrado.innerHTML=''

    carritoID.forEach((producto,i)=>{  
        const contenedorDiv = document.createElement('div');
        contenedorDiv.classList.add('tarjeta');
        let color = document.createElement('p');
        let precio = document.createElement('p');

        contenedorDiv.innerHTML += `
            <h2 class="titulo__tarjeta">${producto.nombre}</h2> 
        
            <img class="imagenes__tarjeta" src="${producto.imagen}" alt="">
        `; 
        color.textContent = 'Color: ' + producto.color; 
        precio.textContent = '$' + producto.precio;
        color.classList.add('color__tarjeta');
        precio.classList.add('precio');
        
        let botones = crearBotones();
        botones.dataset.id = i;
        contenedorDiv.appendChild(color);
        contenedorDiv.appendChild(precio);
        contenedorDiv.appendChild(botones);
        console.log(contenedorDiv)
        carritoFiltrado.append(contenedorDiv);  
        carritoFiltrado.scrollIntoView({
            behavior:'smooth',
            block:'start'

        })

        localStorage.setItem('Productos-Actualizados', JSON.stringify(productosActualizados)); 
        activarBoton() 
        
        
    
    })

 }  



    


 seleccionar.addEventListener('change', (e) => {
    let valorSeleccion = e.target.value; 

    let productosFiltrados = carritoID.filter(producto => producto.categoria === valorSeleccion);

    if (productosFiltrados.length > 0) {  
        carritoFiltrado.innerHTML = '';

        productosFiltrados.forEach((producto) => { 
            const contenedorDiv = document.createElement('div');
            contenedorDiv.classList.add('tarjeta');

            contenedorDiv.innerHTML = `
                <h2 class="titulo__tarjeta">${producto.nombre}</h2> 
                <img class="imagenes__tarjeta" src="${producto.imagen}" alt="">
            `;
            
            let color = document.createElement('p');
            let precio = document.createElement('p');
            color.textContent = 'Color: ' + producto.color; 
            precio.textContent = '$' + producto.precio;
            color.classList.add('color__tarjeta');
            precio.classList.add('precio');
            
            let botones = crearBotones();
            botones.dataset.id = producto.id;
            contenedorDiv.appendChild(color);
            contenedorDiv.appendChild(precio);
            contenedorDiv.appendChild(botones);
            
            carritoFiltrado.appendChild(contenedorDiv); 
        }); 

        carritoFiltrado.scrollIntoView({
            behavior:'smooth',
            block:'start'

        })
    } else { 
        todosLosProducts(); // Mostrar todos los productos si no hay resultados
    }
    
    activarBoton(); // Asegurarte de que los botones estén activados después de filtrar
});
