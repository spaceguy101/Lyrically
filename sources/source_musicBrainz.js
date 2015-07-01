/*global $:false , console:false*/
'use strict';

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
	if(title2) {title2=title2.trim() ; /*title2 = title2.replace(/\s{2,}/g,' '); /* remove 2 or more white space*/ } 
	if(album2) album2=album2.trim() ;else album2 = '';
	if(artist) artist=artist.trim() ;else artist ='';
	
	if (!title2 || title2 === 'noName' || title2 === '') {
		noName();
		return; 
	}

	var query;
	
	if(album2 || album2 !== undefined){
	query = 'recording:' + title2 + ' AND release:'+ album2 ;
	}	

	if(( !album2 || album2 === undefined) && (!artist || artist === undefined)) {
		query = 'recording:' + title2 ;
	}
	if(artist !== '' && artist !== undefined){
		query = 'recording:' + title2 + ' AND artist:'+ artist ;
	}
	
			$.ajax({
				url : 'http://musicbrainz.org/ws/2/recording',
				data : {
					query : query
				},
				type : 'GET',
				cache: true,
				error : function() {
					if(artist && album2 === undefined || !album2) searchGoogle(artist +' '+title2);

							else if(album2 && !artist) searchGoogle(title2 +' '+album2);

								else if(!album2 && !artist) searchGoogle(title2);
					console.log('Musicbrainz error');
				},
				success : function(data) {
				
					
					var title_arr=$(data).find('title');
						
					var artistCredit = $(data).find('artist-credit');
					if (artistCredit.length > 0 && title_arr.length >0) {
						var _artist= artistCredit[0].getElementsByTagName('artist')[0].getElementsByTagName('name')[0].textContent;
						
					var title=title_arr[0].textContent;			
					title = (title).replace(/\s*\(.*?\)\s*/g, '');
							
					
					if(title.length > title2.length - 2 && title.length < title2.length + 2)
							(_artist)? getLyrics(_artist, title, album2) : getLyrics('Not found', title, album2) ;

					else{
						if(artist && album2 === undefined || !album2) searchGoogle(artist +' '+title2);

							else if(album2 && (!artist || artist === undefined)) searchGoogle(title2 +' '+album2);

								else if(!album2 && !artist) searchGoogle(title2);
					}
						
					} else {
						
						if(artist && album2 === undefined || !album2) searchGoogle(artist +' '+title2);

							else if(album2 && !artist) searchGoogle(title2 +' '+album2);

								else if(!album2 && !artist) searchGoogle(title2);
						
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
