export function inicializarMapa() {

  let room;
  let A, B;
  
  let x = 60; // posición horizontal
  let y = 400; // posición vertical
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
  function mover (x,y, updatedRooms) {

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
      }
 // Asincrona por que necesita parar entre pasos
  async function caminar(updatedRooms) {
        let caminos = [
          [
            [
              65,
              390
            ],
            [
              65,
              385
            ],
            [
              65,
              380
            ],
            [
              65,
              375
            ],
            [
              65,
              370
            ],
            [
              65,
              365
            ],
            [
              65,
              360
            ],
            [
              65,
              355
            ],
            [
              65,
              350
            ],
            [
              65,
              345
            ],
            [
              65,
              340
            ],
            [
              65,
              335
            ],
            [
              65,
              330
            ],
            [
              65,
              325
            ],
            [
              65,
              320
            ],
            [
              65,
              315
            ],
            [
              65,
              310
            ],
            [
              65,
              305
            ],
            [
              65,
              300
            ],
            [
              65,
              295
            ],
            [
              65,
              290
            ],
            [
              65,
              285
            ],
            [
              65,
              280
            ],
            [
              65,
              275
            ],
            [
              65,
              270
            ],
            [
              65,
              265
            ],
            [
              70,
              265
            ],
            [
              75,
              265
            ],
            [
              80,
              265
            ],
            [
              85,
              265
            ],
            [
              90,
              265
            ],
            [
              95,
              265
            ],
            [
              100,
              265
            ],
            [
              105,
              265
            ],
            [
              110,
              265
            ],
            [
              115,
              265
            ],
            [
              120,
              265
            ],
            [
              125,
              265
            ],
            [
              130,
              265
            ],
            [
              135,
              265
            ],
            [
              140,
              265
            ],
            [
              145,
              265
            ],
            [
              150,
              265
            ],
            [
              155,
              265
            ],
            [
              160,
              265
            ],
            [
              165,
              265
            ],
            [
              170,
              265
            ],
            [
              175,
              265
            ],
            [
              180,
              265
            ],
            [
              185,
              265
            ],
            [
              190,
              265
            ],
            [
              195,
              265
            ],
            [
              200,
              265
            ],
            [
              205,
              265
            ],
            [
              210,
              265
            ],
            [
              215,
              265
            ],
            [
              220,
              265
            ],
            [
              225,
              265
            ],
            [
              230,
              265
            ],
            [
              235,
              265
            ],
            [
              240,
              265
            ],
            [
              245,
              265
            ],
            [
              245,
              260
            ],
            [
              245,
              255
            ],
            [
              245,
              250
            ],
            [
              245,
              245
            ],
            [
              245,
              240
            ],
            [
              245,
              235
            ],
            [
              245,
              230
            ],
            [
              250,
              230
            ],
            [
              255,
              230
            ],
            [
              260,
              230
            ],
            [
              265,
              230
            ],
            [
              270,
              230
            ],
            [
              275,
              230
            ],
            [
              280,
              230
            ],
            [
              285,
              230
            ],
            [
              290,
              230
            ],
            [
              295,
              230
            ],
            [
              300,
              230
            ],
            [
              305,
              230
            ],
            [
              310,
              230
            ],
            [
              315,
              230
            ],
            [
              320,
              230
            ],
            [
              325,
              230
            ],
            [
              330,
              230
            ],
            [
              335,
              230
            ],
            [
              340,
              230
            ],
            [
              345,
              230
            ],
            [
              350,
              230
            ],
            [
              355,
              230
            ],
            [
              360,
              230
            ],
            [
              365,
              230
            ],
            [
              370,
              230
            ],
            [
              375,
              230
            ],
            [
              375,
              225
            ],
            [
              375,
              220
            ],
            [
              375,
              215
            ],
            [
              375,
              210
            ],
            [
              375,
              205
            ],
            [
              375,
              200
            ],
            [
              370,
              200
            ],
            [
              365,
              200
            ],
            [
              360,
              200
            ],
            [
              355,
              200
            ],
            [
              350,
              200
            ],
            [
              345,
              200
            ],
            [
              340,
              200
            ],
            [
              335,
              200
            ],
            [
              330,
              200
            ],
            [
              325,
              200
            ],
            [
              320,
              200
            ],
            [
              315,
              200
            ],
            [
              310,
              200
            ],
            [
              305,
              200
            ],
            [
              300,
              200
            ],
            [
              295,
              200
            ],
            [
              290,
              200
            ],
            [
              285,
              200
            ],
            [
              280,
              200
            ],
            [
              275,
              200
            ],
            [
              270,
              200
            ],
            [
              265,
              200
            ],
            [
              260,
              200
            ],
            [
              260,
              195
            ],
            [
              260,
              190
            ],
            [
              260,
              185
            ],
            [
              260,
              180
            ],
            [
              260,
              175
            ],
            [
              260,
              170
            ],
            [
              260,
              165
            ],
            [
              260,
              160
            ],
            [
              260,
              155
            ],
            [
              260,
              150
            ],
            [
              260,
              145
            ],
            [
              260,
              140
            ],
            [
              265,
              140
            ],
            [
              270,
              140
            ],
            [
              275,
              140
            ],
            [
              280,
              140
            ],
            [
              285,
              140
            ],
            [
              290,
              140
            ],
            [
              295,
              140
            ],
            [
              300,
              140
            ],
            [
              305,
              140
            ],
            [
              310,
              140
            ],
            [
              310,
              140
            ]
          ],
          [
            [
              65,
              375
            ],
            [
              70,
              375
            ],
            [
              75,
              375
            ],
            [
              80,
              375
            ],
            [
              85,
              375
            ],
            [
              90,
              375
            ],
            [
              95,
              375
            ],
            [
              100,
              375
            ],
            [
              105,
              375
            ],
            [
              110,
              375
            ],
            [
              115,
              375
            ],
            [
              120,
              375
            ],
            [
              125,
              375
            ],
            [
              130,
              375
            ],
            [
              135,
              375
            ],
            [
              140,
              375
            ],
            [
              140,
              380
            ],
            [
              140,
              385
            ],
            [
              140,
              390
            ],
            [
              145,
              390
            ],
            [
              150,
              390
            ],
            [
              155,
              390
            ],
            [
              160,
              390
            ],
            [
              165,
              390
            ],
            [
              170,
              390
            ],
            [
              175,
              390
            ],
            [
              180,
              390
            ],
            [
              185,
              390
            ],
            [
              190,
              390
            ],
            [
              195,
              390
            ],
            [
              200,
              390
            ],
            [
              205,
              390
            ],
            [
              210,
              390
            ],
            [
              215,
              390
            ],
            [
              220,
              390
            ],
            [
              225,
              390
            ],
            [
              230,
              390
            ],
            [
              235,
              390
            ],
            [
              240,
              390
            ],
            [
              245,
              390
            ],
            [
              250,
              390
            ],
            [
              255,
              390
            ],
            [
              260,
              390
            ],
            [
              265,
              390
            ],
            [
              270,
              390
            ],
            [
              275,
              390
            ],
            [
              280,
              390
            ],
            [
              285,
              390
            ],
            [
              290,
              390
            ],
            [
              290,
              385
            ],
            [
              290,
              380
            ],
            [
              290,
              375
            ],
            [
              290,
              370
            ],
            [
              290,
              365
            ],
            [
              290,
              360
            ],
            [
              290,
              355
            ],
            [
              290,
              350
            ],
            [
              290,
              345
            ],
            [
              290,
              340
            ],
            [
              290,
              335
            ],
            [
              290,
              330
            ],
            [
              290,
              325
            ],
            [
              290,
              320
            ],
            [
              290,
              315
            ],
            [
              290,
              310
            ],
            [
              290,
              305
            ],
            [
              290,
              300
            ],
            [
              290,
              295
            ],
            [
              290,
              300
            ],
            [
              290,
              305
            ],
            [
              290,
              310
            ],
            [
              290,
              315
            ],
            [
              290,
              320
            ],
            [
              290,
              325
            ],
            [
              290,
              330
            ],
            [
              290,
              335
            ],
            [
              290,
              340
            ],
            [
              290,
              345
            ],
            [
              290,
              350
            ],
            [
              290,
              355
            ],
            [
              290,
              360
            ],
            [
              290,
              365
            ],
            [
              290,
              370
            ],
            [
              290,
              375
            ],
            [
              290,
              380
            ],
            [
              290,
              385
            ],
            [
              290,
              390
            ],
            [
              285,
              389
            ],
            [
              280,
              388
            ],
            [
              275,
              387
            ],
            [
              270,
              386
            ],
            [
              265,
              384
            ],
            [
              260,
              383
            ],
            [
              255,
              382
            ],
            [
              250,
              381
            ],
            [
              245,
              380
            ],
            [
              245,
              375
            ],
            [
              245,
              370
            ],
            [
              245,
              365
            ],
            [
              245,
              360
            ],
            [
              245,
              355
            ],
            [
              245,
              350
            ],
            [
              245,
              345
            ],
            [
              245,
              340
            ],
            [
              240,
              340
            ],
            [
              235,
              340
            ],
            [
              230,
              340
            ],
            [
              225,
              340
            ],
            [
              220,
              340
            ],
            [
              215,
              340
            ],
            [
              210,
              340
            ],
            [
              205,
              340
            ],
            [
              200,
              340
            ],
            [
              195,
              340
            ],
            [
              190,
              340
            ],
            [
              185,
              340
            ],
            [
              180,
              340
            ],
            [
              175,
              340
            ],
            [
              170,
              340
            ],
            [
              165,
              340
            ],
            [
              160,
              340
            ],
            [
              155,
              340
            ],
            [
              150,
              340
            ],
            [
              145,
              340
            ],
            [
              140,
              340
            ],
            [
              140,
              345
            ],
            [
              140,
              350
            ],
            [
              140,
              355
            ],
            [
              140,
              360
            ],
            [
              140,
              365
            ],
            [
              140,
              370
            ],
            [
              140,
              375
            ],
            [
              140,
              380
            ],
            [
              140,
              385
            ],
            [
              140,
              390
            ],
            [
              140,
              390
            ]
          ]
        ]
        const camino = caminos[Math.floor(Math.random() * caminos.length)];
      
        for (const element of camino) {
          const delay = Math.random() * 3000; // 0 to 3000 ms
          await new Promise(resolve => setTimeout(resolve, delay));
          mover(element[0], element[1], updatedRooms);
          socket.emit('Mover', [element[0], element[1]]);
        }
      }
      
  

  let { minX, minY, maxX, maxY } = conseguirminmaxcasa(roomPath);
  let scale = obtenerfatorescalado(roomPath) - 1;

  roomPath = adjustCoordinates(roomPath,-(minX-5),-(minY-10), scale); // HAcemos que la casa esté centrada en el SVG
  
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
    const adjustedPath = adjustCoordinates(room,-(minX-5),-(minY-10), scale);
    updatedRooms.push(adjustedPath);
    const className = cuartos['labels'][i];
    drawPolygon(adjustedPath, className);
  }
  
  // Recorremos la lista de cuartos
  cuartos.labels.forEach(className => {
    const elementos = document.querySelectorAll(`.${className}`);
    elementos.forEach(room => {
      room.addEventListener('click', () => {
        const estaEncendida = room.style.fill === 'rgb(223, 220, 95)';
  
        if (!estaEncendida) {
          // Verificar si ya hay otra luz encendida
          room.style.fill = 'rgb(223, 220, 95)'; // Cambia a encendido
          socket.emit('Encender_luces', {
            tipo: 'luces',
            mensaje: className,
          });
        } else {
          room.style.fill = 'rgb(190, 190, 190)'; // Cambia a apagado
          socket.emit('Apagar_luces', {
            tipo: 'luces',
            mensaje: className,
          });
        }
      });
    });
  });
  
  document.addEventListener('keydown', (e) => {
    if (e.key === ' ') {
      console.log('Espacio');
      caminar(updatedRooms);
    }
  })

  // Movemos la persona según las flechas del teclado
  document.addEventListener('keydown', (e) => {
    console.log(e.key);
    switch (e.key) {
      case 'ArrowUp':
        console.log('Arriba');
        y = Math.max(0, y - paso);  // Límite superior
        socket.emit('Mover', [x,y]);
        break;
      case 'ArrowDown':
        y = Math.min(480, y + paso); // Límite inferior
        socket.emit('Mover', [x,y]);
        break;
      case 'ArrowLeft':
        x = Math.max(0, x - paso);  // Límite izquierdo
        socket.emit('Mover', [x,y]);
        break;
      case 'ArrowRight':
        x = Math.min(480, x + paso); // Límite derecho
        socket.emit('Mover', [x,y]);
        break;
    }
    let cuarto = buscaCuarto(x, y, updatedRooms); // Llamamos a la función para buscar el cuarto
    if (cuarto) {
      let elemento = document.querySelector(`.${cuarto}`);
      elemento.classList.add('seleccionado');

      cuartos['labels'].forEach(element => {
        if (element !== cuarto) {
          let otroElemento = document.querySelector(`.${element}`);
          otroElemento.classList.remove('seleccionado');
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
  socket.on('volver', () => {
    let lights = [];
    // Calcular el estado de las luces
    cuartos.labels.forEach(className => {
      const elemento = document.querySelector(`.${className}`);
          if (elemento.style.fill === 'rgb(223, 220, 95)') {
          lights.push(className);
        }
        });
    let status_actual = [[x,y],lights];
    socket.emit('Resetear', status_actual)
  })

  // Movemos la persona según las flechas del teclado
  socket.on('Mover', (data) => {
    let [x, y] = data;
    mover(x,y,updatedRooms)    
});

}
