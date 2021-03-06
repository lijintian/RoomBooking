﻿//递归获取所有引用对象
function getAllReferanceObjs(obj)
{
    var returnArray = new Array();

    if ((typeof (obj.type) != "undefined"))
    {//由于步骤记录Clone方法对数组的Clone有问题，这里要确定有type熟悉才是本项目对象
        if (obj.referanceObjs && obj.referanceObjs.length > 0) {
            returnArray.pushElements(obj.referanceObjs);

            for (var i = 0; i < obj.referanceObjs.length; i++) {
                returnArray.pushElements(getAllReferanceObjs(obj.referanceObjs[i]));
            }
        }
        else {      
                returnArray.push(obj);
        }
    }
   

    return returnArray;
}

//计算设备数量
function calculateCount(equipmentType) {
    var count = 0;
    for (var i = 0; i < everything.length; i++) {
        if (everything[i].type == Equipment.name) {
            if (everything[i].equipmentType == equipmentType) {
                count++;
            }
        }
    }

    return count;
}

//显示单个熟悉
function showProperty(currentCheckedObj) {
    if (currentCheckedObj != null) {
        switch (currentCheckedObj.type) {
            case Tool.name:

                break;
            case Equipment.name:
                var position = currentCheckedObj.position;
                var size = currentCheckedObj.size;

                $("#divProperty").css("left", position.x + size.width +10+ canvas.offsetLeft);
                $("#divProperty").css("top", position.y + size.height +10+ canvas.offsetTop);

                $("#txtPositionX").val(position.x - currentRoom.position.x);
                $("#txtPositionY").val(position.y - currentRoom.position.y);

                $("#txtSizeWidth").val(size.width);
                $("#txtSizeHeight").val(size.height);

                $("#txtId").val(currentCheckedObj.id);
                $("#txtDisplayName").val(currentCheckedObj.displayName);

                var angleVal = (currentCheckedObj._revolveAngle * 360) / (2 * Math.PI);
                if (angleVal < 0)
                {
                    angleVal = 360 + angleVal;
                }

                $("#txtAngle").val(angleVal);

                $("#divProperty").show();
                break;
            case Room.name:

                break;
            default:
                break;
        }
    }

}

//隐藏属性栏
function hideProperty() {
    $("#divProperty").hide();
}

//生效属性
function effectProperty(currentCheckedObj) {
    if (currentCheckedObj != null) {
        switch (currentCheckedObj.type) {
            case Tool.name:

                break;
            case Equipment.name:
                var newPositionX = new Number($("#txtPositionX").val()) + currentRoom.position.x;
                var newPositionY = new Number($("#txtPositionY").val()) + currentRoom.position.y;

                var newSizeWidth = new Number($("#txtSizeWidth").val());
                var newSizeHeight = new Number($("#txtSizeHeight").val());

                var id = $("#txtId").val();
                var displayName = $("#txtDisplayName").val();

                var angle = $("#txtAngle").val();

                var equipment = new Equipment(new Position(newPositionX, newPositionY), new Size(newSizeWidth, newSizeHeight), null, null);
                if (equipment.isInObj(currentRoom)) {//新的坐标在room内才生效
                    currentCheckedObj.position.x = newPositionX;
                    currentCheckedObj.position.y = newPositionY;

                    currentCheckedObj.size.width = newSizeWidth;
                    currentCheckedObj.size.height = newSizeHeight;
                    currentCheckedObj.id = id;
                    currentCheckedObj.displayName = displayName;
                     
                    if (angle >= 0 && angle <= 270) {
                        currentCheckedObj._revolveAngle = angle * Math.PI / 180;
                    }
                    else {
                        if (angle > 270 && angle <= 360)
                        {
                            angle=-(360-angle)
                            currentCheckedObj._revolveAngle = angle * Math.PI / 180;
                        }
                    }
                    //showProperty(currentCheckedObj);

                    RecordStap();

                }
                else {
                    alert("位置尺寸信息超出范围,请重新填写");
                }
                break;
            case Room.name:

                break;
            default:
                break;
        }
    }
    return false;
}


