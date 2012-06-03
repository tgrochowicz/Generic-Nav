$(function(){
	$('.expando').bind('click', function(){
		$(this).children().not('.findCategory').slideToggle('slow', function() {
  		});
	});
});

