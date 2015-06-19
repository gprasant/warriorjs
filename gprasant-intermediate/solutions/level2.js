class Player {
	initialize() {
		this.HEALTH_MAX = 20;
	}
  playTurn(warrior) {
    // Cool code goes here
    console.log("warrior.health() : " + warrior.health() + "\n isHurt() : " + this.isHurt(warrior));
    const dir = warrior.directionOfStairs();
		if (this.enemiesAround(warrior))
			this.attackNearbyEnemies(warrior)
		else if(this.isHurt(warrior)) // no enemies around
			warrior.rest();
    else
    	warrior.walk(dir);
  }

  isHurt(warrior) {
  	return (warrior.health() < this.HEALTH_MAX);
  }

  enemiesAround(warrior) {
  	return (warrior.feel('left').isEnemy()
  			|| warrior.feel('right').isEnemy()
  			|| warrior.feel('forward').isEnemy()
  			|| warrior.feel('backward').isEnemy());
  }

  attackNearbyEnemies(warrior) {
  	if(warrior.feel('forward').isEnemy())
  		warrior.attack('forward')
  	else if (warrior.feel('backward').isEnemy())
  		warrior.attack('backward')
  	else if (warrior.feel('left').isEnemy())
  		warrior.attack('left')
  	else
  		warrior.attack('right')
  }
}



global.Player = Player;
