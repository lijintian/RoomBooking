/*
* 属性栏
@method PropertyBar
@param {Position} position 位置信息
@param {Size} size 尺寸信息
@return {PropertyBar} 属性栏对象
*/
function PropertyBar(position, size)
{
    BaseObject.apply(this, new Array(position, size, PropertyBar.name));
}