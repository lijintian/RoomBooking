/**
 * 设备类
 * @method Equipment
 * @param {Position} position 位置信息
 * @param {Size} size 尺寸信息
 * @param {string} equipmentType 设备类型
 * @return {Equipment} 设备对象
 */
function Equipment(position, size, img, equipmentType) {
    Equipment.name = "Equipment";//兼容IE
    BaseObject.apply(this, new Array(position, size, Equipment.name));
    this.equipmentType = equipmentType;
    this.img = img;

    //this.onMouseDown = onMouseDown;
    this.onMouseMove = onEquipmentMouseMove;
}

function onEquipmentMouseMove(ev)
{
    var mousePosition = new MousePosition(ev);
    if (this.isChecked == true) {
        if (this.isInObj(currentRoom))
        {
            this.moveRelativeDisplacement(mousePosition.position, this.relativeDistance);
            this.onBorder(currentRoom);
            this.check();
        }
    }
    else {
        this.onBorder(currentRoom);
    }
}

/**
 * 椅子类
 * @method Chair
 * @param {Position} position 位置信息
 * @param {Size} size 尺寸信息
 * @param {Image} img 图片
 * @return {Chair} 椅子对象
 */
function Chair(position, size, img,diaplayName) {
    Chair.name = "Chair";//兼容IE
    Equipment.apply(this, new Array(position, size, img, Chair.name));
    this.displayName = diaplayName;
}

/**
 * 桌子类
 * @method Desk
 * @param {Position} position 位置信息
 * @param {Size} size 尺寸信息
 * @param {Image} img 图片
 * @return {Desk} 桌子对象
 */
function Desk(position, size, img, diaplayName) {
    Desk.name = "Desk";//兼容IE
    Equipment.apply(this, new Array(position, size, img, Desk.name));
    this.displayName = diaplayName;
}