//展示多选属性栏
function showMultiEditBar(currentMultiCheckObjs) {
    if (currentMultiCheckObjs != null && currentMultiCheckObjs.length > 0) {
        var position = ResizeTool.unique.position;
        var size = ResizeTool.unique.size;

        $("#divMultiTool").css("left", position.x + size.width +10+ canvas.offsetLeft);
        $("#divMultiTool").css("top", position.y + size.height +10+ canvas.offsetTop);

        if (currentMultiCheckObjs.isSameSize()) {
            $("#txtMultiSizeWidth").val(currentMultiCheckObjs[0].size.width);
            $("#txtMultiSizeHeight").val(currentMultiCheckObjs[0].size.height);
        }
        else {
            $("#txtMultiSizeWidth").val("0");
            $("#txtMultiSizeHeight").val("0");
        }
        if (currentMultiCheckObjs.isSameName()) {
            $("#txtMultiDisplayName").val(currentMultiCheckObjs[0].displayName);
        }
        else {
            $("#txtMultiDisplayName").val("");
        }

        if (currentMultiCheckObjs.isSameAngle()) {
            var angleVal = (currentMultiCheckObjs[0]._revolveAngle * 360) / (2 * Math.PI);
            if (angleVal < 0) {
                angleVal = 360 + angleVal;
            }
            $("#txtMultiAngle").val(angleVal);
        }
        else {
            $("#txtMultiAngle").val("0");
        }




        $("#divMultiTool").show();
    }
}

//隐藏多选属性栏
function hideMultiEditBar() {
    $("#divMultiTool").hide();
}

//生效多选属性栏
function effectMultiEdit(currentMultiCheckObjs) {
    if (currentMultiCheckObjs != null && currentMultiCheckObjs.length > 0) {


        var newSizeWidth = new Number($("#txtMultiSizeWidth").val());
        var newSizeHeight = new Number($("#txtMultiSizeHeight").val());

        var displayName = $("#txtMultiDisplayName").val();

        var angle= new Number($("#txtMultiAngle").val());


        for (var i = 0; i < currentMultiCheckObjs.length; i++) {
            var obj = currentMultiCheckObjs[i];
            if (newSizeWidth != 0 && newSizeHeight != 0) {
                obj.size.width = newSizeWidth;
                obj.size.height = newSizeHeight;
            }

            if (displayName.trim() != "") {
                obj.displayName = displayName;
            }

            if (angle >= 0 && angle <= 270) {
                obj._revolveAngle = angle * Math.PI / 180;
            }
            else {
                if (angle > 270 && angle <= 360) {
                    var  saveAngle = -(360 - angle)
                    obj._revolveAngle = saveAngle * Math.PI / 180;
                }
            }
        }
        
        showMultiEditBar(currentMultiCheckObjs);
        RecordStap();
    }
    return false;
}

//多个对齐
function multiAlign(direct, currentMultiCheckObjs) {
    if (currentMultiCheckObjs != null && currentMultiCheckObjs.length > 0) {
        switch (direct) {
            case "top":
                currentMultiCheckObjs.alignTop();
                break;
            case "buttom":
                currentMultiCheckObjs.alignButtom();
                break;
            case "left":
                currentMultiCheckObjs.alignLeft();
                break;
            case "right":
                currentMultiCheckObjs.alignRight();
                break;
        }

        showMultiEditBar(currentMultiCheckObjs);
        RecordStap();
    }
    return false;
}

//多个间距相同
function multiAverage(averageType, currentMultiCheckObjs) {
    if (currentMultiCheckObjs != null && currentMultiCheckObjs.length > 0) {
        switch (averageType) {
            case "horizon":
                currentMultiCheckObjs.horizonAverage();
                break;
            case "vertical":
                currentMultiCheckObjs.verticalAverage();
                break;
        }

     
        showMultiEditBar(currentMultiCheckObjs);
        RecordStap();
    }
    return false;
}


//加载
function load() {
    refreshLoadPercent();
    if (sourceCount < totalSourceCount) {
        return;
    }
    else {
        window.clearInterval(loadingInterval);
        window.setTimeout(hideLoading, 1000);
        //generateDesignRoomTool();
        generateRoom(); 
    }
}

