
import { productosActualizados,carritoID } from "./carrito.js" 
import {activarBoton} from "./ActivarBotones.js"

const formulario=document.getElementById("header-formulario") 
const informacion = document.getElementById('seccion-info');
const carritoInput= document.getElementById("carrito-input");  


function crearBotones() {
    let boton = document.createElement('button');
    boton.innerHTML = 'Agregar';
    boton.classList.add('botones__agregar');
    return boton; 
}   

formulario.addEventListener("submit",(e)=>{  
    e.preventDefault() 

    let inputValor=document.getElementById("header-input").value  
  
    

    let filtradoBusqueda = carritoID.filter(producto => 
        producto.nombre.toLowerCase().trim() === inputValor.toLowerCase().trim() || 
        producto.categoria.toLowerCase().trim() === inputValor.toLowerCase().trim()
    );
    

    if(filtradoBusqueda.length>0){   



        console.log(filtradoBusqueda)

        carritoInput.innerHTML=''
       
        filtradoBusqueda.forEach(producto=>{ 
         

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
            
            carritoInput.appendChild(contenedorDiv); 
            informacion.style.display='none'
            carritoInput.style.display='grid'
            console.log(carritoInput)




        })

        carritoInput.scrollIntoView({
            behavior:'smooth',
            block:'start' 
            })



    }  

    if(filtradoBusqueda.length===0){ 

   Toastify({
      text: `No se encontro la categoria ni el producto!!!`,
      duration: 3000,
      close: true,
      gravity: "top",
      position: "center",
      stopOnFocus: true,
      style: { 
        width:'100%',
        background: "linear-gradient(to right, #ff5722, #f44336)",
        borderRadius: "2rem",
        padding: "3rem 6rem",
        textTransform: "uppercase",
        fontSize: "1.5rem"
      },
      offset: { x: 0, y: '8rem' }
    }).showToast(); 

    }

 
    localStorage.setItem('Productos-Actualizados', JSON.stringify(productosActualizados)); 
     console.log(activarBoton())

    formulario.reset()

})