/**
 * Created by Administrator on 2017/3/7.
 */
var H5ComponentBar = function (name, cfg) {
	var component = new H5ComponentBase(name, cfg);

	$.each(cfg.data, function (index, item) {
		var line = $('<div class="line"></div>');
		var name = $('<div class="name"></div>');
		var rate = $('<div class="rate"></div>');
		var per = $('<div class="per"></div>');

		var bgStyle = '';
		if (item[2]) {
			bgStyle = 'style = "background-color:'+item[2]+'"';
		}
		rate.html('<div class="bg" '+bgStyle+'></div>');
		name.text(item[0]);
		var width = item[1] * 100 + "%";
		rate.css('width',width);
		per.text(item[1] * 100 + "%");
		line.append(name).append(rate).append(per);
		component.append(line);
	});

	return component;
};