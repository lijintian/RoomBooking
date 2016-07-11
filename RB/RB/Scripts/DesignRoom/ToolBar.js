/**
 * 工具栏类
 * @method Desk
 * @param {Position} position 位置信息
 * @param {Size} size 尺寸信息
 * @param {int} margin 外空隙
 * @return {ToolBar} 工具栏对象
 */
function ToolBar(position, size, margin)
{
    BaseObject.apply(this, new Array(position, size, ToolBar.name));
    this.margin = margin;
    this.tools = this.subObjs;
    this.addTool = this.addSubObj;
    this.removeTool = this.removeSubObj;
    this.removeAllTool = removeAllTool;
}

function Tool() {
    BaseObject.apply(this, new Array(position, size, Tool.name));
}
/**
 * 移除所有工具
 * @return {void} 无返回
 */
function removeAllTool()
{
    this.tools = this.subObjs = new Array();
}

