/**
 * 椅子类
 * @method Chair
 * @param {Position} position 位置信息
 * @param {Size} size 尺寸信息
 * @param {Image} img 图片
 * @return {Chair} 椅子对象
 */
function Chair(position, size, img, diaplayName) {
    Chair.name = "Chair";//兼容IE
    Equipment.apply(this, new Array(position, size, img, Chair.name));
    this.displayName = diaplayName;
}
