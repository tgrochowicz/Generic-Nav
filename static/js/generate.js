$(function(){
	$.expr[':'].Contains = function(a,i,m){
     return $(a).text().toUpperCase().indexOf(m[3].toUpperCase())>=0;
	};

	$('#generate').bind('click', function()
	{
		var auto = $('#search_val').val();
		var nodeval;
		if(auto){
			nodeval = auto;
		}
		else{
			var results = $('.result:Contains("'+ $('#search').val() + '")');
			if($('#search').val().length > 0 && results.size() === 1){
				nodeval = results.attr('id');
			}
			else{
				alert("Sorry, try again!");
				return;
			}
		}
		var node = $('option:selected').attr('id');
		window.open('/poster/' + nodeval, 'height=500, width=300');

	});

	function redraw(){
		$('.result').hide();
		var float = $('#float');
		var results = $('.result:Contains("'+ $('#search').val() + '")');
		if($('#search').val().length > 0 && results.size() > 0){
			results.show();
			float.show();
		}
		else{
			float.hide();
		}
	}

	$('#search').bind('keyup', function(){
		$('#search_val').val(null);
		setTimeout(redraw, 1);

	});
	$('#search').bind('focusout', function(){
		//setTimeout($('#float').hide(), 3);
	})
	$('#search').bind('focusin', function(){
		redraw();
	});
	$('.result').bind('click', function(){
		var clicked = $(this);
		$('#search').val(clicked.text());
		$('#search_val').val(clicked.attr('id'));
		$('#float').hide();
	});
});