//生产room
function generateRoom() {
    //重新生成要清空everything
    everything = new Array();


    var width = $("#txtRoomWidth").val();
    var height = $("#txtRoomHeight").val();

    if (width.trim() != "") {
        width = new Number(width);
    }
    else {
        width = 0;
    }
    if (height.trim() != "") {
        height = new Number(height);
    }
    else {
        height = 0;
    }

    var roomWidth = width;
    var roomHeight = height;


    var stagePadding = 10;
    var stageWidth = roomWidth + 2 * stagePadding;
    var stageHeight = roomHeight + 2 * stagePadding;
    var stagePosition = new Position(70, 10);
    var stageSize = new Size(stageWidth, stageHeight);
    stage = new Stage(stagePosition, stageSize, stagePadding);
    everything.push(stage);

    //创建一个toolBar
    var toolBarPadding = 10;
    var toolBarPosition = new Position(10, 10);
    var toolBarSize = new Size(50, stageHeight);
    toolBar = new ToolBar(toolBarPosition, toolBarSize, toolBarPadding);
    everything.push(toolBar);


    var canvasWidth = stage.position.x + stage.size.width + 10;
    var canvasHeight = stage.position.y + stage.size.height + 10;

    $(canvas).attr("width", canvasWidth);
    $(canvas).attr("height", canvasHeight);

    var roomPosition = new Position(stage.position.x + stage.padding, stage.position.y + stage.padding);
    var roomSize = new Size(roomWidth, roomHeight);

    currentRoom = new Room(roomPosition, roomSize);

    everything.push(currentRoom);

    //currentRoom.draw();

    generateTools();
    drawEverything();
    return false;
}


//生产room
function generateDesignRoomTool() {
    //重新生成要清空everything
    everything = new Array();     

    var canvasWidth = document.body.clientWidth-5;
    var canvasHeight = document.body.clientHeight-5;
    $(canvas).attr("width", canvasWidth);
    $(canvas).attr("height", canvasHeight);

    //创建一个ToolBar
    var toolBarPadding = 10;
    var toolBarPosition = new Position(10, 10);
    var toolBarSize = new Size(50, canvasHeight-2*toolBarPadding);
    toolBar = new ToolBar(toolBarPosition, toolBarSize, toolBarPadding);
    everything.push(toolBar);


    //创建Stage
    var stagePadding = 10;
    var stageWidth = canvasWidth - 2 * stagePadding-2*toolBarPadding-toolBar.size.width;
    var stageHeight = canvasHeight -2 * stagePadding;
    var stagePosition = new Position(toolBar.size.width+2*toolBarPadding+stagePadding, stagePadding);
    var stageSize = new Size(stageWidth, stageHeight);
    stage = new Stage(stagePosition, stageSize, stagePadding);
    everything.push(stage);

   
    //创建Room
    var width = $("#txtRoomWidth").val();
    var height = $("#txtRoomHeight").val();

    if (width.trim() != "") {
        width = new Number(width);
    }
    else {
        width = 0;
    }
    if (height.trim() != "") {
        height = new Number(height);
    }
    else {
        height = 0;
    }

    var roomWidth = stageWidth-2*stage.padding;
    var roomHeight = stageHeight-2*stage.padding;

    if (roomHeight > stage.size.height || roomWidth > stage.size.width)
    {
        return;
    }

    var roomPosition = new Position(stage.position.x + (stage.size.width - roomWidth) / 2, stage.position.y + (stage.size.height - roomHeight) / 2);
    var roomSize = new Size(roomWidth, roomHeight);
    currentRoom = new Room(roomPosition, roomSize);
    everything.push(currentRoom);

    generateTools();
    return false;
}

