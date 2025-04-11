// Inicializamos la posición de la persona
let x = 240; // posición horizontal
let y = 500; // posición vertical
const paso = 10; // Cuánto mueve cada tecla

// Elementos del DOM
const persona = document.getElementById('persona');
const mensaje = document.createElement('p'); // Elemento donde se mostrarán las alertas
document.getElementById('controles').appendChild(mensaje); // Lo añadimos al div de controles
const svg = document.getElementById("svgContainer"); // Replace with your SVG element's actual ID
const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");

function CrearPersona(x, y, circle, svg) {
  circle.setAttribute("cx", x);
  circle.setAttribute("cy", y);
  circle.setAttribute("r", 5);
  circle.setAttribute("fill", "red");

  svg.appendChild(circle);

  return circle;
}


// Estado de las alertas para cada tipo
const estadosAlertas = {
  grifo: false,  // Si ya hay alerta del grifo
  luces: false,  // Si ya hay alerta de luces
  fuego: false,  // Si ya hay alerta del fuego
  caida: false   // Si ya hay alerta de caída
};

// Contenedor de alertas (para que no se solapen)
const contenedorAlertas = document.createElement('div');
document.getElementById('controles').appendChild(contenedorAlertas);

// Función para actualizar la posición de la persona


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
  circle.setAttribute("cx", x);
  circle.setAttribute("cy", y);
});

// Llamamos a la función de inicialización
CrearPersona(x,y, circle, svg);

// ------------------ ALERTAS ------------------

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

// Botón de control para el fuego de la cocina
document.getElementById('encenderFuego').addEventListener('click', () => {
  mostrarAlerta('fuego', 'El fuego está encendido en la cocina.');
  document.getElementById('apagarFuego').style.display = 'inline-block'; // Mostramos el botón de apagar
});

document.getElementById('apagarFuego').addEventListener('click', () => {
  mostrarAlerta('fuego', 'El fuego está apagado.');
  document.getElementById('apagarFuego').style.display = 'none'; // Ocultamos el botón de apagar
});

// ------------------ DETECCION SONIDO REAL GRIFO -----------------------------

let audioContext;
let analyserMic, analyserReference;
let micStream;
let referenceBuffer;
let grifoActivado = false;

async function cargarHuellaGrifo() {
  audioContext = new (window.AudioContext || window.webkitAudioContext)();

  const response = await fetch('grifo.mp3');
  const arrayBuffer = await response.arrayBuffer();
  referenceBuffer = await audioContext.decodeAudioData(arrayBuffer);
}

async function detectarSonidoGrifoReal() {
  if (!referenceBuffer) {
    console.error("La huella del grifo no está cargada.");
    return;
  }

  // Captura el micrófono
  micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const micSource = audioContext.createMediaStreamSource(micStream);

  analyserMic = audioContext.createAnalyser();
  analyserMic.fftSize = 2048;
  micSource.connect(analyserMic);

  // Crea un análisis del sonido de referencia
  const referenceSource = audioContext.createBufferSource();
  referenceSource.buffer = referenceBuffer;
  analyserReference = audioContext.createAnalyser();
  analyserReference.fftSize = 2048;

  const referenceGain = audioContext.createGain();
  referenceGain.gain.value = 0; // silencio para no reproducir

  referenceSource.connect(analyserReference).connect(referenceGain).connect(audioContext.destination);
  referenceSource.start();

  const refData = new Uint8Array(analyserReference.frequencyBinCount);
  const micData = new Uint8Array(analyserMic.frequencyBinCount);

  function compararEspectros(ref, mic) {
    let sum = 0;
    for (let i = 0; i < ref.length; i++) {
      const diff = Math.abs(ref[i] - mic[i]);
      sum += diff;
    }
    return sum / ref.length;
  }

  function detectar() {
    analyserReference.getByteFrequencyData(refData);
    analyserMic.getByteFrequencyData(micData);

    const diferencia = compararEspectros(refData, micData);

    if (diferencia < 25 && !grifoActivado) {
      grifoActivado = true;
      console.log("¡Grifo detectado!");
      document.getElementById("apagarGrifo").style.display = "inline-block";
      // Aquí puedes emitir el evento por socket si lo necesitas
    }

    requestAnimationFrame(detectar);
  }

  detectar();
}

document.addEventListener("DOMContentLoaded", () => {
  cargarHuellaGrifo().then(() => {
    detectarSonidoGrifoReal();
  });
});

// Detección de caída
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
      mostrarAlerta('caida', 'La persona ha sufrido una caída.');
      if (!document.getElementById('recoger')) {
        const btn = document.createElement('button');
        btn.id = 'recoger';
        btn.textContent = 'Recoger persona';
        btn.addEventListener('click', () => {
          mostrarAlerta('caida', 'La persona ha sido ayudada.');
          btn.remove();
        });
        document.getElementById('controles').appendChild(btn);
      }
    }
  });
}

// Detección de luces
const brilloUmbral = 70;
let lucesEncendidas = false;
async function iniciarDeteccionLuces() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    const video = document.createElement('video');
    video.srcObject = stream;
    video.play();
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    function analizarBrillo() {
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        let brilloTotal = 0;
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          brilloTotal += (r + g + b) / 3;
        }
        const brilloPromedio = brilloTotal / (data.length / 4);
        
        if (brilloPromedio > brilloUmbral && !lucesEncendidas) {
          lucesEncendidas = true;
          mostrarAlerta('luces', 'Se han detectado luces encendidas en la habitación.');
          document.getElementById('apagarLuces').style.display = 'inline-block';
        } else if (brilloPromedio <= brilloUmbral && lucesEncendidas) {
          lucesEncendidas = false;
          document.getElementById('apagarLuces').style.display = 'none';
        }
      }
      
      requestAnimationFrame(analizarBrillo);
    }
    
    analizarBrillo();
    
  } catch (err) {
    console.error('Error accediendo a la cámara:', err);
    alert('No se pudo acceder a la cámara para detección de luces.');
  }
}

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