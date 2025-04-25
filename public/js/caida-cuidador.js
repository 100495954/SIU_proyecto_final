const socket = io();
const alertasContainer = document.getElementById('alertas-container');

socket.on('Caida', (data) => {
  alertasContainer.innerHTML = `
    <div class="alerta alerta-caida">
      <strong>¡ALERTA!</strong> ${data.mensaje} (${new Date(data.timestamp).toLocaleTimeString()})
    </div>
    `;
});

socket.on('CaidaResuelta', (data) => {
  alertasContainer.innerHTML += `
    <div class="alerta alerta-resuelta">
      <strong>Resuelto:</strong> ${data.mensaje} (${new Date(data.timestamp).toLocaleTimeString()})
    </div>
  `;
});

socket.on('PedirAyuda', (data) => {
  alertasContainer.innerHTML += `
    <div class="alerta alerta-ayuda">
      <strong>¡ATENCIÓN!:</strong> ${'La persona ha solicitado ayuda.'} (${new Date(data.timestamp).toLocaleTimeString()})
    </div>
  `;
});

document.getElementById('volver').addEventListener('click', () => {
  window.location.href = '/cuidador.html';
});