export function inicializarMapa() {
  
  let x = 60; // posición horizontal
  let y = 440; // posición vertical
  const paso = 10; // Cuánto mueve cada tecla
  // Mapeo de la casa
  let roomPath = [
      [ 2, 0],
      [ 4, 0],
      [ 6, 0],
      [ 8, 0],
      [ 10, 0],
      [ 12, 0],
      [ 12, -2],
      [ 14, -2],
      [ 14, 0],
      [ 14, 2],
      [ 14, 4],
      [ 16, 4],
      [ 18, 4],
      [ 20, 4],
      [ 22, 4],
      [ 24, 4],
      [ 26, 4],
      [ 28, 4],
      [ 30, 4],
      [ 32, 4],
      [ 34, 4],
      [ 36, 4],
      [ 38, 4],
      [ 40, 4],
      [ 42, 4],
      [ 44, 4],
      [ 44, 2],
      [ 44, 0],
      [ 44, -2],
      [ 44, -4],
      [ 42, -4],
      [ 42, -6],
      [ 44, -6],
      [ 46, -6],
      [ 48, -6],
      [ 50, -6],
      [ 52, -6],
      [ 54, -6],
      [ 56, -6],
      [ 58, -6],
      [ 58, -8],
      [ 58, -10],
      [ 58, -12],
      [ 58, -14],
      [ 58, -16],
      [ 58, -18],
      [ 56, -18],
      [ 54, -18],
      [ 52, -18],
      [ 50, -18],
      [ 48, -18],
      [ 46, -18],
      [ 44, -18],
      [ 42, -18],
      [ 40, -18],
      [ 40, -16],
      [ 40, -14],
      [ 40, -12],
      [ 40, -10],
      [ 40, -8],
      [ 40, -6],
      [ 40, -4],
      [ 38, -4],
      [ 38, -6],
      [ 38, -8],
      [ 38, -10],
      [ 38, -12],
      [ 36, -12],
      [ 34, -12],
      [ 32, -12],
      [ 30, -12],
      [ 28, -12],
      [ 26, -12],
      [ 24, -12],
      [ 22, -12],
      [ 20, -12],
      [ 18, -12],
      [ 16, -12],
      [ 14, -12],
      [ 14, -10],
      [ 14, -8],
      [ 14, -6],
      [ 14, -4],
      [ 12, -4],
      [ 12, -6],
      [ 12, -8],
      [ 12, -10],
      [ 12, -12],
      [ 12, -14],
      [ 14, -14],
      [ 16, -14],
      [ 18, -14],
      [ 20, -14],
      [ 22, -14],
      [ 24, -14],
      [ 26, -14],
      [ 28, -14],
      [ 30, -14],
      [ 32, -14],
      [ 34, -14],
      [ 36, -14],
      [ 38, -14],
      [ 38, -16],
      [ 38, -18],
      [ 38, -20],
      [ 40, -20],
      [ 42, -20],
      [ 44, -20],
      [ 46, -20],
      [ 48, -20],
      [ 50, -20],
      [ 52, -20],
      [ 54, -20],
      [ 56, -20],
      [ 58, -20],
      [ 58, -22],
      [ 58, -24],
      [ 58, -26],
      [ 58, -28],
      [ 58, -30],
      [ 58, -32],
      [ 56, -32],
      [ 54, -32],
      [ 52, -32],
      [ 50, -32],
      [ 48, -32],
      [ 46, -32],
      [ 44, -32],
      [ 42, -32],
      [ 40, -32],
      [ 40, -34],
      [ 40, -36],
      [ 40, -38],
      [ 42, -38],
      [ 42, -36],
      [ 42, -34],
      [ 44, -34],
      [ 46, -34],
      [ 48, -34],
      [ 50, -34],
      [ 52, -34],
      [ 54, -34],
      [ 56, -34],
      [ 58, -34],
      [ 58, -36],
      [ 58, -38],
      [ 58, -40],
      [ 58, -42],
      [ 58, -44],
      [ 56, -44],
      [ 54, -44],
      [ 52, -44],
      [ 50, -44],
      [ 48, -44],
      [ 46, -44],
      [ 44, -44],
      [ 42, -44],
      [ 42, -42],
      [ 42, -40],
      [ 40, -40],
      [ 40, -42],
      [ 40, -44],
      [ 40, -46],
      [ 40, -48],
      [ 42, -48],
      [ 42, -46],
      [ 44, -46],
      [ 46, -46],
      [ 48, -46],
      [ 50, -46],
      [ 52, -46],
      [ 54, -46],
      [ 56, -46],
      [ 58, -46],
      [ 58, -48],
      [ 58, -50],
      [ 58, -52],
      [ 58, -54],
      [ 58, -56],
      [ 56, -56],
      [ 54, -56],
      [ 52, -56],
      [ 50, -56],
      [ 48, -56],
      [ 46, -56],
      [ 44, -56],
      [ 42, -56],
      [ 42, -54],
      [ 42, -52],
      [ 42, -50],
      [ 42, -50],
      [ 40, -50],
      [ 40, -52],
      [ 38, -52],
      [ 36, -52],
      [ 34, -52],
      [ 34, -48],
      [ 34, -46],
      [ 34, -44],
      [ 32, -44],
      [ 32, -46],
      [ 30, -46],
      [ 28, -46],
      [ 26, -46],
      [ 24, -46],
      [ 22, -46],
      [ 20, -46],
      [ 18, -46],
      [ 18, -44],
      [ 18, -42],
      [ 18, -40],
      [ 18, -38],
      [ 18, -36],
      [ 18, -34],
      [ 20, -34],
      [ 22, -34],
      [ 24, -34],
      [ 26, -34],
      [ 28, -34],
      [ 30, -34],
      [ 32, -34],
      [ 32, -36],
      [ 32, -38],
      [ 32, -40],
      [ 34, -40],
      [ 34, -38],
      [ 34, -36],
      [ 34, -34],
      [ 34, -32],
      [ 32, -32],
      [ 30, -32],
      [ 28, -32],
      [ 26, -32],
      [ 24, -32],
      [ 22, -32],
      [ 20, -32],
      [ 18, -32],
      [ 16, -32],
      [ 14, -32],
      [ 12, -32],
      [ 10, -32],
      [ 8, -32],
      [ 6, -32],
      [ 4, -32],
      [ 2, -32],
      [ 2, -30],
      [ 2, -28],
      [ 2, -26],
      [ 2, -24],
      [ 2, -22],
      [ 2, -20],
      [ 2, -18],
      [ 2, -16],
      [ 2, -14],
      [ 2, -12],
      [ 2, -10],
      [ 2, -8],
      [ 2, -6],
      [ 2, -4],
      [ 2, -2],
      [ 2, 0]
    ];
  let  cuartos = { 
    'labels': ['salon', 'cocina', 'pasillo', 'dormitorio1', 'dormitorio2', 'dormitorio3', 'bano'],
    'polygonos': [[[58,-20],[38,-20],[38,-14],[12,-14],[12,0],[2,0],[2,-32],[58,-32],[58,-20]],
                  [[14,4],[44,4],[44,-4],[38,-4],[38,-12],[14,-12],[14,4]],
                  [[34,-32],[34,-52],[40,-52],[40,-32]],
                  [[58,-6],[40,-18]],
                  [[32,-46],[18,-34]],
                  [[42,-56],[58,-46]],
                  [[58,-44],[42,-34]]]
  }
  
  // Coger los trazos de los cuartos 
  let list = cuartos['polygonos'];

  const svgContainer = document.getElementById('svgContainer');
  const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  const persona = document.getElementById('persona');
  const svg = svgContainer;
  const svgWidth = svg.width.baseVal.value;
  const svgHeight = svg.height.baseVal.value;

  const socket = io();

  // Declaración de las funciones usadas

  function CrearPersona(x, y, circle, svg) {
  circle.setAttribute("cx", x);
  circle.setAttribute("cy", y);
  circle.setAttribute("r", 7);
  circle.setAttribute("fill", "red");

  svg.appendChild(circle);

  return circle;
}

  function drawPolygon(path, className) {
    const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    const points = path.map(point => point.join(",")).join(" ");
    polygon.setAttribute("points", points);
    polygon.setAttribute("class", className);
    svgContainer.appendChild(polygon);
  }

  function coordenadasCuartoInter(point, poligono) {
  let [x, y] = point;
  let dentro = false;
  for (let i = 0, j = poligono.length - 1; i < poligono.length; j = i++) {
    let [xi, yi] = poligono[i];
    let [xj, yj] = poligono[j];

    let intersect = ((yi > y) !== (yj > y)) &&
                    (x < (xj - xi) * (y - yi) / (yj - yi + 0.00001) + xi);
    if (intersect) dentro = !dentro;
  }
  return dentro;
  }

  function buscaCuarto(x, y, poligonos) {
    for (let i = 0; i < poligonos.length; i++) {
      if (coordenadasCuartoInter([x,y], poligonos[i])) {
        return cuartos['labels'][i];
      }
    }
    return null; // No room matched
  }

  function conseguirminmaxcasa(path) {
    let minX = Infinity, minY = Infinity;
    let maxX = -Infinity, maxY = -Infinity;

    for (const [x, y] of path) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }

    return { minX, minY, maxX, maxY };
  }

  function obtenerfatorescalado(path) {
    const { minX, minY, maxX, maxY } = conseguirminmaxcasa(path);

    const scaleX = svgWidth / (maxX - minX);
    const scaleY = svgHeight / (maxY - minY);
    const scale = Math.min(scaleX, scaleY); // Maintain aspect ratio

    return scale;
  }

  function adjustCoordinates(path, shiftX, shiftY, scale) {
    return path.map(point => {
      return [
        (point[0] + shiftX) * scale, // Adjust and scale X coordinate
        (point[1] + shiftY) * scale  // Adjust and scale Y coordinate
      ];
    });
  }

  function getRectangleCorners(A, C) {
      const [x1, y1] = A;
      const [x2, y2] = C;
      const B = [x1, y2];
      const D = [x2, y1];
      return [A, B, C, D];
    }

  
  let { minX, minY, maxX, maxY } = conseguirminmaxcasa(roomPath);
  scale = obtenerfatorescalado(roomPath) - 1;

  roomPath = adjustCoordinates(roomPath,-(minX-5),-(minY-5), scale); // HAcemos que la casa esté centrada en el SVG

  drawPolygon(roomPath, 'outerRoom');
  // Adjust and draw the inner room
  let updatedRooms = [];
  for (let i = 0; i < list.length; i++) {
    if (list[i].length == 2) {
      [A, B] = list[i];
      room = getRectangleCorners(A, B);  
    } else {
      room = list[i];
    }
    const adjustedPath = adjustCoordinates(room,-(minX-5),-(minY-5), scale);
    updatedRooms.push(adjustedPath);
    const className = cuartos['labels'][i];
    drawPolygon(adjustedPath, className);
  }
  
  // Loop through each class and add event listener
  cuartos.labels.forEach(className => {
    const elementos = document.querySelectorAll(`.${className}`);
    elementos.forEach(el => {
      el.addEventListener('click', () => {
        socket.emit('Luces', className);
        if (el.style.fill === 'rgb(223, 220, 95)') {
        el.style.fill = 'rgb(190, 190, 190)';
      } else {
        el.style.fill = 'rgb(223, 220, 95)';}
      });
    });
  });

  // Movemos la persona según las flechas del teclado
  document.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'ArrowUp':
        socket.emit('Mover', e.key);
        y = Math.max(0, y - paso);  // Límite superior
        break;
      case 'ArrowDown':
        socket.emit('Mover', e.key);
        y = Math.min(480, y + paso); // Límite inferior
        break;
      case 'ArrowLeft':
        socket.emit('Mover', e.key);
        x = Math.max(0, x - paso);  // Límite izquierdo
        break;
      case 'ArrowRight':
        socket.emit('Mover', e.key);
        x = Math.min(480, x + paso); // Límite derecho
        break;
    }
    let cuarto = buscaCuarto(x, y, updatedRooms); // Llamamos a la función para buscar el cuarto
    console.log(cuarto);
    if (cuarto) {
      let elemento = document.querySelector(`.${cuarto}`);
      elemento.classList.add('seleccionado'); // Add the class to selected room

      cuartos['labels'].forEach(element => {
        if (element !== cuarto) {
          let otroElemento = document.querySelector(`.${element}`);
          otroElemento.classList.remove('seleccionado'); // Remove the class from others
        }
      });
    } else {
      console.log("Fuera de la casa");
    }

    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
  });

  // Llamamos a la función de inicialización
  CrearPersona(x,y, circle, svg);

}