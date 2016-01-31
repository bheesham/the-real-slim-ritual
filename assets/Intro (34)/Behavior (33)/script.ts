class IntroBehavior extends Sup.Behavior {
  awake() {
    let that = this;
    Sup.setTimeout(3000, function() {
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
    Sup.setTimeout(3000, function() {
      Game.selectSong(1);
      that.startGame();
    });
  }
  
  startGame() {
    Game.loadNextLevel();
  }
}

Sup.registerBehavior(IntroBehavior);

