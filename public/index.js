const socket = io();

const inputChat = document.getElementById("chatting");
const btnChat = document.getElementById("send");
btnChat.addEventListener("click", () => {
    socket.emit("mensaje", inputChat.value);
    inputChat.value = "";
})

const inputEmail = document.getElementById("email");
const btnEmail = document.getElementById("sendEmail");
document.getElementById("sendEmail").addEventListener("click", () => {
    socket.emit("correo", inputEmail.value);
    inputChat.removeAttribute('disabled');
    btnChat.removeAttribute('disabled');
    inputEmail.value = "";
    inputEmail.setAttribute('disabled', ''); 
    btnEmail.setAttribute('disabled', ''); 
})

const productName = document.getElementById("productName");
const productPrice = document.getElementById("productPrice");
const productUrl = document.getElementById("productUrl");
document.getElementById("save_product").addEventListener("click", () => {
  const product = {
    nombre: productName.value,
    precio: productPrice.value,
    imagen: productUrl.value,
  };
  socket.emit("producto", product);
  productName.value = "";
  productPrice.value = "";
  productUrl.value = "";
});

// Cliente
socket.on("productos", (productos) => {
    if(productos.length > 0){
        const name = productos.map((producto) => `${producto.producto.nombre}`);
        const precio = productos.map((producto) => `${producto.producto.precio}`);
        const imagen = productos.map((producto) => `${producto.producto.imagen}`);
      
        let totalProducts = productos.length;
        let nombreFinal;
        let precioFinal;
        let imagenFinal;
        for(let i = 0; i <= totalProducts; i++){
          nombreFinal += "<p>"+name+"</p>"
          precioFinal += "<p>"+precio+"</p>"
          imagenFinal += "<p>"+imagen+"</p>"
        }
        document.getElementById("name_product").innerHTML = nombreFinal;
        document.getElementById("price_product").innerHTML = precioFinal;
        document.getElementById("image_product").innerHTML = imagenFinal;
    } else {
        console.log("No hay productos")
    }
  
});

// Cliente
socket.on('mensajes', (mensajes) => {
    const mensajesInput = mensajes
    .map(
        (mensaje) => 
        `SocketId: ${mensaje.socketid} -> Mensajes: ${mensaje.mensaje}`
    )
    .join("<br>")
    document.getElementById("message").innerHTML = mensajesInput;
})
