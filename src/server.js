import express from 'express';
import http from 'http';
import { Server } from 'socket.io';  // Correcta importación de socket.io

// Crear una app de Express
const app = express();

// Crear un servidor HTTP para Socket.io
const server = http.createServer(app);

// Inicializar Socket.io en el servidor
const io = new Server(server);

// Configurar Express para servir archivos estáticos (front-end)
app.use(express.static('public'));

// Cuando un cliente se conecta a Socket.io
io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

  // Recibir mensajes del cliente
  socket.on('mensaje_cliente', (data) => {
    console.log('Mensaje del cliente:', data);
    
    // Enviar un mensaje de vuelta al cliente
    socket.emit('mensaje_servidor', '¡Hola desde el servidor!');
  });

  // Cuando un cliente se desconecta
  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

// Iniciar el servidor en el puerto 3000
server.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
