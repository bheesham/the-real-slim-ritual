class DummySceneBehavior extends Sup.Behavior {
  awake() {
    Game.start();
    Game.loadNextLevel();
  }
}
Sup.registerBehavior(DummySceneBehavior);
