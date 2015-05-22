'use strict';
var Name , album , Artist1 , ImgSrc;
Name = album = Artist1 = ImgSrc = '';

String.prototype.capitalize=function(all){
    if(all){
       return this.split(' ').map(function(e){return e.capitalize();}).join(' ');    
    }else{
         return this.charAt(0).toUpperCase() + this.slice(1);
    } 
};

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

  Name = Artist1 = ImgSrc ='';
  
Name= $('#player').find('.track-title a').text();
var singers=$('#player').find('.artist-name a')[0].innerText;
var commaIndex = singers.indexOf(",");
 Artist1 = (commaIndex === -1)?singers:singers.substring(0, commaIndex);
 Artist1=Artist1.toLowerCase();
 Artist1 = Artist1.capitalize(true);
 
ImgSrc=$('.album-thumb').attr('src');



	if (Name !== prevName && (Name !=='' || Name !== undefined)) {
		chrome.runtime.sendMessage( {'msg' : 'trackInfo','artist' : Artist1,'title' : Name,'album' : album,'imgsrc':ImgSrc});
	}
}, 2000);

}
