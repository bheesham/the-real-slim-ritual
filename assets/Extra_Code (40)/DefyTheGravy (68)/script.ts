class DefyTheGravyBehavior extends Sup.Behavior {
  awake() {
    
  }

  update() 
  {
    let velocity = this.actor.arcadeBody2D.getVelocity();
    velocity.y = 0.02;
    this.actor.arcadeBody2D.setVelocity(velocity);
    
  }
}
Sup.registerBehavior(DefyTheGravyBehavior);
