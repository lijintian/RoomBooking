function ChairTool(position, size, toolImg, displayName) {
    ChairTool.name = "ChairTool";//兼容IE
    Tool.apply(this, new Array(position, size, toolImg, ChairTool.name, displayName));

    this.newChair;
    this.onMouseDown = chairToolOnMouseDown;
    this.onMouseMove = chairToolOnMouseMove;
    this.onMouseUp = chairToolOnMouseUp;
}

function chairToolOnMouseDown(ev) {
    var mousePosition = new MousePosition(ev);
    this.isChecked = true;
    this.relativeDistance.relativeDistanceX = mousePosition.position.x - this.position.x;
    this.relativeDistance.relativeDistanceY = mousePosition.position.y - this.position.y;
    var count = calculateCount(Chair.name);

    var position = new Position(0, 0, 0);
    var size = new Size(30, 30);
    this.newChair = new Chair(position, size, $("#imgChair")[0], Chair.name + count);
    everything.pushElement(this.newChair);
    currentRoom.addEquipment(this.newChair);
}

function chairToolOnMouseMove(ev) {
    var mousePosition = new MousePosition(ev);
    if (this.isChecked == true) {
        this.newChair.moveTo(mousePosition.position.x - this.newChair.size.width / 2, mousePosition.position.y - this.newChair.size.height / 2);
    }
    else {

    }
}

function chairToolOnMouseUp(ev) {
    var mousePosition = new MousePosition(ev);
    this.isChecked = false;
    if (!this.newChair.isInObj(currentRoom)) {//新建的Chair对象如果在Room内删除
        everything.removeElement(this.newChair);
        currentRoom.removeEquipment(this.newChair);
    }
}