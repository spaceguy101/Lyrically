'use strict';
var Name , album , Artist1 , ImgSrc;
Name = album = Artist1 = ImgSrc = '';


setInterval(function() {
	var prevName = Name;

  Name = album = Artist1 = '';
  
  Name=$("#song_title").text();
  album=$("#album_title").text();
  ImgSrc =$('#jp_poster_0').attr('src');

	if (Name !== prevName && Name) {
		chrome.runtime.sendMessage( {'msg' : 'trackInfo','artist' : Artist1,'title' : Name,'album' : album,'imgsrc':ImgSrc});
	}
}, 3000);

