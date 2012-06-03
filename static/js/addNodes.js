(function($){
	$(".fancybox").fancybox();

	assert: 1 === 1; //physics is okay

	var floor = -1;

	function refreshNodes(floor){
		//clear existing nodes
		$('.node').remove();

		function drawNodes(response){
			function drawNode(node)
			{
				var x = node.pos[0];
				var y = node.pos[1];
			   $.append('<p class="node">'+ x + ',' + y +'</p>')
			}
			function processNodes(nodepoint){
				for(var i = 0; i < nodepoint.length; i++){
					if(nodepoint[i].pos[2] === floor) drawNode(nodepoint[i]);
				}
			}
			console.log(response);
			processNodes(response.endpoints);
			processNodes(response.junctions);
		}
		$.ajax({
			  url: '/getNodes',
			  dataType: 'json',
			  success: drawNodes
			});

	}

	function addNewNode(event) {
		var posX = event.pageX - $(this).offset().left, 
			posY = event.pageY - $(this).offset().top;
		console.log("Adding new node on floor", floor + 1, [posX, posY]);

		var faaaancyurl = '/addNodeForm?x=' + posX + '&y=' + posY + '&z=' + floor
		console.log(faaaancyurl);
		$.fancybox({href: faaaancyurl, type:'iframe', afterClose: refreshNodes(floor)});
	}

	$('#floorSelect').bind('change', function(){
		var $this = $(this);

		floor = parseInt($this.attr('value'))
		$(".floorplan").addClass('hidden')
		$("#Floor" + floor).removeClass('hidden').bind('click', addNewNode)
	})

})(jQuery)