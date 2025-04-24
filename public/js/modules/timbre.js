let socket = io(); // Ya debería existir en tu archivo

export async function timbre() {
    try {
        const streamAudio = await navigator.mediaDevices.getUserMedia({ 
            audio: true,
            video: false
        });

        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const source = audioContext.createMediaStreamSource(streamAudio);
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        source.connect(analyser);

        function detectarTimbre() {
            analyser.getByteFrequencyData(dataArray);
            let sum = dataArray.reduce((a, b) => a + b, 0);
            const average = sum / bufferLength;

            if (average > 70) {
                const llamada = document.getElementById("llamada-timbre");
                if (llamada) {
                    llamada.style.display = 'flex';
                    socket.emit('Alerta', 'Timbre');
                }
            }
            requestAnimationFrame(detectarTimbre);
        }

        detectarTimbre();

    } catch (err) {
        console.error('Error en detección de timbre:', err);
        if (err.name === 'NotAllowedError') {
            alert('Por favor permite el acceso al micrófono en la configuración del navegador para usar la función de timbre.');
        } else {
            alert('Error técnico al configurar el timbre: ' + err.message);
        }
    }
}

function configurarSlider(idSlider, accionIzquierda, accionDerecha) {
  const slider = document.getElementById(idSlider);
  const thumb = slider.querySelector(".slider-thumb");

  let startX = 0;
  let currentX = 0;
  let dragging = false;

  const maxVisualMove = 50; // 🔧 Máximo desplazamiento visual en píxeles

  const mover = (clientX) => {
    if (!dragging) return;
    const deltaX = clientX - startX;
    currentX = deltaX;

    // 🔒 Limitar el movimiento visual del thumb
    const limitedX = Math.max(-maxVisualMove, Math.min(deltaX, maxVisualMove));
    thumb.style.transform = `translateX(${limitedX}px)`;
  };

  const terminar = () => {
    dragging = false;
    if (currentX < -slider.offsetWidth / 4) {
      accionIzquierda();
    } else if (currentX > slider.offsetWidth / 4) {
      accionDerecha();
    }
    thumb.style.transform = "translateX(0)"; // Reset visual
  };

  const inicio = (clientX) => {
    dragging = true;
    startX = clientX;
    currentX = 0;
  };

  // Eventos mouse
  thumb.addEventListener("mousedown", e => {
    inicio(e.clientX);
    thumb.style.cursor = "grabbing";
  });
  window.addEventListener("mousemove", e => mover(e.clientX));
  window.addEventListener("mouseup", () => {
    terminar();
    thumb.style.cursor = "grab";
  });

  // Eventos touch
  thumb.addEventListener("touchstart", e => inicio(e.touches[0].clientX));
  window.addEventListener("touchmove", e => mover(e.touches[0].clientX));
  window.addEventListener("touchend", terminar);

  // Cursor por defecto
  thumb.style.cursor = "grab";
}



export function configurarSliderTimbre() {
  configurarSlider("slider-timbre",
    () => { // Izquierda → Rechazar
      document.getElementById("llamada-timbre").style.display = "none";
    },
    () => { 
      iniciarConexionVideo();
    }
  );
}

export function configurarSliderColgar() {
  configurarSlider("slider-colgar",
    () => {
      colgarLlamada();
    },
    () => {
      colgarLlamada();
    }
  );
}

function colgarLlamada() {
  if (remoteVideo) {
    remoteVideo.pause();
    remoteVideo.srcObject = null;
    remoteVideo.remove();
  }
  if (pc) {
    pc.close();
    pc = null;
  }
  document.getElementById("videollamada").style.display = "none";
  socket.emit("colgar");
}


let pc;
let remoteVideo;
function iniciarConexionVideo() {
  pc = new RTCPeerConnection();

  remoteVideo = document.createElement("video");
  remoteVideo.autoplay = true;
  remoteVideo.playsInline = true;
  remoteVideo.style.position = "fixed";
  remoteVideo.style.top = "0";
  remoteVideo.style.left = "0";
  remoteVideo.style.width = "100vw";
  remoteVideo.style.height = "100vh";
  remoteVideo.style.objectFit = "cover";
  remoteVideo.style.zIndex = "9999";
  remoteVideo.style.backgroundColor = "black";
  document.body.appendChild(remoteVideo);

  pc.ontrack = (event) => {
    console.log("📹 Video recibido");
    remoteVideo.srcObject = event.streams[0];
  };

  pc.onicecandidate = (event) => {
    if (event.candidate) {
      socket.emit("ice-candidate", { candidate: event.candidate });
    }
  };

  socket.emit("viewer-ready");

  socket.on("offer", async ({ offer }) => {
    console.log("📨 Oferta recibida");
    await pc.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);
    socket.emit("answer", { answer });
  });

  socket.on("ice-candidate", async ({ candidate }) => {
    if (candidate) {
      try {
        await pc.addIceCandidate(new RTCIceCandidate(candidate));
      } catch (e) {
        console.error("Error con ICE candidate:", e);
      }
    }
  });
}


