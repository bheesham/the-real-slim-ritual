Sup.ArcadePhysics2D.setGravity(0, -0.02);

class PrincessBehavior extends Sup.Behavior {
  speed = 0.06;
  jumpSpeed = 0.8;
  wallHugResistance = 1.15;
  wallJumpSpeed = 25;
  statue = null;
  position: Sup.Math.Vector3 = this.actor.getLocalPosition();
  doubleJump = false;
  airTime = 60;
  wallJumped = false;

  mapDefaultBodies: Sup.ArcadePhysics2D.Body[] = [];
  map_1_Bodies: Sup.ArcadePhysics2D.Body[] = [];
  platformsBodies: Sup.ArcadePhysics2D.Body[] = [];
  switchBodies : Sup.ArcadePhysics2D.Body[] = [];
  gateBodies : Sup.ArcadePhysics2D.Body[] = [];

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
    
    Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D,this.mapDefaultBodies);
  }
  handleSwitches()
  {
    let switchDefaults
    
    let switchDefaults = Sup.getActor("Switch").getChildren();
    for(let switchDefault of switchDefaults) this.switchBodies.push(switchDefault.arcadeBody2D);
    let gateDefaults = Sup.getActor("Gate").getChildren();
    for(let gateDefault of gateDefaults)this.gateBodies.push(gateDefault.arcadeBody2D);
    
    for(let switchn of this.switchBodies)
    {
      var a = (Math.abs((switchn.actor.getLocalPosition().x -this.actor.getLocalPosition().x-6.8))<2);
      var b = ((switchn.actor.getLocalPosition().y -this.actor.getLocalPosition().y+6.8)>-1);
      if(a&&b)
        {
          //Sup.log("DOWNAGE");
        }
    }
  }


  handleAfterCollisions(velocity) {
    //returns whether we are touching the bottom of a special collision
    
    let touchingBottom = false;
    
    let platformDefaults = Sup.getActor("Platforms").getChildren();
    for(let platformDefault of platformDefaults){
      Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D,[platformDefault.arcadeBody2D]);
      let touchBottom = this.actor.arcadeBody2D.getTouches().bottom;
       touchingBottom = touchingBottom || touchBottom;
      
      if (touchBottom){
        this.actor.arcadeBody2D.warpPosition(this.actor.getLocalPosition().add(platformDefault.arcadeBody2D.getVelocity().x,platformDefault.arcadeBody2D.getVelocity().y,0));
        velocity.y = 0;
      }      
    } 
    return touchingBottom;
  }

    update() 
    {
      
    this.handleCollisions();
      
    let touchBottom = this.actor.arcadeBody2D.getTouches().bottom;
    let touchRight = this.actor.arcadeBody2D.getTouches().right;
    let touchLeft = this.actor.arcadeBody2D.getTouches().left;
      

    if (touchBottom){
      this.wallJumped = false;
    }
    
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
      
    if (Sup.Input.isKeyDown("1")){
      Game.color = 0;
    }else if (Sup.Input.isKeyDown("2")){
      Game.color = 1;
    }else if (Sup.Input.isKeyDown("3")){
      Game.color = 2;
    }
      
    
    velocity.x /= 1.1;
    if (Math.abs(velocity.x) < 0.05){
      velocity.x = 0;
    }//this.statue
    //time in the air
    

    //varible needed for double jump validation
    if (Sup.Input.isKeyDown("SPACE") &&  !this.doubleJump) 
    {
      if(!this.statue)
        {
        //this.statue.destroy();  
        this.doubleJump = true;
        //add base
        this.statue = Sup.appendScene("Prefabs/Statue/StatuePrefab")[0];
        this.statue.arcadeBody2D.warpPosition(this.actor.getLocalPosition());
        
        if (!touchBottom){
          this.actor.arcadeBody2D.warpPosition(this.actor.getLocalPosition().add(new Sup.Math.Vector3(0,this.actor.arcadeBody2D.getSize()['height'],0)));
          velocity.y = this.jumpSpeed;
          this.actor.spriteRenderer.setAnimation("Jump");
        }
      }
    }
    this.handleSwitches();
    touchBottom = touchBottom || this.handleAfterCollisions(velocity);
    
    if (touchBottom) {
      this.doubleJump = false;
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
        if (this.wallJumped){
          
        }else{
          this.actor.spriteRenderer.setAnimation("Jump");
        }
      } else {
        if (touchLeft || touchRight){
          velocity.y /= this.wallHugResistance;
          this.actor.spriteRenderer.setAnimation("WallHug");
        }else{
          this.actor.spriteRenderer.setAnimation("Fall");
        }
      }
      
      if (Sup.Input.wasKeyJustPressed("UP") && touchLeft) {
        velocity.y = this.jumpSpeed;
        velocity.x = this.speed * this.wallJumpSpeed;
        this.actor.spriteRenderer.setAnimation("WallJump");
        this.wallJumped = true;
      } else if (Sup.Input.wasKeyJustPressed("UP") && touchRight) {
        velocity.y = this.jumpSpeed;
        velocity.x = -(this.speed * this.wallJumpSpeed);
        this.actor.spriteRenderer.setAnimation("WallJump");
        this.wallJumped = true;
      }
    }
    
    
    
    this.position = this.actor.getLocalPosition();
    this.updateCamera();
    
    // Finally, we apply the velocity back to the ArcadePhysics body
    this.actor.arcadeBody2D.setVelocity(velocity);
  }
}

Sup.registerBehavior(PrincessBehavior);