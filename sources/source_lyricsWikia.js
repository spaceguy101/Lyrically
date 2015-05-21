
function getURLFromLyricWiki(artist, title) 
{
	$
			.ajax({
				url : 'http://lyrics.wikia.com/api.php',
				data : {
					artist : artist,
					song : title,
					fmt : 'xml'
				},
				
				dataType : 'xml',
				type : 'GET',
				cache : false,
				error : function(jqXHR, textStatus, errorThrown) {

					spinner('hide');
					mainView.innerHTML = 'Sorry :( ....An error occurred while retrieving lyrics. ';
							
				},
				success : function(lyricsData, status) {
					
					
						// Grab lyrics wikia song url
						var songURL = $(lyricsData).find("url").text();
						var lyrics = $(lyricsData).find("lyrics").text();

						if (lyrics === 'Not found') {
							
							document.getElementById('main').innerHTML = 'Trying To Get Lyrics by Google Search ';
							google(title,artist);
							
						}
						else
							getLyricsFromLyricWikiURL(songURL,title,artist);
					

				}

			});
}

function getLyricsFromLyricWikiURL(songURL,title,artist,from) {
	$
			.ajax({
				url : songURL,
				type : 'GET',
				success : function(songData, songStatus) {
					
					lyrics = getLyricsFromRawHtml_wikia(songData);
					
					
					if (lyrics.length === 0  ) {
						if(from !=='gsearch'/* avoid recursion*/){
						document.getElementById('main').innerHTML = 'Trying To Get Lyrics by Google Search';
						google(title,artist);
						console.log('nothere');
					}else{
						fetchLetra (artist,title);
					}
					} else {

						spinner('hide');
						focusWindow();
						$('#main').prop('style').removeProperty("white-space");
						document.getElementById('main').innerHTML = lyrics + '</p> Source <a href="'
								+ songURL + '" target="_blank">LyricWiki.  </a>';
			
						$('.scrollbar').perfectScrollbar('update');
					}
					
				}
			});
}

function getLyricsFromRawHtml_wikia(data) 
{

	
	
	var filter = function() 
	{
		return this.nodeType === Node.TEXT_NODE|| $(this).is('p, br, i, b, strong, em');
	};
	return $('<div>').append(
			$(data).find('.lyricbox').contents().filter(filter)).remove().html();
}