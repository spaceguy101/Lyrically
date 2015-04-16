Name = '';
album = '';
Artist1 = '';
ImgSrc = '';




setInterval(function() {	


var prevName=window.Name;	

window.Name = '';
window.album = '';
window.Artist1 = '';
window.ImgSrc = '';


	sudoName=$(".song_title").text().trim();
	singers=$(".artist_title").text().trim();
	commaIndex = singers.indexOf(",");
	sudoArtist1 = (commaIndex === -1)?singers:singers.substring(0, commaIndex);

		if (sudoName && sudoArtist1 ) {
			
			Name = sudoName;
  			Artist1 = sudoArtist1;
			ImgSrc=$('.queue_art').attr('src');
			//clearInterval(refreshInterval);

				if (Name !== prevName && Name) {
					chrome.runtime.sendMessage( {'msg' : 'trackInfo','artist' : Artist1,'title' : Name,'album' : album,'imgsrc':ImgSrc});
				}
				

		} 
		
	}, 1500);




// Use thsi to skip on ads /  $('.App_PlayerFooter_Ad').children().length > 0