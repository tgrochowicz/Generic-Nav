$(function(){


	var map = $('#map').offset();
	var location = $('#location');

	var top = map.top - 57 / 2;
	var left = map.left - 62 / 2;

	var offset = location.offset()
	location.offset({'top':offset.top + top, 'left':offset.left + left});


});

