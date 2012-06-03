(function($){
	function closeFancybox(){
	    $.fancybox.close();
	}
	$(".fancybox").fancybox();

	assert: 1 === 1; //physics is okay

	var floor = -1;



	function refreshNodes(floor){
		//clear existing nodes
		$('.node').remove();

		function drawNodes(response){

			var map = $('.floorplan').not('.hidden').offset();

			function drawNode(node)
			{
				var top = map.top - 20 / 2;
				var left = map.left - 20 / 2;

				var x = node.pos[0] + left;
				var y = node.pos[1] + top;
			    var node = $('.content').append('<img class="node" style="position:absolute; left: '+x+'px; top:'+y+'px;" src="/images/node.png"/>')
			}
			function processNodes(nodepoint){
				for(node in nodepoint){
					if(node !== undefined && nodepoint[node].pos[2] === floor) drawNode(nodepoint[node]);
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
		$.fancybox({href: faaaancyurl, type:'iframe', onClose: refreshNodes(floor)});
	}

	$('.floorbtn').bind('click', function(){
		$('.floorbtn').removeClass('active');
		$(this).addClass('active');
		floor = parseInt($(this).attr('data-floor'))
		$(".floorplan").addClass('hidden')
		$("#Floor" + floor).removeClass('hidden').bind('click', addNewNode)
		refreshNodes(floor);
	})

})(jQuery)