module Game {
  export let cameraBehavior: CameraBehavior;
  export let playerBehavior: PrincessBehavior;

  export function start() {
    Game.playerBehavior = Sup.getActor("Princess").getBehavior(PrincessBehavior);
    Game.cameraBehavior = Sup.getActor("Camera").getBehavior(CameraBehavior);
    
    
    Sup.log("ASDASDASD");
    Sup.log(Game.cameraBehavior);
  }
}