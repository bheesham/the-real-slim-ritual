module Game {
  export let debug: boolean = true;

  export let playerBehavior: PrincessBehavior;
  export let currentMap: Sup.Actor;
  
  export let canClone = false;
  export let cloneExists = false;
        
  export let currentLevel = 0;
  
  export let controlOrange = false;
  export let controlGreen = false;
  export let orangeEnabled = true;
  export let greenEnabled = true;
  
  export let doorInStage = true;
        
  export function start() {
    Sup.Audio.playSound("Sound/Song3",0.2,{'loop':true});
  }
  
  export function loadLevel(level: number) {
    this.canClone = false;
    this.currentLevel = level;
    this.cloneExists = false;
    this.doorInStage = true;
    Sup.loadScene(`Act 1/Areas/${level}/Scene`);
  }
  
  export function reloadLevel() {
    //this.loadLevel(0);
    this.loadLevel(this.currentLevel);
  }
  
  export function loadNextLevel() {
    ++this.currentLevel;
    this.loadLevel(this.currentLevel);
  }
  
  export function loadPrevLevel() {
    --this.currentLevel;
    this.loadLevel(this.currentLevel);
  }
  
  export function destroyActor(that: Sup.Actor, interval) {
    Sup.setTimeout(interval, function() {
      if (that != null) {
        
        if (that.spriteRenderer) {
          that.spriteRenderer.setOpacity(0);
        }
        
        that.destroy();
      }
    });
  }
}