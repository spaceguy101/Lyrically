//gaana.com
'use strict';
var Name , album , Artist1 , ImgSrc ,prevName;
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
	 prevName = Name;
	fetchTrackInfo();
	if (Name !== prevName && (Name !=='' || Name !== undefined)) {
		console.log(Name);
		chrome.runtime.sendMessage( {'msg' : 'trackInfo','artist' : Artist1,'title' : Name,'album' : album,'imgsrc':ImgSrc});
	}
}, 2000);

}


function fetchTrackInfo(){
  var artists;
  Name = album = Artist1 = artists = ImgSrc ='';
  
  var div_trackInfo = document.getElementById('trackInfo');
  
  if (!div_trackInfo || div_trackInfo.children.length === 0){
      return;
  }
  
   var songs = div_trackInfo.getElementsByClassName("songName");
  if (songs.length > 0){
      Name = songs[0].innerText;
      var albumElement = div_trackInfo.getElementsByClassName("albumNamePl");
      album = (albumElement.length > 0)?albumElement[0].innerText:"";
  }else{
  	if($('#tx').get(0) !== undefined){

    var  tx=$("#tx");
      if(tx.length === 0) return;
      Name = tx.get(0).firstChild.nodeValue.trim();
     album = tx.find("span").eq(0).find("a").text().trim();
      Artist1 = tx.find("span").eq(1).find("a").eq(0).text().trim();
  }
  else Name = 'noName';
  
  }

  if (Name === "Gaana Promotional"){Name = prevName;}
  
  if (Name === "Radio Mirchi Started..."){
  	Name = prevName;
  }

  ImgSrc =document.getElementsByClassName('playersongimg')[0].getElementsByTagName('img')[0].getAttribute('src');
  
}
