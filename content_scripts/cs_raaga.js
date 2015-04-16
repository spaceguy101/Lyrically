Name = album = Artist1 = ImgSrc = '';


var trackChangeInterval = setInterval(function() {
	var prevName = Name;
	fetchTrackInfo();
	if (Name !== prevName && Name) {
		chrome.runtime.sendMessage( {'msg' : 'trackInfo','artist' : Artist1,'title' : Name,'album' : album,'imgsrc':ImgSrc});
	}
}, 3000);



function fetchTrackInfo(){
	
  Name = '';
  album = '';
  Artist1 = '';
  ImgSrc='';
  Name = $(".player_track_title").text();
  Artist1 = $(".album_title:first").children(":last").text();
  ImgSrc=$(".player_cd_bg img").attr('src');
}