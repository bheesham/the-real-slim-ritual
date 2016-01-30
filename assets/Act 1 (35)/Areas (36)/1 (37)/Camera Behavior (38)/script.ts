class CameraBehavior extends Sup.Behavior {
  position: Sup.Math.Vector3 = this.actor.getLocalPosition();

  awake() {
    Game.cameraBehavior = this;
    
    let cameraManActor = new Sup.Actor("Camera Man");
    new Sup.Camera(cameraManActor);
    cameraManActor.setPosition(0, 0, 5);
  }

  update() {
    
  }
}

Sup.registerBehavior(CameraBehavior);
