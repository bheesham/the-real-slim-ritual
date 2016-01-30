Sup.ArcadePhysics2D.setGravity(0, -0.02);

class PrincessBehavior extends Sup.Behavior {
  speed = 0.06;
  jumpSpeed = 0.8;
  wallJumpSpeed = 25;
  statue = null;
  position: Sup.Math.Vector3 = this.actor.getLocalPosition();

  awake() {
    Game.playerBehavior = this;
  }

  updateCamera() {
    Game.cameraBehavior.cameraActor.setLocalPosition({
      x: this.position.x,
      y: this.position.y,
      z: Game.cameraBehavior.cameraActor.getLocalPosition().z
    });
  }

  passThroughWall() {
    //has to be it the main sprite to work
    var list:Array<Sup.ArcadePhysics2D.Body> = Sup.ArcadePhysics2D.getAllBodies();
    
    //list of unique names to get rid of pysical bounds
    var names:Array<string> = ["Gate"];
    
    //gets rid of the 2d ridgid body properties of anything in names
    for(var i = 0; i < list.length; i++) {
        for(var j = 0; j < names.length;j++) {
           if((list[i].actor['__inner'].name === names[j])) {
              list.splice(i,1);
              names.splice(j,1);
            }
          }
      }
    
    Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, list);
  }


  update() {
    //Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, Sup.ArcadePhysics2D.getAllBodies());
    this.passThroughWall();
    // If the player is on the ground and wants to jump,
    // we update the `.y` component accordingly
    let touchBottom = this.actor.arcadeBody2D.getTouches().bottom;
    let touchRight = this.actor.arcadeBody2D.getTouches().right;
    let touchLeft = this.actor.arcadeBody2D.getTouches().left;

    // As explained above, we get the current velocity
    let velocity = this.actor.arcadeBody2D.getVelocity();

    // We override the `.x` component based on the player's input
    if (Sup.Input.isKeyDown("LEFT")) {
      velocity.x -= this.speed;
      // When going left, we flip the sprite
      this.actor.spriteRenderer.setHorizontalFlip(false);
    } else if (Sup.Input.isKeyDown("RIGHT")) {
      velocity.x += this.speed;
      // When going right, we clear the flip
      this.actor.spriteRenderer.setHorizontalFlip(true);
    }
    
    velocity.x /= 1.1;
    if (Math.abs(velocity.x) < 0.01){
      velocity.x = 0;
    }
    
    if (Sup.Input.isKeyDown("SPACE")) {
      if (!this.statue) {
        this.statue = Sup.appendScene("Sprites/Statue/StatuePrefab")[0];
        this.statue.arcadeBody2D.warpPosition(this.actor.getLocalPosition());
        
        if (!touchBottom){
          this.actor.arcadeBody2D.warpPosition(this.actor.getLocalPosition().add(new Sup.Math.Vector3(0,this.actor.arcadeBody2D.getSize()['height'],0)));
          velocity.y = this.jumpSpeed;
          this.actor.spriteRenderer.setAnimation("Jump");
        }
      }
    }
    
    if (touchBottom) {
      if (Sup.Input.wasKeyJustPressed("UP")) {
        velocity.y = this.jumpSpeed;
        this.actor.spriteRenderer.setAnimation("Jump");
      } else {
        // Here, we should play either "Idle" or "Run" depending on the horizontal speed
        if (velocity.x === 0) this.actor.spriteRenderer.setAnimation("Idle");
        else this.actor.spriteRenderer.setAnimation("Run");
      }
    } else {
      // Here, we should play either "Jump" or "Fall" depending on the vertical speed
      if (velocity.y >= 0) {
        this.actor.spriteRenderer.setAnimation("Jump");
      } else {
        this.actor.spriteRenderer.setAnimation("Fall");
      }
      
      if (Sup.Input.wasKeyJustPressed("UP") && touchLeft) {
        velocity.y = this.jumpSpeed;
        velocity.x = this.speed * this.wallJumpSpeed;
        this.actor.spriteRenderer.setAnimation("Jump");
      } else if (Sup.Input.wasKeyJustPressed("UP") && touchRight) {
        velocity.y = this.jumpSpeed;
        velocity.x = -(this.speed * this.wallJumpSpeed);
        this.actor.spriteRenderer.setAnimation("Jump");
      }
    }

    this.position = this.actor.getLocalPosition();
    this.updateCamera();
    
    // Finally, we apply the velocity back to the ArcadePhysics body
    this.actor.arcadeBody2D.setVelocity(velocity);
  }
}

Sup.registerBehavior(PrincessBehavior);