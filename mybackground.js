/*global chrome:false*/
'use strict';
var artist = '';
var title = '' ;
var album ='';
var site='';
var imgsrc='';
var popupActive= false;
var popupId='';
var currentTabID='';

chrome.tabs.onUpdated.addListener(function (tabId,Info, tab) {

 if (Info.status === 'loading') return;
 if ((tab.url.indexOf('saavn.com') > -1)	||
 	(tab.url.indexOf('gaana.com') > -1) 	||
 	(tab.url.indexOf('hungama.com') > -1)	||
 	(tab.url.indexOf('youtube.com/watch')>-1)||
 	(tab.url.indexOf('guvera') > -1)		||
 	(tab.url.indexOf('raaga') > -1)			||
 	(tab.url.indexOf('spotify') > -1)		&& (Info.status === 'complete')) chrome.pageAction.show(tabId);
});



chrome.pageAction.onClicked.addListener(function (tab){

	if(title !== 'noName' || title !== '' ) openPopup(tab); 
	return;
}); 


function openPopup(tab){
	var prevTabID = currentTabID;
	currentTabID = tab.id;
	if(prevTabID !==currentTabID ) getInfoFromCs(tab);
	

if(popupActive === false){

chrome.windows.create({'url': 'mywindow.html', 'type': 'panel','width': 350,
'height': 495, 'left': screen.width - 350,'top': screen.height - 495},function (popup) {
    popupId = popup.id;
   	popupActive= true;
	
	});

}

else chrome.windows.update(popupId, { 'focused': true });

}



chrome.runtime.onMessage.addListener(function(message){

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
	
	
});


function focusWindow(){
if(popupActive ) chrome.windows.update(popupId, { 'focused': true });
}

function closeWindow(){
if(popupActive ) chrome.windows.remove(popupId, function(){});
}

function getInfoFromCs(tab)
{
	
    chrome.tabs.sendMessage(tab.id, {'message': 'sendInfoToBG'}, function(response) {
			if(response===undefined){
				artist = title =album =site=imgsrc= '';
				 	chrome.runtime.sendMessage({'msg':'restartGetInfo'});
			}
		});
		
}

