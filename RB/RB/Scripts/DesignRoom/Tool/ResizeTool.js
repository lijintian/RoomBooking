
/**
@method 拉伸大小工具,单例
@param {Position} position 位置信息
*/
function ResizeTool(position, size, displayName) {
    ResizeTool.name = "ResizeTool";
    if (ResizeTool.unique !== undefined) {
        ResizeTool.unique.position = position;
        ResizeTool.unique.size = size;
        ResizeTool.unique.moveResizeRetangle();
        return ResizeTool.unique
    }
   
    var img = typeof (undefined);
    Tool.apply(this, new Array(position, size, img, ResizeTool.name, displayName));
    /*----------------------OverRide Begin------------------------------*/
    this.draw = drawResizeTool;
    this.onMouseDown = onResizeToolMouseDown;
    this.onMouseMove = onResizeToolMouseMove;
    this.onMouseUp = onResizeToolMouseUp;
    this.onKeyDown = onResizeToolKeyDown;

    this.resizeRectangles = this.subObjs;
    this.addResizeRectangle = this.addSubObj;
    this.clone = fResizeToolClone;
    
    /*----------------------OverRide End------------------------------*/


    this.allReferanceObjs = new Array();
    this.referanceObjsRelateResizeToolDistance=new Array();
    this.removeAllResizeRectangle = removeAllResizeRectangle;
    this.moveResizeRetangle = moveResizeRetangle;
    this.getAllReferanceObjs = resizeToolGetAllReferanceObjs;
    this.showReferenceObjsProperty = showReferenceObjsProperty;
    this.effectReferenceObjsProperty = effectReferenceObjsProperty;
    this.alignReferenceObjs = alignReferenceObjs;
    this.averageReferenceObjs = averageReferenceObjs;
    this.refreshPositionAndSize = refreshPositionAndSize;

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

    //旋转按钮
    var pathCircleRadius = this.size.width > this.size.height ? this.size.width : this.size.height;
    var size8 = new Size(20, 20);
    var position8 = new Position(this.position.x + this.size.width / 2 + pathCircleRadius - size8.width / 2, this.position.y + this.size.height / 2 - size8.height / 2, 1001);
    
    this.getAllReferanceObjs();
    if(this.allReferanceObjs.length==1)
    {
        var circleCenterPosition = new Position(this.position.x + this.size.width / 2, this.position.y + this.size.height / 2);
        var sinValue = this.allReferanceObjs[0]._revolveAngle;
        var cutPoint = fGetCirclleCutPointBySinValue(circleCenterPosition, sinValue, pathCircleRadius);
        position8 = new Position(cutPoint.x - size8.width / 2, cutPoint.y- size8.height / 2, 1001);
    }
   

    var revoleCircle = new RevolveCircle(position8, size8, pathCircleRadius, "");
    this.addResizeRectangle(revoleCircle);
    

    everything.pushElement(resizeRetangle0);
    everything.pushElement(resizeRetangle1);
    everything.pushElement(resizeRetangle2);
    everything.pushElement(resizeRetangle3);
    everything.pushElement(resizeRetangle4);
    everything.pushElement(resizeRetangle5);
    everything.pushElement(resizeRetangle6);
    everything.pushElement(resizeRetangle7);
    everything.pushElement(revoleCircle);

    ResizeTool.unique = this;
}

function fResizeToolMoveTo(pointPosition)
{
    this.referanceObjsRelateResizeToolDistance = this.allReferanceObjs.getRelativeDistances(this);
}

function fResizeToolClone()
{
    this.getAllReferanceObjs();
   
    var referanceObjsClone = this.allReferanceObjs.clone();
    return referanceObjsClone;
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

    var pathCircleRadius = this.size.width > this.size.height ? this.size.width : this.size.height;
    var size8 = new Size(20, 20);
    var position8 = new Position(this.position.x + this.size.width / 2 + pathCircleRadius - size8.width / 2, this.position.y + this.size.height / 2 - size8.height / 2, 1001);
    this.getAllReferanceObjs();
    if (this.allReferanceObjs.length == 1) {
        var circleCenterPosition = new Position(this.position.x + this.size.width / 2, this.position.y + this.size.height / 2);
        var sinValue = this.allReferanceObjs[0]._revolveAngle;
        var cutPoint = fGetCirclleCutPointBySinValue(circleCenterPosition, sinValue, pathCircleRadius);
        position8 = new Position(cutPoint.x - size8.width / 2, cutPoint.y - size8.height / 2, 1001);
    }
    this.resizeRectangles[8].position = position8;
    this.resizeRectangles[8]._pathCircleRadius = pathCircleRadius;
}

