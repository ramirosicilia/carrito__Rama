
document.getElementById('comprar').addEventListener('click',()=>{
    Toastify({
        text: 'GRACIAS POR SU COMPRA E-COMMERCE RAMA SE LO AGRADECE!!!',
        duration: 3000,
        close: true,
        gravity: "top", 
        position: "center", 
        stopOnFocus: true, 
        style: {
          background: "linear-gradient(to right, #ff5722, #f44336)",
          borderRadius: "2rem", 
          padding: "2rem 4rem", 
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textTransform: "uppercase",
          fontSize: "1.5rem"
        },
        offset: {
          x: 0, 
          y: '8rem' 
        }
      }).showToast();
      
})