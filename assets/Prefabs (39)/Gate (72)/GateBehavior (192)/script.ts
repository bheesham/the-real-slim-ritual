class GateBehavior extends Sup.Behavior {
  awake() {
    
  }

  update() {
    if (!Game.doorInStage){
      this.actor.spriteRenderer.setOpacity(0);
    }else{
      this.actor.spriteRenderer.setOpacity(1);
    }
  }
}
Sup.registerBehavior(GateBehavior);
