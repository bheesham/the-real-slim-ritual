class CameraBehavior extends Sup.Behavior {
  position: Sup.Math.Vector3 = this.actor.getLocalPosition();
  cameraActor: Sup.Actor;
  camera: Sup.Camera;

  awake() {
    Game.cameraBehavior = this;
    Game.currentMap = this.actor;
    
    let cameraManActor = new Sup.Actor("Camera");
    new Sup.Camera(cameraManActor);
    
    this.cameraActor = cameraManActor;
    this.camera = cameraManActor.camera;
    
    cameraManActor.setPosition(-16, -10, 10);
    cameraManActor.camera.setOrthographicMode(true);
    cameraManActor.camera.setOrthographicScale(70);
    
    Game.start();
  }

  update() {
    
  }
}

Sup.registerBehavior(CameraBehavior);
