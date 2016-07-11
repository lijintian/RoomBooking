function ToolBar(position, size, margin)
{
    BaseObject.apply(this, new Array(position, size, ToolBar.name));
    this.margin = margin;
    this.tools = this.subObjs;
    this.addTool = this.addSubObj;
    this.removeTool = this.removeSubObj;
    this.removeAllTool = removeAllTool;
}

function Tool() {
    BaseObject.apply(this, new Array(position, size, Tool.name));
}

function removeAllTool()
{
    this.tools = this.subObjs = new Array();
}

