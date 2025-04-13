// alertas.js

// Estado de las alertas para cada tipo
export const estadosAlertas = {
  grifo: false,
  luces: false,
  fuego: false,
  caida: false
};

// Contenedor de alertas
const contenedorAlertas = document.createElement('div');
document.getElementById('controles').appendChild(contenedorAlertas);

// Función para mostrar una alerta
export function mostrarAlerta(tipo, texto) {
  if (estadosAlertas[tipo]) return;

  estadosAlertas[tipo] = true;

  const nuevaAlerta = document.createElement('p');
  nuevaAlerta.textContent = texto;
  nuevaAlerta.style.fontWeight = 'bold';
  nuevaAlerta.style.color = 'green';
  nuevaAlerta.id = `alerta-${tipo}`;
  contenedorAlertas.appendChild(nuevaAlerta);

  const resoluciones = [
    'El grifo está apagado.',
    'Las luces están apagadas.',
    'La persona ha sido ayudada.'
  ];

  if (resoluciones.includes(texto)) {
    setTimeout(() => {
      nuevaAlerta.remove();
      estadosAlertas[tipo] = false;
    }, 10000);
  }
}
