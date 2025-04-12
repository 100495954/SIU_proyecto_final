import { mostrarAlerta, estadosAlertas } from './alertas.js';

export function iniciarDeteccionSonido() {
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();

      analyser.fftSize = 256;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      source.connect(analyser);

      function detectarGrifo() {
        analyser.getByteFrequencyData(dataArray);
        const media = dataArray.slice(30, 100);
        const promedio = media.reduce((acc, val) => acc + val, 0) / media.length;

        if (promedio > 110) {
          mostrarAlerta('grifo', '¡Se ha detectado un sonido similar a un grifo abierto!');
          const btn = document.getElementById('apagarGrifo');
          if (btn) btn.style.display = 'inline-block';
        }

        requestAnimationFrame(detectarGrifo);
      }

      detectarGrifo();
    })
    .catch(err => {
      console.error('Error accediendo al micrófono:', err);
      alert('No se pudo acceder al micrófono.');
    });
}

// Configuración del botón para apagar el grifo
export function configurarBotonApagarGrifo() {
  const btn = document.getElementById('apagarGrifo');
  if (!btn) return;

  btn.addEventListener('click', () => {
    // Eliminar alerta de sonido del grifo
    const alertaGrifo = document.getElementById('alerta-grifo');
    if (alertaGrifo) alertaGrifo.remove();

    // Mostrar resolución
    mostrarAlerta('grifo', 'El grifo está apagado.');
    btn.style.display = 'none';

    // Restablecer estado
    estadosAlertas.grifo = false;
  });
}
