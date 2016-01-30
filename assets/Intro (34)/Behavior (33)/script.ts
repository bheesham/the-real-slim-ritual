class IntroBehavior extends Sup.Behavior {
  awake() {
    Sup.loadScene("Act 1/Areas/1/Scene");
  }
}

Sup.registerBehavior(IntroBehavior);
