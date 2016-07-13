Array.prototype.equal = arrayEqual;
Array.prototype.clone = arrayClone;

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

