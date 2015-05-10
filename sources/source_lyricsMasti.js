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
						$('#main').css("white-space", "pre-wrap");
						spinner('hide');
						focusWindow();
						document.getElementById('main').innerHTML = lyrics + '</p> Source <a href="'
								+ songURL + '" target="_blank">LyricMasti.com  </a>';
						$('.scrollbar').perfectScrollbar('update');


						
					}
					
					
				}
			});
}



function getLyricsFromRawHtml_masti(data) 
{

if($(data).find('#lyrics') !== null )
return $('<div>').append($(data).find('#lyrics').find('code')[0].innerHTML).html();

else {

var filter = function() {
					return this.nodeType === Node.TEXT_NODE|| $(this).is(' br, i, b, strong, em');
			};
	
	return $('<div>').append(
			$(data).find('#lcontent1').contents().filter(filter)).remove().html();
}

}