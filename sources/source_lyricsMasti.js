
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
				
					fetchLetra (artist,title);
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

					fetchLetra (artist,title);	
				}
				}catch(err){
					fetchLetra (artist,title);
				}
							
				
			}});
}


function getLyricsFromLyricMastiURL(songURL,title,artist) {
	$
			.ajax({
				url : songURL,
				type : 'GET',

				error: function(jqXHR, textStatus, errorThrown){
				fetchLetra (artist,title);
			
			},

				success : function(songData, songStatus) {
					
					lyrics = getLyricsFromRawHtml_masti(songData);
					
					if (lyrics.length === 0) {
					fetchLetra (artist,title);
										
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