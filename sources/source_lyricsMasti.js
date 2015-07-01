/*global $:false */
'use strict';
function getLyricsFromLyricMastiURL(songURL,title,artist) {
	$
			.ajax({
				url : songURL,
				type : 'GET',

				error: function(){
				showErr (artist,title);
			},

				success : function(songData, songStatus) {
					
					var lyrics = getLyricsFromRawHtml_masti(songData);
					
					if (lyrics.length === 0) {

					showErr (artist,title);
										
					} else {
						$('#main').css('white-space', 'pre-wrap');
						spinner('hide');
						focusWindow();
						document.getElementById('main').innerHTML = lyrics + '</p> Source <a href="'+ songURL + 
						'" target="_blank">LyricMasti.com  </a>';
						$('.scrollbar').perfectScrollbar('update');
						$('.scrollbar').animate({scrollTop:0},0.25);

						
					}
					
					
				}
			});
}



function getLyricsFromRawHtml_masti(data) {


try{

		if($(data).find('#lyrics') !== null )
			return $('<div>').append($(data).find('#lyrics').find('code')[0].innerHTML).html();

		else if($('#lcontent1')){

			var filter = function() {
				return this.nodeType === Node.TEXT_NODE|| $(this).is(' br, i, b, strong, em');
			};
	
		return $('<div>').append($(data).find('#lcontent1').contents().filter(filter)).remove().html();
		}

		else return '';

}catch(e){

	return '';
}

}