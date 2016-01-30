Sup.ArcadePhysics2D.setGravity(0, -0.02);

class PlayerBehavior extends Sup.Behavior {
  speed = 0.03;
  jumpSpeed = 0.45;
  wallJumpSpeed = 15;
  statue = null;

  update() {
    Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, Sup.ArcadePhysics2D.getAllBodies());
    
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
      this.actor.spriteRenderer.setHorizontalFlip(true);
    } else if (Sup.Input.isKeyDown("RIGHT")) {
      velocity.x += this.speed;
      // When going right, we clear the flip
      this.actor.spriteRenderer.setHorizontalFlip(false);
    }
    
    velocity.x /= 1.1;
    if (Math.abs(velocity.x) < 0.01){
      velocity.x = 0;
    }
    
    if (Sup.Input.isKeyDown("SPACE")) {
      if (!this.statue) {
        this.statue = Sup.appendScene("Statue/StatuePrefab")[0];
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

    // Finally, we apply the velocity back to the ArcadePhysics body
    this.actor.arcadeBody2D.setVelocity(velocity);
  }
}

Sup.registerBehavior(PlayerBehavior);
