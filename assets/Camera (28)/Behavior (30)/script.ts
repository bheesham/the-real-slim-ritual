class CameraBehavior extends Sup.Behavior {
  position = this.actor.getLocalPosition();

  awake() {
    Game.cameraBehavior = this;
  }

  update() {
    if (Game.playerBehavior.position.x - this.offset > this.position.x) {
      this.position.x = Sup.Math.lerp(this.position.x, Game.playerBehavior.position.x - this.offset, 0.1);
    } else if (Game.playerBehavior.position.x + this.offset < this.position.x) {
      this.position.x = Sup.Math.lerp(this.position.x, Game.playerBehavior.position.x + this.offset, 0.1);
    }
    
    this.actor.setLocalPosition(this.position);
  }
}
Sup.registerBehavior(CameraBehavior);
