class PurpleBallItemBehavior extends Sup.Behavior {
  princess: Sup.Actor;
  des: boolean = true;

  awake() {
    this.princess = Sup.getActor("Princess");
  }

  update() {
    
    if (!this.princess) {
      return;
    }
    
    if (!Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, this.princess.arcadeBody2D) || this.des == false) {
      return;
    }
    
    Game.controlGreen = true;
    this.actor.spriteRenderer.setAnimation("Death");
    
    if (this.des) {
      Game.destroyActor(this.actor, 1000);
      this.des = false;
    }
  }
}

Sup.registerBehavior(PurpleBallItemBehavior);
