// Inicializamos la posición de la persona
let x = 240; // posición horizontal
let y = 500; // posición vertical
const paso = 10; // Cuánto mueve cada tecla

// Elementos del DOM
const persona = document.getElementById('persona');
const mensaje = document.createElement('p'); // Elemento donde se mostrarán las alertas
document.getElementById('controles').appendChild(mensaje); // Lo añadimos al div de controles

// Función para actualizar la posición de la persona
function actualizarPosicion() {
  persona.style.left = x + 'px';
  persona.style.top = y + 'px';
}

// Movemos la persona según las flechas del teclado
document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowUp':
      y = Math.max(0, y - paso);  // Límite superior
      break;
    case 'ArrowDown':
      y = Math.min(480, y + paso); // Límite inferior
      break;
    case 'ArrowLeft':
      x = Math.max(0, x - paso);  // Límite izquierdo
      break;
    case 'ArrowRight':
      x = Math.min(480, x + paso); // Límite derecho
      break;
  }
  actualizarPosicion();
});

// Llamamos a la función de inicialización
actualizarPosicion();

// ------------------ ALERTAS ------------------
// Estado de las alertas para cada tipo
const estadosAlertas = {
  grifo: false,  // Si ya hay alerta del grifo
  luces: false,  // Si ya hay alerta de luces
  fuego: false,  // Si ya hay alerta del fuego
  caida: false   // Si ya hay alerta de caída
};
const contenedorAlertas = document.getElementById('mensaje');

 // Función para mostrar alertas
function mostrarAlerta(tipo, texto) {
  // Si ya existe una alerta activa de ese tipo, no hacer nada
  if (estadosAlertas[tipo]) {
    return;
  }

  // Cambiar el estado del tipo de alerta a "activo"
  estadosAlertas[tipo] = true;

  // Crear el elemento de alerta
  const nuevaAlerta = document.createElement('p');
  nuevaAlerta.textContent = texto;
  nuevaAlerta.style.fontWeight = 'bold';
  nuevaAlerta.style.color = 'green';
  contenedorAlertas.appendChild(nuevaAlerta);

  // Guardamos la referencia de la alerta para poder eliminarla después
  nuevaAlerta.id = `alerta-${tipo}`;

  // Solo los mensajes de resolución se ocultan tras 5 segundos
  const resoluciones = [
    'El grifo está apagado.',
    'Las luces están apagadas.',
    'El fuego está apagado.',
    'La persona ha sido ayudada.'
  ];

  if (resoluciones.includes(texto)) {
    setTimeout(() => {
      nuevaAlerta.remove();
      estadosAlertas[tipo] = false; // Restablecer el estado cuando se resuelve el problema
    }, 5000);
  }
}

// ------------------ BOTON DE CONTROL PARA EL FUEGO DE LA COCINA  ------------------
    document.getElementById('encenderFuego').addEventListener('click', () => {
      mostrarAlerta('fuego', 'El fuego está encendido en la cocina.');
      document.getElementById('apagarFuego').style.display = 'inline-block'; // Mostramos el botón de apagar
    });

    document.getElementById('apagarFuego').addEventListener('click', () => {
      mostrarAlerta('fuego', 'El fuego está apagado.');
      document.getElementById('apagarFuego').style.display = 'none'; // Ocultamos el botón de apagar
      const alertaFuego = document.getElementById('alerta-fuego');
      if (alertaFuego) {
        alertaFuego.remove(); // Eliminar la alerta de fuego
      }
      estadosAlertas['fuego'] = false; // Restablecer el estado de la alerta
    });

    // ------------------ DETECCIÓN DE SONIDO DEL GRIFO ------------------
    document.getElementById('apagarGrifo').addEventListener('click', () => {
      mostrarAlerta('grifo', 'El grifo está apagado.');
      document.getElementById('apagarGrifo').style.display = 'none'; // Ocultar el botón de apagar
      const alertaGrifo = document.getElementById('alerta-grifo');
      if (alertaGrifo) {
        alertaGrifo.remove(); // Eliminar la alerta de grifo
      }
      estadosAlertas['grifo'] = false; // Restablecer el estado de la alerta
    });

    // ------------------ DETECCIÓN REAL DE CAÍDA ------------------
    document.getElementById('recoger').addEventListener('click', () => {
      mostrarAlerta('caida', 'La persona ha sido ayudada.');
      const alertaCaida = document.getElementById('alerta-caida');
      if (alertaCaida) {
        alertaCaida.remove(); // Eliminar la alerta de caída
      }
      estadosAlertas['caida'] = false; // Restablecer el estado de la alerta
    });

    // ------------------ DETECCIÓN REAL DE LUCES ------------------
    document.getElementById('apagarLuces').addEventListener('click', () => {
      mostrarAlerta('luces', 'Las luces están apagadas.');
      document.getElementById('apagarLuces').style.display = 'none'; // Ocultar el botón de apagar
      const alertaLuces = document.getElementById('alerta-luces');
      if (alertaLuces) {
        alertaLuces.remove(); // Eliminar la alerta de luces
      }
      estadosAlertas['luces'] = false; // Restablecer el estado de la alerta
    });

// ----------------------PERMISOS------------------------
// Modificar la función de permisos para incluir la cámara
document.addEventListener('DOMContentLoaded', () => {
  const btnPermiso = document.createElement('button');
  btnPermiso.textContent = 'Activar sensores';
  btnPermiso.style.position = 'absolute';
  btnPermiso.style.top = '10px';
  btnPermiso.style.right = '10px';
  document.body.appendChild(btnPermiso);

  btnPermiso.addEventListener('click', async () => {
    if (typeof DeviceMotionEvent?.requestPermission === 'function') {
      try {
        const response = await DeviceMotionEvent.requestPermission();
        if (response === 'granted') {
          iniciarDeteccionCaida();
          iniciarDeteccionSonido();
          
          // Pedir permiso para la cámara
          try {
            await navigator.mediaDevices.getUserMedia({ video: true });
            iniciarDeteccionLuces();
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
      // No necesita permiso explícito (Android)
      iniciarDeteccionCaida();
      iniciarDeteccionSonido();
      
      try {
        await navigator.mediaDevices.getUserMedia({ video: true });
        iniciarDeteccionLuces();
      } catch (e) {
        console.error('Error accediendo a la cámara:', e);
      }
      
      btnPermiso.remove();
    }
  });
});
