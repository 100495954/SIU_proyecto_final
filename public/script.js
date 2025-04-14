

// Elementos del DOM
const mensaje = document.createElement('p'); // Elemento donde se mostrarán las alertas
document.getElementById('controles').appendChild(mensaje); // Lo añadimos al div de controles



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

// Detección de sonido del grifo
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

      const media = dataArray.slice(30, 100); // Frecuencias medias-altas
      const promedio = media.reduce((acc, val) => acc + val, 0) / media.length;

      if (promedio > 70) {
        mostrarAlerta('grifo', '¡Se ha detectado un sonido similar a un grifo abierto!');
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

// ------------------ Comunicación con la otra pantalla ------------------

const socket = io(); // Conexión a Socket.io
document.querySelector('#llamar').addEventListener('click', () => {
  socket.emit('Alerta', 'Llamada'); // Emitir evento de caída
})
document.querySelector('#timbre').addEventListener('click', () => {
  socket.emit('Alerta', 'Timbre'); // Emitir evento de timbre
})

// socket.emit('Alerta', 'Caida') // Poner este código para cambiar el estado de la pantalla del cuidador a modo caída
// socket.emit('Alerta', 'Timbre') // Poner este código para cambiar el estado de la pantalla del cuidador a modo timbre