Array.prototype.equal = arrayEqual;
Array.prototype.clone = arrayClone;
Array.prototype.alignTop = alignTop;
Array.prototype.alignButtom = alignButtom;
Array.prototype.alignLeft = alignLeft;
Array.prototype.alignRight = alignRight;
Array.prototype.isSameSize = isSameSize;
Array.prototype.isSameName = isSameName;
Array.prototype.findMostTop = findMostTop;
Array.prototype.findMostButtom = findMostButtom;
Array.prototype.findMostButtomPlusHeight = findMostButtomPlusHeight;
Array.prototype.findMostLeft = findMostLeft;
Array.prototype.findMostRight = findMostRight;
Array.prototype.findMostRightPlusWidth = findMostRightPlusWidth;
Array.prototype.sortByPositionX = sortByPositionX;
Array.prototype.sortByPositionY = sortByPositionY;
Array.prototype.sortByPositionZ = sortByPositionZ;
Array.prototype.horizonAverage = horizonAverage;
Array.prototype.verticalAverage = verticalAverage;
Array.prototype.removeElement = removeElement;
Array.prototype.removeElements = removeElements;
Array.prototype.pushElement = pushElement;
Array.prototype.pushElements = pushElements;
Array.prototype.moveRelativeDisplacement = moveRelativeDisplacement
Array.prototype.getRelativeDistances = arrayGetRelativeDistances;
Array.prototype.getObjsInObj = arrayGetObjsInObj;
Array.prototype.check = arrayCheck;
Array.prototype.refreshSizeAndPosition = arrayRefreshSizeAndPosition;
Array.prototype.setOriginPositions = arraySetOriginPositions;
Array.prototype.setOriginSizes = arraySetOriginSizes;
Array.prototype.show = fArrayShow;
Array.prototype.hide = fArrayHide;

function fArrayShow()
{
    for (var i = 0; i < this.length; i++) {
        this[i]._isShow = true;
    }
}

function fArrayHide() {
    for (var i = 0; i < this.length; i++) {
        this[i]._isShow = false;
    }
}

function arrayGetRelativeDistances(mousePosition)
{
    var relativeDistances=new Array();

    for (var i = 0; i < this.length; i++)
    {
        var relativeDX = mousePosition.position.x - this[i].position.x;
        var relativeDY = mousePosition.position.y - this[i].position.y;

        relativeDistances.push(new RelativeDistance(relativeDX, relativeDY));
    }

    return relativeDistances;
}

/*
@method 判断两个数组是否相同(position,size相同及认为相同)
*/
function arrayEqual(arr) {
    if (this.length == arr.length) {
        for (var i = 0; i < arr.length; i++)
        {
            if (!this[i].equal(arr[i]))
            {
                return false;
            }
        }
        return true;
    }
    else {
        return false;
    }
}

/*
@method 克隆数组
*/
function arrayClone() {
    var arr = new Array();

    for (var i = 0; i < this.length; i++) {

        if (this[i] instanceof ResizeTool || this[i] instanceof ResizeRectangle || this[i] instanceof MultiChoseTool)
        {//ResizeTool、ResizeRectangle、MultiChoseTool不Copy
            continue;
        }
        var cloneObj = this[i].clone();
        arr.push(cloneObj);
    }
    return arr;
}

/*
@method 数组元素上对齐
*/
function alignTop() {
    var returnNum = 0;

    returnNum = this.findMostTop();

    for (var i = 0; i < this.length ; i++) {
        this[i].position.y = returnNum;
    }

    return returnNum;
}

/*
@method 数组元素下对齐
*/
function alignButtom() {
    var returnNum = 0;

    returnNum = this.findMostButtom();

    for (var i = 0; i < this.length ; i++) {
        this[i].position.y = returnNum;
    }
    return returnNum;
}

/*
@method 数组元素左对齐
*/
function alignLeft() {
    var returnNum = 0;

    returnNum = this.findMostLeft();

    for (var i = 0; i < this.length ; i++) {
        this[i].position.x = returnNum;
    }

    return returnNum;
}