function removeAllResizeRectangle() {
    this.resizeRectangles = this.subObjs = new Array();
}

function resizeToolGetAllReferanceObjs()
{
    this.allReferanceObjs = getAllReferanceObjs(this);
    this.allReferanceObjs.removeElement(new MultiChoseTool(new Position(0, 0), ""));
    return this.allReferanceObjs;
}

function onResizeToolMouseDown(ev) {
    var mousePosition = new MousePosition(ev);
    this.isChecked = true;
    this.relativeDistance.relativeDistanceX = mousePosition.position.x - this.position.x;
    this.relativeDistance.relativeDistanceY = mousePosition.position.y - this.position.y;
    this.subObjsRelativeDistance = this.subObjs.getRelativeDistances(mousePosition)

    
  
    this.referanceObjsRelativeDistance = this.allReferanceObjs.getRelativeDistances(mousePosition);
    this.referanceObjsRelateResizeToolDistance=this.allReferanceObjs.getRelativeDistances(this);
    this.check();
}

function onResizeToolMouseMove(ev) {
    var mousePosition = new MousePosition(ev);
    if (this.isChecked == true) {
        if (this.isInObj(currentRoom)) {
            this.moveRelativeDisplacement(mousePosition.position, this.relativeDistance);
            //this.subObjs.moveRelativeDisplacement(mousePosition.position, this.subObjsRelativeDistance);

            var allReferanceObjs = getAllReferanceObjs(this);

            this.onBorder(currentRoom);

            this.allReferanceObjs.moveRelativeDisplacement(this.position, this.referanceObjsRelateResizeToolDistance);
           

            this.check();
        }
        else {
            this.onBorder(currentRoom);
        }
    }
    else {

    }
}

function onResizeToolMouseUp(ev) {
    var mousePosition = new MousePosition(ev);
    this.isChecked = false;
}

function onResizeToolKeyDown(e) {
  
    keyCode = e.keyCode;
    this.getAllReferanceObjs();
    this.referanceObjsRelateResizeToolDistance = this.allReferanceObjs.getRelativeDistances(this);

    switch (keyCode) {
        case 46://Delete
            everything.removeElements(this.allReferanceObjs);
            everything.removeElements(this.resizeRectangles);
            everything.removeElement(this);
            deleteInit();
            break;
        case 37://←   
            this.keyboardLeftDown();
            this.moveResizeRetangle();
            this.allReferanceObjs.moveRelativeDisplacement(this.position, this.referanceObjsRelateResizeToolDistance);
            break;
        case 38://↑
            this.keyboardTopDown();
            this.moveResizeRetangle();
            this.allReferanceObjs.moveRelativeDisplacement(this.position, this.referanceObjsRelateResizeToolDistance);
            break
        case 39://→
            this.keyboardRightDown();
            this.moveResizeRetangle();
            this.allReferanceObjs.moveRelativeDisplacement(this.position, this.referanceObjsRelateResizeToolDistance);
            break
        case 40://↓
            this.keyboardButtomDown();
            this.moveResizeRetangle();
            this.allReferanceObjs.moveRelativeDisplacement(this.position, this.referanceObjsRelateResizeToolDistance);
            break
        default:
            document.removeEventListener("keydown", keyDown, false);
            break
    }

    if (keyCode >= 37 && keyCode <= 40)
    {
        this.showReferenceObjsProperty();
    }
}

function showReferenceObjsProperty()
{
    this.getAllReferanceObjs();
    //引用移除多选工具
    //this.allReferanceObjs.removeElement(new MultiChoseTool(new Position(0,0),""));

    if (this.allReferanceObjs.length > 1) {//多选
        showMultiEditBar(this.allReferanceObjs);
    }
    else if (this.allReferanceObjs.length==1) {//只选中了一个
        showProperty(this.allReferanceObjs[0]);
    }
}

function effectReferenceObjsProperty() {
    this.getAllReferanceObjs();
    //this.allReferanceObjs.removeElement(new MultiChoseTool(new Position(0, 0), ""));

    if (this.allReferanceObjs.length > 1) {//多选
        effectMultiEdit(this.allReferanceObjs);
        this.refreshPositionAndSize();
    }
    else if (this.allReferanceObjs.length == 1) {//只选中了一个
        effectProperty(this.allReferanceObjs[0]);
        this.allReferanceObjs[0].check();
       
    }
 

    drawEverything();
}

