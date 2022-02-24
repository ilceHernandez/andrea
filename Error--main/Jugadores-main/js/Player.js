class Player {
  constructor() {
    this.index = null;
    this.name = null;
    this.distance = 0;
  }

  getCount() {
    var playerCountRef = database.ref("playerCount");
    playerCountRef.on("value", (data) => {
      playerCount = data.val();
    });
  }

  updateCount() {
    database.ref("/").update({
      playerCount: playerCount
    });
  }

  //Actualiza nombre y distancia
  update() {
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).set({
      name: this.name,
      distance: this.distance,
    });
  }

  //Funciones ESTÁTICAS no se adjuntan, NO involucra OBJETOS
  //Llamadas por la CLASE
  static getPlayerInfo() {
    var playerInfoRef = database.ref("players");
    playerInfoRef.on("value", (data) => {
      allPlayers = data.val();
    });
  }
}
