'use strict';
var Name , album , Artist1 , ImgSrc;
Name = album = Artist1 = ImgSrc = '';


setInterval(function() {
	var prevName = Name;

	  Name = album = Artist1 = '';
  
  Name = $('a.now-playing-link.song').text().trim();
  Artist1 = $('a.now-playing-link.artist').text().trim();
  ImgSrc=$('#now-playing').find('.img-container img').attr('src');

	if (Name !== prevName && Name) {
		chrome.runtime.sendMessage( {'msg' : 'trackInfo','artist' : Artist1,'title' : Name,'album' : album,'imgsrc':ImgSrc});
	}
}, 3000);

