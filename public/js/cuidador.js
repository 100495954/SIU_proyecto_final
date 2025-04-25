<<<<<<< HEAD
import { inicializarMapa } from "./modules/mapa.js";

const socket = io();



inicializarMapa();


// Si se llama al timbre, notificar al servidor
=======
// Conexión al servidor Socket.IO
const socket = io();

// Si el cuidador llama al timbre, notificar al servidor
>>>>>>> 40fca29c10b4b515a3f8a9b942bf5fed7182bbcf
document.getElementById('timbre').addEventListener('click', function() {
  socket.emit('Timbre');
});

// Si el cuidador llama a emergencias, mostrar una alerta de que la ayuda ha sido enviada
document.getElementById('emergencias').addEventListener('click', function() {
  alert('Alerta enviada a emergencias');
});

// Si se detecta una caida de la persona, redirigir a la página de caida para manejar la situación
socket.on('Caida', () => window.location.href = '/caida-cuidador.html');


// Manejar alerta de grifo abierto
socket.on('Grifo', (data) => {
  // Evitar alertas duplicadas
  if (document.getElementById('alerta-grifo')) return;
  
  const alerta = document.createElement('div');
  alerta.id = 'alerta-grifo';
  alerta.className = 'alerta alerta-grifo';
  alerta.innerHTML = `
    <span>${data.mensaje}</span>
    <button class="btn-resolver" onclick="resolverGrifo()">Apagar grifo</button>
  `;
  document.getElementById('alertasContainer').appendChild(alerta);
});

// Manejar cuando el grifo se apaga automáticamente o manualmente
socket.on('GrifoApagado', () => {
  const alerta = document.getElementById('alerta-grifo');
  if (alerta) {
    alerta.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(() => alerta.remove(), 300);
  }
});

// Manejar alerta de luces encendidas
<<<<<<< HEAD
socket.on('Encender_luces', (data) => {
    console.log('Luces encendidas en:', data);
    let room = document.querySelector('.'+ data.mensaje);
    room.style.fill = 'rgb(223, 220, 95)';
});

socket.on('Apagar_luces', (data) => {
    let room = document.querySelector('.'+data.mensaje);
    room.style.fill = 'rgb(190, 190, 190)';
=======
socket.on('Luces', (data) => {
  if (document.getElementById('alerta-luces')) return;
  
  const alerta = document.createElement('div');
  alerta.id = 'alerta-luces';
  alerta.className = 'alerta alerta-luces';
  alerta.innerHTML = `
    <span>${data.mensaje}</span>
    <button class="btn-resolver" onclick="resolverLuces()">Apagar luces</button>
  `;
  document.getElementById('alertasContainer').appendChild(alerta);
});

socket.on('LucesApagadas', () => {
  const alerta = document.getElementById('alerta-luces');
  if (alerta) {
    alerta.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(() => alerta.remove(), 300);
  }
>>>>>>> 40fca29c10b4b515a3f8a9b942bf5fed7182bbcf
});

// Funciones para resolver alertas
window.resolverGrifo = function() {
  socket.emit('GrifoApagado', {
    tipo: 'grifo',
    mensaje: 'El grifo ha sido apagado manualmente por el cuidador.',
    timestamp: new Date().toISOString(),
  });
};

window.resolverLuces = function() {
  const alerta = document.getElementById('alerta-luces');
  if (alerta) {
    alerta.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(() => alerta.remove(), 300);
  }

  socket.emit('LucesApagadas', {
    tipo: 'luces',
    mensaje: '¡Se han apagado las luces!',
    timestamp: new Date().toISOString(),
  });
};


