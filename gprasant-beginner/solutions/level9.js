class Player {
  constructor() {
    this._health = 20;
  }

  playTurn(warrior) {
    if (warrior.feel().isWall()) {
      warrior.pivot();
    } else {
      if (warrior.feel().isEnemy()) {
        warrior.attack();
      } else if (warrior.feel().isCaptive()) {
        warrior.rescue();
      } else if (this.isEnemyInSight(warrior) && this.isSafeToShoot(warrior) &&
                 !this.isUnderAttack(warrior)) {
        warrior.shoot();
      } else {
        if (this.isInjured(warrior) && !this.isUnderAttack(warrior)) {
          warrior.rest();
        } else if (this.isUnderAttack(warrior) && this.isSeriouslyInjured(warrior)) {
          warrior.walk('backward');
        } else {
          warrior.walk();
        }
      }
    }

    this._health = warrior.health();
  }

  isInjured(warrior) {
    return warrior.health() < 20;
  }

  isSeriouslyInjured(warrior) {
    return warrior.health() < 10;
  }

  isUnderAttack(warrior) {
    return this._health > warrior.health();
  }

  isEnemyInSight(warrior) {
    return warrior.look().findIndex((space) => space.isEnemy()) !== -1;
  }

  isSafeToShoot(warrior) {
    return warrior.look().every((space) => space.isEmpty() || space.isEnemy());
  }
}

global.Player = Player;