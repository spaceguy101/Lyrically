
function searchChartLyrics(artist,title){
var query = artist + ' ' + title;

	$
			.ajax({
				url : 'http://www.chartlyrics.com/search.aspx?q='+query,
				type : 'GET',
				cache : false,
				error : function() {

					spinner('hide');
					document.getElementById('main').innerHTML = 'Sorry :( ....An error occurred while retrieving lyrics. ';
							
				},
				success : function(lyricsData) {
					
					
				//$(lyricsData).find('#footer').remove();

				var max = $(lyricsData).find('table tbody').children().length - 16 ;
				var songTitle , Artist , Song,i ;

				for(i=1;i<max;i++){

 				if($(lyricsData).find('table tbody :nth-child('+ i +' ) :nth-child(1) .rb')[0].getAttribute('title') > 6) { 
    			songTitle = $(lyricsData).find('table tbody :nth-child('+ i +' ) :nth-child(2) a')[0].innerHTML;
   				Artist = songTitle.substring(0, songTitle.indexOf('-')- 1);
    			Song = songTitle.substring(songTitle.indexOf('-')+2 , songTitle.length ).toLowerCase();

    			if(Song == title.toLowerCase()){

     			url = 'http://www.chartlyrics.com' + $(lyricsData).find('table tbody :nth-child('+ i +' ) :nth-child(2) a')[0].getAttribute('href');
     			getLyricsChartLyrics(url,artist,title);
     			return;
    			}

    			else{
    			document.getElementById('main').innerHTML = 'Trying To Get Lyrics by Google Search ';
				google(title,artist);
    		}

         	} 
		}

					

				}

			});




}


function getLyricsChartLyrics(songURL,artist,title){


$.ajax({
				url : songURL,
				type : 'GET',

				error: function(jqXHR, textStatus, errorThrown){
					spinner('hide');
				showErr (artist,title);
					

			},

				success : function(songData, songStatus) {
					
					lyrics = getLyricsFromRawHtmlChartLyrics(songData);
					
					if (lyrics.length === 0) {

						showErr (artist,title);
						spinner('hide');
						
					document.getElementById('main').innerHTML= 'Sorry.. :( </br> <b>Lyrics not found...</b>' +  '</br></br> <b>You May Try To:</b></br> <ul>\
		  					<li>(<a target="_blank" href="https://www.google.com/search?q='+ artist+ ' '+ title+ ' lyrics">Search Google</a>).</li>\
		  					<br>'+ 
							'<li>Contribute by adding lyrics at ' + '<a href="'+ 'http://lyrics.wikia.com/'+artist+':'+title+'?action=edit' + '" target="_blank">LyricWiki</a>. </li></ul>';
										
										
					} else {

						spinner('hide');

						document.getElementById('main').innerHTML = lyrics + '</p> Source <a href="'
								+ songURL + '" target="_blank"> ChartLyrics </a>';
						$('.scrollbar').perfectScrollbar('update');


						
					}
					
					
				}
			});



}

function getLyricsFromRawHtmlChartLyrics(data){
$(data).find('img').remove();
var filter = function(){
                    return this.nodeType === Node.TEXT_NODE|| $(this).is('i, b, strong, em');
            };
 return $('<div>').append($(data).find('p').contents().filter(filter)).remove().html();
}