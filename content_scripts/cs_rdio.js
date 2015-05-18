'use strict';
var Name , album , Artist1 , ImgSrc;
Name = album = Artist1 = ImgSrc = '';

function fetchTrackInfo(){
	window.Name="";
	window.album="";
	window.Artist1="";

	Name=$("span.text_metadata a.song_title").text().trim();
	Artist1 =$("span.text_metadata a.artist_title").text().trim();
	ImgSrc=$('.queue_art').attr('src');
}


window.addEventListener ("load", interval , false);

function interval(){


 setInterval(function() {
	var prevName = Name;

  Name = album = Artist1 = '';
  fetchTrackInfo();
 

	if (Name !== prevName && (Name !=='' || Name !== undefined)) {
		chrome.runtime.sendMessage( {'msg' : 'trackInfo','artist' : Artist1,'title' : Name,'album' : album,'imgsrc':ImgSrc});
	}
}, 3000);
 
}			

		
		



// Use thsi to skip on ads /  $('.App_PlayerFooter_Ad').children().length > 0