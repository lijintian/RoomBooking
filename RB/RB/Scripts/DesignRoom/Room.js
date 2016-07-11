/**
 * 室类
 * @method Desk
 * @param {Position} position 位置信息
 * @param {Size} size 尺寸信息
 * @return {Room} 室对象
 */
function Room(position, size) {
    BaseObject.apply(this, new Array(position, size, Room.name));
    this.equipments = this.subObjs;
    this.draw = drawRoom;
    this.addEquipment = this.addSubObj;
    this.removeEquipment = this.removeSubObj;
}

function drawRoom() {
    ctx.strokeStyle = "black";
    ctx.strokeRect(this.position.x, this.position.y, this.size.width, this.size.height);
}
