(function($){

	$('.floorcanvas').each(function(){
		var $this = $(this),
			that = this,
			path = JSON.parse($this.attr('data-path')),
			filename = "/images/" + $this.attr('data-bg'),
			context,
			turtle = path.shift(),
			bg = new Image(),
			scale = 0.45; //Make this dynamic at some point...

		bg.onload = function() {
			that.width = this.width * scale;
			that.height = this.height * scale;
			context = that.getContext('2d');
			context.scale(scale, scale);
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