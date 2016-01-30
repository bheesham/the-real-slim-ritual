class ScriptBehavior extends Sup.Behavior {
  awake() {
    Sup.loadScene("Scene Level 1");
    
  }

  update() {
    
  }
}
Sup.registerBehavior(ScriptBehavior);
