/*global $:false */
'use strict';
function google(title,artist){
 // Cureently No Implemented LyricsMINt.com
 //It is Redundant
$.ajax({

			url: 'https://ajax.googleapis.com/ajax/services/search/web',
			data: {v:'1.0',q: title + ' AND site:lyricsmasti.com OR site:lyrics.wikia.com'},
			dataType: 'jsonp',
			type: 'GET',
			error: function(){
					fetchLetra (artist,title);
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
					
				fetchLetra (artist,title);	
				}

			}catch(err){
				
			fetchLetra (artist,title);
			}
							
				
		}});

}

/*
function searchLyricsWikia_google(title) {
$.ajax({
			url: 'https://ajax.googleapis.com/ajax/services/search/web',
			data: {v:'1.0',q: 'site:lyrics.wikia.com -"Page Ranking Information"' + title},
			dataType: 'jsonp',
			type: 'GET',
			error: function(){},
			success: function(googledata){
				if(typeof googledata.responseData.results[0] !== 'undefined' && googledata.responseData.results[0] !== null ){
				url_lyricsWikia = googledata.responseData.results[0].unescapedUrl ;
				getLyricsFromLyricWikiURL(url_lyricsWikia,title,'');
				}
				else {
					var artist='';
					getLyricsFromLyricsMasti(title,artist)
				}
			}})
}





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



 *chrome.runtime.getBackgroundPage(function (backgroundPage) {
 *   backgroundPage.search(title);
 *});
 *
 */