function alignReferenceObjs(direct)
{
    multiAlign(direct, this.allReferanceObjs);
    this.refreshPositionAndSize();
    drawEverything();
}

function averageReferenceObjs(averageType)
{
    multiAverage(averageType, this.allReferanceObjs);
    this.refreshPositionAndSize();
    drawEverything();
}

function refreshPositionAndSize() {
    this.getAllReferanceObjs();
    //引用移除多选工具
    //this.allReferanceObjs.removeElement(new MultiChoseTool(new Position(0, 0), ""));

    var left = this.allReferanceObjs.findMostLeft();
    var top = this.allReferanceObjs.findMostTop();

    var right = this.allReferanceObjs.findMostRightPlusWidth();
    var buttom = this.allReferanceObjs.findMostButtomPlusHeight();

    //重新设置MultiTool的Position和Size
    var position = new Position(left, top);
    var size = new Size(right - left,buttom - top);

    new ResizeTool(position, size, "");
}





/**
@method 调整大小方形按钮
@param {Position} position 位置信息
*/
function ResizeRectangle(position, size, direct, displayName) {
    ResizeRectangle.name = "ResizeRectangle";
    var img = typeof (undefined);
    Tool.apply(this, new Array(position, size, img, ResizeRectangle.name, displayName));
    this.direct = direct;
    this.draw = drawResizeRectangle;
    

    
    this.referanceObjsOrignPositions;
    this.referanceObjsOrignSizes;
   

    /*----------------OverRide Begin----------------------*/
    this.onMouseDown = onResizeRectangleMouseDown;
    this.onMouseMove = onResizeRectangleMouseMove;
    this.onMouseUp = onResizeRectangleMouseUp;

    /*-----------------OverRide End----------------------*/

    this.refreshResizeToolReferenceObjsSize = refreshResizeToolReferenceObjsSize;
}

function drawResizeRectangle() {
        ctx.strokeStyle = "lightblue";
        ctx.fillStyle = "white";
        ctx.strokeRect(this.position.x, this.position.y, this.size.width, this.size.height);
        ctx.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
}

function onResizeRectangleMouseDown(ev) {
    var mousePosition = new MousePosition(ev);
    this.originPosition = new Position(this.position.x, this.position.y, this.position.z);

    this.referanceObjs = ResizeTool.unique.getAllReferanceObjs();

    this.referanceObjs.setOriginPositions();
    this.referanceObjs.setOriginSizes();

    this.isChecked = true;
    this.relativeDistance.relativeDistanceX = mousePosition.position.x - this.position.x;
    this.relativeDistance.relativeDistanceY = mousePosition.position.y - this.position.y;
}

function onResizeRectangleMouseMove(ev) {
    var mousePosition = new MousePosition(ev);
    if (this.isChecked == true) {
        this.moveRelativeDisplacement(mousePosition.position, this.relativeDistance);
        this.refreshResizeToolReferenceObjsSize();
    }
    else {

    }
}

function onResizeRectangleMouseUp(ev) {
    var mousePosition = new MousePosition(ev);
    this.isChecked = false;
}


function refreshResizeToolReferenceObjsSize()
{
    var resizeWidth=0;
    var resizeHeight=0;
    switch (this.direct)
    {
        case 0:
            resizeWidth = this.originPosition.x - this.position.x;
            resizeHeight = this.originPosition.y - this.position.y;

            this.referanceObjs.refreshSizeAndPosition(resizeWidth, resizeHeight, -resizeWidth, -resizeHeight);
          
            break;
        case 1:
            resizeWidth = 0;
            resizeHeight = this.originPosition.y - this.position.y;
            this.referanceObjs.refreshSizeAndPosition(resizeWidth, resizeHeight, 0, -resizeHeight);

            break;
        case 2:
            resizeWidth = this.position.x - this.originPosition.x;
            resizeHeight = this.position.y-this.originPosition.y ;

            this.referanceObjs.refreshSizeAndPosition(resizeWidth, -resizeHeight, 0, resizeHeight);
            break;
        case 3:
            resizeWidth = this.position.x - this.originPosition.x;
            resizeHeight = 0;
            this.referanceObjs.refreshSizeAndPosition(resizeWidth, resizeHeight, 0, 0);

            break;
        case 4:
            resizeWidth = this.position.x - this.originPosition.x;
            resizeHeight = this.position.y - this.originPosition.y;

            this.referanceObjs.refreshSizeAndPosition(resizeWidth, resizeHeight, 0, 0);
            break;
        case 5:
            resizeWidth = 0;
            resizeHeight = this.position.y- this.originPosition.y;
            this.referanceObjs.refreshSizeAndPosition(resizeWidth, resizeHeight, 0, 0);
            break;
        case 6:
            resizeWidth = this.position.x - this.originPosition.x;
            resizeHeight = this.position.y - this.originPosition.y;

            this.referanceObjs.refreshSizeAndPosition(-resizeWidth, resizeHeight, resizeWidth, 0);
            break;
            break;
        case 7:
            resizeWidth = this.originPosition.x - this.position.x;
            resizeHeight = 0;
            this.referanceObjs.refreshSizeAndPosition(resizeWidth, resizeHeight, -resizeWidth, 0);
            break;
    }
    ResizeTool.unique.showReferenceObjsProperty();
    ResizeTool.unique.refreshPositionAndSize();
}

