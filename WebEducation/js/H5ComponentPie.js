/**
 * Created by Administrator on 2017/3/7.
 */
var H5ComponentPie = function (name, cfg) {
	var component = new H5ComponentBase(name, cfg);

	var w = cfg.width;
	var h = cfg.height;

	var canvas = document.createElement('canvas');
	var ctx = canvas.getContext('2d');
	var count = cfg.data.length;
	var r = w /2;

	canvas.width = ctx.width = w;
	canvas.height = ctx.height = h;
	$(canvas).css('zIndex',1);
	component.append(canvas);

	ctx.beginPath();
	ctx.fillStyle = '#eee';
	ctx.fillStyle = '#eee';
	ctx.lineWidth = 1;
	ctx.arc(r, r, r, 0, 2 * Math.PI);
	ctx.fill();

	// 绘制数据层
	var canvas2 = document.createElement('canvas');
	var ctx2 = canvas2.getContext('2d');
	canvas2.width = ctx2.width = w;
	canvas2.height = ctx2.height = h;
	$(canvas2).css('zIndex',2);
	component.append(canvas2);

	var colors = ['pink','green', 'blue', 'orange', 'gray','yellow', 'red'];
	var sAngle = 1.5 * Math.PI;
	var eAngle = 0;
	var aAngle = Math.PI * 2;

	var count = cfg.data.length;
	for (var i = 0; i < count; i++) {
		var item = cfg.data[i];
		var color = item[2] ? item[2] : colors[i];
		eAngle = sAngle + aAngle * item[1];
		ctx2.beginPath();
		ctx2.strokeStyle = '#eee';
		ctx2.fillStyle = color;
		ctx2.lineWidth = 1;
		ctx2.moveTo(r, r);
		ctx2.arc(r, r, r, sAngle, eAngle);
		ctx2.fill();
		sAngle = eAngle;

		// 加入文本
		if (!$('.pieText_' + i).length) {
			var text = $('<div class="text pieText_'+i+'"></div>');
			text.text(cfg.data[i][0]);
			var per = $('<div class="per"></div>');
			per.text(cfg.data[i][1] * 100 + "%");
			text.append(per);
			component.append(text);

			var x = r + Math.cos(sAngle -((aAngle * item[1]) / 2)) * r;
			var y = r + Math.sin(sAngle -((aAngle * item[1]) / 2)) * r;
			text.css('transition','all 0.5s '+ i * 0.2+'s');
			if ( x > w / 2) {
				text.css('left',x / 2 + 5);
			}else {
				text.css('right',(w-x) / 2 + 10);
			}
			if (y > h /2) {
				text.css('top',y / 2 + 5);
			}else {
				text.css('bottom',(h-y) / 2 + 10);
			}

			if (cfg.data[i][2]) {
				text.css('color',cfg.data[i][2]);
			}


		}

	}



	// 再加入一个蒙版层
	var canvas3 = document.createElement('canvas');
	var ctx3 = canvas3.getContext('2d');
	canvas3.width = ctx3.width = w;
	canvas3.height = ctx3.height = h;
	$(canvas3).css('zIndex',3);
	component.append(canvas3);


	draw(ctx3,0);

	function draw(ctx3, per) {
		w = ctx3.canvas.width;
		h = ctx3.canvas.height;
		ctx3.clearRect(0, 0, w, h);

		ctx3.beginPath();
		ctx3.fillStyle = '#eee';
		ctx3.fillStyle = '#eee';
		ctx3.lineWidth = 1;
		ctx3.moveTo(r, r);
		if (per <= 0) {
			ctx3.arc(r, r, r+2, 0, 2 * Math.PI);
		}else {
			ctx3.arc(r, r, r+2, 1.5 * Math.PI, 1.5 * Math.PI+2 * Math.PI * per, true);
		}
		ctx3.fill();
	}

	component.on('onLoad', function () {
		var s =0;
		for ( var i = 0; i < 100; i++) {
			setTimeout(function () {
				s += 0.01;
				draw(ctx3, s);
			},i * 10)
		}
	});

	component.on('onLeave', function () {
		var s =1;
		for ( var i = 0; i < 100; i++) {
			setTimeout(function () {
				s -= 0.01;
				draw(ctx3, s);
			},i * 10)
		}
	});


	return component;
};
