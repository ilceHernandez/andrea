var gameState = 0;
var playerCount;
var database;
var form, game, player;
var canvas;
var car1, car2, car3, car4;
var cars;

var distance = 0;
var allPlayers;

var car1Img, car2Img, car3Img, car4Img;
var trackImg;

function preload() {
  // Ruta ABSOLUTA - comienza desde la raiz (disco duro)
  //Ubicación exacta y COMPLETA del archivo

  //Ruta RELATIVA
  // .. no importa la raiz
  car1Img = loadImage("../images/car1.png");
  car2Img = loadImage("../images/car2.png");
  car3Img = loadImage("../images/car3.png");
  car4Img = loadImage("../images/car4.png");

  trackImg = loadImage("../images/track.jpg");
}

function setup() {
  canvas = createCanvas(displayWidth - 20, displayHeight - 20);

  //Llamamos a la base de datos
  database = firebase.database();

  game = new Game();
  game.getState();
  game.start();
}

function draw() {
  if (playerCount === 4) {
    game.update(1);
  }

  if (gameState === 1) {
    clear();
    game.play();
  }

  if (gameState === 2) {
    game.end();
  }
}
