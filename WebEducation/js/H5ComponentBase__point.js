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

	cfg.css && component.css({
		left: cfg.css.left,
		top: cfg.css.top,
		bottom: cfg.css.bottom,
		opacity: (cfg.css.opacity || cfg.css.opacity ===0) ? cfg.css.opacity : 1,
		backgroundColor: cfg.css.backgroundColor
	});
	cfg.css.bg && component.css('backgroundImage', 'url('+cfg.css.bg+')');


	if (cfg.center) {
		component.css({
			marginLeft: (-cfg.width / 4) + 'px',
			left: '50%'
		});
	}

	component.on('onLoad', function () {
		component.addClass(clsType + '_load').removeClass(clsType + '_leave');
		cfg.animateIn && component.animate(cfg.animateIn, function() {
			$(component).find('.point').trigger('onFinish');
		});
		return false;
	});

	component.on('onLeave', function () {
		$(component).find('.point').trigger('onReset');
		component.addClass(clsType + '_leave').removeClass(clsType + '_load');
		cfg.animateOut && component.animate(cfg.animateOut,'slow');
		return false;
	});
	return component;
};
