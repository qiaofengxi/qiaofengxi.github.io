/* 基本图文组件对象 */

var H5ComponentBase = function (name, cfg) {
	var cfg = cfg || {};
	var id = ('H5_' + Math.random()).replace('.','_');
	var clsName = 'h5_component_' + name;
	var clsType = 'h5_component_' + cfg.type;
	var component = $('<div class="h5_component '+ clsType +" " + clsName +' "id="'+id+'"></div>');
	cfg.text && component.text(cfg.text);
	cfg.width && component.width(cfg.width / 2);
	cfg.height && component.height(cfg.height / 2);

	//cfg.css && component.css({
	//	left: cfg.css.left,
	//	right: cfg.css.right,
	//	top: cfg.css.top,
	//	bottom: cfg.css.bottom,
	//	opacity: (cfg.css.opacity || cfg.css.opacity ===0) ? cfg.css.opacity : 1,
	//	backgroundColor: cfg.css.backgroundColor　
	//});
	cfg.css && component.css(cfg.css);
	cfg.bg && component.css('backgroundImage', 'url('+cfg.bg+')');


	if (cfg.center) {
		component.css({
			marginLeft: (-cfg.width / 4) + 'px',
			left: '50%'
		});
	}
	if ( typeof cfg.onclick === 'function') {
		component.on('click',cfg.onclick);
	}
	component.on('onLoad', function () {
		setTimeout(function () {
			component.addClass(clsType + '_load').removeClass(clsType + '_leave');
			cfg.animateIn && component.animate(cfg.animateIn);
		},cfg.delay || 0);
		return false;
	});

	component.on('onLeave', function () {
		setTimeout(function () {
			component.addClass(clsType + '_leave').removeClass(clsType + '_load');
			cfg.animateOut && component.animate(cfg.animateOut);
		},cfg.delay || 0);

		return false;
	});
	return component;
};
