$(function(){

	function reposition(line_elem){
		var x1= line_elem.attr('data-x1'), y1= line_elem.attr('data-y1')

		var floor= line_elem.attr('data-floor');

		var floor_img = $('img[data-floor=' + floor+']').offset();


		var top = floor_img.top;
		var left = floor_img.left;
		line_elem.offset({'top':x1 + top, 'left':y1 + left});


	}

	function drawShapes(){
		// get the canvas element using the DOM
		lines = $('.line');
		for (var i = 0; i < lines.length; i++){

			var line_elem = $(lines[i]);
			var id = line_elem.attr('id');
			var canvas = document.getElementById(id);
			var width = line_elem.width();
			var height = line_elem.height();

			var orientation = line_elem.attr('data-orient');

			var ctx = canvas.getContext('2d');
			ctx.lineWidth = 1;
			if(orientation === 'up'){
				ctx.beginPath();
				ctx.moveTo(height,0);
				ctx.lineTo(0,width);
			}
			else if(orientation === 'down'){
				ctx.beginPath();
				ctx.moveTo(0,height);
				ctx.lineTo(width,0);

			}
			else if(orientation === 'vert'){
				ctx.beginPath();
				ctx.moveTo(0,0);
				ctx.lineTo(0,height)
			}
			else if(orientation === 'horiz'){
				ctx.beginPath();
				ctx.moveTo(0,0);
				ctx.lineTo(width,0)
			}
			ctx.stroke();

			reposition(line_elem);

		}

	}

	drawShapes();

});

