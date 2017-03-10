/**
 * Created by Administrator on 2017/3/9.
 */
var H5_loading = function (images, firstPage) {
	var id = this.id;
	if (this._images === undefined) {
		this._images = ( images || []).length;
		this._loaded = 0;
		window[id] = this;
		for (s in images) {
			var item = images[s];
			var img = new Image();
			img.onload = function () {
				window[id].loader();
			};
			img.src = item;
		}
		$('#rate').text('0%');
		return this;

	} else {
		this._loaded++;
		$('#rate').text(parseInt(this._loaded / this._images* 100) +'%' )
		if (this._loaded <  this._images) {
			return this;
		}
	}


	window[id] = null;
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
};