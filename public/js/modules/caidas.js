// caidas.js
import { mostrarAlerta, estadosAlertas } from './alertas.js'; // Asegúrate que existan y funcionen

// Inicializa socket.io si no está globalmente
const socket = io();
const aceleracionUmbral = 25; // Ajusta según necesidad
const LIMITE_TIEMPO_ENTRE_CAIDAS = 10000; // 10 seg, evita detecciones múltiples
let ultimaCaidaTimestamp = 0;

// Asegúrate que estadosAlertas esté definido e inicializado
// Ejemplo: import { estadosAlertas } from './alertas.js';
// O si no usas módulos: var estadosAlertas = { caida: false };

export function iniciarDeteccionCaida() {
    if (!window.DeviceMotionEvent) {
        console.error("DeviceMotionEvent no soportado.");
        // Considera mostrar un mensaje al usuario
        return;
    }

    // Solicitar permisos primero si es necesario (iOS 13+)
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
        DeviceMotionEvent.requestPermission()
            .then(permissionState => {
                if (permissionState === 'granted') {
                    console.log("Permiso de movimiento concedido para detección de caídas.");
                    agregarListenerMovimiento();
                } else {
                    console.warn("Permiso de movimiento denegado para detección de caídas.");
                    // Informar al usuario que la detección no funcionará
                }
            })
            .catch(console.error);
    } else {
        // Navegadores sin necesidad de permiso explícito
        agregarListenerMovimiento();
    }
}

function agregarListenerMovimiento() {
     window.addEventListener('devicemotion', (event) => {
        // El listener en sí
        try {
            const acceleration = event.acceleration;
            // Verifica que acceleration y sus componentes existan
             if (!acceleration || typeof acceleration.x !== 'number' || typeof acceleration.y !== 'number' || typeof acceleration.z !== 'number') {
                // console.warn("Datos de aceleración incompletos o no disponibles.");
                return; // Salir si no hay datos fiables
            }


            const ahora = Date.now();
            // Prevenir detecciones múltiples y solo actuar si no hay una caída activa
            if (estadosAlertas.caida || (ahora - ultimaCaidaTimestamp < LIMITE_TIEMPO_ENTRE_CAIDAS)) {
                return;
            }

            const aceleracionTotal = Math.sqrt(
                Math.pow(acceleration.x, 2) +
                Math.pow(acceleration.y, 2) +
                Math.pow(acceleration.z, 2)
            );

            if (aceleracionTotal > aceleracionUmbral) {
                console.log("¡Posible caída detectada por aceleración!");
                ultimaCaidaTimestamp = ahora;
                estadosAlertas.caida = true; // Marcar estado como caída activa

                // Notificar al servidor INMEDIATAMENTE (opcional pero recomendado)
                socket.emit('CaidaDetectada', { // Evento renombrado
                    mensaje: 'Posible caída detectada por el sensor de movimiento.',
                    timestamp: new Date().toISOString()
                });

                // Redirigir a la página de verificación/respuesta
                // Asegurar que solo redirija si no estamos ya en ella
                if (window.location.pathname !== '/caida.html') {
                     console.log("Redirigiendo a /caida.html para verificación...");
                    window.location.href = '/caida.html';
                }
            }
        } catch (error) {
            console.error("Error en el listener de devicemotion:", error);
        }
    });
    console.log("Listener de devicemotion para detección de caídas añadido.");
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
