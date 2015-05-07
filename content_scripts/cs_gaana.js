//gaana.com

Name = album = Artist1 = ImgSrc = '';


var trackChangeInterval = setInterval(function() {
	 prevName = Name;
	fetchTrackInfo();
	if (Name !== prevName && Name) {
		console.log(Name);
		chrome.runtime.sendMessage( {'msg' : 'trackInfo','artist' : Artist1,'title' : Name,'album' : album,'imgsrc':ImgSrc});
	}
}, 3000);




function fetchTrackInfo(){
  
  Name = album = Artist1 = artists = ImgSrc ='';
  
  div_trackInfo = document.getElementById('trackInfo');
  
  if (!div_trackInfo || div_trackInfo.children.length === 0){
      return;
  }
  
   songs = div_trackInfo.getElementsByClassName("songName");
  if (songs.length > 0){
      Name = songs[0].innerText;
      albumElement = div_trackInfo.getElementsByClassName("albumNamePl");
      album = (albumElement.length > 0)?albumElement[0].innerText:"";
  }else{
  	if($('#tx').get(0) !== undefined){

      tx=$("#tx");
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