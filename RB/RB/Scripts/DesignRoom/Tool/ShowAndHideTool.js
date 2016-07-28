function ShowAndHideTool(position,size,referanceObjs)
{
    ShowAndHideTool.name = "ShowAndHideTool";//兼容IE


    Tool.apply(this, new Array(position, size, $("#imgHide")[0], ShowAndHideTool.name, ""));

    /*---------------Override Begin--------------------*/
    this.onMouseDown = fOnShowAndHideToolMouseDown;
    this.onMouseMove = function () { };
    this.onMouseUp = function () { };
    this.drawName = function () { };
    this.referanceObjs = referanceObjs;
    /*---------------Override  End--------------------*/

    this._status = 1;
    this._allReferanceObjs = new Array();

    this.showType = 0;
    this.hideType = 0;
    this.showReferanceObjs = fShowAndHideToolShowReferanceObjs;
    this.hideReferanceObjs = fShowAndHideToolHideReferanceObjs;
    
}


function fOnShowAndHideToolMouseDown(ev)
{
    if (this._status == 0) {
        this._status = 1;
        this.img = $("#imgHide")[0];
        this.showReferanceObjs();
    }
    else {
        this._status = 0;
        this.img = $("#imgShow")[0];
        this.hideReferanceObjs();
    }
}

function fShowAndHideToolShowReferanceObjs()
{
    this._allReferanceObjs = getAllReferanceObjs(this);
    this._allReferanceObjs.show();

}

function fShowAndHideToolHideReferanceObjs() {
    this._allReferanceObjs = getAllReferanceObjs(this);
    this._allReferanceObjs.hide();
}