/*
@method 数组元素右对齐
*/
function alignRight() {
    var returnNum = 0;

    returnNum = this.findMostRight();
  
    for (var i = 0; i < this.length ; i++) {
        this[i].position.x = returnNum;
    }

    return returnNum;
}

/*
@method 判断数组元素的尺寸是否都一样
*/
function isSameSize() {
    var isSame = true;

    if (this.length > 0) {
        var sizeWidth = this[0].size.width.valueOf();
        var sizeHeight = this[0].size.height.valueOf();

        for (var i = 1; i < this.length ; i++) {
            var thisSizeWidth = this[i].size.width.valueOf();
            var thisSizeHeight = this[i].size.height.valueOf();
            if (sizeWidth!=thisSizeWidth||sizeHeight!=thisSizeHeight) {
                isSame = false;
                break;
            }
        }
    }
    return isSame;
}

/*
@method 判断数组元素的Name是否都一样
*/
function isSameName() {
    var isSame = true;

    if (this.length > 0) {
        var displayName = this[0].displayName;
    
        for (var i = 1; i < this.length ; i++) {
            var thisDisplayName = this[i].displayName;
          
            if (displayName != thisDisplayName) {
                isSame = false;
                break;
            }
        }
    }
    return isSame;
}

/*
@method 找数组元素的最上位置 
*/
function findMostTop()
{
    var returnNum = 0;

    if (this.length > 0) {
        returnNum = this[0].position.y;

        for (var i = 1; i < this.length ; i++) {
            var thisY = this[i].position.y;
            if (thisY < returnNum) {
                returnNum = thisY;
            }
        }
    }

    return returnNum;
}

/*
@method 找数组元素起点的最下位置
*/
function findMostButtom() {
    var returnNum = 0;

    if (this.length > 0) {
        returnNum = this[0].position.y;

        for (var i = 1; i < this.length ; i++) {
            var thisY = this[i].position.y;
            if (thisY > returnNum) {
                returnNum = thisY;
            }
        }
    }

    return returnNum;
}

/*
@method 找数组元素的最下位置
*/
function findMostButtomPlusHeight() {
    var returnNum = 0;

    if (this.length > 0) {
        returnNum = this[0].position.y + this[0].size.height;

        for (var i = 1; i < this.length ; i++) {
            var thisY = this[i].position.y + this[i].size.height;
            if (thisY > returnNum) {
                returnNum = thisY;
            }
        }
    }

    return returnNum;
}

/*
@method 找数组元素的最左位置
*/
function findMostLeft() {
    var returnNum = 0;

    if (this.length > 0) {
        returnNum = this[0].position.x;

        for (var i = 1; i < this.length ; i++) {
            var thisX = this[i].position.x;
            if (thisX < returnNum) {
                returnNum = thisX;
            }
        }
    }

    return returnNum;
}

/*
@method 找数组元素起点的最右位置
*/
function findMostRight() {
    var returnNum = 0;

    if (this.length > 0) {
        returnNum = this[0].position.x;

        for (var i = 1; i < this.length ; i++) {
            var thisX = this[i].position.x;
            if (thisX > returnNum) {
                returnNum = thisX;
            }
        }
    }

    return returnNum;
}

/*
@method 找数组元素的最右位置
*/
function findMostRightPlusWidth() {
    var returnNum = 0;

    if (this.length > 0) {
        returnNum = this[0].position.x+this[0].size.width;

        for (var i = 1; i < this.length ; i++) {
            var thisX = this[i].position.x + this[i].size.width;
            if (thisX > returnNum) {
                returnNum = thisX;
            }
        }
    }

    return returnNum;
}


/*
@method 根据position.x进行排序
*/
function sortByPositionX()
{
    //冒泡
    for(var i=0;i<this.length;i++)
    {
        for(var j=i;j<this.length;j++)
        {
            if(this[i].position.x>this[j].position.x)
            {
                var temp=this[j];
                this[j]=this[i];
                this[i]=temp;
            }
        }
    }
}

