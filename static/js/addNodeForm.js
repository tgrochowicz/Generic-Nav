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

	var locationType = $('#locationType');
	if(locationType.val())
	{
		var loc = locationType.attr('data-default-value');
		var options = $('#loc_'+loc);
		options.attr('selected', true);

	}

	function closeFancyBox()
	{
		parent.closeFancybox();
	}

	$('.create').bind('click', function()
	{
		var type = $(this).attr('data-type')
		console.log(type);
		$('#type').val(type);
		$.ajax({
		  type: 'POST',
		  url: '/addnode',
		  data: $('#form').serialize(),
		  success: closeFancyBox
		});
		return false;
	});
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
	$('#cancel').bind('click', function()
	{
		closeFancyBox();
		return false;
	});
	$('#delete').bind('click', function()
	{
		$.ajax({
		  type: 'POST',
		  url: '/deletenode',
		  data: $('#form').serialize(),
		  success: closeFancyBox
		});
		return false;
	});
	$('#addcon').bind('click', function() {
		console.log("adding connection")
		$.ajax({
			type: 'POST',
			url: '/addconnection',
			data: $('#connform').serialize(),
			success: function() {
				window.location.reload();
			}
		})
		return false;
	});
	$('.deleteConnection').bind('click', function() {
		var $this = $(this),
			from = $this.attr('data-from'),
			to = $this.attr('data-to');

		$.ajax({
			type: 'POST',
			url: '/deleteconnection',
			data: {'from': from, 'to': to},
			success: function() {
				window.location.reload();
			}
		})
	})


});

