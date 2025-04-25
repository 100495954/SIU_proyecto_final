let socket = io();
let pc;
let remoteVideo;

export async function iniciarDeteccionTimbre() {
    try {
        const streamAudio = await navigator.mediaDevices.getUserMedia({ audio: true });
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const source = audioContext.createMediaStreamSource(streamAudio);
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        source.connect(analyser);

        function detectarTimbre() {
            analyser.getByteFrequencyData(dataArray);
            const average = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;

            if (average > 75) {
                const llamada = document.getElementById("llamada-timbre");
                if (llamada && llamada.style.display === "none") {
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
        alert('Error accediendo al micrófono: ' + err.message);
    }
}

function activarControlPorGiro(contexto) {
    const handler = (e) => {
        const umbral = 60;
        if (!e.gamma) return;

        if (contexto === "timbre") {
            if (e.gamma > umbral) {
                document.getElementById("llamada-timbre").style.display = "none";
                iniciarConexionVideo();
                window.removeEventListener("deviceorientation", handler);
            } else if (e.gamma < -umbral) {
                document.getElementById("llamada-timbre").style.display = "none";
                window.removeEventListener("deviceorientation", handler);
            }
        } else if (contexto === "videollamada") {
            if (e.gamma > umbral || e.gamma < -umbral) {
                colgarLlamada();
                window.removeEventListener("deviceorientation", handler);
            }
        }
    };

    window.addEventListener("deviceorientation", handler);
}

function iniciarConexionVideo() {
    pc = new RTCPeerConnection();

    const videoContainer = document.getElementById("videollamada");
    videoContainer.style.display = "block";
    videoContainer.innerHTML = ""; // Limpiar por si acaso

    remoteVideo = document.createElement("video");
    remoteVideo.autoplay = true;
    remoteVideo.playsInline = true;
    remoteVideo.style.width = "100vw";
    remoteVideo.style.height = "100vh";
    remoteVideo.style.objectFit = "cover";
    videoContainer.appendChild(remoteVideo);

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

    socket.on("colgar", colgarLlamada);
}

function colgarLlamada() {
    const videoContainer = document.getElementById("videollamada");

    if (remoteVideo?.srcObject) {
        remoteVideo.srcObject.getTracks().forEach(track => track.stop());
    }

    if (remoteVideo?.parentNode) {
        remoteVideo.parentNode.removeChild(remoteVideo);
    }

    remoteVideo = null;

    if (pc) {
        pc.close();
        pc = null;
    }

    videoContainer.style.display = "none";
    videoContainer.innerHTML = "";

    socket.emit("colgar");
}



