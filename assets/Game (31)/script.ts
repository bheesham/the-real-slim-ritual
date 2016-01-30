module Game {
        export let cameraBehavior: CameraBehavior;
        export let playerBehavior: PlayerBehavior;
        
        export function start() {
          Sup.loadScene(Sup.get("Scene", Sup.Scene));
          Game.playerBehavior = Sup.getActor("Player").getBehavior(PlayerBehavior);
          Game.cameraBehavior = Sup.getActor("Camera").getBehavior(CameraBehavior);
        }
}