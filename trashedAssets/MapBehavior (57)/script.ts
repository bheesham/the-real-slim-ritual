class MapBehavior extends Sup.Behavior {
  awake() {
    Sup.log(this.actor);
  }
}
Sup.registerBehavior(MapBehavior);
