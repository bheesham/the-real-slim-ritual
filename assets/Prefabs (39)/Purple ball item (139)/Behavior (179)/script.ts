class PurpleBallItemBehavior extends Sup.Behavior {
  princess: Sup.Actor;
  des: boolean = false;

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
    
    this.des = true;
    Game.controlGreen = true;
    this.actor.spriteRenderer.setAnimation("Death");
    
    if (this.des) {
      this.des = false;
      let that = this;
      Sup.setTimeout(1000, function() {
        that.actor.destroy();
      });
    }  
  }
}

Sup.registerBehavior(PurpleBallItemBehavior);
