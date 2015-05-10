
function getLyricsFromLyricMintURL(songURL,title,artist) {
	$
			.ajax({
				url : songURL,
				type : 'GET',

				error: function(jqXHR, textStatus, errorThrown){
					spinner('hide');
				fetchLetra (artist,title);
					

			},

				success : function(songData, songStatus) {
					
					lyrics = getLyricsFromRawHtml_mint1(songData);
					
					if (lyrics.length === 0) {

						fetchLetra (artist,title);
						spinner('hide');
						
					document.getElementById('main').innerHTML= 'Sorry.. :( </br> <b>Lyrics not found...</b>' +  '</br></br> <b>You May Try To:</b></br> <ul>\
		  					<li>(<a target="_blank" href="https://www.google.com/search?q='+ artist+ ' '+ title+ ' lyrics">Search Google</a>).</li>\
		  					<br>'+ 
							'<li>Contribute by adding lyrics at ' + '<a href="'+ 'http://lyrics.wikia.com/'+artist+':'+title+'?action=edit' + '" target="_blank">LyricWiki</a>. </li></ul>';
										
										
					} else {

						spinner('hide');

						document.getElementById('main').innerHTML = lyrics + '</p> Source <a href="'
								+ songURL + '" target="_blank">LyricsMint  </a>';
						$('.scrollbar').perfectScrollbar('update');


						
					}
					
					
				}
			});
}



function getLyricsFromRawHtml_mint1(data) 
{
	var filter = function() 
	{return this.nodeType === Node.TEXT_NODE|| $(this).is('p, br, i, b, strong, em');};

	if(typeof $(data).find('#lyric > p')[0] !== 'undefined'){
	return $('<div>').append(
			$(data).find('#lyric > p').contents().filter(filter)).remove()
			.html();
		}

	else {
		return $('<div>').append(
			$(data).find('#lyrics').parent().contents().filter(filter)).remove()
			.html();
	}
}













/*
 *chrome.runtime.getBackgroundPage(function (backgroundPage) {
 *   backgroundPage.search(title);
 *});
 *
 */