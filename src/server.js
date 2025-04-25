import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

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
    socket.broadcast.emit('Mover', data);
  });

  // Manejar alerta de caída
  socket.on('Caida', (data) => {
    console.log('Alerta de caída recibida:', data);
    socket.broadcast.emit('Caida', data);
  });

  // Manejar resolución de caída
  socket.on('CaidaResuelta', (data) => {
    console.log('Caída resuelta:', data);
    socket.broadcast.emit('CaidaResuelta', data);
  });

  // Manejar alerta de grifo abierto
  socket.on('Grifo', (data) => {
    console.log('Alerta de grifo abierto:', data);
    socket.broadcast.emit('Grifo', data);
  });

  // Manejar grifo apagado
  socket.on('GrifoApagado', (data) => {
    console.log('Grifo apagado:', data);
    socket.broadcast.emit('GrifoApagado', data);
  });

  // Manejar timbre
  socket.on('Timbre', () => {
    console.log('Se ha llamado al timbre');
    io.emit('Timbre');
  });

  // Los mensajes para manejar las luces de la casa
  socket.on('Encender_luces', (data) => {
    console.log('Luces de ',data, ' cambiadas');
    socket.broadcast.emit('Encender_luces', data);
  });

  socket.on('Apagar_luces', (data) => {
    console.log('Luces de ',data, 'apagadas');
    socket.broadcast.emit('Apagar_luces', data);
  });

  // Los mensajes para manejar las alertas de la casa
  socket.on('Alerta', (data) => {
    console.log('Alerta de ',data);
    socket.broadcast.emit('Alerta', data);
  });

  // Los mensajes para manejar las luces de la casa
  socket.on('volver', () => {
    console.log('volviendo a cuidador.html');
    socket.broadcast.emit('volver');
  });

  // Los mensajes para manejar las luces de la casa
  socket.on('Resetear', (data) => {
    console.log('Posicion reseteada ');
    socket.broadcast.emit('Resetear', data);
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
