'use strict';
var Name = '';
var ImgSrc ='';

window.addEventListener ("load", function (){
	console.log('cs loadede');
	interval();
	chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
		sendResponse({message: "fromCS"});
    if (request.message == "sendInfoToBG")
      chrome.runtime.sendMessage({'title' : Name,'msg' : 'youtube_data','imgsrc':ImgSrc});
  });
} , false);

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