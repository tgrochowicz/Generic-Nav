$(function(){
	$('.expando').bind('click', function(){
		$(this).children().slideToggle('slow', function() {
  		});
	});
});

