import { mostrarAlerta, estadosAlertas } from './alertas.js';

const socket = io();
const aceleracionUmbral = 25;
export function iniciarDeteccionCaida() {
  window.addEventListener('devicemotion', (event) => {
    const acceleration = event.acceleration;
    if (!acceleration) return;

    const aceleracionTotal = Math.sqrt(
      Math.pow(acceleration.x || 0, 2) +
      Math.pow(acceleration.y || 0, 2) +
      Math.pow(acceleration.z || 0, 2)
    );

    if (aceleracionTotal > aceleracionUmbral && !estadosAlertas.caida) {
      estadosAlertas.caida = true;
      mostrarAlerta('caida', 'La persona ha sufrido una caída.');
      const btn = document.getElementById('recoger');
      if (btn) btn.style.display = 'inline-block';

      // Enviar alerta al servidor
      socket.emit('Caida', { 
        tipo: 'caida', 
        mensaje: 'La persona ha sufrido una caída.',
        timestamp: new Date().toISOString()
      });

      // Redirigir a la página de caída
      if (window.location.pathname !== '/caida.html') {
        window.location.href = '/caida.html';
      }
    }
  });
}

// Configuración del botón para recoger a la persona
export function configurarBotonRecoger() {
  const btn = document.getElementById('recoger');
  if (!btn) return;

  btn.addEventListener('click', () => {
    // Eliminar alerta de caída
    const alertaCaida = document.getElementById('alerta-caida');
    if (alertaCaida) alertaCaida.remove();

    // Mostrar resolución
    mostrarAlerta('caida', 'La persona ha sido ayudada.');
    btn.style.display = 'none';
    
    // Restablecer estado y notificar al servidor
    estadosAlertas.caida = false;
    socket.emit('CaidaResuelta', {
      tipo: 'caida',
      mensaje: 'La persona ha sido ayudada.',
      timestamp: new Date().toISOString()
    });

    // Volver a la página principal si estamos en caida.html
    if (window.location.pathname === '/caida.html') {
      window.location.href = '/';
    }
  });
}