/**
@method 旋转圆形按钮
*/
function RevolveCircle(position, size,pathCircleRadius, displayName) {
    RevolveCircle.name = "RevolveCircular";
    var img = typeof (undefined);
    Tool.apply(this, new Array(position, size, img, RevolveCircle.name, displayName));
    this.draw = fDrawRevolveCircle;
    this._circleRadius = this.size.width / 2;
    this._pathCircleRadius = pathCircleRadius


    this.referanceObjsOrignPositions;
    this.referanceObjsOrignSizes;


    /*----------------OverRide Begin----------------------*/
    this.onMouseDown = onRevolveCircleMouseDown;
    this.onMouseMove = onRevolveCircleMouseMove;
    this.onMouseUp = onRevolveCircleMouseUp;

    /*-----------------OverRide End----------------------*/

    this.refreshResizeToolReferenceObjsAngle = fRefreshResizeToolReferenceObjsAngle;
}

function fDrawRevolveCircle()
{
    ctx.beginPath();
    //this._circleRadius=this.size.width / 2;
    ctx.arc(this.position.x + this._circleRadius, this.position.y + this._circleRadius, this._circleRadius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.strokeStyle = 'red';
    ctx.stroke();
    
    ctx.beginPath();
  
    ctx.arc(ResizeTool.unique.position.x + ResizeTool.unique.size.width / 2, ResizeTool.unique.position.y + ResizeTool.unique.size.height/2, this._pathCircleRadius, 0, Math.PI * 2, true);
    ctx.closePath();

    ctx.strokeStyle = 'lightblue';
    ctx.stroke();
}

function onRevolveCircleMouseDown(ev) {
    var mousePosition = new MousePosition(ev);
    this.originPosition = new Position(this.position.x, this.position.y, this.position.z);

    this.referanceObjs = ResizeTool.unique.getAllReferanceObjs();

    this.referanceObjs.setOriginPositions();
    this.referanceObjs.setOriginSizes();

    this.isChecked = true;
    this.relativeDistance.relativeDistanceX = mousePosition.position.x - this.position.x;
    this.relativeDistance.relativeDistanceY = mousePosition.position.y - this.position.y;
}

function onRevolveCircleMouseMove(ev) {
    var mousePosition = new MousePosition(ev);
    if (this.isChecked == true) {
        var centerPoint = new Position(ResizeTool.unique.position.x + ResizeTool.unique.size.width / 2, ResizeTool.unique.position.y + ResizeTool.unique.size.height / 2);
        var connectPoint = new Position(mousePosition.position.x, mousePosition.position.y);
        //var circleRadius = ResizeTool.unique.size.width > ResizeTool.unique.size.height ? ResizeTool.unique.size.width : ResizeTool.unique.size.height;
     
        var cutPoint = fGetCirclleCutPoint(centerPoint, connectPoint, this._pathCircleRadius);

        this.moveTo(cutPoint.x - this._circleRadius, cutPoint.y - this._circleRadius);
        this.refreshResizeToolReferenceObjsAngle(centerPoint, cutPoint, this._pathCircleRadius);
    }
    else {

    }
}

function onRevolveCircleMouseUp(ev) {
    var mousePosition = new MousePosition(ev);
    this.isChecked = false;
}

//刷新关联对象角度
function fRefreshResizeToolReferenceObjsAngle(centerPoint, cutPoint, radius)
{
    var angle = 0;
    if (cutPoint.x > centerPoint.x) {
        angle = Math.asin((cutPoint.y - centerPoint.y) / radius);
    }
    else {
        angle = Math.acos((cutPoint.y - centerPoint.y) / radius)+Math.PI/2;
    }
    
    this.referanceObjs.setAngle(angle);   
}


