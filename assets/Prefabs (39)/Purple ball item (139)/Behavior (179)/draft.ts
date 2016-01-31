class RedBallItemBehavior extends Sup.Behavior {
  princess: Sup.Actor;
  awake() {
    this.princess = Sup.getActor("Princess");
  }

  update() {
    
    if (!this.princess) {
      return;
    }
    
    if (!Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, this.princess.arcadeBody2D)) {
      return;
    }
    
    Game.controlOrange = true;
    this.actor.spriteRenderer.setAnimation("Death");
    this.actor.destroy();
  }
}
Sup.registerBehavior(RedBallItemBehavior);
