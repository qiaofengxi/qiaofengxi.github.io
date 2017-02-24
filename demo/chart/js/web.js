/**
 * Created by Administrator on 2016/11/29.
 */
function CircleText(option){
    this._init(option);
}

CircleText.prototype = {
    _init: function (option) {
        this.x = option.x || 0;
        this.y = option.y || 0;
        this.innerRadius = option.innerRadius || 0;
        this.outerRaius = option.outerRaius || 0;
        this.outerBg = option.outerBg || "red";
        this.innerBg = option.innerBg || "blue";
        this.text = option.text || "";

         this.bgGroup = new Konva.Group({
            x: this.x,
            y: this.y
        });

        var innerCircle = new Konva.Circle({
            x: 0,
            y: 0,
            radius: this.innerRadius,
            fill: this.innerBg
        });
        this.bgGroup.add(innerCircle);

        var ring = new Konva.Ring({
            x: 0,
            y: 0,
            innerRadius: this.innerRadius,
            outerRadius: this.outerRaius,
            fill: this.outerBg
        });
        this.bgGroup.add(ring);

        var text = new Konva.Text({
            x: -this.outerRaius,
            y: -6,
            text: this.text,
            fontSize: 17,
            align: "center",
            width: this.outerRaius*2,
            fill: "#fff",
            fontFamily: "微软雅黑",
        });
        this.bgGroup.add(text);

    },
    addTolayer: function (layer) {
        layer.add(this.bgGroup);
    }
};
