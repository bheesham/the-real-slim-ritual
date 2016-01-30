module Game {
  export let cameraBehavior: CameraBehavior;
  export let playerBehavior: PrincessBehavior;
  export let currentMap: Sup.Actor;
  export let color: number = 0;

  export function start() {
    Game.playerBehavior = Sup.getActor("Princess").getBehavior(PrincessBehavior);
    Game.cameraBehavior = Sup.getActor("Camera").getBehavior(CameraBehavior);
  }
}