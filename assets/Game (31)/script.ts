module Game {
  export let debug: boolean = true;

  export let playerBehavior: PrincessBehavior;
  export let currentMap: Sup.Actor;
  
  export let color: number = 2;
  export let cloneExists = false;
        
  export let currentLevel = 0;
        
  export function start() {
    Sup.Audio.playSound("Sound/Song3",0.2,{'loop':true});
  }
  
  export function loadLevel(level: number) {
    this.currentLevel = level;
    this.cloneExists = false;
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
}