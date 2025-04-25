const brilloUmbral = 70;
let lucesEncendidas = false;
export async function iniciarDeteccionLuces(cuartos) {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    const video = document.createElement('video');
    video.srcObject = stream;
    video.play();
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    function apagarLuces(cuartos) {
      cuartos.forEach(element => {

        let cuarto = document.querySelector('.' + element)
        if (cuarto.style.fill === 'rgb(223, 220, 95)') {
          cuarto.style.fill = 'rgb(190, 190, 190)';
          socket.emit('Apagar_luces', { mensaje: element });
        }
      });
    }

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
    
        if (brilloPromedio <= brilloUmbral && lucesEncendidas) {
          lucesEncendidas = false;
          apagarLuces(cuartos);
        }
    
        if (brilloPromedio > brilloUmbral && !lucesEncendidas) {
          lucesEncendidas = true;
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


