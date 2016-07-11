function Position(x, y) {
    this.x = x;
    this.y = y;
}

function Size(width, height) {
    this.width = width;
    this.height = height;
}

function BaseObject(position, size, type) {
    this.position = position;
    this.size = size;
    this.type = type;
    this.subObjs=new Array();

    this.addSubObj = addSubObj;
    this.removeSubObj = removeSubObj;
    this.isContainPoint = isContainPoint;
    this.isInObj = isInObj;
    this.draw = drawObj;
    this.move = moveObj;
    
}

function addSubObj(obj)
{
    if (this.subObjs.indexOf(obj) < 0)
    {
        this.subObjs.push(obj);
    }
}

function removeSubObj(obj)
{
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
}

function moveObj(x, y) {
    this.position.x = x;
    this.position.y = y;
}

/*===========================================================================================================================*/
//MousePosition Begin

function MousePosition(ev) {
    var mx;
    var my;

    if (ev.layerX || ev.layerX == 0) {
        mx = ev.layerX;
        my = ev.layerY;
    }
    else if (ev.offsetX || ev.offsetX == 0) {
        mx = ev.offsetX;
        my = ev.offsetY;
    }

    this.position = new Position(mx, my);
}

//MousePosition End
/*===========================================================================================================================*/
