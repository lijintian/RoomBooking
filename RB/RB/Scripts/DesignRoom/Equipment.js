﻿/**
 * 设备类
 * @method Equipment
 * @param {Position} position 位置信息
 * @param {Size} size 尺寸信息
 * @param {string} equipmentType 设备类型
 * @return {Equipment} 设备对象
 */
function Equipment(position, size, img, equipmentType) {

    BaseObject.apply(this, new Array(position, size, Equipment.name));
    this.equipmentType = equipmentType;
    this.img = img;
}

/**
 * 椅子类
 * @method Chair
 * @param {Position} position 位置信息
 * @param {Size} size 尺寸信息
 * @param {Image} img 图片
 * @return {Chair} 椅子对象
 */
function Chair(position, size, img) {
    Equipment.apply(this, new Array(position, size, img, Chair.name));
}

/**
 * 桌子类
 * @method Desk
 * @param {Position} position 位置信息
 * @param {Size} size 尺寸信息
 * @param {Image} img 图片
 * @return {Desk} 桌子对象
 */
function Desk(position, size, img) {
    Equipment.apply(this, new Array(position, size, img, Desk.name));
}