//生成工具栏
function generateTools() {
    toolBar.removeAllTool();

    toolIcon = {
        width: toolBar.size.width - 2 * toolBar.padding,
        height: toolBar.size.width - 2 * toolBar.padding,
    };

    var chairToolPosition = new Position(0, 0);
    var chairToolSize = new Size(toolIcon.width, toolIcon.height);
    var chairTool = new ChairTool(chairToolPosition, chairToolSize, $("#imgChair")[0], Chair.name);

    var deskToolPosition = new Position(0, 0);
    var deskToolSize = new Size(toolIcon.width, toolIcon.height);
    var deskTool = new DeskTool(deskToolPosition, deskToolSize, $("#imgDesk")[0], Desk.name);

    toolBar.addTool(chairTool);
    toolBar.addTool(deskTool);

    var toolX = toolBar.position.x + toolBar.padding;
    var toolY = toolBar.padding + toolBar.position.y;


    for (var i = 0; i < toolBar.tools.length; i++) {
        toolBar.tools[i].moveTo(toolX, toolY);
        everything.push(toolBar.tools[i]);

        toolY += toolIcon.height + toolBar.padding;
    }

    //计算数量工具
    var calSize = new Size(50, 60);
    var calPosition = new Position(currentRoom.position.x + currentRoom.size.width - calSize.width, currentRoom.position.y + currentRoom.size.height - calSize.height, currentRoom.position.z);
    var calculateTool = new CalculateTool(calPosition,calSize,"");
    everything.push(calculateTool);

    //计算数量工具隐藏展示按钮
    var shSize = new Size(10, 10);
    var shPosition = new Position(calculateTool.position.x + calculateTool.size.width - shSize.width-2, calculateTool.position.y - shSize.height/2, calculateTool.position.z + 1);
    var shReferanceObjs=new Array();
    shReferanceObjs.push(calculateTool);
    var showOrHideCalTool = new ShowAndHideTool(shPosition, shSize, shReferanceObjs);
    everything.push(showOrHideCalTool);

}


//展示loading层
function showLoading() {
    var screenHeight = document.body.offsetHeight;
    var screenWidth = document.body.offsetWidth;

    $("#divLoading").css("height", screenHeight);
    $("#divLoading").show();

}

//隐藏loading层
function hideLoading() {
    $("#divLoading").hide();
}

//更新加载进度
function refreshLoadPercent() {
    $("#divLoading").text("loading..." + sourceCount / totalSourceCount * 100 + "%");
}


//记录操作步骤
function RecordStap() {
    var currentStap = everything.clone();

    if (stapArray.length == 0) {
        stapArray.push(currentStap);
        stapPointer = stapArray.length - 1;
    }
    else {
        var lastStap = stapArray[stapPointer];
        if (!lastStap.equal(currentStap)) {
            if (stapPointer != stapArray.length - 1) {//指针不在栈顶
                while (stapPointer < stapArray.length - 1) {//去除Pointer上的数据
                    stapArray.pop();
                }
            }


            stapArray.push(currentStap);
            if (stapArray.length > 100) {//最多存储一百步步骤
                stapArray.shift();
            }
            stapPointer = stapArray.length - 1;
        }

    }

}

//记录当前步骤指针
var stapPointer = 0;

//后退一步
function preStap() {
    stapPointer--;

    if (stapPointer >= 0) {
        everything = stapArray[stapPointer].clone();

        goToStapInit();


    }
    else {
        stapPointer = 0;
    }
}

//前进一步
function nextStap() {
    stapPointer++;

    if (stapPointer < stapArray.length) {
        everything = stapArray[stapPointer].clone();

        goToStapInit();


    }
    else {
        stapPointer = stapArray.length - 1;
    }
}

//前进一步后退一步初始化
function goToStapInit() {
    currentOpObj = null;
    hideProperty();
    hideMultiEditBar();
}

function deleteInit()
{
    currentOpObj = null;
    hideProperty();
    hideMultiEditBar();
}


