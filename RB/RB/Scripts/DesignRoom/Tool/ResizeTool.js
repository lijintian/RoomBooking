
/*
@method 拉伸大小工具,单例
@param {Position} position 位置信息
*/
function ResizeTool(position, size, displayName) {
    if (ResizeTool.unique !== undefined) {
        ResizeTool.unique.position = position;
        ResizeTool.unique.size = size;
        ResizeTool.unique.moveResizeRetangle();
        return ResizeTool.unique
    }
    ResizeTool.name = "ResizeTool";
    var img = typeof (undefined);
    Tool.apply(this, new Array(position, size, img, ResizeTool.name, displayName));

    this.allReferanceObjs = new Array();
    this.resizeRectangles = this.subObjs;
    this.addResizeRectangle = this.addSubObj;
    this.removeAllResizeRectangle = removeAllResizeRectangle;
    this.draw = drawResizeTool;
    this.moveResizeRetangle = moveResizeRetangle;
    this.onMouseDown = onResizeToolMouseDown;
    this.onMouseMove = onResizeToolMouseMove;
    this.onMouseUp = onResizeToolMouseUp;

    retangleRadius = 3;

    //左上角
    var position0 = new Position(this.position.x - retangleRadius, this.position.y - retangleRadius,1001);
    var size0 = new Size(2 * retangleRadius, 2 * retangleRadius);
    var resizeRetangle0 = new ResizeRectangle(position0, size0, 0);
    this.addResizeRectangle(resizeRetangle0);
    //上中点
    var position1 = new Position(this.position.x + this.size.width / 2 - retangleRadius, this.position.y - retangleRadius, 1001);
    var size1 = new Size(2 * retangleRadius, 2 * retangleRadius);
    var resizeRetangle1 = new ResizeRectangle(position1, size1, 1)
    this.addResizeRectangle(resizeRetangle1);
    //右上角
    var position2 = new Position(this.position.x + this.size.width - retangleRadius, this.position.y - retangleRadius, 1001);
    var size2 = new Size(2 * retangleRadius, 2 * retangleRadius);
    var resizeRetangle2 = new ResizeRectangle(position2, size2, 2);
    this.addResizeRectangle(resizeRetangle2);
    //右中点
    var position3 = new Position(this.position.x + this.size.width - retangleRadius, this.position.y + this.size.height / 2 - retangleRadius, 1001);
    var size3 = new Size(2 * retangleRadius, 2 * retangleRadius);
    var resizeRetangle3 = new ResizeRectangle(position3, size3, 3)
    this.addResizeRectangle(resizeRetangle3);
    //右下角
    var position4 = new Position(this.position.x + this.size.width - retangleRadius, this.position.y + this.size.height - retangleRadius, 1001);
    var size4 = new Size(2 * retangleRadius, 2 * retangleRadius);
    var resizeRetangle4 = new ResizeRectangle(position4, size4, 4);
    this.addResizeRectangle(resizeRetangle4);
    //下中点
    var position5 = new Position(this.position.x + this.size.width / 2 - retangleRadius, this.position.y + this.size.height - retangleRadius, 1001);
    var size5 = new Size(2 * retangleRadius, 2 * retangleRadius);
    var resizeRetangle5 = new ResizeRectangle(position5, size5, 5);
    this.addResizeRectangle(resizeRetangle5);
    //左下角
    var position6 = new Position(this.position.x - retangleRadius, this.position.y + this.size.height - retangleRadius, 1001);
    var size6 = new Size(2 * retangleRadius, 2 * retangleRadius);
    var resizeRetangle6 = new ResizeRectangle(position6, size6, 6);
    this.addResizeRectangle(resizeRetangle6);
    //左中点
    var position7 = new Position(this.position.x - retangleRadius, this.position.y + this.size.height / 2 - retangleRadius, 1001);
    var size7 = new Size(2 * retangleRadius, 2 * retangleRadius);
    var resizeRetangle7 = new ResizeRectangle(position7, size7, 7);
    this.addResizeRectangle(resizeRetangle7);

    everything.pushElement(resizeRetangle0);
    everything.pushElement(resizeRetangle1);
    everything.pushElement(resizeRetangle2);
    everything.pushElement(resizeRetangle3);
    everything.pushElement(resizeRetangle4);
    everything.pushElement(resizeRetangle5);
    everything.pushElement(resizeRetangle6);
    everything.pushElement(resizeRetangle7);

    ResizeTool.unique = this;
}

