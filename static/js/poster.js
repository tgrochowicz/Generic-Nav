$(function(){
	function gen_node_url(host, node){
		return host + '/node/' + node;
	}
	function gen_qr_url(url){
		var google_url = 'http://chart.apis.google.com/chart?cht=qr&chs=350x350&chld=L&choe=UTF-8&chl='
		google_url += encodeURI(url)
		return google_url;
	};
	function shorten_url(url){
		 //var request_url = 'http://api.linkee.com/1.0/shorten?input=' + encodeURI(url);
		 //$.getJSON(request_url),
		 //	  function(data) { $('#url').text(data.result) };

		return url
	}
	var host = $('#host').attr('content');
	var node = $('#nodeid').attr('content');

	var url = gen_node_url(host, node);
	$('#qr').attr('src', gen_qr_url(url));
	$('#url').text(shorten_url(url));
	$('#url').attr('href', url)
});

