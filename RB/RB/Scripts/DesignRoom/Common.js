function getAllReferanceObjs(obj)
{
    var returnArray = new Array();

    if (obj.referanceObjs && obj.referanceObjs.length > 0) {
        returnArray.pushElements(obj.referanceObjs);

        for (var i = 0; i < obj.referanceObjs.length; i++) {
            returnArray.pushElements(getAllReferanceObjs(obj.referanceObjs[i]));
        }
    }
    else {
        returnArray.push(obj);
    }

    return returnArray;
}