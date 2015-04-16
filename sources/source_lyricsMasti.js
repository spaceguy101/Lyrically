
//For Lyrics masti.com
function getLyricsFromLyricsMasti(title,artist) {
var title = title;
var artist = artist;
$.ajax({
			url: 'https://ajax.googleapis.com/ajax/services/search/web',
			data: {v:'1.0',q: 'site:www.lyricsmasti.com -"Page Ranking Information"' + title },
			dataType: 'jsonp',
			type: 'GET',
			error: function(jqXHR, textStatus, errorThrown){
				document.getElementById('main').innerHTML= 'Sorry.. :( </br> Error Occured';
					spinner('hide');
					
			},
			success: function(googledata){
					

				try{

				if(typeof googledata.responseData.results[0] !== 'undefined' && googledata.responseData.results[0] !== null ){
				url_lyricsMasti = googledata.responseData.results[0].unescapedUrl ;
				
				document.getElementById('main').innerHTML = '</p> Trying URL : <a href="'
								+ url_lyricsMasti + '" target="_blank">'
									+ url_lyricsMasti +
									' </a>';
				
				getLyricsFromLyricMastiURL(url_lyricsMasti,title,artist)	;	
				}
				else {

					spinner('hide');

					document.getElementById('main').innerHTML= 'Sorry.. :( </br> <b>Lyrics not found...</b>' + '</br></br> <b>You May Try To:</b></br> <ul>\
		  					<li>(<a target="_blank" href="https://www.google.com/search?q='+ artist+ ' '+ title+ ' lyrics">Search Google</a>).</li>\
		  					<br>'+ 
							'<li>Contribute by adding lyrics at ' + '<a href="'+ 'http://lyrics.wikia.com/'+artist+':'+title+'?action=edit' + '" target="_blank">LyricWiki</a>. </li></ul>';
										
										}
				}catch(err){
					spinner('hide');
					document.getElementById('main').innerHTML= 'Sorry.. :( </br>Some Error occured';
						
				}
							
				
			}});
}


function getLyricsFromLyricMastiURL(songURL,title,artist) {
	$
			.ajax({
				url : songURL,
				type : 'GET',

				error: function(jqXHR, textStatus, errorThrown){
					spinner('hide');
				document.getElementById('main').innerHTML= 'Sorry.. :( </br> Error Occured';
					

			},

				success : function(songData, songStatus) {
					
					lyrics = getLyricsFromRawHtml_masti(songData);
					
					if (lyrics.length === 0) {


						spinner('hide');
						
					document.getElementById('main').innerHTML= 'Sorry.. :( </br> <b>Lyrics not found...</b>' +  '</br></br> <b>You May Try To:</b></br> <ul>\
		  					<li>(<a target="_blank" href="https://www.google.com/search?q='+ artist+ ' '+ title+ ' lyrics">Search Google</a>).</li>\
		  					<br>'+ 
							'<li>Contribute by adding lyrics at ' + '<a href="'+ 'http://lyrics.wikia.com/'+artist+':'+title+'?action=edit' + '" target="_blank">LyricWiki</a>. </li></ul>';
										
										
					} else {

						spinner('hide');

						document.getElementById('main').innerHTML = lyrics + '</p> Source <a href="'
								+ songURL + '" target="_blank">LyricMasti.com  </a>';
						$('.scrollbar').perfectScrollbar('update');


						
					}
					
					
				}
			});
}



function getLyricsFromRawHtml_masti(data) 
{
	var filter = function() {
		return this.nodeType === Node.TEXT_NODE|| $(this).is(' br, i, b, strong, em');
	};
	return $('<div>').append(
			$(data).find('#lcontent1').contents().filter(filter)).remove().html();
}













/*
 *chrome.runtime.getBackgroundPage(function (backgroundPage) {
 *   backgroundPage.search(title);
 *});
 *
 */