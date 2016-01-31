class MapGreenBehavior extends Sup.Behavior {
  fadeSpeed = 0.1;
  opacity = 0;
  
  awake() {
    if (Game.greenEnabled){
      this.opacity = 1;
    }else{
      this.opacity = 0;
    }
    
    this.actor.tileMapRenderer.setLayerOpacity(0,this.opacity);
  }

  update() {
    if (Game.greenEnabled){
      if (this.opacity < 1){
        this.opacity += this.fadeSpeed;
      }
    }else if(this.opacity > 0){
      this.opacity -= this.fadeSpeed;
    }
    
    this.actor.tileMapRenderer.setLayerOpacity(0,this.opacity);
  }
}
Sup.registerBehavior(MapGreenBehavior);
