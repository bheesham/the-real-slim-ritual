class ScriptBehavior extends Sup.Behavior {
  awake() {
    
  }

  update() {
    //has to be it the main sprite to work
    var list:Array<Sup.ArcadePhysics2D.Body> = Sup.ArcadePhysics2D.getAllBodies();
    
    //list of unique names to get rid of pysical bounds
    var names:Array<string> = ["Gate"];
    
    //gets rid of the 2d ridgid body properties of anything in names
    for(var i = 0; i < list.length; i++) {
        for(var j = 0; j < names.length;j++) {
           if((list[i].actor['__inner'].name === names[j])) {
              list.splice(i,1);
              names.splice(j,1);
            }
          }
      }
    
    Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, list);
  }
}

Sup.registerBehavior(ScriptBehavior);