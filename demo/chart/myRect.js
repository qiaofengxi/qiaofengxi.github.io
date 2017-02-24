/**
 * Created by Administrator on 2016/11/29.
 */

function MyRect(option){
    this._init(option);
}

MyRect.prototype = {
    _init: function (option) {
        this.x = option.x || 0;
        this.y = option.y || 0;
        this.w = option.w || 10;
        this.h = option.h || 10;
        this.opacity = option.opacity || 1;
        this.fillStyle = option.fillStyle || "blue";
        this.strokeStyle = option.strokeStyle || "pink";
        this.rotatetion = option.rotatetion *Math.PI/180 || 0;
        this.scalex = option.scalex || 0;
        this.scaley = option.scaley || 0;
    },
    render: function (ctx) {
        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.fillStyle = this.fillStyle;
        ctx.strokeStyle = this.strokeStyle;
        ctx.globalAlpha = this.opacity;
        ctx.rotate(this.rotatetion);
        ctx.scale(this.scalex,this.scaley);
        ctx.rect(0,0,this.w,this.h);

        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }
}