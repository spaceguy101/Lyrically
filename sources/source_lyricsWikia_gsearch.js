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






/*
 *chrome.runtime.getBackgroundPage(function (backgroundPage) {
 *   backgroundPage.search(title);
 *});
 *
 */