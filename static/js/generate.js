$(function(){
	$('#generate').bind('click', function()
	{
		var node = $('#nodeid').val();
		window.open('/poster/' + node, 'height=500, width=300');

	});
});

