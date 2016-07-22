function DeskTool(position, size, toolImg, displayName) {
    DeskTool.name = "DeskTool";//兼容IE
    Tool.apply(this, new Array(position, size, toolImg, DeskTool.name, displayName));

    this.newDesk;
    this.onMouseDown = deskToolOnMouseDown;
    this.onMouseMove = deskToolOnMouseMove;
    this.onMouseUp = deskToolOnMouseUp;
}

function deskToolOnMouseDown(ev) {
    var mousePosition = new MousePosition(ev);
    this.isChecked = true;
    this.relativeDistance.relativeDistanceX = mousePosition.position.x - this.position.x;
    this.relativeDistance.relativeDistanceY = mousePosition.position.y - this.position.y;
    var count = calculateCount(Desk.name);

    var position = new Position(0, 0, 0);
    var size = new Size(30, 30);
    this.newDesk = new Desk(position, size, $("#imgDesk")[0], Desk.name + count);
    everything.pushElement(this.newDesk);
    currentRoom.addEquipment(this.newDesk);

    this.unCheck();
}

function deskToolOnMouseMove(ev) {
    var mousePosition = new MousePosition(ev);
    if (this.isChecked == true) {
        this.newDesk.moveTo(mousePosition.position.x - this.newDesk.size.width / 2, mousePosition.position.y - this.newDesk.size.height / 2);
    }
    else {

    }
}

function deskToolOnMouseUp(ev) {
    var mousePosition = new MousePosition(ev);
    this.isChecked = false;
    if (!this.newDesk.isInObj(currentRoom)) {//新建的Desk对象如果在Room内删除
        everything.removeElement(this.newDesk);
        currentRoom.removeEquipment(this.newDesk);
    }
}