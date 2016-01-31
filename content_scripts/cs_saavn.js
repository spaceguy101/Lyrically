'use strict';
var Name , album , Artist1 , ImgSrc;
Name = album = Artist1 = ImgSrc = '';

window.addEventListener ("load", function (){
	interval();
	chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
    if (request.message == "sendInfoToBG")
      chrome.runtime.sendMessage( {'msg' : 'trackInfo','artist' : Artist1,'title' : Name,'album' : album,'imgsrc':ImgSrc});
  });
} , false);

function interval(){

setInterval(function() {
	var prevName = Name;
	fetchTrackInfo(function(){
		if (Name !== prevName && (Name !=='' || Name !== undefined)) {
			chrome.runtime.sendMessage( {'msg' : 'trackInfo','artist' : Artist1,'title' : Name,'album' : album,'imgsrc':ImgSrc});
		}
	});
}, 2000);
}


//saavn.com
function fetchTrackInfo(callback) {
	Name = album = Artist1 = ImgSrc = '';
if(document.getElementById('player-track-name') !== null){
	Name = document.getElementById('player-track-name').innerText;
	album = document.getElementById('player-album-name').innerText;
}
else{
	Name = 'noName';
}	
	var songJSONDivs = $(".song-json");
	for (var i = 0; i < songJSONDivs.length; i++) {
		var obj = eval("(" + songJSONDivs[i].innerText + ")");
		if (obj.title.trim() === Name.trim()) {
			var singers = obj.singers;
			var commaIndex = singers.indexOf(",");
			Artist1 = (commaIndex === -1)?singers:singers.substring(0, commaIndex);
			
		}
	}
	
	ImgSrc = $('#now-playing').find('.key-art').css('background-image').replace('url('+'"','').replace('"'+')','');

	callback();
	
}
