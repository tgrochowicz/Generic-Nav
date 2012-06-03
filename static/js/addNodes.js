
function closeFancybox(){

    $.fancybox.close();
	refreshNodes(floor);
}

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
			$('.content').append('<img class="node" id="'+ node.id +'" style="position:absolute; left: '+x+'px; top:'+y+'px;" src="/images/node.png"/>')
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

function launchNodeScreen(node)
{
	var url = '/addNodeForm?x=' + node.posX + '&y=' + node.posY + '&z=' + node.floor
	if (node.id !== null)	url += '&id=' +  node.id;
	if (node.name !== null)	url += '&name=' +  node.name;

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

	$('#floorSelect').bind('change', function(){
		var $this = $(this);

		floor = parseInt($this.attr('value'))
		$(".floorplan").addClass('hidden')
		$("#Floor" + floor).removeClass('hidden').bind('click', addNewNode)
		refreshNodes(floor);
	})

})($)
