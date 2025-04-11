import { mostrarAlerta, estadosAlertas } from './alertas.js';

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

    if (aceleracionTotal > aceleracionUmbral) {
      mostrarAlerta('caida', 'La persona ha sufrido una caída.');
      if (!document.getElementById('recoger')) {
        const btn = document.createElement('button');
        btn.id = 'recoger';
        btn.textContent = 'Recoger persona';
        btn.addEventListener('click', () => {
          // Eliminar alerta de caída
          const alertaCaida = document.getElementById('alerta-caida');
          if (alertaCaida) alertaCaida.remove();

          // Mostrar resolución
          mostrarAlerta('caida', 'La persona ha sido ayudada.');
          btn.remove();
          
          // Restablecer estado
          estadosAlertas.caida = false;
        });
        document.getElementById('controles').appendChild(btn);
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
    
    // Restablecer estado
    estadosAlertas.caida = false;
  });
}
