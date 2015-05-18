'use strict';
var Name = '';
var ImgSrc ='';

window.addEventListener ("load", interval , false);

function interval(){
setInterval(function() {
	checkTrackChange();
}, 3000);
}


function checkTrackChange() {
	var prevName = Name;

if($('.watch-main-col meta[itemprop="name"]') !== null ){
Name=$('.watch-main-col meta[itemprop="name"]').attr('content');
}
else {

	Name = 'noName';
}
ImgSrc=$('.watch-main-col link[itemprop="thumbnailUrl"]').attr('href');

	if (Name !== prevName && (!(!Name) || Name !== undefined) ) {
		chrome.runtime.sendMessage({'title' : Name,'msg' : 'youtube_data','imgsrc':ImgSrc});
	}
}

