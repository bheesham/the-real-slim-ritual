Sup.ArcadePhysics2D.setGravity(0, -0.02);

class StatueBehavior extends Sup.Behavior {
  mapDefaultBodies: Sup.ArcadePhysics2D.Body[] = [];
  map_1_Bodies: Sup.ArcadePhysics2D.Body[] = [];
  platformsBodies: Sup.ArcadePhysics2D.Body[] = [];
  switchBodies : Sup.ArcadePhysics2D.Body[] = [];
  
  handleCollisions() {
    this.mapDefaultBodies = [];
    this.map_1_Bodies = [];
    this.platformsBodies = [];
    this.switchBodies = [];
    
    let mapDefaults = Sup.getActor("Map").getChildren();
    for(let mapDefault of mapDefaults) this.mapDefaultBodies.push(mapDefault.arcadeBody2D);
    
    if (Game.color == 1){
      let mapGreenDefaults = Sup.getActor("Map_Green").getChildren();
      for(let mapGreenDefault of mapGreenDefaults) this.mapDefaultBodies.push(mapGreenDefault.arcadeBody2D);
    }
    
    if (Game.color == 2){
      let mapOrangeDefaults = Sup.getActor("Map_Orange").getChildren();
      for(let mapOrangeDefault of mapOrangeDefaults) this.mapDefaultBodies.push(mapOrangeDefault.arcadeBody2D);
    }
    
    let platformDefaults = Sup.getActor("Platforms").getChildren();
    for(let platformDefault of platformDefaults) this.platformsBodies.push(platformDefault.arcadeBody2D);
    
    let switchDefaults = Sup.getActor("Switch").getChildren();
    for(let switchDefault of switchDefaults) this.switchBodies.push(switchDefault.arcadeBody2D);                     
    
    Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D,this.mapDefaultBodies);
  }
  
    update() {
      this.handleCollisions();
      
      this.actor.spriteRenderer.setOpacity(1);

      // As explained above, we get the current velocity
      let velocity = this.actor.arcadeBody2D.getVelocity();

      // Finally, we apply the velocity back to the ArcadePhysics body
      this.actor.arcadeBody2D.setVelocity(velocity);
  }
}

Sup.registerBehavior(StatueBehavior);