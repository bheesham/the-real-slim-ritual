class IntroBehavior extends Sup.Behavior {
  awake() {
    Game.start();
    Game.loadNextLevel();
    //Game.loadNextLevel(Act 1/Areas/7/Scene);
  }
}

Sup.registerBehavior(IntroBehavior);

