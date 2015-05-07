var Name = '';
var ImgSrc ='';

var trackChangeInterval = setInterval(function() {
	checkTrackChange();
}, 3000);


function checkTrackChange() {
	var prevName = Name;

if($('.watch-main-col meta[itemprop="name"]') !== null ){
Name=$('.watch-main-col meta[itemprop="name"]').attr('content');
}
else {

	Name = 'noName';
}
ImgSrc=$('.watch-main-col link[itemprop="thumbnailUrl"]').attr('href');

	if (Name !== prevName ) {
		console.log(Name);
		chrome.runtime.sendMessage({'title' : Name,'msg' : 'youtube_data','imgsrc':ImgSrc});
	}
}

console.log(Name);