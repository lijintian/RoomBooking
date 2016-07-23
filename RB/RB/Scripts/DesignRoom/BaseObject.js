function Position(x, y,z) {
    this.x = x;
    this.y = y;
    if (typeof z == "undefined") {
        this.z = 0;
    }
    else {
        this.z = z;
    }
   
}

function Size(width, height) {
    this.width = width;
    this.height = height;
}

var guid = new GUID();

/**
 * 基类
 * @method BaseObject
 * @param {Position} position 位置信息
 * @param {Size} size 尺寸信息
 * @param {string} type 类型
 * @return {BaseObject} 基类对象
 */
function BaseObject(position, size, type) {
    this.position = position;
    this.size = size;
    this.type = type;
    this.subObjs = new Array();
    this.referanceObjs = new Array();
    this.id = guid.newGUID();
    this.displayName="";
    this.relativeDistance = new RelativeDistance(0, 0);
    this.subObjsRelativeDistance = new Array();
    this.referanceObjsRelativeDistance = new Array();
    this.isChecked = false;
    this.originPosition;
    this.originSize;


    this.addSubObj = addSubObj;
    this.removeSubObj = removeSubObj;
    this.addReferanceObj = addReferanceObj;
    this.removeReferanceObj = removeReferanceObj;

    this.isContainPoint = isContainPoint;
    this.isInObj = isInObj;
    this.draw = drawObj;
    this.drawName = drawObjName;
    this.moveTo = moveObjTo;
    this.moveRelativeDisplacement = moveRelativeDisplacement;
    this.check = checkObj;
    this.unCheck = unCheckObj;
    this.moveUnit = moveUnit;
    this.equal = equalObj;
    this.clone = clone;
    this.onBorder = onBorder;
    

    
    this.onMouseDown = onMouseDown;
    this.onMouseMove = onMouseMove;
    this.onMouseUp = onMouseUp;
    this.onKeyDown = function () { };
    this.keyboardRightDown = keyboardRightDown;
    this.keyboardTopDown = keyboardTopDown;
    this.keyboardLeftDown = keyboardLeftDown;
    this.keyboardButtomDown = keyboardButtomDown;
}

function clone() {
    return cloneObj(this);
}

function cloneObj(obj) {
    var o;
    if (obj.constructor.name == "HTMLImageElement") {
        return $(obj)[0];
    }
    if (obj.constructor == Object) {
        o = new obj.constructor();
    } else {
        o = new obj.constructor(obj.valueOf());
    }
    for (var key in obj) {
        if (o[key] != obj[key]) {
            if (typeof (obj[key]) == 'object') {
                o[key] = cloneObj(obj[key]);
            } else {
                o[key] = obj[key];
            }
        }
    }
    o.toString = obj.toString;
    o.valueOf = obj.valueOf;
    return o;
}

function addSubObj(obj) {
    if (this.subObjs.indexOf(obj) < 0) {
        this.subObjs.push(obj);
    }
}

function removeSubObj(obj) {
    var indexInObj = this.subObjs.indexOf(obj);
    if (indexInObj >= 0) {
        this.subObjs.splice(indexInObj, 1);
    }
}

function addReferanceObj(obj) {
    if (this.referanceObjs.indexOf(obj) < 0) {
        this.referanceObjs.push(obj);
    }
}

function removeReferanceObj(obj) {
    var indexInObj = this.referanceObjs.indexOf(obj);
    if (referanceObjs >= 0) {
        this.referanceObjs.splice(indexInObj, 1);
    }
}


function isContainPoint(pointX, pointY) {
    ////此处实现二维判断，未来可拓展三围
    if (pointX >= this.position.x && pointX <= this.position.x + this.size.width
        && pointY >= this.position.y && pointY <= this.position.y + this.size.height) {
        return true;
    }
    else {
        return false;
    }
}

function isInObj(obj) {
    //此处实现二维判断，未来可拓展三围
    if (obj.isContainPoint(this.position.x, this.position.y)//左上角
        && obj.isContainPoint(this.position.x + this.size.width, this.position.y)//右上角
        && obj.isContainPoint(this.position.x, this.position.y + this.size.height)//左下角
        && obj.isContainPoint(this.position.x + this.size.width, this.position.y + this.size.height)//右下角
          ) {
        return true;
    }
    else {
        return false;
    }
}

function drawObj() {
    if (typeof (this.img) != "undefined") {
        ctx.drawImage(this.img, this.position.x, this.position.y, this.size.width, this.size.height);
    }
    this.drawName();
}

function drawObjName() {
    if (typeof (showObjType) != "undefined") {
        if (showObjType) {
            ctx.fillStyle = "blue";            
            ctx.textBaseline = 'top'
            var displayText = this.type;
            if (this.displayName!="")
            {
                displayText = this.displayName
            }

            var txtLength = ctx.measureText(displayText).width;
            var titleX = 0;
            var titleY = 0;
            switch (this.type) {
                case Equipment.name:
                    titleX = this.position.x + this.size.width;
                    titleY = this.position.y - 11;
                    break;
                case Tool.name:
                    titleX = this.position.x + (this.size.width - txtLength) / 2;
                    titleY = this.position.y + this.size.height - 5;
                    ctx.clearRect(titleX, titleY, txtLength, 10);
                    break;
                default:
                    titleX = this.position.x + this.size.width - txtLength - 4;
                    titleY = this.position.y - 5;
                    ctx.clearRect(titleX, titleY, txtLength, 10);
                    break;
            }
            ctx.fillText(displayText, titleX, titleY);
           
        }
    }
}

