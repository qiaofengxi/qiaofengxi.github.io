/**
 * Created by Administrator on 2017/3/7.
 */
var H5ComponentRadar = function (name, cfg) {
	var component = new H5ComponentBase(name, cfg);

	var w = cfg.width;
	var h = cfg.height;

	var canvas = document.createElement('canvas');
	var ctx = canvas.getContext('2d');
	var count = cfg.data.length;

	canvas.width = ctx.width = w;
	canvas.height = ctx.height = h;

	// 再加入一个画布充当数据层
	var canvas2 = document.createElement('canvas');
	var ctx2 = canvas2.getContext('2d');

	canvas2.width = ctx2.width = w;
	canvas2.height = ctx2.height = h;

	component.append(canvas);
	component.append(canvas2);

	draw(ctx, ctx2,0);

	function draw(ctx, ctx2, per) {
		w = ctx.canvas.width;
		h = ctx.canvas.height;
		ctx.clearRect(0,0,w,h);
		ctx2.clearRect(0,0,w,h);

		ctx.fillStyle = '#ff7676';
		var r = w /2;

		// 绘制多边形
		for (var s = 10; s > 0; s--) {
			ctx.beginPath();
			for (var j = 0; j < count; j++) {
				var rad= (360 / count) * Math.PI / 180 * j;
				var x = r + Math.sin(rad) * r * (s / 10);
				var y = r + Math.cos(rad) * r * (s / 10);
				ctx.lineTo(x, y);
			}
			ctx.closePath();
			ctx.fillStyle = s % 2 ? '#f1f9ff' :  '#99c0ff';
			ctx.strokeStyle = '#e0e0e0';
			ctx.fill();
		}

		//绘制骨架
		ctx.beginPath();
		for (var j = 0; j < count; j++) {
			var rad= (360 / count) * Math.PI / 180 * j;
			var x = r + Math.sin(rad) * r;
			var y = r + Math.cos(rad) * r;
			ctx.lineTo(r, r);
			ctx.lineTo(x, y);
			if (!$('.radarText_' + j).length) {              //查询是否已存在DOM，不存在创建存在则应用
				var text = $('<div class="text radarText_'+j+'"></div>');
				text.text(cfg.data[j][0]);
				text.css('transition','all 0.5s '+ j * 0.1+'s');

				if ( x < w /2) {
					text.css({
						right: (w - x) / 2 + 5
					});
				} else {
					text.css({
						left: x / 2 + 5
					});
				}
				if (y < h /2) {
					text.css({
						top: y / 2 - 10
					});
				} else {
					text.css({
						bottom:  (h -y) / 2 - 15
					});
				}
				component.append(text);
			}
		}
		ctx.stroke();


		// 输出数据点
		ctx2.beginPath();
		ctx2.fillStyle = 'rgba(255, 192, 203, 0.7)';
		for (var j = 0; j < count; j++) {
			var rad= (360 / count) * Math.PI / 180 * j;
			var x = r + Math.sin(rad) * r * cfg.data[j][1] * per;
			var y = r + Math.cos(rad) * r * cfg.data[j][1] * per;
			ctx2.moveTo(x, y);
			ctx2.arc(x, y, 6, 0, Math.PI * 2);
		}
		ctx2.closePath();
		ctx2.fill();

		//输出连接线
		ctx2.beginPath();
		ctx2.lineWidth = 1;
		ctx2.strokeStyle = '#f00';
		ctx2.fillStyle = 'rgba(255, 192, 203, 0.5)';
		for (var j = 0; j < count; j++) {
			var rad= (360 / count) * Math.PI / 180 * j;
			var x = r + Math.sin(rad) * r * cfg.data[j][1] * per;
			var y = r + Math.cos(rad) * r * cfg.data[j][1] * per;
			ctx2.lineTo(x, y);
		}
		ctx2.closePath();
		ctx2.fill();
		ctx2.stroke();
	}

	component.on('onLoad', function () {
		var s =0;
		for ( var i = 0; i < 100; i++) {
			setTimeout(function () {
				s += 0.01;
				draw(ctx, ctx2, s);
			},i * 10)
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

