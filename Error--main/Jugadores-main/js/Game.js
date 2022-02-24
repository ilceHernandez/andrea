class Game {
  constructor() {}

  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function (data) {
      gameState = data.val();
    });
  }

  update(state) {
    //   / = base de datos
    database.ref("/").update({
      gameState: state
    });
  }

  async start() {
    if (gameState === 0) {
      player = new Player();
      var playerCountRef = await database.ref("playerCount").once("value");

      if (playerCountRef.exists()) {
        playerCount = playerCountRef.val();
        player.getCount();
      }

      form = new Form();
      form.display();
    }

    car1 = createSprite(100, 200);
    car1.addImage("Car1", car1Img);

    car2 = createSprite(300, 200);
    car2.addImage("Car 2", car2Img);

    car3 = createSprite(500, 200);
    car3.addImage("Car 3", car3Img);

    car4 = createSprite(700, 200);
    car4.addImage("Car 4", car4Img);

    cars = [car1, car2, car3, car4];
  }

  play() {
    form.hide();
    textSize(30);
    text("Juego iniciado", 120, 100);

    Player.getPlayerInfo();

    //Si todos ya están definidos, crear variable de posición
    if (allPlayers !== undefined) {
      //var displayPosition = 130;
      background("black");
      image(trackImg, 0, -displayHeight * 4, displayWidth, displayHeight * 5);

      var index = 0;
      var x = 175;
      var y;

      for (var plr in allPlayers) {
        //Si es el jugador, que sea de rojo

        //if (plr == "player" + player.index) {
        index = index + 1;
        x = x + 200;

        y = displayHeight - allPlayers[plr].distance;
        cars[index - 1].x = x;
        cars[index - 1].y = y;

        if (index == player.index) {
          fill("lightgreen");
          strokeWeight(4);
          ellipse(x, y, 60, 60);

          cars[index - 1].shapeColor = "red";

          camera.position.x = displayWidth / 2;
          camera.position.y = cars[index - 1].y;
        }

        //plr - el jugador ya está definido
        //Escribe el nombre puesto en el plr
      }
    }

    if (keyIsDown(UP_ARROW) && player.index !== null) {
      player.distance += 10;
      player.update();
    }

    if (player.distance > 3860) {
      gameState = 2;
    }

    drawSprites();
  }

  end() {
    console.log("Perdiste");
  }
}
