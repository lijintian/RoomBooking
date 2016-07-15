Array.prototype.equal = arrayEqual;
Array.prototype.clone = arrayClone;
Array.prototype.alignTop = alignTop;
Array.prototype.alignButtom = alignButtom;
Array.prototype.alignLeft = alignLeft;
Array.prototype.alignRight = alignRight;
Array.prototype.isSameSize = isSameSize;
Array.prototype.isSameName = isSameName;

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

function arrayClone() {
    var arr = new Array();

    for (var i = 0; i < this.length; i++) {
        var cloneObj = this[i].clone();
        arr.push(cloneObj);
    }
    return arr;
}

function alignTop() {
    var returnNum = 0;

    if (this.length > 0)
    {
        returnNum = this[0].position.y;

        for (var i = 1; i < this.length ; i++) {
            var thisY=this[i].position.y;
            if(thisY<returnNum)
            {
                returnNum = thisY;
            }
        }
    }

    for (var i = 0; i < this.length ; i++) {
        this[i].position.y = returnNum;
    }

    return returnNum;
}

function alignButtom() {
    var returnNum = 0;

    if (this.length > 0) {
        returnNum = this[0].position.y;

        for (var i  = 1; i < this.length ; i++) {
            var thisY = this[i].position.y ;
            if (thisY > returnNum) {
                returnNum = thisY;
            }
        }
    }

    for (var i = 0; i < this.length ; i++) {
        this[i].position.y = returnNum;
    }
    return returnNum;
}

function alignLeft() {
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

    for (var i = 0; i < this.length ; i++) {
        this[i].position.x = returnNum;
    }

    return returnNum;
}

function alignRight() {
    var returnNum = 0;

    if (this.length > 0) {
        returnNum = this[0].position.x;

        for (var i  = 1; i < this.length ; i++) {
            var thisX = this[i].position.x;
            if (thisX > returnNum) {
                returnNum = thisX;
            }
        }
    }
    for (var i = 0; i < this.length ; i++) {
        this[i].position.x = returnNum;
    }

    return returnNum;
}

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

