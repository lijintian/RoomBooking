/**
 * 工具栏类
 * @method Desk
 * @param {Position} position 位置信息
 * @param {Size} size 尺寸信息
 * @param {int} padding 内空隙
 * @return {ToolBar} 工具栏对象
 */
function ToolBar(position, size, padding)
{
    ToolBar.name = "ToolBar";
    BaseObject.apply(this, new Array(position, size, ToolBar.name));
    this.padding = padding;
    this.tools = this.subObjs;
    this.addTool = this.addSubObj;
    this.removeTool = this.removeSubObj;
    this.removeAllTool = removeAllTool;
    this.draw = drawToolBar;
}

function drawToolBar() {
    ctx.strokeStyle = "blue";
    ctx.strokeRect(this.position.x, this.position.y, this.size.width, this.size.height);
    this.drawName();
}

/**
 * 移除所有工具
 * @return {void} 无返回
 */
function removeAllTool() {
    this.tools = this.subObjs = new Array();
}

/**
 * 工具类
 * @method Tool
 * @param {Position} position 位置信息
 * @param {Size} size 尺寸信息
 * @param {Image} toolImg 工具图片
 * @param {String} toolType 工具类型
 * @return {Tool} 工具类对象
 */
function Tool(position, size, toolImg, toolType) {
    Tool.name = "Tool";
    BaseObject.apply(this, new Array(position, size, Tool.name));
    this.img = toolImg;
    this.toolType = toolType;
}


