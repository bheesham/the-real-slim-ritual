class IntroBehavior extends Sup.Behavior {
  awake() {
    let that = this;
    Sup.setTimeout(10, function() {
      let act: Sup.Actor = Sup.getActor("Splash");
      act.setPosition({
        x: 0,
        y: 0,
        z: -10
      });
            
      that.loadCredits();
    });
  }
  
  loadCredits() {
    let that = this;
    Sup.setTimeout(10, function() {
      that.startGame();
    });
  }
  
  startGame() {
    Game.loadNextLevel();
  }
}

Sup.registerBehavior(IntroBehavior);

