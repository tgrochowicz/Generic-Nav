$(function(){
	$('#generate').bind('click', function()
	{
		var node = $('option:selected').attr('id');
		window.open('/poster/' + node, 'height=500, width=300');

	});
});

