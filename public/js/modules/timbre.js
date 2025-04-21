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

            if (average > 100) {
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

export function configurarBotonRechazar(){
    const btn = document.getElementById('rechazar');
    if (!btn) return;
    btn.addEventListener('click',()=>{
      document.getElementById('llamada-timbre').style.display = 'none';
    })
}

// NUEVO: Lógica de aceptar llamada y recibir el stream
let pc;
let remoteVideo;

export function configurarBotonAceptar() {
  const aceptarBtn = document.getElementById("acp");
  if (!aceptarBtn) return;

  aceptarBtn.addEventListener("click", () => {
    document.getElementById("llamada-timbre").style.display = "none";
    iniciarConexionVideo();
  });
}

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


