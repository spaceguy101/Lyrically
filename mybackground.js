var artist = '';
var title = '' ;
var album ='';
var site='';
var imgsrc='';
var popupActive= false;
var popupId='';


chrome.tabs.onUpdated.addListener(function (tabId,Info, tab) {
 
 if (Info.status == 'loading') return;
 if ((tab.url.indexOf('saavn.com') > -1) && (Info.status == 'complete')
	||(tab.url.indexOf('gaana.com') > -1) && (Info.status == 'complete')
	||(tab.url.indexOf('rdio.com') > -1) && (Info.status == 'complete')
	||(tab.url.indexOf('hungama.com') > -1) && (Info.status == 'complete')
	||(tab.url.indexOf('youtube.com/watch') > -1) && (Info.status == 'complete')
	||(tab.url.indexOf('guvera') > -1) && (Info.status == 'complete')
	||(tab.url.indexOf('raaga') > -1) && (Info.status == 'complete')
	||(tab.url.indexOf('grooveshark') > -1) && (Info.status == 'complete')
	||(tab.url.indexOf('spotify') > -1) && (Info.status == 'complete')
	||(tab.url.indexOf('bop') > -1) && (Info.status == 'complete')) chrome.pageAction.show(tabId);
});

/*
chrome.runtime.onInstalled.addListener(function(){
localStorage["dontShowGuide"] = false ;
});
*/

chrome.pageAction.onClicked.addListener(iconClicked); // How to open default browserAction popup or normal popup ??

function iconClicked(){
	if(title !== 'noName' || title !== '' ) openPopup(); //open popup
	else {
		showNoSongPlaying();        /// Think on Avoiding this to execute on every setTimeout 
		setTimeout(iconClicked,1000);
	}
}

function openPopup()
{

if(popupActive === false)
{
	if(navigator.platform.indexOf('Win') > -1 ) heightWithoutPanel = 495 ;
		else heightWithoutPanel = 460;

		chrome.windows.create({'url': 'mywindow.html', 'type': 'panel','width': 350,
'height': heightWithoutPanel /* for panels , 495*/, 'left': screen.width - 350,'top': screen.height - heightWithoutPanel},function (popup) {
      popupId = popup.id;

      /*var isPanelEnabled = true ;
      		  
      		isPanelEnabled = popup.alwaysOnTop;  //Currently not including Panel show guide ,it will add many redundancy ,fix it later;
      


    	if(localStorage["dontShowGuide"] === 'false'){
      		var dontShowGuide = false;
      	}
      	else var dontShowGuide = true ;
		
      	 if (!isPanelEnabled) chrome.windows.update(popupId, { "focused": true ,'height': heightWithoutPanel}); //Change height here

            if (!isPanelEnabled && !dontShowGuide) {
            	chrome.windows.update(popupId, { "focused": true });
            chrome.runtime.sendMessage({'msg':'show_panel_enable_guide'}, function(response){
        	});
        }*/
   
			popupActive= true;
	
	});

}

else chrome.windows.update(popupId, { "focused": true });

}


function showNoSongPlaying(){

}

chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
  // When we get a message from the content script
  if(message.msg === 'trackInfo'){
    artist = message.artist;
	title = message.title.replace(/\s*\(.*?\)\s*/g, '').replace(/remix/i,'').replace(/ -.*/, '');
	album=message.album;
	imgsrc=message.imgsrc;
	site='others';
	chrome.runtime.sendMessage({'msg':'change','artist':artist ,'title':title,'album':album,'site':site,'imgsrc':imgsrc});
	
	}
	
	//for youtube..
	else if(message.msg === 'youtube_data'){
	 
			
			imgsrc=message.imgsrc.replace(/maxresdefault/g,'default');
        	title=message.title;
		    site='youtube';
			chrome.runtime.sendMessage({'msg':'change','title':title,'site':site,'imgsrc':imgsrc});
			
			
			
			
	}
	
	//from window
	if(message.msg === 'getTrackInfo'){
          sendResponse({'artist':artist ,'title':title,'album':album,'site':site,'imgsrc':imgsrc});
	}
});

function showPanels() {
chrome.tabs.create({url: "chrome://flags/#enable-panels"}, function(win){
chrome.windows.update(popupId, { "focused": true });
});

}

function focusWindow(){
if(popupActive === true) chrome.windows.update(popupId, { "focused": true });
}

function closeWindow(){
if(popupActive === true) chrome.windows.remove(popupId, function(){});
}