let socket = io();
let pc;
let remoteVideo;

export async function timbre() {
    try {
        // Acceso al micrófono
        const streamAudio = await navigator.mediaDevices.getUserMedia({ 
            audio: true,
            video: false
        });

        // Analizador de audio para detectar el timbre
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const source = audioContext.createMediaStreamSource(streamAudio);
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        source.connect(analyser);

        // Función para detectar el timbre
        function detectarTimbre() {
            analyser.getByteFrequencyData(dataArray);
            let sum = dataArray.reduce((a, b) => a + b, 0);
            const average = sum / bufferLength;

            if (average > 70) {
                // Si se detecta un timbre, mostrar la interfaz
                const llamada = document.getElementById("llamada-timbre");
                if (llamada) {
                    llamada.style.display = 'flex';
                    socket.emit('Alerta', 'Timbre');
                    activarControlPorGiro("timbre");
                }
            }

            requestAnimationFrame(detectarTimbre);
        }

        detectarTimbre();

    } catch (err) {
        console.error('Error en detección de timbre:', err);
        if (err.name === 'NotAllowedError') {
            alert('Por favor permite el acceso al micrófono.');
        } else {
            alert('Error técnico: ' + err.message);
        }
    }
}

// Función que se activa con el giroscopio
function activarControlPorGiro(contexto) {
    window.addEventListener('deviceorientation', (e) => {
        if (!e.gamma) return;

        const umbral = 20; // Umbral de giro
        if (contexto === "timbre") {
            if (e.gamma > umbral) {
                // Aceptar llamada al timbre
                document.getElementById("llamada-timbre").style.display = "none";
                iniciarConexionVideo();
            } else if (e.gamma < -umbral) {
                // Rechazar llamada al timbre
                document.getElementById("llamada-timbre").style.display = "none";
            }
        } else if (contexto === "videollamada") {
            if (e.gamma > umbral || e.gamma < -umbral) {
                // Colgar llamada
                colgarLlamada();
            }
        }
    });
}

// Función para iniciar la conexión de video
function iniciarConexionVideo() {
    pc = new RTCPeerConnection();

    remoteVideo = document.createElement("video");
    remoteVideo.id = "video";
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
        remoteVideo.srcObject = event.streams[0];
    };

    pc.onicecandidate = (event) => {
        if (event.candidate) {
            socket.emit("ice-candidate", { candidate: event.candidate });
        }
    };

    socket.emit("viewer-ready");

    socket.on("offer", async ({ offer }) => {
        await pc.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        socket.emit("answer", { answer });
        document.getElementById("videollamada").style.display = "block";
        activarControlPorGiro("videollamada");
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

// Función para colgar la videollamada
function colgarLlamada() {
  const videoContainer = document.getElementById("videollamada");

  if (remoteVideo) {
      // Detener todas las pistas del stream si existe
      const stream = remoteVideo.srcObject;
      if (stream) {
          stream.getTracks().forEach(track => track.stop());
      }

      remoteVideo.pause();
      remoteVideo.srcObject = null;

      // Eliminar del DOM si fue añadido dinámicamente
      if (remoteVideo.parentNode) {
          remoteVideo.parentNode.removeChild(remoteVideo);
      }

      remoteVideo = null;
  }

  if (pc) {
      pc.close();
      pc = null;
  }

  // Ocultar el contenedor de video
  if (videoContainer) {
      videoContainer.style.display = "none";
      videoContainer.innerHTML = ""; // Limpiar contenido por si acaso
  }

  socket.emit("colgar");
}



