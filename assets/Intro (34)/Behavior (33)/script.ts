class IntroBehavior extends Sup.Behavior {
  awake() {
    Sup.setTimeout(3000, function() {
      Game.loadNextLevel();
      Game.start();
    });
    //Game.loadNextLevel(Act 1/Areas/7/Scene);
  }
}

Sup.registerBehavior(IntroBehavior);

