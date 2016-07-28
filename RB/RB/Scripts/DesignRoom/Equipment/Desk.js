/**
 * 桌子类
 * @method Desk
 * @param {Position} position 位置信息
 * @param {Size} size 尺寸信息
 * @param {Image} img 图片
 * @return {Desk} 桌子对象
 */
function Desk(position, size, img, diaplayName) {
    Desk.name = "Desk";//兼容IE
    Equipment.apply(this, new Array(position, size, img, Desk.name));
    this.displayName = diaplayName;
}