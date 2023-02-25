const header = document.getElementById('headerPrincipal')
const main = document.getElementById('imagenes')
const verCarrito = document.getElementById('carrito');
const modalContainer = document.getElementById('modalContenedor');
const cantidadCarrito = document.getElementById('cantidadCarrito');
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


setTimeout(() =>{
    alert('hola Bienvenido esta pagina esta esta protegida contra todo. Cualquier consulta que tenga haga click en ayuda')
},1000)

setTimeout(() =>{
    alert('Gracias Profe Ariel')
},20000)




fetch("./json/carrito.json")
.then((resp) => resp.json())
.then((data) =>{
    data.forEach((viaje) => {         
                  let div = document.createElement('div')
                  div.innerHTML =
                        `
                    <img src="${viaje.img}" id='img' ><br>
                    <div class="contenido">
                     Destino:${viaje.destino}<br>
                     Ciudad: ${viaje.ciudad}<br>
                     Precio:${viaje.precio}<br>
                     Cantidada:${viaje.cantidad}<br>
                     Personas: ${viaje.personas}<br>   
                     Incluye:${viaje.incluido}
                    </div>
                     `
                  
                 main.append(div)
                  
                  let boton = document.createElement('button')
                  boton.innerHTML = 'agregar'
                  boton.className = 'comprarBoton'
                  div.append(boton)
                  boton.addEventListener('click',()=>{
                     const repeat = carrito.some((repeatViaje) => repeatViaje.id === viaje.id)
                        if(repeat){
                         carrito.map((via)=>{
                        if(via.id === viaje.id){
                           via.cantidad++;
                        }
                        })
                        }  
                        else{        
                         
                        carrito.push({        
                           id: viaje.id,
                           destino: viaje.destino,
                           ciudad:viaje.ciudad,
                           precio: viaje.precio, 
                           cantidad:viaje.cantidad,
                           personas: viaje.personas,
                           incluido: viaje.incluido,
                           
                        })
                        }
                  saveLocal();
                  contar()
                       })
                        
                       })
                  
                  const saveLocal = () =>{
                  localStorage.setItem('carrito', JSON.stringify(carrito))
                  }
                   
                  const pintarCarrito = () =>{
                  modalContainer.innerHTML =""
                  const modalHeader = document.createElement('div')
                  modalHeader.className = 'modal-header'
                  modalHeader.innerHTML =
                     `
                  <h1 class='modalHeader1'>Carrito</h1>
                     `;
                  modalContainer.append(modalHeader)
                  const modalBoton = document.createElement('h1')
                  modalBoton.className = 'modalBoton'
                  modalBoton.innerHTML = 
                     `
                  x
               
                     `
                  modalHeader.append(modalBoton)
                  modalBoton.addEventListener('click',() =>{
                  modalContainer.style.display = 'none'
                    
                  })
                  modalHeader.append(modalBoton)
                  
                  carrito.forEach((viajes)=>{
                  let carritoNuevo = document.createElement('div')
                  carritoNuevo.className = 'modal-Nuevo'
                  modalContainer.append(carritoNuevo)
                  
                    let agregar = document.createElement('button')
                    agregar.innerHTML = ` comprar `
                    agregar.className = `
                    comprar
                    `
                    modalContainer.append(agregar)
                    
                    agregar.addEventListener('click', ()=>{
                    Swal.fire(
                        'TU COMPRA SE RELAIZO CON EXITO',
                        'MUCHAS GRACIAS',
                        'BUEN VIAJE'
        )
        })
                  carritoNuevo.innerHTML =
                        `
                         
                      Destino:${viajes.destino}<br>
                     Ciudad: ${viajes.ciudad}<br>
                     Precio:${viajes.precio}<br>
                     <span class="restar"> - </span>
                     Cantidad:${viajes.cantidad}
                     <span class="sumar"> + </span>
                     Personas: ${viajes.personas}<br>   
                     Incluye:${viajes.incluido}
                     <p>Total Por Producto:${viajes.cantidad * viajes.precio} </p>
                     <span class="eliminarViaje">❌ </span>
                     <button id="compra"> Comprar </button>
                  
                        `
                        
                        
                    
                  let restar = carritoNuevo.querySelector(".restar")
                  restar.addEventListener('click', ()=>{
                     if(viajes.cantidad !==1 ){
                        viajes.cantidad--
                     }
                     saveLocal()
                     pintarCarrito()
                     })
                  let sumar = carritoNuevo.querySelector(".sumar")
                  sumar.addEventListener('click', ()=>{
                     if(viajes.cantidad !==0 ){
                        viajes.cantidad++
                     }
                       saveLocal()
                      pintarCarrito()
                      })
                  let eliminar = carritoNuevo.querySelector('.eliminarViaje')
                  eliminar.addEventListener('click',()=>{
                    eliminarViaje(viajes.id)
                    Swal.fire(
                        'Su compra fue eliminada',
                        'Gracias',
                        
                      )
                
                  })

            

                  
        
    })

                  
                  const total = carrito.reduce((acc, el) => acc + el.precio *  el.cantidad, 0);
                  const totalBuying = document.createElement('div')
                  totalBuying.className = 'totalContenedor'
                  totalBuying.innerHTML= 
                  `
                  total a pagar : 
                  ${total}$`
                  modalContainer.append(totalBuying) 
                  }
                  verCarrito.addEventListener('click', pintarCarrito)
                  const eliminarViaje = (id) =>{
                  const finID = carrito.find((elemnt) => elemnt.id === id)
                  
                  carrito = carrito.filter((carritoId ) =>{
                     return carritoId != finID
                     
                  })
                        
                        saveLocal()
                        pintarCarrito()
                  }
                     
                  const contar = () =>{
                  
                  const carritoLength = carrito.length
                  localStorage.setItem('carritoLength', JSON.stringify(carritoLength))
                  // cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"))
                  }
                  
            
    });
        









