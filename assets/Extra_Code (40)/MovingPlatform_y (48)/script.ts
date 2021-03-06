class MovingPlatform_yBehavior extends Sup.Behavior {
  a = 0;
  b=true;

  awake()  {

  }
  
  update()  {
    let velocity = this.actor.arcadeBody2D.getVelocity();
    
    //travel distance
    if(this.a > 128) {
      this.b = false;
    }
        
    if(this.a <-128) {
      this.b=true;
    }
    
    //increment
    if(this.b) {
        this.a++;
        velocity.y = 0.02 + 0.1;
    } else {
        //decrement
        this.a--;
        velocity.y = 0.02-0.1;
    }

    //against gravity
    velocity.x = 0;
    
    //set vector
    this.actor.arcadeBody2D.setVelocity(velocity);
  }
}

Sup.registerBehavior(MovingPlatform_yBehavior);
