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

//function addEquipment(equipment) {
//    this.equipments.push(equipment);
//}