function moveObjTo(x, y) {
    this.position.x = x;
    this.position.y = y;
}

function checkObj() {
    var position = new Position(this.position.x, this.position.y,1000);
    var size = new Size(this.size.width.valueOf(), this.size.height.valueOf());

    var resizeTool = new ResizeTool(position, size, "");

    //每次选中，则当前操作对象变成ResizeTool
    //currentOpObj = resizeTool;
    if (this === resizeTool) {
        //选中的是ResizeTool自身不做处理
    }
    else {
        resizeTool.referanceObjs = new Array();
        resizeTool.addReferanceObj(this);
        everything.pushElement(resizeTool);
        everything.pushElements(resizeTool.resizeRectangles);
        
    }
   
    resizeTool.showReferenceObjsProperty();
    //选中后清除多选工具
    everything.removeElement(MultiChoseTool.unique);

}

function unCheckObj()
{
    everything.removeElement(MultiChoseTool.unique);
    everything.removeElement(ResizeTool.unique);

    if (ResizeTool.unique != undefined)
    {
        for (var i = 0; i < ResizeTool.unique.resizeRectangles.length; i++) {
            everything.removeElement(ResizeTool.unique.resizeRectangles[i]);
        }

    }
   
    hideProperty();
    hideMultiEditBar();
}

function moveUnit(xUnit, yUnit) {
    this.position.x += xUnit;
    this.position.y += yUnit;
}

function equalObj(obj) {
    if (this.position.x == obj.position.x && this.position.y == obj.position.y
   && this.size.width.valueOf() == obj.size.width.valueOf() && this.size.height.valueOf() == obj.size.height.valueOf()
   ) {
        return true;
    }
    else {
        return false;
    }
}

function onBorder(obj)
{
    if (this.position.x < obj.position.x)
    {
        this.position.x = obj.position.x ;
    }
    if (this.position.y < obj.position.y) {
        this.position.y = obj.position.y ;
    }

    if (this.position.x + this.size.width > obj.position.x + obj.size.width) {
        this.position.x = obj.position.x + obj.size.width - this.size.width;
    }

    if (this.position.y + this.size.height > obj.position.y + obj.size.height) {
        this.position.y = obj.position.y + obj.size.height - this.size.height;
    }
}

/*
@method 移动相对位移
@param {Position} relativePosition
@param {RelativeDistance} relativeDistance 
*/
function moveRelativeDisplacement(relativePosition, relativeDistance)
{
    this.moveTo(relativePosition.x - relativeDistance.relativeDistanceX, relativePosition.y - relativeDistance.relativeDistanceY);
   
}

function onMouseDown(ev) {
    var mousePosition = new MousePosition(ev);
    this.isChecked = true;
    this.relativeDistance.relativeDistanceX = mousePosition.position.x - this.position.x;
    this.relativeDistance.relativeDistanceY = mousePosition.position.y - this.position.y;
    this.check();
}

function onMouseMove(ev) {
    var mousePosition = new MousePosition(ev);
    if (this.isChecked == true) {
        this.moveRelativeDisplacement(mousePosition.position, this.relativeDistance);
        this.check();
    }
    else {
       
    }
}

function onMouseUp(ev) {
    var mousePosition = new MousePosition(ev);
    this.isChecked = false;
}

function keyboardRightDown() {
    var mouveUnit = 1;
    this.moveUnit(mouveUnit, 0);
    mouveUnit = this.isInObj(currentRoom) ? 0 : -1;
    this.moveUnit(mouveUnit, 0);
}

function keyboardTopDown() {
    var mouveUnit = -1;
    this.moveUnit(0, mouveUnit);
    mouveUnit = this.isInObj(currentRoom) ? 0 : 1;
    this.moveUnit(0, mouveUnit);
}

function keyboardLeftDown() {
    var mouveUnit = -1;
    this.moveUnit(mouveUnit, 0);
    mouveUnit = this.isInObj(currentRoom) ? 0 : 1;
    this.moveUnit(mouveUnit, 0);

}

function keyboardButtomDown() {
    var mouveUnit = 1;
    this.moveUnit(0, mouveUnit);
    mouveUnit = this.isInObj(currentRoom) ? 0 : -1;
    this.moveUnit(0, mouveUnit);
}

/*===========================================================================================================================*/
//MousePosition Begin

/*
@method 鼠标位置 单例
*/
function MousePosition(ev) {
    var mx;
    var my;


    if (ev.offsetX || ev.offsetX == 0) {
        mx = ev.offsetX;
        my = ev.offsetY;
    } else if (ev.layerX || ev.layerX == 0) {
        mx = ev.layerX;
        my = ev.layerY;
    }
    if(MousePosition.unique!=undefined)
    {
        MousePosition.unique.position.x=mx;
        MousePosition.unique.position.y=my;
        return MousePosition.unique;
    }

    this.position = new Position(mx, my);

    MousePosition.unique=this;
}

//MousePosition End
/*===========================================================================================================================*/

function RelativeDistance(relativeDistanceX, relativeDistanceY)
{
    this.relativeDistanceX = relativeDistanceX;
    this.relativeDistanceY = relativeDistanceY;
}