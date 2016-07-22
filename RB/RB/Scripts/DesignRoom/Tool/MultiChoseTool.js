/*
@method 单例
*/
function MultiChoseTool(beginPosition, displayName) {

    var position = new Position(0, 0, 999);
    var size = new Size(0, 0);
    if (MultiChoseTool.unique != undefined)
    {
        MultiChoseTool.unique.position = position;
        MultiChoseTool.unique.size = size;
        MultiChoseTool.unique.beginPosition = beginPosition;
        MultiChoseTool.unique.endPosition = beginPosition;
        return MultiChoseTool.unique;
    }

    MultiChoseTool.name = "MultiChoseTool";//兼容IE   


   
   
    var img = typeof (undefined);

    Tool.apply(this, new Array(position, size, img, MultiChoseTool.name, displayName));
    this.beginPosition = beginPosition;
    this.endPosition = beginPosition;
    this.isMouseUp = false;
    this.draw = drawMultiChoseArea;
    this.setEndPosition = setEndPosition;
    this.checkedObjs = this.referanceObjs;
    this.setCheckedObjs = setCheckedObjs;

    //this.onMouseDown = onMultiChoseToolMouseDown;
    //this.onMouseMove = onMultiChoseToolMouseMove;
    //this.onMouseUp = onMultiChoseToolMouseUp;

    MultiChoseTool.unique = this;
}


function setEndPosition(endPosition) {
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

function drawMultiChoseArea() {
    ctx.strokeStyle = "lightblue";
    ctx.strokeRect(this.position.x, this.position.y, this.size.width, this.size.height);
}

function setCheckedObjs(checkedObjs) {
    this.checkedObjs=this.referanceObjs = checkedObjs;
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

function refreshPositionAndSize() {
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

