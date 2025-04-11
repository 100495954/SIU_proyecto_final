// Función para crear y gestionar la persona en el mapa
export function inicializarPersona() {
  // Inicializamos la posición de la persona
  let x = 240; // posición horizontal
  let y = 480; // posición vertical
  const paso = 10; // Cuánto mueve cada tecla

  // Elementos del DOM
  const mensaje = document.createElement('p'); // Elemento donde se mostrarán las alertas
  document.getElementById('controles').appendChild(mensaje);
  const svg = document.getElementById("svgContainer");
  const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");

  // Crear representación visual de la persona
  function crearPersona(x, y, circle, svg) {
    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
    circle.setAttribute("r", 5);
    circle.setAttribute("fill", "red");

    svg.appendChild(circle);

    return circle;
  }

  // Configurar control de movimiento con teclado
  function configurarMovimiento() {
    document.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'ArrowUp':
          y = Math.max(0, y - paso);  // Límite superior
          break;
        case 'ArrowDown':
          y = Math.min(480, y + paso); // Límite inferior
          break;
        case 'ArrowLeft':
          x = Math.max(0, x - paso);  // Límite izquierdo
          break;
        case 'ArrowRight':
          x = Math.min(480, x + paso); // Límite derecho
          break;
      }
      circle.setAttribute("cx", x);
      circle.setAttribute("cy", y);
    });
  }

  // Iniciar la persona
  crearPersona(x, y, circle, svg);
  configurarMovimiento();

  // Exportamos un objeto con métodos y propiedades que podrían ser útiles
  return {
    getPosition: () => ({ x, y }),
    setPosition: (newX, newY) => {
      x = newX;
      y = newY;
      circle.setAttribute("cx", x);
      circle.setAttribute("cy", y);
    },
    elemento: circle
  };
}