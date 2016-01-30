class CameraBehavior extends Sup.Behavior {
  update() {
    if (Sup.Input.isKeyDown("LEFT")) this.actor.move(-0.1, 0, 0);
    if (Sup.Input.isKeyDown("RIGHT")) this.actor.move(0.1, 0, 0);
  }
}

Sup.registerBehavior(CameraBehavior);
