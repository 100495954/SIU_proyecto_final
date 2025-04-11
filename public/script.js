// ------------------------------ MAPA ------------------------------
const svgContainer = document.getElementById('svgContainer');
svgContainer.setAttribute("viewBox", "0 0 500 500");

function adjustCoordinates(path, shiftX, shiftY, scale) {
  return path.map(point => [(point[0] + shiftX) * scale, (point[1] + shiftY) * scale]);
}

function drawPolygon(path, className) {
  const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
  polygon.setAttribute("points", path.map(point => point.join(",")).join(" "));
  polygon.setAttribute("class", className);
  svgContainer.appendChild(polygon);
}

const roomPath = [
  [ 2, 0],
  [ 4, 0],
  [ 6, 0],
  [ 8, 0],
  [ 10, 0],
  [ 12, 0],
  [ 12, -2],
  [ 14, -2],
  [ 14, 0],
  [ 14, 2],
  [ 14, 4],
  [ 16, 4],
  [ 18, 4],
  [ 20, 4],
  [ 22, 4],
  [ 24, 4],
  [ 26, 4],
  [ 28, 4],
  [ 30, 4],
  [ 32, 4],
  [ 34, 4],
  [ 36, 4],
  [ 38, 4],
  [ 40, 4],
  [ 42, 4],
  [ 44, 4],
  [ 44, 2],
  [ 44, 0],
  [ 44, -2],
  [ 44, -4],
  [ 42, -4],
  [ 42, -6],
  [ 44, -6],
  [ 46, -6],
  [ 48, -6],
  [ 50, -6],
  [ 52, -6],
  [ 54, -6],
  [ 56, -6],
  [ 58, -6],
  [ 58, -8],
  [ 58, -10],
  [ 58, -12],
  [ 58, -14],
  [ 58, -16],
  [ 58, -18],
  [ 56, -18],
  [ 54, -18],
  [ 52, -18],
  [ 50, -18],
  [ 48, -18],
  [ 46, -18],
  [ 44, -18],
  [ 42, -18],
  [ 40, -18],
  [ 40, -16],
  [ 40, -14],
  [ 40, -12],
  [ 40, -10],
  [ 40, -8],
  [ 40, -6],
  [ 40, -4],
  [ 38, -4],
  [ 38, -6],
  [ 38, -8],
  [ 38, -10],
  [ 38, -12],
  [ 36, -12],
  [ 34, -12],
  [ 32, -12],
  [ 30, -12],
  [ 28, -12],
  [ 26, -12],
  [ 24, -12],
  [ 22, -12],
  [ 20, -12],
  [ 18, -12],
  [ 16, -12],
  [ 14, -12],
  [ 14, -10],
  [ 14, -8],
  [ 14, -6],
  [ 14, -4],
  [ 12, -4],
  [ 12, -6],
  [ 12, -8],
  [ 12, -10],
  [ 12, -12],
  [ 12, -14],
  [ 14, -14],
  [ 16, -14],
  [ 18, -14],
  [ 20, -14],
  [ 22, -14],
  [ 24, -14],
  [ 26, -14],
  [ 28, -14],
  [ 30, -14],
  [ 32, -14],
  [ 34, -14],
  [ 36, -14],
  [ 38, -14],
  [ 38, -16],
  [ 38, -18],
  [ 38, -20],
  [ 40, -20],
  [ 42, -20],
  [ 44, -20],
  [ 46, -20],
  [ 48, -20],
  [ 50, -20],
  [ 52, -20],
  [ 54, -20],
  [ 56, -20],
  [ 58, -20],
  [ 58, -22],
  [ 58, -24],
  [ 58, -26],
  [ 58, -28],
  [ 58, -30],
  [ 58, -32],
  [ 56, -32],
  [ 54, -32],
  [ 52, -32],
  [ 50, -32],
  [ 48, -32],
  [ 46, -32],
  [ 44, -32],
  [ 42, -32],
  [ 40, -32],
  [ 40, -34],
  [ 40, -36],
  [ 40, -38],
  [ 42, -38],
  [ 42, -36],
  [ 42, -34],
  [ 44, -34],
  [ 46, -34],
  [ 48, -34],
  [ 50, -34],
  [ 52, -34],
  [ 54, -34],
  [ 56, -34],
  [ 58, -34],
  [ 58, -36],
  [ 58, -38],
  [ 58, -40],
  [ 58, -42],
  [ 58, -44],
  [ 56, -44],
  [ 54, -44],
  [ 52, -44],
  [ 50, -44],
  [ 48, -44],
  [ 46, -44],
  [ 44, -44],
  [ 42, -44],
  [ 42, -42],
  [ 42, -40],
  [ 40, -40],
  [ 40, -42],
  [ 40, -44],
  [ 40, -46],
  [ 40, -48],
  [ 42, -48],
  [ 42, -46],
  [ 44, -46],
  [ 46, -46],
  [ 48, -46],
  [ 50, -46],
  [ 52, -46],
  [ 54, -46],
  [ 56, -46],
  [ 58, -46],
  [ 58, -48],
  [ 58, -50],
  [ 58, -52],
  [ 58, -54],
  [ 58, -56],
  [ 56, -56],
  [ 54, -56],
  [ 52, -56],
  [ 50, -56],
  [ 48, -56],
  [ 46, -56],
  [ 44, -56],
  [ 42, -56],
  [ 42, -54],
  [ 42, -52],
  [ 42, -50],
  [ 42, -50],
  [ 40, -50],
  [ 40, -52],
  [ 38, -52],
  [ 36, -52],
  [ 34, -52],
  [ 34, -48],
  [ 34, -46],
  [ 34, -44],
  [ 32, -44],
  [ 32, -46],
  [ 30, -46],
  [ 28, -46],
  [ 26, -46],
  [ 24, -46],
  [ 22, -46],
  [ 20, -46],
  [ 18, -46],
  [ 18, -44],
  [ 18, -42],
  [ 18, -40],
  [ 18, -38],
  [ 18, -36],
  [ 18, -34],
  [ 20, -34],
  [ 22, -34],
  [ 24, -34],
  [ 26, -34],
  [ 28, -34],
  [ 30, -34],
  [ 32, -34],
  [ 32, -36],
  [ 32, -38],
  [ 32, -40],
  [ 34, -40],
  [ 34, -38],
  [ 34, -36],
  [ 34, -34],
  [ 34, -32],
  [ 32, -32],
  [ 30, -32],
  [ 28, -32],
  [ 26, -32],
  [ 24, -32],
  [ 22, -32],
  [ 20, -32],
  [ 18, -32],
  [ 16, -32],
  [ 14, -32],
  [ 12, -32],
  [ 10, -32],
  [ 8, -32],
  [ 6, -32],
  [ 4, -32],
  [ 2, -32],
  [ 2, -30],
  [ 2, -28],
  [ 2, -26],
  [ 2, -24],
  [ 2, -22],
  [ 2, -20],
  [ 2, -18],
  [ 2, -16],
  [ 2, -14],
  [ 2, -12],
  [ 2, -10],
  [ 2, -8],
  [ 2, -6],
  [ 2, -4],
  [ 2, -2],
  [ 2, 0]
];

