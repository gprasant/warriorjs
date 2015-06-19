class Player {
  playTurn(warrior) {
    // Cool code goes here
    const dir = warrior.directionOfStairs();
    warrior.walk(dir);
  }
}

global.Player = Player;
