/*global $:false */
'use strict';
function google(title,artist){
 // Cureently No Implemented LyricsMINt.com //It is Redundant
if(!(/\S/).test(title)){
title = artist + title;
console.log(title);
}


$.ajax({

			url: 'https://ajax.googleapis.com/ajax/services/search/web',
			data: {v:'1.0',q: title + ' AND site:lyricsmasti.com OR site:lyrics.wikia.com'},
			dataType: 'jsonp',
			type: 'GET',
			error: function(){
					showErr (artist,title);
			},
			success: function(googledata){
					
				
			try{

				if(typeof googledata.responseData.results[0] !== 'undefined' && googledata.responseData.results[0] !== null ){
					var ResultUrl =googledata.responseData.results[0].unescapedUrl ;
						
					

						if(ResultUrl.indexOf('lyrics.wikia') > -1){
							var url_lyricsWikia = ResultUrl;
							getLyricsFromLyricWikiURL(url_lyricsWikia,title,'','gsearch');
							
						}
						else if(ResultUrl.indexOf('lyricsmasti') > -1){
							
						var url_lyricsMasti = ResultUrl ;	
						document.getElementById('main').innerHTML = '</p> Trying to get lyrics from URL : <a href="'+ 
						url_lyricsMasti + '" target="_blank">'+ 
						url_lyricsMasti + ' </a>';

						getLyricsFromLyricMastiURL(url_lyricsMasti,title,artist)	;	

						}
						else if(ResultUrl.indexOf('lyricsmint') > -1){
							var url_lyricsMint = ResultUrl ;
							
							document.getElementById('main').innerHTML = '</p> Trying to get lyrics from URL : <a href="'+ 
							url_lyricsMint + '" target="_blank">'+ 
							url_lyricsMint +' </a>';
							getLyricsFromLyricMintURL(url_lyricsMint,title,artist);

						}



				}
				else {	
					showErr (artist,title);	
				}

			}catch(err){
				showErr (artist,title);
			}
							
				
		}});

}


