$(function(){

	var $canvas = $('#mapcanvas'),
		pos = JSON.parse($canvas.attr('data-pos')),
		filename = "/images/" + $canvas.attr('data-bg'),
		context,
		bg = new Image(),
		here = new Image(),
		scale = 1; //Make this dynamic at some point...

	bg.onload = function() {
		var canvas = document.getElementById('mapcanvas');
		canvas.width = this.width * scale;
		canvas.height = this.height * scale;
		context = canvas.getContext('2d');
		context.scale(scale, scale);
		context.drawImage(bg, 0, 0);
		here.src = "/images/here.png";
	};

	here.onload = function() {
		context.drawImage(here, pos[0] - this.width / 2, pos[1] - this.height)
	}

	bg.src = filename;

	$('#find').bind('click', function()
	{
		var to = $('option:selected').attr('id');
		var from = $('#node').attr('content');
		window.location.href = '/route/' + from + '/' + to;
	});
});

