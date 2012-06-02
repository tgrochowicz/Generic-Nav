(function($){
	var floor = -1;

	function addNewNode(event) {
		var posX = event.pageX - $(this).offset().left, 
			posY = event.pageY - $(this).offset().top;
		console.log("Adding new node on floor", floor, [posX, posY]);
	}

	$('#floorSelect').bind('change', function(){
		var $this = $(this);

		floor = parseInt($this.attr('value'))
		$(".floorplan").addClass('hidden')
		$("#Floor" + floor).removeClass('hidden').bind('click', addNewNode)
	})

})(jQuery)