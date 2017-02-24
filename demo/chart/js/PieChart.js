/**
 * Created by Administrator on 2016/11/30.
 */
function PieChart(option) {
    this._init(option)
}

PieChart.prototype = {
    _init: function(option){
        this.x = option.x || 0;
        this.y = option.y || 0;
        this.r = option.r || 0;
        this.data = option.data ||0;

        this._animateIndex = 0;

        //创建基础组
        this.baseGroup = new Konva.Group({
            x: this.x,
            y: this.y
        });
        //创建放扇形组
        this.wedgeGroup = new Konva.Group({
           x: 0,
           y: 0
        });
        this.baseGroup.add(this.wedgeGroup);

        //创建放文字组
        this.TextGroup = new Konva.Group({
            x: 0,
            y: 0
        });
        this.baseGroup.add(this.TextGroup);

        var self = this;
        var startAngle = -90;
        this.data.forEach(function (item,index) {
            var wedg = new Konva.Wedge({
                x:0,
                y:0,
                radius: self.r,
                angle: item.value * 360,
                rotation: startAngle,
                fill: item.color,
            });
            self.wedgeGroup.add(wedg);

            var txtAngle = startAngle + item.value * 360/2;
            var text = new Konva.Text({
                x: (self.r+20) * Math.cos(txtAngle * Math.PI / 180),
                y: (self.r+20) * Math.sin(txtAngle * Math.PI / 180),
                text: item.value * 100 + "%",
                fill: item.color
            });
            if(txtAngle > 90 && txtAngle < 270 ){
                text.x(text.x()-text.getWidth());
            }
            self.TextGroup.add(text);

            startAngle += item.value * 360;
        });
        var circle = new Konva.Circle({
            x: 0,
            y: 0,
            radius: this.r+30,
            stroke: "#ccc"
        });
        this.baseGroup.add(circle);
    },
    addTolayer: function (arg) {
        arg.add(this.baseGroup);
    },
    animate: function () {
        var self = this;
        var wedge = this.wedgeGroup.getChildren()[self._animateIndex];
        if(self._animateIndex == 0){
            this.wedgeGroup.getChildren().each(function (item,index) {
                item.angle(0);
            });
        }
        wedge.to({
            duration: self.data[self._animateIndex].value * 2,
            angle: self.data[self._animateIndex].value * 360,
            onFinish: function () {
                self._animateIndex++;
                if(self._animateIndex >= self.data.length){
                    self._animateIndex = 0;
                    return;
                }
                self.animate();
            }
        });

    }
}