$(function(){
	var id = $('#id');

	if(!id.val())
	{
		var new_id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    		var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    		return v.toString(16);
		});
		id.val(new_id);
	}

	function closeFancyBox()
	{
		parent.closeFancybox();
	}

	$('#save').bind('click', function()
	{
		$.ajax({
		  type: 'POST',
		  url: '/addnode',
		  data: $('#form').serialize(),
		  success: closeFancyBox
		});
		return false;

	});
	$('#delete').bind('click', function()
	{
		return false;
	});

});

