import { iniciarDeteccionCaida, configurarBotonRecoger } from './caidas.js';
import { iniciarDeteccionSonido, configurarBotonApagarGrifo } from './grifo.js';
import { iniciarDeteccionLuces, configurarBotonApagarLuces } from './luces.js';

// Función para solicitar permisos y activar todas las funcionalidades
export function inicializarPermisos() {
  document.addEventListener('DOMContentLoaded', () => {
    const btnPermiso = document.getElementById('boton-permiso');
    btnPermiso.addEventListener('click', async () => {
      if (typeof DeviceMotionEvent?.requestPermission === 'function') {
        try {
          // Pedir permiso para el sensor de movimiento (iOS)
          const response = await DeviceMotionEvent.requestPermission();
          if (response === 'granted') {
            // Iniciar funcionalidades de movimiento
            iniciarFuncionalidadesMovimiento();
            
            // Pedir permiso para la cámara
            try {
              await navigator.mediaDevices.getUserMedia({ video: true });
              iniciarFuncionalidadesCamara();
            } catch (e) {
              console.error('Permiso de cámara denegado:', e);
            }
            
            btnPermiso.remove();
          } else {
            alert('Permiso denegado para acceder a los sensores.');
          }
        } catch (e) {
          console.error(e);
        }
      } else {
        // No necesita permiso explícito (Android/Web)
        iniciarFuncionalidadesMovimiento();
        
        try {
          await navigator.mediaDevices.getUserMedia({ video: true });
          iniciarFuncionalidadesCamara();
        } catch (e) {
          console.error('Error accediendo a la cámara:', e);
        }
        
        btnPermiso.remove();
      }
    });
  });
}

// Función auxiliar para iniciar funcionalidades relacionadas con el movimiento
function iniciarFuncionalidadesMovimiento() {
  iniciarDeteccionCaida();
  configurarBotonRecoger();
  iniciarDeteccionSonido();
  configurarBotonApagarGrifo();
}

// Función auxiliar para iniciar funcionalidades relacionadas con la cámara
function iniciarFuncionalidadesCamara() {
  iniciarDeteccionLuces();
  configurarBotonApagarLuces();
}