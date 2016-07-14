/**
 * 舞台类
 * @method Desk
 * @param {Position} position 位置信息
 * @param {Size} size 尺寸信息
 * @param {int} padding 内空隙
 * @return {Stage} 舞台对象
 */
function Stage(position, size, padding) {
    Stage.name = "Stage";
    BaseObject.apply(this, new Array(position, size, Stage.name));
    this.padding = padding;
    this.draw = drawStage;
}

function drawStage() {
    ctx.strokeStyle = "blue";
    ctx.strokeRect(this.position.x, this.position.y, this.size.width, this.size.height);
    this.drawName();
}