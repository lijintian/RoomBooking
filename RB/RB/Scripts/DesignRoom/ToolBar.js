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
function Tool(position, size, toolImg, toolType,displayName) {
    Tool.name = "Tool";//兼容IE    
    BaseObject.apply(this, new Array(position, size, Tool.name));
    this.displayName = displayName;
    this.img = toolImg;
    this.toolType = toolType;
}

function ChairTool(position, size, toolImg,displayName)
{
    ChairTool.name = "ChairTool";//兼容IE
    Tool.apply(this, new Array(position, size, toolImg, ChairTool.name, displayName));
}

function DeskTool(position, size, toolImg, displayName) {
    DeskTool.name = "DeskTool";//兼容IE
    Tool.apply(this, new Array(position, size, toolImg, DeskTool.name, displayName));
}

function MultiChoseTool(beginPosition, displayName)
{
    MultiChoseTool.name = "MultiChoseTool";//兼容IE   
   
    
    var position = new Position(0, 0,99999);
    var size = new Size(0, 0);
    var img = typeof (undefined);

    Tool.apply(this, new Array(position, size, img, MultiChoseTool.name, displayName));
    this.beginPosition = beginPosition;
    this.endPosition = beginPosition;
    this.isMouseUp = false;
    this.draw = drawMultiChoseArea;
    this.setEndPosition = setEndPosition;
    this.checkedObjs = this.subObjs;
    this.setCheckedObjs = setCheckedObjs;
}

function setEndPosition(endPosition)
{
    this.endPosition = endPosition;

    var beginX = 0;
    var beginY = 0;

    var endX = 0;
    var endY = 0;

    var width = 0;
    var height = 0;

    var beginPoint = new Position(this.beginPosition.x, this.beginPosition.y);
    var endPoint = new Position(this.endPosition.x, this.endPosition.y);

    if (beginPoint.x > endPoint.x) {//始终以x接近原点的点为起点
        var temp = endPoint;
        endPoint = beginPoint;
        beginPoint = temp;
    }

    beginX = beginPoint.x;
    beginY = beginPoint.y;

    endX = endPoint.x;
    endY = endPoint.y;

    if (endPoint.y < beginPoint.y) {//始终以左上角为原地，右下角为终点
        beginY = endPoint.y;
        endY = beginPoint.y
    }

    width = endX - beginX;
    height = endY - beginY;

    var position = new Position(beginX, beginY);
    var size = new Size(width, height);

    //重设position和size
    this.position = position;
    this.size = size;
}

function drawMultiChoseArea()
{
    ctx.strokeStyle = "green";
    ctx.strokeRect(this.position.x,this.position.y,this.size.width,this.size.height);
}

function setCheckedObjs(checkedObjs)
{
    this.checkedObjs = checkedObjs;
    var left = this.checkedObjs.findMostLeft();
    var top = this.checkedObjs.findMostTop();
   
    var right = this.checkedObjs.findMostRightPlusWidth();
    var buttom = this.checkedObjs.findMostButtomPlusHeight();

    //重新设置MultiTool的Position和Size
    this.position.x = left;
    this.position.y = top;

    this.size.width = right - left;
    this.size.height = buttom - top;
   
}




