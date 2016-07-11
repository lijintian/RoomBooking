/**
 * 舞台类
 * @method Desk
 * @param {Position} position 位置信息
 * @param {Size} size 尺寸信息
 * @param {int} margin 外空隙
 * @return {Stage} 舞台对象
 */
function Stage(position, size, margin) {
    BaseObject.apply(this, new Array(position, size, Stage.name));
    this.margin = margin;
}