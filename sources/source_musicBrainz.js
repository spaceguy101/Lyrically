function getArtistFromMusicBrainz(title, album) {
	var artist = '';
	query = 'recording:"' + title + '" AND release:"' + album + '"';

	$
			.ajax({
				url : "http://musicbrainz.org/ws/2/recording",
				data : {
					query : query
				},
				type : "GET",
				error : function(jqXHR, textStatus, errorThrown) {
					
					spinner('hide');
					mainView.innerHTML = 'Error occurred.... ';
							
				},
				success : function(data, status) {
					artistCredit = $(data).find("artist-credit");
					if (artistCredit.length > 0) {
						artist = artistCredit[0].getElementsByTagName("artist")[0].getElementsByTagName("name")[0].textContent;
						getLyrics(artist, title, album);
					} else {
						getLyrics('Not Found', title, album);
					}
				}

			});
}




function getDataFromMusicBrainz_forYoutube(title2,album2) {
	title2=title2.trim();
	album2=album2.trim();
	
	if(album2)
	query = 'recording:' + title2 + ' AND release:'+ album2 ;
	else query = 'recording:' + title2 + ' AND country:IN';
	$
			.ajax({
				url : "http://musicbrainz.org/ws/2/recording",
				data : {
					query : query
				},
				type : "GET",
				error : function(jqXHR, textStatus, errorThrown) {
					searchGoogle(title2);
				},
				success : function(data, status) {
				
					
					title_arr=$(data).find("title");
						
					artistCredit = $(data).find("artist-credit");
					if (artistCredit.length > 0 && title_arr.length >0) {
						artist= artistCredit[0].getElementsByTagName("artist")[0]
								.getElementsByTagName("name")[0].textContent;
						
					title=title_arr[0].textContent;			
					title = (title).replace(/\s*\(.*?\)\s*/g, '');
							
					
					if(title.length > title2.length - 2 && title.length < title2.length + 2)
					getLyrics(artist, title, album);
					else
						searchGoogle(title2 +' '+album2);
						
					} else {
						
						searchGoogle(title2 +' '+album2);
						
					}
				}

			});
}