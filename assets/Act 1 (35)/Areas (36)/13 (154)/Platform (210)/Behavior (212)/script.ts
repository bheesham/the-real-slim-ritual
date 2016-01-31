class Area13PlatformBehavior extends Sup.Behavior {
  locationInCycle = 0;
  directionOfCycle = true;
  distanceFromCenter = 200;
  speed = 0.2;
  gravity = 0.02;

  awake()  {

  }
  
  update()  {
    let velocity = this.actor.arcadeBody2D.getVelocity();
    
    //travel distance
    if(this.locationInCycle > this.distanceFromCenter) {
      this.directionOfCycle = false;
    }
        
    if(this.locationInCycle <-this.distanceFromCenter) {
      this.directionOfCycle=true;
    }
    
    //increment
    if(this.directionOfCycle) {
        this.locationInCycle++;
        velocity.x =  this.speed;
    } else {
        //decrement
        this.locationInCycle--;
        velocity.x = -this.speed;
    }

    //against gravity
    velocity.y = this.gravity;
    
    //set vector
    this.actor.arcadeBody2D.setVelocity(velocity);
  }
}

Sup.registerBehavior(Area13PlatformBehavior);
