/**
 * Created by Administrator on 2017/3/5.
 */
var H5 = function () {
	this.id = ('h5_'+Math.random()).replace('.','_');
	this.el = $('<div class="h5" id="'+this.id+'"></div>').hide();
	this.page = [];
	$('body').append(this.el);

	this.addPage = function (name, text) {
		var page = $('<div class="h5_page section"></div>');
		if (name) {
			page.addClass('h5_page_' + name);
		}
		if (text) {
			page.text(text);
		}
		this.el.append(page);
		this.page.push(page);

		if (typeof this.whenAddPage === 'function') {
			this.whenAddPage();
		}

		return this;
	};

	this.addComponent = function (name ,cfg) {
		var cfg = cfg || {};
		cfg = $.extend({
			type: 'base'
		}, cfg);
		var component;
		switch (cfg.type) {
			case 'base':
				component = new H5ComponentBase(name, cfg);
				break;
			case 'Polyline':
				component = new H5ComponentPolyline(name, cfg);
				break;
			case 'Pie':
				component = new H5ComponentPie(name, cfg);
				break;
			case 'Bar':
				component = new H5ComponentBar(name, cfg);
				break;
			case 'Radar':
				component = new H5ComponentRadar(name, cfg);
				break;
			case 'Ring':
				component = new H5ComponentRing(name, cfg);
				break;
			case 'Point':
				component = new H5ComponentPoint(name, cfg);
				break;
			default:
				break;
		}
		var page = this.page.slice(-1)[0];
		page.append(component);
		return this;
	};

	this.loader = function (firstPage) {
		$(this.el).fullpage({
			onLeave: function (index, nextIndex, direction) {
				$(this).find('.h5_component').trigger('onLeave');
			},
			afterLoad: function (link, index) {
				$(this).find('.h5_component').trigger('onLoad');
			},
			afterRender: function () {
				$('.h5_page').eq(0).find('.h5_component').trigger('onLoad');
			}
		});
		this.el.show();
		$.fn.fullpage.moveTo(firstPage || 1);
		return this;
	};
	this.loader = typeof H5_loading === 'function'? H5_loading : this.loader;
	return this;
};