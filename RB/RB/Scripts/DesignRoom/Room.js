/**
 * 室类
 * @method Desk
 * @param {Position} position 位置信息
 * @param {Size} size 尺寸信息
 * @return {Room} 室对象
 */
function Room(position, size) {
    Room.name = "Room";
    BaseObject.apply(this, new Array(position, size, Room.name));
    this.equipments = this.subObjs;

    this.currentMultiCheckTool;

    this.draw = drawRoom;
    this.addEquipment = this.addSubObj;
    this.removeEquipment = this.removeSubObj;
    this.removeAllEquipment = removeAllEquipment;

    this.onMouseDown = onRoomMouseDown;
    this.onMouseMove = onRoomMouseMove;
    this.onMouseUp = onRoomMouseUp;
}

function onRoomMouseDown(ev)
{
    var mousePosition = new MousePosition(ev);
    this.isChecked = true;
    this.unCheck();

    this.currentMultiCheckTool = new MultiChoseTool(new Position(mousePosition.position.x,mousePosition.position.y), MultiChoseTool.name);
    everything.pushElement(this.currentMultiCheckTool);
   
}

function onRoomMouseMove(ev)
{
    var mousePosition = new MousePosition(ev);
    if (this.isChecked == true) {
        this.currentMultiCheckTool.setEndPosition(new Position(mousePosition.position.x, mousePosition.position.y));
    }
}

function onRoomMouseUp(ev)
{
    var mousePosition = new MousePosition(ev);
    this.isChecked = false;

    //多选工具选中的对象
    var checkedObjs = everything.getObjsInObj(this.currentMultiCheckTool);
    this.currentMultiCheckTool.setEndPosition(new Position(mousePosition.position.x, mousePosition.position.y));
    if (checkedObjs.length == 0) {//没有选中则从everything中移除MultiCheckTool
        everything.removeElement(this.currentMultiCheckTool);
    }
    else {
        this.currentMultiCheckTool.setCheckedObjs(checkedObjs);
        this.currentMultiCheckTool.check();
    }

    
}


function drawRoom() {
    ctx.strokeStyle = "black";
    ctx.strokeRect(this.position.x, this.position.y, this.size.width, this.size.height);
    this.drawName();
}

function removeAllEquipment()
{
    this.equipments = this.subObjs = new Array();
}
