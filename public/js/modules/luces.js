import { mostrarAlerta, estadosAlertas } from './alertas.js';

const brilloUmbral = 70;
let lucesEncendidas = false;
export async function iniciarDeteccionLuces() {
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
          const btn = document.getElementById('apagarLuces');
          if (btn) btn.style.display = 'inline-block';
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

// Configuración del botón para apagar las luces
export function configurarBotonApagarLuces() {
  const btn = document.getElementById('apagarLuces');
  if (!btn) return;
  
  btn.addEventListener('click', () => {
    // Eliminar alerta de luces
    const alertaLuces = document.getElementById('alerta-luces');
    if (alertaLuces) alertaLuces.remove();

    // Mostrar resolución
    mostrarAlerta('luces', 'Las luces están apagadas.');
    btn.style.display = 'none';

    // Restablecer estado
    estadosAlertas.luces = false;
  });
}
