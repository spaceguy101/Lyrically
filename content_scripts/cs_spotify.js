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

	Name = album = Artist1 = '';
  Name = $('#app-player').contents().find('#track-name a:first').text().trim();
  Artist1 = $('#app-player').contents().find('#track-artist a:first').text().trim();

	if (Name !== prevName && (Name !=='' || Name !== undefined)) {
		chrome.runtime.sendMessage( {'msg' : 'trackInfo','artist' : Artist1,'title' : Name,'album' : album,'imgsrc':ImgSrc});
	}
}, 2000);

}

