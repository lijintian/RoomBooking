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
    this.id = guid.newGUID();
    this.displayName="";

    this.addSubObj = addSubObj;
    this.removeSubObj = removeSubObj;
    this.isContainPoint = isContainPoint;
    this.isInObj = isInObj;
    this.draw = drawObj;
    this.drawName = drawObjName;
    this.moveTo = moveObjTo;
    this.check = checkObj;
    this.moveUnit = moveUnit;
    this.equal = equalObj;
    this.clone = clone;
}

function clone() {
    return cloneObj(this);
}

function cloneObj(obj) {
    var o;
    if (obj.constructor.name == "HTMLImageElement") {//todo:name 在IE不兼容
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
    ctx.strokeStyle = "blue";
    ctx.strokeRect(this.position.x, this.position.y, this.size.width, this.size.height);
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
/*===========================================================================================================================*/
//MousePosition Begin

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

    this.position = new Position(mx, my);
}

//MousePosition End
/*===========================================================================================================================*/
