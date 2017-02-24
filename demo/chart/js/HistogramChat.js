/**
 * Created by Administrator on 2016/11/30.
 */
function HistogramChat(option) {
    this._init(option);
}
HistogramChat.prototype = {
    _init: function (option) {
        this.x = option.x || 0;
        this.y = option.y || 0;
        this.width = option.width || 0;
        this.height = option.height || 0;
        this.data = option.data || 0;

        //创建一个基础组包含所有以下两个组
         this.baseGroup = new Konva.Group({
            x:this.x,
            y:this.y
        });

        //创建一个放矩形的组
        this.rectGrop = new Konva.Group({
            x:0,
            y:0
        });
        this.baseGroup.add(this.rectGrop);

        //创建一个放百分比文字的组
        this.percentGrop = new Konva.Group({
            x:0,
            y:0
        });
        this.baseGroup.add(this.percentGrop);

        //初始化底线
        var baseLine = new Konva.Line({
            points:[0,0,this.width,0],
            stroke:"lightgreen",
            strokeWidth: 4

        });
        this.baseGroup.add(baseLine);


        var self = this;
        var rectWidth = 1/6 * this.width;
        this.data.forEach(function (item, index) {
            //绘制矩形
            var baseRect = new Konva.Rect({
                x: (1/4 + index) * rectWidth,
                y:0-item.value * self.height,
                width: rectWidth/2,
                height: item.value * self.height,
                fill: item.color,
                opacity: .8,		 //设置透明度
                cornerRadius: 10,	 //设置圆角
                shadowBlur: 10,		  //设置阴影的模糊级别
                shadowColor: 'black',//设置阴影的颜色

            });
            self.rectGrop.add(baseRect);

            //绘制百分比
            var percentText = new Konva.Text({
                x:index * rectWidth,
                y:0-item.value * self.height-16,
                fontSize:14,
                text: item.value * 100 + "%",
                fill: item.color,
                width: rectWidth,
                align:"center"
            });
            self.percentGrop.add(percentText);

            //绘制底边文字说明

            var bottonText = new Konva.Text({
                x:index * rectWidth,
                y:0,
                fontSize:14,
                text: item.name,
                fill: item.color,
                width: rectWidth,
                align:"center",
                rotation: 30
            });
            self.baseGroup.add(bottonText);
        });


    },
    addTolayer: function (arg) {
        arg.add(this.baseGroup);
    },
    animation: function () {
        var self = this;
        //矩形动画
        self.rectGrop.getChildren().each(function (item, index) {
            item.y(0);
            item.height(0);

            item.to({
                duration: 1,
                y:0-self.data[index].value * self.height,
                height: self.data[index].value * self.height,
            });
        });
        //百分比文字动画
        self.percentGrop.getChildren().each(function (item, index) {
            item.y(-15);

            item.to({
                duration: 1,
                y:0-self.data[index].value * self.height-16,
            });
        });
    }

};