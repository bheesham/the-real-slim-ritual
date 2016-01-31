class PentagramItemBehavior extends Sup.Behavior {
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
    
    Game.canClone = true;
    this.actor.spriteRenderer.setAnimation("Death");
    Sup.Audio.playSound("Sound/CloneSound");
    
    this.actor.setPosition({
      x: this.actor.getPosition().x,
      y: this.actor.getPosition().y,
      z: -1
    });
    
    if (this.des) {
      Game.destroyActor(this.actor, 1000);
      this.des = false;
    }
  }
}

Sup.registerBehavior(PentagramItemBehavior);
