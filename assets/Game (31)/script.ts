module Game {
  export let playerBehavior: PrincessBehavior;
  
  export let currentMap: Sup.Actor;
  
  export let color: number = 0;
  export let cloneExists = false;

  export function start() {
    Game.playerBehavior = Sup.getActor("Princess").getBehavior(PrincessBehavior);
  }
}