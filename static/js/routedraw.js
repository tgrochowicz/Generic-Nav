(function($){
	var numfloors = $('.floorcanvas').length;

	$('.floorcanvas').each(function(index){
		var $this = $(this),
			that = this,
			path = JSON.parse($this.attr('data-path')),
			filename = "/images/" + $this.attr('data-bg'),
			context,
			scale = 1,
			minwidth = 300,
			maxwidth = 600,
			minheight = 100,
			maxheight = 600,
			diff,
			bbox = [50000, 50000, 0, 0];

		//Get bounding box
		for (var i in path) {
			var pos = path[i],
				x = parseInt(pos[0]),
				y = parseInt(pos[1]);

			if (x < bbox[0]) {
				bbox[0] = x;
			}
			if (x > bbox[2]) {
				bbox[2] = x;
			}
			if (y < bbox[1]) {
				bbox[1] = y;
			}
			if (y > bbox[3]) {
				bbox[3] = y;
			}
		}

		diff = Math.abs(bbox[2] - bbox[0]);
		if (diff < minwidth) {
			bbox[2] += (minwidth - diff) / 2;
			bbox[0] -= (minwidth - diff) / 2;
		}
		diff = Math.abs(bbox[3] - bbox[1]);
		if (diff < minheight) {
			bbox[3] += (minheight - diff) / 2;
			bbox[1] -= (minheight - diff) / 2;
		}
		
		var turtle = path.shift(),
			bg = new Image(),
			start = new Image(),
			startpos = turtle,
			finish = new Image(),
			finishpos; 

		bg.onload = function() {
			bbox[0] = bbox[0] - (start.width / 2 + 10) / scale ;
			bbox[1] = bbox[1] - (start.height + 10) / scale;
			bbox[2] = (bbox[2] + (start.width / 2 + 10) / scale) - bbox[0];
			bbox[3] = (bbox[3] + 10 / scale) - bbox[1]
			that.width = bbox[2] * scale;
			that.height = bbox[3] * scale;
			context = that.getContext('2d');
			context.translate(-bbox[0] * scale, -bbox[1] * scale)
			context.scale(scale, scale);
			context.drawImage(bg, 0, 0);
			context.beginPath();
			context.moveTo(turtle[0], turtle[1]);

			while(turtle = path.shift()) {
				context.lineTo(turtle[0], turtle[1]);
				finishpos = turtle;
			}

			context.scale(1/scale, 1/scale)
			context.lineWidth = 5;
			context.strokeStyle = '#000';
			context.stroke();
			context.lineWidth = 3;
			context.strokeStyle = '#0f0';
			context.stroke();
			context.lineWidth = 1;
			context.strokeStyle = '#00f';

			if (startpos[1] < finishpos[1]) {
				context.drawImage(start, startpos[0] * scale - start.width / 2, startpos[1] * scale - start.height + 5);
				context.drawImage(finish, finishpos[0] * scale - finish.width / 2, finishpos[1] * scale - finish.height + 5);
			} else {
				context.drawImage(finish, finishpos[0] * scale - finish.width / 2, finishpos[1] * scale - finish.height + 5);
				context.drawImage(start, startpos[0] * scale - start.width / 2, startpos[1] * scale - start.height + 5);
			}
		};

		start.onload = function() {
			finish.src = index == numfloors - 1 ? '/images/finish.png' : '/images/elevator.png';
		}

		finish.onload = function() {
			bg.src = filename
		}

		
		start.src = index == 0 ? '/images/start.png' : '/images/elevator.png';

	})

})(jQuery)