function showCursor(ev)
{
    var mousePosition = new MousePosition(ev);

    everything.sortByPositionZ();//z值高的总在数组后边

    for (var i = everything.length - 1; i >= 0; i--) //从数据后往前找选中的对象   
    {
        if (everything[i].isContainPoint(mousePosition.position.x, mousePosition.position.y))
        {
            var type = everything[i].type;
            switch (type)
            {
                case Equipment.name:

                    canvas.style.cursor = "pointer";
                    break;

                case Tool.name:
                    var toolType = everything[i].toolType;
                    switch (toolType)
                    {
                        case ResizeTool.name:
                        case ChairTool.name:
                        case DeskTool.name:
                        case ShowAndHideTool.name:
                        case RevolveCircle.name:
                            canvas.style.cursor = "pointer";
                            break;
                        case ResizeRectangle.name:
                            var direct = everything[i].direct;
                            switch (direct)
                            {
                                case 0:
                                    canvas.style.cursor = "nw-resize";
                                    break;
                                case 1:
                                    canvas.style.cursor = "n-resize";
                                    break;
                                case 2:
                                    canvas.style.cursor = "ne-resize";
                                    break;
                                case 3:
                                    canvas.style.cursor = "e-resize";
                                    break;
                                case 4:
                                    canvas.style.cursor = "se-resize";
                                    break;
                                case 5:
                                    canvas.style.cursor = "s-resize";
                                    break;
                                case 6:
                                    canvas.style.cursor = "sw-resize";
                                    break;
                                case 7:
                                    canvas.style.cursor = "w-resize";
                                    break;
                            }
                    }
                    break;
                case Room.name:
                    canvas.style.cursor = "default";
                    break;
                default:
                    canvas.style.cursor = "default";
                    break;
            }
            break;
        }
    }
}

function fCopyAndPasteInit() {
    fSetCurrentOpObj();
    hideProperty();
    hideMultiEditBar();
}

function fSetCurrentOpObj()
{
    //如果有ResizeTool则以ResizeTool为CurrentOpObj
    for (var i = 0; i < everything.length; i++) {
        if (everything[i].type == Tool.name) {
            if (everything[i].toolType == ResizeTool.name) {
                currentOpObj = ResizeTool.unique;
            }
        }
    }

}


/**
@method 获取圆心与任一点连线与圆的交点
@param {Position} circleCenterPoint 圆心
@param {Position} connectPoint 要连接的点
@param {Int} circleRadius 半径
@return {Position}  交点位置
*/
function fGetCirclleCutPoint(circleCenterPoint, connectPoint, circleRadius)
{
    var x1=circleCenterPoint.x;
    var y1=circleCenterPoint.y;

    var x2=connectPoint.x;
    var y2 = connectPoint.y;

    var x3 = 0, y3 = 0;

    //(y2 - y1) / Math.sqrt(Math.pow((y2 - y1), 2) + Math.pow((x2 - x1), 2))=(y3-y1)/circleRadius
    y3 = ((y2 - y1) / Math.sqrt(Math.pow((y2 - y1), 2) + Math.pow((x2 - x1), 2))) * circleRadius + y1;

    //(x2 - x1) / Math.sqrt(Math.pow((y2 - y1), 2) + Math.pow((x2 - x1), 2))=(x3-x1)/circleRadius
    x3 = ((x2 - x1) / Math.sqrt(Math.pow((y2 - y1), 2) + Math.pow((x2 - x1), 2))) * circleRadius + x1;

    return new Position(x3,y3);
}


/**
@method 已知道圆心，半径，sin值，求切点
@param {Position} circleCenterPoint 圆心
@param {Int} sinValue 要连接的点
@param {Int} circleRadius 半径
@return {Position}  交点位置
*/
function fGetCirclleCutPointBySinValue(circleCenterPoint, sinValue, circleRadius) {
    var x1 = circleCenterPoint.x;
    var y1 = circleCenterPoint.y;

    var x2= 0, y2 = 0;

    if (sinValue >= Math.PI / 2 && sinValue <= 3 *2* Math.PI / 4) {//左半圆
        // angle = Math.acos((cutPoint.y - centerPoint.y) / radius)+Math.PI/2;
        //Math.cos(angle)=(y2-y1)/radius
        y2 = Math.cos(sinValue - Math.PI / 2) * circleRadius + y1;
        x2 = x1 - Math.sqrt(Math.pow(circleRadius, 2) - Math.pow(Math.abs((y2 - y1)), 2));
      
        
    }
    else {//右半圆
        //angle = Math.asin((cutPoint.y - centerPoint.y) / radius);
        y2 = Math.sin(sinValue) * circleRadius + y1;
        x2 = Math.sqrt(Math.pow(circleRadius, 2) - Math.pow((y2 - y1), 2)) + x1
    }

    return new Position(x2, y2);
}