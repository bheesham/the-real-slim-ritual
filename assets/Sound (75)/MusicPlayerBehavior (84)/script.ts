class MusicPlayerBehavior extends Sup.Behavior {
  song:string = "Sound/Song1";
  
  awake() {
    Sup.Audio.playSound(this.song,0.2,{'loop':true});
  }
}
Sup.registerBehavior(MusicPlayerBehavior);
