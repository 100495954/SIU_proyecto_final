import { inicializarMapa } from './modules/mapa.js';
import { inicializarPermisos } from './modules/permisos.js';

// Inicializar elementos
inicializarMapa();
inicializarPermisos();

// Conexión a Socket.io
const socket = io(); 
document.getElementById('emergencias').addEventListener('click', () => {
  alert('Alerta enviada a emergencias');
});

// Manejar redirecciones desde el servidor
socket.on('Timbre', () => {
  if (window.location.pathname !== '/timbre.html') {
    window.location.href = 'timbre.html';
  }
});

socket.on('RedirigirCaida', () => {
  if (window.location.pathname !== '/caida.html') {
    window.location.href = 'caida.html';
  }
});