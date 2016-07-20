function Construct() {
    // 确保只有单例
    if (Construct.unique !== undefined) {

        return Construct.unique;

    }

    // 其他代码
    this.name = "NYF";
    this.age = "24";
    Construct.unique = this;

}