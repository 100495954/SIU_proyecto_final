export class Persona {
  constructor(x, y, paso, svg, cuartos, socket, cuartosPoligonos) {
    this.x = x;
    this.y = y;
    this.paso = paso;
    this.svg = svg;
    this.cuartos = cuartos;
    this.socket = socket;
    this.cuartosPoligonos = cuartosPoligonos;

    this.circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    this.crearPersona();
    this.escucharMovimiento();
  }

  crearPersona() {
    this.circle.setAttribute("cx", this.x);
    this.circle.setAttribute("cy", this.y);
    this.circle.setAttribute("r", 7);
    this.circle.setAttribute("fill", "red");
    this.svg.appendChild(this.circle);
  }

  mover(dx, dy) {
    this.x = Math.max(0, Math.min(this.x + dx, 480));
    this.y = Math.max(0, Math.min(this.y + dy, 480));
    this.circle.setAttribute("cx", this.x);
    this.circle.setAttribute("cy", this.y);
    this.actualizarCuarto();
  }

  actualizarCuarto() {
    const cuarto = this.buscarCuarto(this.x, this.y, this.cuartosPoligonos);
    if (cuarto) {
      const elemento = document.querySelector(`.${cuarto}`);
      elemento.classList.add('seleccionado');

      this.cuartos.labels.forEach(label => {
        if (label !== cuarto) {
          const otro = document.querySelector(`.${label}`);
          otro?.classList.remove('seleccionado');
        }
      });
    } else {
      console.log("Fuera de la casa");
    }
  }

  buscarCuarto(x, y, poligonos) {
    for (let i = 0; i < poligonos.length; i++) {
      if (this.coordenadasCuartoInter([x, y], poligonos[i])) {
        return this.cuartos.labels[i];
      }
    }
    return null;
  }

  coordenadasCuartoInter([x, y], poligono) {
    let dentro = false;
    for (let i = 0, j = poligono.length - 1; i < poligono.length; j = i++) {
      const [xi, yi] = poligono[i];
      const [xj, yj] = poligono[j];

      const intersect = ((yi > y) !== (yj > y)) &&
                        (x < (xj - xi) * (y - yi) / (yj - yi + 0.00001) + xi);
      if (intersect) dentro = !dentro;
    }
    return dentro;
  }

  escucharMovimiento() {
    document.addEventListener('keydown', (e) => {
      let moved = false;
      switch (e.key) {
        case 'ArrowUp':
          this.mover(0, -this.paso);
          moved = true;
          break;
        case 'ArrowDown':
          this.mover(0, this.paso);
          moved = true;
          break;
        case 'ArrowLeft':
          this.mover(-this.paso, 0);
          moved = true;
          break;
        case 'ArrowRight':
          this.mover(this.paso, 0);
          moved = true;
          break;
      }

      if (moved) {
        this.socket.emit('Mover', e.key);
      }
    });
  }

  getEstado() {
    return [this.x, this.y];
  }
}