function drawResizeTool() {
    ctx.strokeStyle = "lightblue";
    ctx.strokeRect(this.position.x, this.position.y, this.size.width, this.size.height);
}

function moveResizeRetangle() {
    retangleRadius = 3;

    //左上角
    var position0 = new Position(this.position.x - retangleRadius, this.position.y - retangleRadius, 1001);
    this.resizeRectangles[0].position = position0;
    //上中点
    var position1 = new Position(this.position.x + this.size.width / 2 - retangleRadius, this.position.y - retangleRadius, 1001);
    this.resizeRectangles[1].position = position1;
    //右上角
    var position2 = new Position(this.position.x + this.size.width - retangleRadius, this.position.y - retangleRadius, 1001);
    this.resizeRectangles[2].position = position2;
    //右中点
    var position3 = new Position(this.position.x + this.size.width - retangleRadius, this.position.y + this.size.height / 2 - retangleRadius, 1001);
    this.resizeRectangles[3].position = position3;
    //右下角
    var position4 = new Position(this.position.x + this.size.width - retangleRadius, this.position.y + this.size.height - retangleRadius, 1001);
    this.resizeRectangles[4].position = position4;
    //下中点
    var position5 = new Position(this.position.x + this.size.width / 2 - retangleRadius, this.position.y + this.size.height - retangleRadius, 1001);
    this.resizeRectangles[5].position = position5;
    //左下角
    var position6 = new Position(this.position.x - retangleRadius, this.position.y + this.size.height - retangleRadius, 1001);
    this.resizeRectangles[6].position = position6;
    //左中点
    var position7 = new Position(this.position.x - retangleRadius, this.position.y + this.size.height / 2 - retangleRadius, 1001);
    this.resizeRectangles[7].position = position7;
}

function removeAllResizeRectangle() {
    this.resizeRectangles = this.subObjs = new Array();
}

function onResizeToolMouseDown(ev) {
    var mousePosition = new MousePosition(ev);
    this.isChecked = true;
    this.relativeDistance.relativeDistanceX = mousePosition.position.x - this.position.x;
    this.relativeDistance.relativeDistanceY = mousePosition.position.y - this.position.y;
    this.subObjsRelativeDistance = this.subObjs.GetRelativeDistances(mousePosition)

    this.allReferanceObjs = getAllReferanceObjs(this);
 
    this.referanceObjsRelativeDistance = this.allReferanceObjs.GetRelativeDistances(mousePosition);
    this.check();
}

function onResizeToolMouseMove(ev) {
    var mousePosition = new MousePosition(ev);
    if (this.isChecked == true) {
        this.moveRelativeDisplacement(mousePosition.position, this.relativeDistance);
        this.subObjs.moveRelativeDisplacement(mousePosition.position, this.subObjsRelativeDistance);

        var allReferanceObjs = getAllReferanceObjs(this);

        this.allReferanceObjs.moveRelativeDisplacement(mousePosition.position, this.referanceObjsRelativeDistance);
        this.check();
    }
    else {

    }
}

function onResizeToolMouseUp(ev) {
    var mousePosition = new MousePosition(ev);
    this.isChecked = false;
}






function ResizeRectangle(position, size, displayName, direct) {
    ResizeRectangle.name = "ResizeRectangle";
    var img = typeof (undefined);
    Tool.apply(this, new Array(position, size, img, ResizeRectangle.name, displayName));
    this.direct = direct;
    this.draw = drawResizeRectangle;

    this.onMouseDown = function () { };
    this.onMouseMove = function () { };
    this.onMouseUp = function () { };
}

function drawResizeRectangle() {
    ctx.strokeStyle = "lightblue";
    ctx.fillStyle = "white";
    ctx.strokeRect(this.position.x, this.position.y, this.size.width, this.size.height);
    ctx.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
}
