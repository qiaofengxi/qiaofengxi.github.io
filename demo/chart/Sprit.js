/**
 * Created by Administrator on 2016/11/28.
 */
function Sprit(option){
    this._init(option);
}
Sprit.prototype = {
    _init: function (option) {
        this.x = option.x || 0;
        this.y = option.y || 0;

        this.w = option.w || 40;
        this.h = option.h || 65;

        this.fps = option.fps || 10;

        this._imgSrc = option.imgSrc || "";

        this.originw = option.originw || 40;
        this.originh = option.originh || 65;
        this.dire = 0;

    },
    render: function (ctx) {
        var img = new Image();
        img.src = this._imgSrc;
        var self = this;
        img.onload = function () {
            var frameIdex = 0;
            setInterval(function () {
                ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
                ctx.drawImage(
                    img,
                    frameIdex*self.originw,
                    self.dire*self.originh,
                    self.originw,
                    self.originh,
                    self.x,
                    self.y,
                    self.w*2,
                    self.h*2
                );
                frameIdex++;
                frameIdex %= 4;



            },1000/self.fps);
        }
    },

    changeDir: function (dire) {
        switch(dire){
            case "left":
                this.dire = 1;
                break;
            case "right":
                this.dire = 2;
                break;
            case "up":
                this.dire = 3;
                break;
            case "down":
                this.dire = 0;
                break;
        }

    }
}