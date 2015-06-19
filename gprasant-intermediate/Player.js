class Player {
	constructor() {
		this.HEALTH_MAX = 20;
    this.captiveRescued = false;
    this.enemyDirs = ["forward", "backward", "left"];
    this.boundEnemyDirs = [];
    this.prevHealth = 20;
	}

  playTurn(warrior) {
    console.log("# enemyDirs : ", this.enemyDirs);
    console.log("# enemyDirs.length : " + this.enemyDirs.length);
    console.log("# warrior.listen() : " + warrior.listen());
    if( !this.allEnemiesBound()) {
      let dir = this.enemyDirs.pop();
      warrior.bind(dir);
      this.boundEnemyDirs.push(dir);
    } else if(!this.captiveRescued) {
      warrior.rescue("right");
      this.captiveRescued = true;
    } else if(!this.boundEnemiesDestroyed()) {
      let dir = this.boundEnemyDirs[this.boundEnemyDirs.length - 1];
      if(warrior.feel(dir).isEmpty()) {
        if (warrior.health() < this.HEALTH_MAX || this.isHurt(warrior)) {
          warrior.rest();
        } else {
          this.boundEnemyDirs.pop();
        }
      } else {
        warrior.attack(dir);
      }
    } else {
      let dir = warrior.directionOfStairs();
      warrior.walk(dir);
    }
    this.prevHealth = warrior.health();
  }

  allEnemiesBound() {
    return this.enemyDirs.length === 0;
  }

  boundEnemiesDestroyed() {
    return this.boundEnemyDirs.length === 0;
  }

  isHurt(warrior) {
    return warrior.health() < this.prevHealth;
  }
}



global.Player = Player;
