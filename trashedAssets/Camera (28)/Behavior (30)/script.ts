class CameraBehavior extends Sup.Behavior {

  awake() {
    let cameraManActor = new Sup.Actor("Camera Man");
    new Sup.Camera(cameraManActor);
    cameraManActor.setPosition(0, 0, 5);
    
  }
}

Sup.registerBehavior(CameraBehavior);