/*
@method 根据position.y进行排序
*/
function sortByPositionY() {
    //冒泡
    for (var i = 0; i < this.length; i++) {
        for (var j = i; j < this.length; j++) {
            if (this[i].position.y > this[j].position.y) {
                var temp = this[j];
                this[j] = this[i];
                this[i] = temp;
            }
        }
    }
}

/*
@method 根据position.z进行排序
*/
function sortByPositionZ()
{
    //冒泡
    for (var i = 0; i < this.length; i++) {
        for (var j = i; j < this.length; j++) {
            if (this[i].position.z > this[j].position.z) {
                var temp = this[j];
                this[j] = this[i];
                this[i] = temp;
            }
        }
    }
}

/*
@method 横向平均
*/
function horizonAverage()
{
    var leftX = this.findMostLeft();
    var rightX = this.findMostRight();
    var elementCount=this.length;
    var averageDistance=(rightX-leftX)/(elementCount-1)

    this.sortByPositionX()

    var nextX = leftX;
    for (var i = 0; i < this.length; i++)
    {
        this[i].position.x = nextX;
        nextX += averageDistance;
    }
}

/*
@method 纵向平均
*/
function verticalAverage()
{
    var topY = this.findMostTop();
    var buttomY = this.findMostButtom();
    var elementCount = this.length;
    var averageDistance = (buttomY - topY) / (elementCount - 1)

    this.sortByPositionY()

    var nextY = topY;
    for (var i = 0; i < this.length; i++) {
        this[i].position.y = nextY;
        nextY += averageDistance;
    }
}

/*
@method 移除数组中某个对象
*/
function removeElement(element)
{
    var indexInArray = this.indexOf(element);
    if (indexInArray >= 0) {
        this.splice(indexInArray, 1);
    }
}

function removeElements(elements)
{
    for (var i = 0; i < elements.length; i++)
    {
        this.removeElement(elements[i]);
    }
}

/*
@method 向数组中添加一个不存在的元素
*/
function pushElement(element)
{
    if (this.indexOf(element) < 0) {//不存在时才添加
        this.push(element);
    }
}

function pushElements(elements)
{
    for (var i = 0; i < elements.length; i++)
    {
        if (typeof (elements[i].type) != "undefined")
        {
            this.pushElement(elements[i]);
        }
       
    }
}

/*
@method 数组集体移动到position
*/
function moveRelativeDisplacement(relativePosition, relativeDistances)
{
    for (var i = 0; i < this.length; i++)
    {
        this[i].moveRelativeDisplacement(relativePosition, relativeDistances[i]);
    }
}


function arrayGetObjsInObj(obj)
{
    var inObjs = new Array();

    for (var i = 0; i < this.length; i++) {
        if (this[i].type == Equipment.name) {
            if (this[i].isInObj(obj)) {//在多选工具内
                inObjs.pushElement(this[i]);
            }
        }
    }

    return inObjs;
}

function arrayCheck()
{
    for (var i = 0; i < this.length; i++) {
        this[i].check(true);
    }
}

function arrayRefreshSizeAndPosition(addWidth, addHeight,addPositionX,addPositionY)
{
    for (var i = 0; i < this.length; i++)
    {
        var newWidth= this[i].originSize.width + addWidth;
        var newHeight=this[i].originSize.height + addHeight;

        if(newWidth>0&&newHeight>0)
        {
            this[i].position.x = this[i].originPosition.x + addPositionX;
            this[i].position.y = this[i].originPosition.y + addPositionY;
            this[i].size.width =newWidth;
            this[i].size.height = newHeight;
        }   
    }
}

function arraySetOriginPositions()
{
    var positions = new Array();

    for (var i = 0; i < this.length; i++) {
        this[i].originPosition = new Position(this[i].position.x, this[i].position.y, this[i].position.z);
        positions.push(new Position(this[i].position.x,this[i].position.y,this[i].position.z));
    }

    return positions;
}

function arraySetOriginSizes() {
    var sizes = new Array();

    for (var i = 0; i < this.length; i++) {
        this[i].originSize = new Size(this[i].size.width, this[i].size.height);
        sizes.push(new Size(this[i].size.width,this[i].size.height));
    }

    return sizes;
}
