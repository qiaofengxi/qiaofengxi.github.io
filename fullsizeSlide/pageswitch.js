/**
 * Created by Administrator on 2017/2/28.
 */
(function ($) {

	/*说明:获取浏览器前缀*/
	/*实现：判断某个元素的css样式中是否存在transition属性*/
	/*参数：dom元素*/
	/*返回值：boolean，有则返回浏览器样式前缀，否则返回false*/
	var _prefix = (function(temp){
		var aPrefix = ["webkit", "Moz", "o", "ms"],
			props = "";
		for(var i in aPrefix){
			props = aPrefix[i] + "Transition";
			if(temp.style[ props ] !== undefined){
				return "-"+aPrefix[i].toLowerCase()+"-";
			}
		}
		return false;
	})(document.createElement(PageSwitch));

	var privateFun = {

	};
	var PageSwitch = (function () {
		function PageSwitch(element,options) {
			this.settings = $.extend(true, $.fn.PageSwitch.defaults, options || {});
			this.element = element;
			this.init();
		}
		PageSwitch.prototype = {
			init: function () {
				var that = this;
				that.selectors = that.settings.selectors;
				that.sections = that.element.find(that.selectors.sections);
				that.section = that.sections.find(that.selectors.section);

				that.direction = that.settings.direction === 'vertical' ? true : false;
				that.pagesCount = that.pagesCount();
				that.index = (that.settings.index >=0 && that.settings.index <= that.pagesCount) ? that.settings.index : 0;

				that.canscroll = true;

				if (!that.direction || that.index) {
					that._initLayout();
				}

				if (that.settings.pagination) {
					that._initPaging();
				}
				that._initEvent();
			},
			pagesCount: function () {
				return this.section.length;
			},
			switchLength: function () {
				return this.direction ? this.element.height() : this.element.width();
			},
			_initPaging: function () {
				var that = this;
				pagesClass = that.selectors.page.substring(1);
				that.activeClass = that.selectors.active.substring(1);

				var pageHtml = "<ul class="+pagesClass+">";
				for (var i = 0; i < that.pagesCount; i++) {
					pageHtml += "<li></li>";
				}
				pageHtml += '</ul>';
				that.element.append(pageHtml);
				var pages = that.element.find(that.selectors.page);
				that.pageItem = pages.find("li");
				that.pageItem.eq(that.index).addClass(that.activeClass);

				if(that.direction){
					pages.addClass("vertical");
				}else{
					pages.addClass("horizontal");
				}

			},
			_initLayout: function () {
				var that = this;
				var width = (that.pagesCount * 100) + "%";
				var cellWidth = (100 / that.pagesCount).toFixed(2) + "%";
				that.section.width(cellWidth).css('float', 'left');
				that.sections.width(width);
				if(that.index) {
					that._scrollPage(true);
				}
			},
			_initEvent: function () {
				var that = this;
				that.element.on('click','li', function () {
					that.index = $(this).index();
					that._scrollPage();
				});
				that.element.on('mousewheel DOMMouseScroll', function (e) {
					var delta = e.originalEvent.wheelDelta || -e.originalEvent.detail;
					if (delta > 0 && that.canscroll) {
						that.prev();
					}else if (delta < 0 && that.canscroll) {
						that.next();
					}
				});
				if (that.settings.keyboard) {
					$(window).on('keydown', function (e) {
						if(that.canscroll) {
							var keyCode = e.keyCode;
							if (keyCode === 37 || keyCode === 38) {
								that.prev();
							}else if (keyCode === 39 || keyCode === 40) {
								that.next();
							}
						}
					})
				}

				//$(window).resize(function () {
				//	var currentLength = that.switchLength;
				//	offset = that.settings.direction ? that.section.eq(that.index).offset().top
				//		: that.section.eq(that.index).offset.left;
				//	if (Math.abs(offset) > currentLength/2 && that.index < (that.pagesCount - 1)) {
				//		that.index++;
				//	}
				//	if (that.index) {
				//		that._scrollPage();
				//	}
				//});
				that.sections.on('transitionend webkitTransitionEnd oTransitionEnd otransitionend', function () {
					that.canscroll = true;
					if (that.settings.callback && $.type(that.settings.callback) === 'function') {
						that.settings.callback();
					}
				})
			},
			_scrollPage: function () {
				var that = this;
				dest = that.section.eq(that.index).position();
				if (!dest) return;
				that.canscroll = false;
				if (_prefix) {
					var translate = that.direction ? 'translateY(-'+dest.top+'px)' :
					'translateX(-'+dest.left+'px)';
					that.sections.css(_prefix + 'transition', 'all '+ that.settings.duration +
					'ms ' + that.settings.easing);
					that.sections.css(_prefix + 'transform',translate);
				} else {
					var animateCss = that.direction ? {top: -dest.top} :
					{left: -dest.left};
					that.sections.animate(animateCss, that.settings.duration, function () {
						that.canscroll = true;
						if (that.settings.callback && $.type(that.settings.callback) === 'function') {
							that.settings.callback();
						}
					});
				}
				if(that.settings.pagination){
					that.pageItem.removeClass(that.activeClass);
					that.pageItem.eq(that.index).addClass(that.activeClass);
				}

			},
			prev: function () {
				var that = this;
				if (that.index > 0) {
					that.index--;
				}else if (that.settings.loop) {
					that.index = that.pagesCount - 1;
				}
				that._scrollPage();
			},
			next: function () {
				var that = this;
				if (that.index < that.pagesCount-1) {
					that.index++;
				}else if (that.settings.loop) {
					that.index = 0;
				}
				that._scrollPage();
			}
		};
		return PageSwitch;
	})();

	$.fn.PageSwitch = function (options) {
		return this.each(function () {
			$this = $(this);
			intance = $this.data('PageSwitch');
			if (!intance) {
				instace = new PageSwitch($this, options);
				$this.data('PageSwitch',instace);
			}
			if($.type(options) === 'string') return instace[options]();
		})
	};
	$.fn.PageSwitch.defaults = {
		selectors: {
			sections: '.sections',
			section: '.section',
			page: '.pages',
			active: '.active'
		},
		index: 0,
		easing: 'ease',
		duration: 300,
		loop: false,
		pagination: true,
		keyboard: true,
		direction: 'vertical',
		callback: ''
	}
})(jQuery);