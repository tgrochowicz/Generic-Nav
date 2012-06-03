(function($){

	$('.floorcanvas').each(function(){
		var $this = $(this),
			that = this,
			path = JSON.parse($this.attr('data-path')),
			filename = "/images/" + $this.attr('data-bg'),
			context,
			turtle = path.shift(),
			bg = new Image();

		bg.onload = function() {
			that.width = this.width;
			that.height = this.height;
			context = that.getContext('2d');
			context.drawImage(bg, 0, 0);
			context.beginPath();
			context.lineWidth = 3;
			context.moveTo(turtle[0], turtle[1]);

			while(turtle = path.shift()) {
				context.lineTo(turtle[0], turtle[1]);
			}
			context.stroke();
		};

		bg.src = filename;

	})

})(jQuery)