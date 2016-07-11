function Stage(position, size, margin) {
    BaseObject.apply(this, new Array(position, size, Stage.name));
    this.margin = margin;
}