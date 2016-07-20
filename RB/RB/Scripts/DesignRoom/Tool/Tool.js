/**
 * 工具类
 * @method Tool
 * @param {Position} position 位置信息
 * @param {Size} size 尺寸信息
 * @param {Image} toolImg 工具图片
 * @param {String} toolType 工具类型
 * @return {Tool} 工具类对象
 */
function Tool(position, size, toolImg, toolType, displayName) {
    Tool.name = "Tool";//兼容IE    
    BaseObject.apply(this, new Array(position, size, Tool.name));
    this.displayName = displayName;
    this.img = toolImg;
    this.toolType = toolType;
}
