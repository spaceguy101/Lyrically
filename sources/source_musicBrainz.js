/*function getArtistFromMusicBrainz(title, album) {
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

*/



function getDataFromMusicBrainz(title2,album2,artist) {
	closePopup();
	if(title2) title2=title2.trim() ;
	if(album2) album2=album2.trim() ;else album2 = '';
	if(artist) artist=artist.trim() ;
	
	if (!title2 || title2 === 'noName' || title2 === '') {
		noName();
		return; 
	}
	
	if(album2 !== '' || album2 !== null || album2 !== undefined){
	query = 'recording:' + title2 + ' AND release:'+ album2 ;
	}	

	if((album2=='' || album2 == undefined) && (artist=='' || artist == undefined)) {
		query = 'recording:' + title2 + ' AND country:IN';
	}
	if(artist !== '' && artist !== undefined){
		query = 'recording:' + title2 + ' AND artist:'+ artist ;
	}

	console.log(query);
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
						_artist= artistCredit[0].getElementsByTagName("artist")[0]
								.getElementsByTagName("name")[0].textContent;
						
					title=title_arr[0].textContent;			
					title = (title).replace(/\s*\(.*?\)\s*/g, '');
							
					
					if(title.length > title2.length - 2 && title.length < title2.length + 2)
					getLyrics(_artist, title, album2);
					else
						searchGoogle(title2 +' '+album2);
						
					} else {
						
						(artist && album2== undefined) ? searchGoogle(artist +' '+title2) : searchGoogle(title2 +' '+album2);
						
					}
				}

			});
}


function searchGoogle(title)
{			
				$('#artist_name').css('display', 'none');
				title=title.replace(/[:;~*]/g,'');
				header.innerHTML = title ;
				google(title);
				
			
}
