function Equipment(position, size, img, equipmentType) {

    BaseObject.apply(this, new Array(position, size, Equipment.name));
    this.equipmentType = equipmentType;
    this.img = img;
}

function Chair(position, size, img) {
    Equipment.apply(this, new Array(position, size, img, Chair.name));
}

function Desk(position, size, img) {
    Equipment.apply(this, new Array(position, size, img, Desk.name));
}