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

function mostrarAlerta(texto, temporal = true) {
  mensaje.textContent = texto;
  mensaje.style.fontWeight = 'bold';
  mensaje.style.color = 'green';

  if (temporal) {
    setTimeout(() => {
      mensaje.textContent = '';
    }, 5000); // 5 segundos
  }
}


// ------------------ BOTONES DE CONTROL ------------------

// Grifo
document.getElementById('dejarGrifoAbierto').addEventListener('click', () => {
  mostrarAlerta('El grifo lleva abierto más de 10 minutos.');
  document.getElementById('apagarGrifo').style.display = 'inline-block'; // Mostramos el botón de apagar
});

document.getElementById('apagarGrifo').addEventListener('click', () => {
  mostrarAlerta('El grifo está apagado.');
  document.getElementById('apagarGrifo').style.display = 'none'; // Ocultamos el botón de apagar
});

// Luces
document.getElementById('encenderLuces').addEventListener('click', () => {
  mostrarAlerta('Las luces están encendidas.');
  document.getElementById('apagarLuces').style.display = 'inline-block'; // Mostramos el botón de apagar
});

document.getElementById('apagarLuces').addEventListener('click', () => {
  mostrarAlerta('Las luces están apagadas.');
  document.getElementById('apagarLuces').style.display = 'none'; // Ocultamos el botón de apagar
});

// Fuego
document.getElementById('encenderFuego').addEventListener('click', () => {
  mostrarAlerta('El fuego está encendido en la cocina.');
  document.getElementById('apagarFuego').style.display = 'inline-block'; // Mostramos el botón de apagar
});

document.getElementById('apagarFuego').addEventListener('click', () => {
  mostrarAlerta('El fuego está apagado.');
  document.getElementById('apagarFuego').style.display = 'none'; // Ocultamos el botón de apagar
});

// ------------------ DETECCIÓN DE SONIDO DEL GRIFO ------------------

async function iniciarDeteccionSonido() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioContext.createMediaStreamSource(stream);
    const analyser = audioContext.createAnalyser();

    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    source.connect(analyser);

    function detectarGrifo() {
      analyser.getByteFrequencyData(dataArray);

      // Detectamos si hay un pico constante en las frecuencias medias-altas (ruido de agua)
      const media = dataArray.slice(30, 100); // Frecuencias medias-altas
      const promedio = media.reduce((acc, val) => acc + val, 0) / media.length;

      if (promedio > 70) {
        mostrarAlerta('¡Se ha detectado un sonido similar a un grifo abierto!');
        document.getElementById('apagarGrifo').style.display = 'inline-block';
      }

      requestAnimationFrame(detectarGrifo);
    }

    detectarGrifo();
  } catch (err) {
    console.error('Error accediendo al micrófono:', err);
    alert('No se pudo acceder al micrófono.');
  }
}

// Iniciamos la detección de sonido al cargar
document.addEventListener('DOMContentLoaded', () => {
  iniciarDeteccionSonido();
});


// ------------------ DETECCIÓN REAL DE CAÍDA ------------------

const aceleracionUmbral = 25;

function iniciarDeteccionCaida() {
  window.addEventListener('devicemotion', (event) => {
    const acceleration = event.acceleration;
    if (!acceleration) return;

    const aceleracionTotal = Math.sqrt(
      Math.pow(acceleration.x || 0, 2) +
      Math.pow(acceleration.y || 0, 2) +
      Math.pow(acceleration.z || 0, 2)
    );

    if (aceleracionTotal > aceleracionUmbral) {
      mostrarAlerta('La persona ha sufrido una caída.');
      if (!document.getElementById('recoger')) {
        const btn = document.createElement('button');
        btn.id = 'recoger';
        btn.textContent = 'Recoger persona';
        btn.addEventListener('click', () => {
          mostrarAlerta('La persona ha sido ayudada.');
          btn.remove();
        });
        document.getElementById('controles').appendChild(btn);
      }
    }
  });
}

// ------------------ PEDIR PERMISO SI ES NECESARIO ------------------

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
          btnPermiso.remove();
        } else {
          alert('Permiso denegado para acceder al acelerómetro.');
        }
      } catch (e) {
        console.error(e);
      }
    } else {
      // No necesita permiso (Android)
      iniciarDeteccionCaida();
      iniciarDeteccionSonido();
      btnPermiso.remove();
    }
  });
});
