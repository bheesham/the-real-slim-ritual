class PentagramItemBehavior extends Sup.Behavior {
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
    
    Game.canClone = true;
    Sup.Audio.playSound("Sound/CloneSound");
    this.actor.spriteRenderer.setOpacity(0);
    this.actor.destroy();
  }
}

Sup.registerBehavior(PentagramItemBehavior);
