(function($){
	var numfloors = $('.floorcanvas').length;

	$('.floorcanvas').each(function(index){
		var $this = $(this),
			that = this,
			path = JSON.parse($this.attr('data-path')),
			filename = "/images/" + $this.attr('data-bg'),
			context,
			turtle = path.shift(),
			bg = new Image(),
			start = new Image(),
			startpos = turtle,
			finish = new Image(),
			finishpos,
			scale = 1; //Make this dynamic at some point...

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
				finishpos = turtle;
			}
			context.stroke();
			start.src = index == 0 ? '/images/start.png' : '/images/elevator.png';
		};

		start.onload = function() {
			finish.src = index == numfloors - 1 ? '/images/finish.png' : '/images/elevator.png';
		}

		finish.onload = function() {
			context.drawImage(start, startpos[0] - start.width / 2, startpos[1] - start.height);
			context.drawImage(finish, finishpos[0] - finish.width / 2, finishpos[1] - finish.height);
		}

		bg.src = filename;

	})

})(jQuery)