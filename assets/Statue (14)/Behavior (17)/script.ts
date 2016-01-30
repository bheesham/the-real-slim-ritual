Sup.ArcadePhysics2D.setGravity(0, -0.02);

class StatueBehavior extends Sup.Behavior {
  
    update() {
    if (PlayerBehavior.prototype.hasStatue){
      Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, Sup.ArcadePhysics2D.getAllBodies());
      this.actor.spriteRenderer.setOpacity(1);
    }else{
      Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, null);
      this.actor.spriteRenderer.setOpacity(0);
    }
      
    // As explained above, we get the current velocity
    let velocity = this.actor.arcadeBody2D.getVelocity();

    // Finally, we apply the velocity back to the ArcadePhysics body
    this.actor.arcadeBody2D.setVelocity(velocity);
  }
}
Sup.registerBehavior(StatueBehavior);
