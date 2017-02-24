/**
 * Created by Administrator on 2016/11/29.
 */
function ProgressBar(option){
    this._init(option);
}
ProgressBar.prototype = {
    _init: function (option) {
        this.x = option.x || 0;
        this.y = option.y || 0;
        this.w = option.w || 100;
        this.h = option.h || 100;
        this.strokeWidth = option.strokeWidth || 6;
        this.strokeStyle = option.strokeStyle || "blue";
        this.fillStyle = option.fillStyle || "pink";


        var outRect = new Konva.Rect({
            x: this.x,
            y: this.y,
            width: this.w,
            height: this.h,
            stroke: this.strokeStyle,
            strokeWidth: this.strokeWidth,
            id: "outRect",
            cornerRadius: this.y/2
        });

        var innerRect = new Konva.Rect({
            x: this.x,
            y: this.y,
            width: 0,
            height:this.h,
            fill: this.fillStyle,
            cornerRadius: this.y/2,
            id: "innerRect"
        });

        this.group = new Konva.Group({
            x: 0,
            y:0
        });
        this.group.add(outRect);
        this.group.add(innerRect);


    },

    addLayer: function (layer) {
        layer.add(this.group);
    },
    changeValue: function (val) {
        if(val > 1) {
            val = val /100;
        }
        var innerRect = this.group.findOne("#innerRect");
        barwidth = val * this.w;

        innerRect.to({
            width: barwidth,
            duration: .3,
            easing: Konva.Easings.EasIn

        });

    }
}