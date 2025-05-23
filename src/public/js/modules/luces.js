const brilloUmbral = 70;
let lucesEncendidas = false;

export async function iniciarDeteccionLuces(cuartos) {
  try {

// Conexión a Socket.io
const socket = io(); 
    // Set up the video stream
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    const video = document.createElement('video');
    video.srcObject = stream;
    video.play();

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Function to turn off the lights in the rooms
    function apagarLuces(cuartos) {
      cuartos.forEach(element => {
        let cuarto = document.querySelector('.' + element);
        if (cuarto.style.fill === 'rgb(223, 220, 95)') {  // Check if light is on
          cuarto.style.fill = 'rgb(190, 190, 190)';  // Change light to off color
          socket.emit('Apagar_luces', { mensaje: element });
        }
      });
    }

    // Function to analyze the brightness from the video stream
    function analizarBrillo() {
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Draw the current video frame on the canvas
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Calculate the average brightness of the frame
        let brilloTotal = 0;
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          brilloTotal += (r + g + b) / 3;
        }
        const brilloPromedio = brilloTotal / (data.length / 4);

        // Turn off lights if brightness is below threshold
        if (brilloPromedio <= brilloUmbral && lucesEncendidas) {
          lucesEncendidas = false;
          apagarLuces(cuartos);  // Call function to turn off lights in rooms
        }

        // If brightness goes back up, we know the lights are on
        if (brilloPromedio > brilloUmbral && !lucesEncendidas) {
          lucesEncendidas = true;
        }
      }

      // Continue calling this function to analyze brightness
      requestAnimationFrame(analizarBrillo);
    }

    // Start the analysis when the camera is ready
    analizarBrillo();

  } catch (err) {
    console.error('Error accediendo a la cámara:', err);
    alert('No se pudo acceder a la cámara para detección de luces.');
  }
}
