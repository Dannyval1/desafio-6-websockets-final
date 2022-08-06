const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const productos = [];
const mensajes = [];

// Indicamos que queremos cargar los archivos estáticos que se encuentran en dicha carpeta
app.use(express.static("./public"));
// Esta ruta carga nuestro archivo index.html en la raíz de la misma
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

httpServer.listen(3000, () => console.log("Servidor Encendido"));

io.on("connection", (socket) => {
  console.log("¡Nuevo cliente conectado!");

  socket.emit("productos", productos);
  socket.emit("mensajes", mensajes);


  // Servidor
  socket.on("producto", (data) => {
    productos.push({ socketid: socket.id, producto: data});
    io.sockets.emit("productos", productos)
  });

  socket.on("mensaje", (data) => {
    mensajes.push({ socketid: socket.id, mensaje: data});
    io.sockets.emit("mensajes", mensajes)
  });
});
