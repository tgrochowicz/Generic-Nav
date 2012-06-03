
function closeFancybox(){

    $.fancybox.close();
	refreshNodes(floor);
}

var floor = -1;


function refreshNodes(floor){
	//clear existing nodes
	$('.node').remove();

	function drawNodes(response){

		function drawNode(node)
		{
			var x = node.pos[0] - 10;
			var y = node.pos[1] - 10;
			$('#FloorPlan').append('<img class="node" id="'+ node.id +'" style="position:absolute; left: '+x+'px; top:'+y+'px;" src="/images/' + node.type + '.png" title="' + node.name + '"/>')
			var node_elem = $('#' + node.id);
			node_elem.bind('click', function(){
				node.posX = node.pos[0];
				node.posY = node.pos[1];
				node.floor = node.pos[2];
				launchNodeScreen(node);
			});
		}
		function processNodes(nodepoint){
			for(node in nodepoint){
				if(node !== undefined && nodepoint[node].pos[2] === floor && nodepoint[node].id !== undefined ){
					//nodepoint[node].id=node;
					drawNode(nodepoint[node]);
				}
			}
		}
		processNodes(response.endpoints);
		processNodes(response.junctions);
		
		var canvas = document.getElementById('floorcanvas'),
			filename = "/images/" + response.floors[floor].image,
			context = canvas.getContext('2d'),
			bg = new Image();
		
		$.extend(response.endpoints, response.junctions);

		bg.onload = function(){
			canvas.width = this.width
			canvas.height = this.height
			context.drawImage(bg, 0, 0);
			context.beginPath();
			context.lineWidth = 3;

			for(var n in response.junctions) {
				var node = response.endpoints[n];

				if(node.pos[2] == floor) {
					for(var c in node.connections) {
						var target = response.endpoints[c];
						if (target) {
							context.moveTo(node.pos[0], node.pos[1]);
							context.lineTo(target.pos[0], target.pos[1]);
						}
					}
				}
			}

			context.stroke();
		}

		bg.src = filename
	}
	$.ajax({
		  url: '/getNodes',
		  dataType: 'json',
		  success: drawNodes
		});

}

function launchNodeScreen(node)
{
	var url = '/addNodeForm?x=' + node.posX + '&y=' + node.posY + '&z=' + node.floor
	if (node.id !== null)	url += '&id=' +  node.id;

	$.fancybox({href: url, type:'iframe', onClose: refreshNodes(node.floor)});
};


(function($){
	$(".fancybox").fancybox();

	assert: 1 === 1; //physics is okay


	function addNewNode(event) {
		var posX = event.pageX - $(this).offset().left, 
			posY = event.pageY - $(this).offset().top;
		console.log("Adding new node on floor", floor + 1, [posX, posY]);

		node = { posX: posX, posY: posY, floor: floor, id: null, name: null};
		launchNodeScreen(node);

		//var faaaancyurl = '/addNodeForm?x=' + posX + '&y=' + posY + '&z=' + floor
		//console.log(faaaancyurl);
		//$.fancybox({href: faaaancyurl, type:'iframe', onClose: refreshNodes(floor)});
	}

	$("#floorcanvas").bind('click', addNewNode)

	$('.floorbtn').bind('click', function(){
		$('.floorbtn').removeClass('active');
		$(this).addClass('active');
		floor = parseInt($(this).attr('data-floor'))
		refreshNodes(floor);
	})

	$('.floorbtn[data-floor=2]').click();

})($)
