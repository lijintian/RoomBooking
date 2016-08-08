function CalculateTool(position, size, displayName) {
    CalculateTool.name = "CalculateTool";//兼容IE

    /*if (CalculateTool.unique != undefined)
    {
        CalculateTool.unique.size = new Size(size.width, size.height);
        CalculateTool.unique.position = new Position(position.x, position.y, position.z);
        return CalculateTool.unique;
    }*/

    Tool.apply(this, new Array(position, size, null, CalculateTool.name, displayName));

    /*---------------Override Begin--------------------*/
    this.onMouseDown = function () { };
    this.onMouseMove = function () { };
    this.onMouseUp = function () { };
    this.drawName = function () { };
    this.draw = fDrawCalculateTool;
    /*---------------Override  End--------------------*/

    //CalculateTool.unique = this;
}

function fDrawCalculateTool()
{
    var deskCount = 0;
    var chairCount = 0;

    for (var i = 0; i < everything.length; i++)
    {
        if (everything[i].type == Equipment.name)
        {
            switch (everything[i].equipmentType)
            {
                case Desk.name:
                    deskCount++;
                    break;
                case Chair.name:
                    chairCount++;
                    break;
                default:
                    break;
            }
        }
    }
    
    if (this._isShow == 1)
    {
        var calIconWidth = 20;
        var calIconHeight = 20;
        var margin = 10;
        var deskCalX = this.position.x + 5;
        var deskCalY = this.position.y + 5;

        ctx.drawImage($("#imgDesk")[0], deskCalX, deskCalY, calIconWidth, calIconHeight);
        ctx.fillText("×" + deskCount, deskCalX + calIconWidth, deskCalY + 5);

        var chairCalX = this.position.x + 5;
        var chairCalY = this.position.y + calIconHeight + margin;
        ctx.drawImage($("#imgChair")[0], chairCalX, chairCalY, calIconWidth, calIconHeight);
        ctx.fillText("×" + chairCount, chairCalX + calIconWidth, chairCalY + 5);

        ctx.strokeStyle = "blue";
        ctx.strokeRect(this.position.x, this.position.y, this.size.width, this.size.height);
    }
}
