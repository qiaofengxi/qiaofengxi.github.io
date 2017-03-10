/**
 * Created by Administrator on 2017/3/7.
 */
var H5ComponentPolyline = function (name, cfg) {
	var component = new H5ComponentBase(name, cfg);

	var w = cfg.width;
	var h = cfg.height;

	var canvas = document.createElement('canvas');
	var ctx = canvas.getContext('2d');
	var count = cfg.data.length + 1;

	canvas.width = ctx.width = w;
	canvas.height = ctx.height = h;

	// 再加入一个画布充当数据层
	var canvas2 = document.createElement('canvas');
	var ctx2 = canvas.getContext('2d');

	canvas2.width = ctx2.width = w;
	canvas2.height = ctx2.height = h;

	var step = 10;

	//绘制项目名称
	for (var k = 0; k < cfg.data.length; k++) {
		var text = $('<div class="text"></div>');
		var x =parseInt(w / count) * k;
		text.text(cfg.data[k][0]);
		var curWidth = parseInt(w / count) / 2;
		text.css({
			width: curWidth,
			left: x / 2 + curWidth / 2
		});
		component.append(text);
	}

	function draw(ctx,ctx2,per) {
		ctx.clearRect(0, 0, w, h);
		ctx2.clearRect(0, 0, w, h);
		ctx.lineWidth = 1;
		ctx.strokeStyle = '#aaa';
		ctx.beginPath();
		//绘制水平线
		for (var i = 0; i < step + 1; i++){
			var y = (h / 10) * i;
			ctx.moveTo(0, y);
			ctx.lineTo(w, y);
		}
		//绘制垂直线
		for (var j = 0; j < count + 1; j++) {
			var x =parseInt(w / count) * j;
			ctx.moveTo(x, 0);
			ctx.lineTo(x, h);
		}
		ctx.stroke();
		component.append(canvas);

		ctx2.beginPath();
		ctx2.lineWidth = 1;
		ctx2.strokeStyle = '#ff8878';
		ctx2.fillStyle = 'rgba(255, 118, 118, 0.37 )';
		component.append(canvas2);

		var vx = 0;
		var vy =0;
		//绘制数据节点
		for (var i = 0; i < cfg.data.length; i++) {
			var item = cfg.data[i];
			vx = (parseInt(w / count) * (i+1));
			vy = (1 - item[1] * per) * h;
			ctx2.moveTo(vx, vy);
			ctx2.arc(vx, vy, 5, 0, Math.PI * 2);
		}
		ctx2.fill();
		ctx2.textAlign = 'center';
		ctx2.font = '18px 微软雅黑';
		ctx2.beginPath();
		// 绘制数据连接线
		for (var j = 0; j < cfg.data.length; j++ ) {
			var item = cfg.data[j];
			vx = (parseInt(w / count) * (j+1));
			vy = (1 - item[1] * per) * h;
			ctx2.lineTo(vx, vy);
		}
		//绘制阴影
		ctx2.lineTo(vx, h);
		ctx2.lineTo(parseInt(w / count), h);
		ctx2.fill();
		ctx2.stroke();
		// 绘制数据文本信息
		for (var j = 0; j < cfg.data.length; j++ ) {
			ctx2.beginPath();
			var item = cfg.data[j];
			vx = (parseInt(w / count) * (j+1));
			vy = (1 - item[1] * per) * h;
			if (item[2]) {
				ctx2.fillStyle = item[2];
			}
			else {
				ctx2.fillStyle ='#ff8878';
			}
			ctx2.fillText(parseInt(item[1] * 100)+'%', vx, vy-10);
		}
	}

	component.on('onLoad', function () {
		var s =0;
		for ( var i = 0; i < 100; i++) {
			setTimeout(function () {
				s += 0.01;
				draw(ctx, ctx2, s);
			},i * 10+500)
		}
	});

	component.on('onLeave', function () {
		var s =1;
		for ( var i = 0; i < 100; i++) {
			setTimeout(function () {
				s -= 0.01;
				draw(ctx, ctx2, s);
			},i * 10)
		}
	});


	return component;
};

