Name = album = Artist1 = ImgSrc = '';


var trackChangeInterval = setInterval(function() {
	var prevName = Name;
	
	 Name = Artist1 = ImgSrc='';

  Name = $(".title a")[0].innerText;
  Artist1 = $(".artist a").text();
  ImgSrc=$('.current-song-art').attr('style').replace('background-image: url(','').replace(')','').replace(/;/,'').replace(/1200/g,'200');

	if (Name !== prevName && Name) {
		chrome.runtime.sendMessage( {'msg' : 'trackInfo','artist' : Artist1,'title' : Name,'album' : album,'imgsrc':ImgSrc});
	}
}, 3000);


