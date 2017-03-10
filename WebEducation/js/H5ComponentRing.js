/**
 * Created by Administrator on 2017/3/7.
 */
var H5ComponentRing = function (name, cfg) {
	var component = new H5ComponentPie(name, cfg);

	// 添加一个遮罩层
	//var canvas = document.createElement('canvas');
	//var ctx = canvas.getContext('2d');
	//var w = cfg.width;
	//var h = cfg.height;
	//var r = w / 2;
	//canvas.width = ctx.width = w;
	//canvas.height = ctx.height = h;
	//$(canvas).css('zIndex',5);
	//component.append(canvas);
	//
	//ctx.fillStyle = '#eee';
	//ctx.beginPath();
	//ctx.arc(r, r, r * 0.8, 0, Math.PI * 2);
	//ctx.fill();
	//
	//var info = $('<div class="info"></div>');
	//info.text(cfg.data[0][0]);
	//var per = $('<div class="per"></div>');
	//per.text(cfg.data[0][1] * 100 + '%');
	//info.append(per);
	//component.append(info);
	//
	//if (cfg.data[0][2]) {
	//	info.css('color', cfg.data[0][2]);
	//}
	//
	//info.css({
	//	left: r /2 ,
	//	top: r /2 - 12
	//});

	var width = cfg.width / 2;
	var height = cfg.height / 2;

	// 添加一个遮罩层
	var mask = $('<div class="mask"></div>');
	var text = $('<div class="info"></div>');
	var html = '<p class="strong">'+cfg.data[0][0]+'</p>'+
		'<p>'+cfg.data[0][1] * 100 +'%</p>';
	text.html(html);
	mask.css({
		width: width,
		height: height
	});
	text.css({
		top: '50%',
		marginTop: -14
	});
	if (cfg.data[0][2]) {
		text.css('color', cfg.data[0][2])
	}
	mask.append(text);
	component.append(mask);

	return component;
};

