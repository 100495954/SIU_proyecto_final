import { iniciarDeteccionCaida, configurarBotonRecoger } from './caidas.js';
import { iniciarDeteccionSonido, configurarBotonApagarGrifo } from './grifo.js';
<<<<<<< HEAD
import { iniciarDeteccionLuces } from './luces.js';
=======
import { iniciarDeteccionLuces, configurarBotonApagarLuces } from './luces.js';
import { iniciarDeteccionTimbre} from './timbre.js';
>>>>>>> 40fca29c10b4b515a3f8a9b942bf5fed7182bbcf

// Función para solicitar permisos y activar todas las funcionalidades
export function inicializarPermisos() {
  document.addEventListener('DOMContentLoaded', () => {
      const btnPermiso = document.getElementById('boton-permiso');
      btnPermiso.addEventListener('click', async () => {
          if (typeof DeviceMotionEvent?.requestPermission === 'function') {
              // Pedir permiso para el sensor de movimiento (iOS)
              try {
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
  iniciarDeteccionTimbre();
}

// Función auxiliar para iniciar funcionalidades relacionadas con la cámara
function iniciarFuncionalidadesCamara() {
  iniciarDeteccionLuces(['salon', 'cocina', 'pasillo', 'dormitorio1', 'dormitorio2', 'dormitorio3', 'bano']);
}