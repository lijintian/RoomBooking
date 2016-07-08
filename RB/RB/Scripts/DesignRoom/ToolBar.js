function ToolBar(position, size, margin)
{
    BaseObject.apply(this, new Array(position, size, ToolBar.name));
    this.margin = margin;
    this.tools = new Array();
    this.addTool = addTool;
}

function Tool() {
    BaseObject.apply(this, new Array(position, size, Tool.name));
}

function addTool(tool)
{
    this.tools.push(tool);
}