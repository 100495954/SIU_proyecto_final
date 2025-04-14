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

  // Los mensajes para manejar el movimiento de la persona en la casa
  socket.on('Mover', (data) => {
    console.log('Movimiento recibido:', data);
    socket.broadcast.emit('Mover', data); // Relay to others
  });

  // Los mensajes para manejar las luces de la casa
  socket.on('Luces', (data) => {
    console.log('Luces de ',data, ' cambiadas');
    socket.broadcast.emit('Luces', data); // Relay to others
  });

  // Los mensajes para manejar las alertas de la casa
  socket.on('Alerta', (data) => {
    console.log('Alerta de ',data);
    socket.broadcast.emit('Alerta', data); // Relay to others
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