// Ajuste de coordenadas
const shiftX = 0;
const shiftY = 60;
const scale = 7.5;

// Dibujar contorno principal
const adjustedRoomPath = adjustCoordinates(roomPath, shiftX, shiftY, scale);
drawPolygon(adjustedRoomPath, "outerRoom");

// Definición de cuartos (agregar 'const' para evitar variable global)
const cuartos = { 
  'labels': ['salon', 'cocina', 'pasillo', 'dormitorio1', 'dormitorio2', 'dormitorio3', 'bano'],
  'polygonos': [[[58,-20],[38,-20],[38,-14],[12,-14],[12,0],[2,0],[2,-32],[58,-32],[58,-20]],
  [[14,4],[44,4],[44,-4],[38,-4],[38,-12],[14,-12],[14,4]],
  [[34,-32],[34,-52],[40,-52],[40,-32]],
  [[58,-6],[40,-18]],
  [[32,-46],[18,-34]],
  [[42,-56],[58,-46]],
  [[58,-44],[42,-34]]]
};

function getRectangleCorners(A, C) {
  return [A, [A[0], C[1]], C, [C[0], A[1]]];
}

// Dibujar habitaciones internas
cuartos.polygonos.forEach((room, i) => {
  let adjustedPath;
  if (room.length === 2) {
    adjustedPath = adjustCoordinates(getRectangleCorners(...room), shiftX, shiftY, scale);
  } else {
    adjustedPath = adjustCoordinates(room, shiftX, shiftY, scale);
  }
  drawPolygon(adjustedPath, cuartos.labels[i]);
});

// Inicializamos la posición de la persona
let x = 240; // posición horizontal
let y = 480; // posición vertical
const paso = 10; // Cuánto mueve cada tecla

// Elementos del DOM
const persona = document.getElementById('persona');
const mensaje = document.createElement('p'); // Elemento donde se mostrarán las alertas
document.getElementById('controles').appendChild(mensaje); // Lo añadimos al div de controles
const svg = document.getElementById("svgContainer");
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
  nuevaAlerta.id = `alerta-${tipo}`; // ID único
  contenedorAlertas.appendChild(nuevaAlerta);

  // Solo los mensajes de resolución se ocultan tras 10 segundos
  const resoluciones = [
    'El grifo está apagado.',
    'Las luces están apagadas.',
    'La persona ha sido ayudada.'
  ];

  if (resoluciones.includes(texto)) {
    setTimeout(() => {
      nuevaAlerta.remove();
      estadosAlertas[tipo] = false; // Restablecer el estado cuando se resuelve el problema
    }, 10000);
  }
}

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

      if (promedio > 140) {
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

// Botón para apagar el grifo
document.getElementById('apagarGrifo').addEventListener('click', () => {
  // Eliminar la alerta original
  const alertaOriginal = document.getElementById('alerta-grifo');
  if (alertaOriginal) {
    alertaOriginal.remove();
  }
  
  // Mostrar mensaje de resolución
  mostrarAlerta('grifo', 'El grifo está apagado.');
  document.getElementById('apagarGrifo').style.display = 'none';
  
  // Restablecer estado inmediatamente
  estadosAlertas.grifo = false;
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
          // Eliminar alerta existente
          const alertaLuces = document.getElementById('alerta-luces');
          if (alertaLuces) alertaLuces.remove();

          // Mostrar resolución y restablecer estado
          mostrarAlerta('luces', 'Las luces están apagadas.');
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

// Botón para apagar luces
document.getElementById('apagarLuces').addEventListener('click', () => {
  const alertaOriginal = document.getElementById('alerta-luces');
  if (alertaOriginal) alertaOriginal.remove();
  
  mostrarAlerta('luces', 'Las luces están apagadas.');
  document.getElementById('apagarLuces').style.display = 'none';
  estadosAlertas.luces = false;
});

// Pedir permisos al usuario para acceder a los sensores, la cámara y el micrófono
document.addEventListener('DOMContentLoaded', () => {
  const btnPermiso = document.getElementById('boton-permiso')
  btnPermiso.addEventListener('click', async () => {
    if (typeof DeviceMotionEvent?.requestPermission === 'function') {
      try {
        // Pedir permiso para el sensor de movimiento
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
