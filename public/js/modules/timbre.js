let socket = io(); // Mover la inicialización de socket aquí

export async function timbre() {
    try {
        // Primero solicitar solo el micrófono (requerido para el timbre)
        const streamAudio = await navigator.mediaDevices.getUserMedia({ 
            audio: true,
            video: false // No pedir video inicialmente
        });

        // Configurar análisis de audio
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const source = audioContext.createMediaStreamSource(streamAudio);
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        source.connect(analyser);

        // Función de detección
        function detectarTimbre() {
            analyser.getByteFrequencyData(dataArray);
            let sum = dataArray.reduce((a, b) => a + b, 0);
            const average = sum / bufferLength;

            if (average > 100) { // Umbral ajustable
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
        // Mostrar mensaje más específico
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