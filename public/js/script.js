import { inicializarMapa } from './modules/mapa.js';
import { inicializarPermisos } from './modules/permisos.js';
import { inicializarPersona } from './modules/persona.js';

// Inicializar elementos
inicializarMapa();
inicializarPermisos();
inicializarPersona();

// Meter estas partes en vuestro código lo dejo aquí temporalmente
const socket = io(); // Conexión a Socket.io
document.querySelector('#llamar').addEventListener('click', () => {
  socket.emit('Alerta', 'Llamada'); // Emitir evento de caída
})
document.querySelector('#timbre').addEventListener('click', () => {
  socket.emit('Alerta', 'Timbre'); // Emitir evento de timbre
})
