Name = album = Artist1 = ImgSrc = '';


var trackChangeInterval = setInterval(function() {
	var prevName = Name;
	fetchTrackInfo();
	if (Name !== prevName && Name) {
		console.log(Name);
		chrome.runtime.sendMessage( {'msg' : 'trackInfo','artist' : Artist1,'title' : Name,'album' : album,'imgsrc':ImgSrc});
	}
}, 3000);



//saavn.com
function fetchTrackInfo() {
	Name = album = Artist1 = ImgSrc = '';
if(document.getElementById('player-track-name') !== null){
	Name = document.getElementById('player-track-name').innerText;
	album = document.getElementById('player-album-name').innerText;
}
else{
	Name = 'noName';
}	
	songJSONDivs = $(".song-json");
	for (var i = 0; i < songJSONDivs.length; i++) {
		obj = eval("(" + songJSONDivs[i].innerText + ")");
		if (obj.title.trim() === Name.trim()) {
			singers = obj.singers;
			commaIndex = singers.indexOf(",");
			Artist1 = (commaIndex === -1)?singers:singers.substring(0, commaIndex);
			
		}
	}
	
	ImgSrc = $('#now-playing').find('.key-art').css('background-image');
	if(ImgSrc !== undefined)
	ImgSrc=ImgSrc.replace('url(','').replace(')','');
	
	
}