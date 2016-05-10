
/*global $:false , console:false*/
'use strict';
function getURLFromLyricWiki(artist, title) 
{
	if(artist === 'Not found') artist ='';
	$
			.ajax({
				url : 'http://lyrics.wikia.com/api.php',
				data : {
					artist : artist,
					song : title,
					fmt : 'xml',
					action:'lyrics',
					func:'getSong'

				},
				
				dataType : 'xml',
				type : 'GET',
				cache : true,
				error : function() {

					spinner('hide');
					document.getElementById('main').innerHTML = 'Sorry :( ....An error occurred while retrieving lyrics. ';
							
				},
				success : function(lyricsData) {
					
						console.log(lyricsData);
					
						// Grab lyrics wikia song url
						var songURL = $(lyricsData).find('url').text();
						var lyrics = $(lyricsData).find('lyrics').text();

						if (lyrics === 'Not found') {
							
							showErr (artist,title);
						//	document.getElementById('main').innerHTML = 'Trying To Get Lyrics by Google Search ';
						//	google(title,artist);
							
						}
						else
							getLyricsFromLyricWikiURL(songURL,title,artist,'');
					

				}

			});
}

function getLyricsFromLyricWikiURL(songURL,title,artist,from) {
	$
			.ajax({
				url : songURL,
				type : 'GET',
				success : function(songData) {
					
					var lyrics = getLyricsFromRawHtml_wikia(songData);
					
					
					if (lyrics.length === 0  ) {
					
						showErr (artist,title);

					
					} else {

						spinner('hide');
						focusWindow();
						$('#main').prop('style').removeProperty('white-space');
						document.getElementById('main').innerHTML = lyrics + '</p> Source <a href="'+ songURL + 
						'" target="_blank">LyricWiki.  </a>';
			
						$('.scrollbar').perfectScrollbar('update');
						$('.scrollbar').animate({scrollTop:0},0.25);
					}
					
				}
			});
}

function getLyricsFromRawHtml_wikia(data) {
	
	var filter = function(){
		return this.nodeType === Node.TEXT_NODE|| $(this).is('p, br, i, b, strong, em');
	};
	return $('<div>').append(
			$(data).find('.lyricbox').contents().filter(filter)).remove().html();
}