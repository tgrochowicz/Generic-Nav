(function($){
	var floor = -1;

	$('#floorSelect').bind('change', function(){
		var $this = $(this);

		floor = parseInt($this.attr('value'))
		$(".floorplan").addClass('hidden')
		$("#Floor" + floor).removeClass('hidden')
	})

})(jQuery)