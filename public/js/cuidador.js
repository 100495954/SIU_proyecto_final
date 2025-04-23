const socket = io();

// Si se llama al timbre, notificar al servidor
document.getElementById('timbre').addEventListener('click', function() {
  socket.emit('Timbre');
});

document.getElementById('emergencias').addEventListener('click', function() {
  alert('Alerta enviada a emergencias');
});

// Si se detecta una caida, redirigir a la página de caida
socket.on('Caida', () => window.location.href = '/caida-cuidador.html');

const alertasContainer = document.getElementById('alertasContainer');

// Manejar alerta de grifo abierto
socket.on('Grifo', (data) => {
    // Evitar duplicados
    if (document.getElementById('alerta-grifo')) return;
    
    const alerta = document.createElement('div');
    alerta.id = 'alerta-grifo';
    alerta.className = 'alerta alerta-grifo';
    alerta.innerHTML = `
    <span>${data.mensaje}</span>
    <button class="btn-resolver" onclick="resolverGrifo()">Apagar grifo</button>
    `;
    alertasContainer.appendChild(alerta);
});

// Manejar alerta de luces encendidas
socket.on('Luces', (data) => {
    if (document.getElementById('alerta-luces')) return;
    
    const alerta = document.createElement('div');
    alerta.id = 'alerta-luces';
    alerta.className = 'alerta alerta-luces';
    alerta.innerHTML = `
    <span>${data.mensaje}</span>
    <button class="btn-resolver" onclick="resolverLuces()">Apagar luces</button>
    `;
    alertasContainer.appendChild(alerta);
});

socket.on('LucesApagadas', () => {
    const alerta = document.getElementById('alerta-luces');
    if (alerta) {
        alerta.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => alerta.remove(), 300);
    }
});

// Funciones para resolver alertas
window.resolverGrifo = function() {
    const alerta = document.getElementById('alerta-grifo');
    if (alerta) {
    alerta.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(() => alerta.remove(), 300);
    }
    document.getElementById('apagarGrifo').style.display = 'none';
    socket.emit('GrifoApagado');
};

window.resolverLuces = function() {
    const alerta = document.getElementById('alerta-luces');
    if (alerta) {
    alerta.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(() => alerta.remove(), 300);
    }
    socket.emit('LucesApagadas');
};
