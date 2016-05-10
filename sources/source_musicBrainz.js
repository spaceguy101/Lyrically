/*global $:false , console:false*/
'use strict';



function getDataFromMusicBrainz(title2,album2,artist) {
	closePopup();
	if(title2) {title2=title2.trim() ; /*title2 = title2.replace(/\s{2,}/g,' '); /* remove 2 or more white space*/ } 
	if(album2) album2=album2.trim() ;else album2 = '';
	if(artist) artist=artist.trim() ;else artist ='';
	
	if (!title2 || title2 === 'noName' ) {
		noName();
		return; 
	}

	var query;
	var searchQuery;

	if(artist && !album2 ){
		query = 'recording:' + title2 + ' AND artist:'+ artist ;
		searchQuery = title2 + ' ' + artist ;
	}else if(album2 && !artist){
		query = 'recording:' + title2 + ' AND release:'+ album2 ;
		searchQuery = title2 + ' ' + album2;
	}else if(( !album2 || album2 === undefined) && (!artist || artist === undefined)) {
		query = 'recording:' + title2 ;
		searchQuery = title2 ;
	}else if(artist && album2 && title2) {
		searchQuery = title2 + ' ' + album2 + ' ' + artist;
		query = 'recording:' + title2 + ' AND artist:'+ artist  + ' AND release:'+ album2 ;
	}

	
			$.ajax({
				url : 'http://musicbrainz.org/ws/2/recording',
				data : {
					query : query
				},
				type : 'GET',
				cache: true,
				error : function() {
					//searchGoogle(searchQuery);
					console.log('Musicbrainz error');
				},
				success : function(data) {
					
					var title_arr=$(data).find('title');
						
					var artistCredit = $(data).find('artist-credit');
					if (artistCredit.length > 0 && title_arr.length >0) {
						
					var _artist= artistCredit[0].getElementsByTagName('artist')[0].getElementsByTagName('name')[0].textContent;
					var title=title_arr[0].textContent.replace(/\s*\(.*?\)\s*/g, '');		

					(title && _artist) ? getLyrics(_artist, title, album2) : getLyrics(artist, title2, album2) ;

					//else searchGoogle(searchQuery);
						
						
					} else {
				
						showErr (artist,title2)
						//searchGoogle(searchQuery);
						
					}
				}

			});
}


function searchGoogle(title){		

				$('#artist_name').css('display', 'none');
				title=title.replace(/[:;~*]/g,'').replace(/\s{2,}/g,' ').trim();
				header.innerHTML = title ;
				google(title);
				
}
