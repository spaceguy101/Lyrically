	/*global $:false , chrome:false*/
	'use strict';
	var artist='';
	var title='';
	var album='';
	var imgsrc='';
	var count =0;
	var site ='';
	var mainView;
	var header;
	var artist_name;
window.onload = function() {

	$('.scrollbar').perfectScrollbar();
	mainView = document.getElementById('main');
	header = document.getElementById('header');
	artist_name=document.getElementById('artist_name');
	$('#popupdiv').innerHTML='';

    $('.scrollbar').css('height', $(window).height() - 50);
    $('.container').css('height', $(window).height());
    $('#actionbar').css('width', $(window).width() - 95);

$(window).on('resize',function(){
	$('#actionbar').css('width', $(window).width() - 105);
	$('.spinner_container').css('height', $(window).height() - 50);
    $('.scrollbar').css('height', $(window).height() - 50);
    $('.container').css('height', $(window).height());
    $('.scrollbar').perfectScrollbar('update');

 
});

var background = chrome.extension.getBackgroundPage();

addEventListener('unload', function () {
    background.popupActive= false;
}, true);

$('.place').keypress(function(e){
      if(e.keyCode==13)
      $('#bttn').click();		
});
	 
    document.getElementById('circle').addEventListener('click', function(){openPopup() ; $('.err').remove();});
    document.getElementById('bttn').addEventListener('click', input);
    $(document).mouseup(function (e) {
     		var popup = $("#test");
     		if (!$('#bttn').is(e.target) && !popup.is(e.target) && popup.has(e.target).length == 0) {
         	popup.hide(500);
     	}
 	});


getBGdata();

};



function openPopup() {
   $('#test').toggle( 400,'swing');
}

function closePopup() {
    $('#test').hide(400,'swing');
}



function input(){


$('.img-holder').hide();
$('#imgart').hide();

document.getElementById('header-wrap').style.backgroundColor ='#4285f4'; 
$('.container').css('border-color','#4285f4');

artist = document.getElementById('artist').value;
title = document.getElementById('title').value;
spinner('show');
getDataFromMusicBrainz(title,'',artist);
}
	

function getBGdata(){	
chrome.runtime.getBackgroundPage(function(background){

site = background.site;
artist = background.artist;
title = background.title ;
album = background.album;
imgsrc = background.imgsrc;
getTrackInfoFromBG(title,artist,album,site,imgsrc);

});
}



function getTrackInfoFromBG(title_,artist_,album_,site_,imgsrc_){
$('.img-holder').show();
$('#imgart').show();
spinner('show');
if(!title_ || title_ ==='noName' ){

if(count < 3 ) { 
	setTimeout(getBGdata,500);
	count ++;
} else{
	count = 0;
	if($('#loadErr')[0]===null || $('#loadErr')[0]=== undefined /* To avoid Invoke multiple times*/) $('.popup').prepend('<b class="err" id="loadErr" style="color:red;font-size:30px;" > Plz Try Reloading Your Page... </b> </br></br>');
	mainView.innerHTML = '<b> Cannot Get Song Title... </b></br><b style="color:red;font-size:30px;" > Plz Try Reloading Your Page... </b> </br></br>';
	noName();
}
return;
}

	if(site_ === 'others'){
	   getLyrics(artist_, title_, album_);
	}
	  
	  
    else if(site_ == 'youtube'){
		document.getElementById('header').innerHTML = '' ;
		processYoutubeData(title_);
	}
		
	count =0;
	closePopup();
	$('.err').remove();
	$('#imgart').attr('src', imgsrc_);
	  

}


chrome.runtime.onMessage.addListener(function(request) {

	$('.img-holder').show();
	$('#imgart').show();
	spinner('show');

	if (request.msg == 'change') {

		if (request.site == 'others'){
			getLyrics(request.artist, request.title, request.album);
		}else if(request.site === 'youtube'){
			processYoutubeData(request.title);
		}
	
		$('#imgart').attr('src', request.imgsrc);
	
	}else if(request.msg == 'restartGetInfo'){
		getBGdata();
	}

});



function setHeader(artist, title){
		header.innerHTML = title;
		artist_name.innerHTML=artist;
		$('#artist_name').css('display', 'block');
}


function getLyrics(artist, title, album) {
	
	closePopup();

	if (!title || title === 'noName') {
		setHeader('---','---');
		getBGdata();
		return; 
	}

	if (!artist){
		mainView.innerHTML = 'Searching for Artsist Name...';
		getDataFromMusicBrainz(title, album,'');
		return;
	}
	
	setHeader(artist, title);
	getURLFromLyricWiki(artist, title);
	
}




function processYoutubeData(str){

	closePopup();
	
	str = str.replace(/ (Feat|ft|feat|Ft).*?\-/i, ' -');


			if(/(ft|feat|Feat|Ft)/gi.test(str)){
				str = (str).replace(/ (ft|feat|Feat|Ft).*/i, '');
			}
	
			var str_arr=[/\s*\.(avi|wmv|mpg|mpeg|flv|mp4)$/i , /\s*\(\s*[0-9]{4}\s*\)/i, /\s+(HD|HQ)\s*$/ , /\s*\(\s*of+icial\s*\)/gi,/\s*(of+icial\s*)?(music\s*)?video/i , /\s*[0-9]{4}\s*/i , /Official/gi,/video/gi,/full/gi,/song/gi,/exclusive/gi,/title/gi,/audio/gi,/latest/gi,/unplugged/gi,/bollywood/gi,/sing/gi,/along/gi,/remix/gi,/Original/gi,/lyrical/gi,/Lyrics/gi,/lyric/gi,/1080p/gi,/720p/gi,/from/gi,/with/gi];
			for(var i=0,l = str_arr.length;i<l;i++){
				str = (str).replace(str_arr[i], '');
			}
			str = (str).replace(/\s*\[.*?\]\s*/g, ' ');
			str = (str).replace(/\s*\(.*?\)\s*/g, ' ');
			

			
			if(/\s*\'.*?\'\s*/g.test(str)||/\s*\".*?\"\s*/g.test(str)||/ \s*\|.*/g.test(str)||/ \s*\I .*/g.test(str)){ 
			// Bollywood
			str = str.replace(/ \s*\I .*/g, ''); // Remove I***...
			str = str.replace(/ \s*\|.*/g, '');// Remove |***...
			str = str.replace(/\s*\|.*?\|\s*/g, ''); // Remove |***|
			str = str.replace(/^(|.*\s)'(.*)'(\s.*|)$/, '$2'); // capture 'Track title'
			str = str.replace(/^(|.*\s)"(.*)"(\s.*|)$/, '$2'); // capture "Track title"

			if(/-/.test(str)){
			
			var Index = str.indexOf('-');
			var _title = str.substring(0, Index);
			var _album = str.substring(Index+1, str.length);
			getDataFromMusicBrainz(_title,_album , '');
			}
				else getDataFromMusicBrainz(str,'',''); 
			
			}
			
	
		else{
	
			str  = str.split('-');
			if(str.length > 2){ 
			//Bollywood		
			var _title = str[0].trim();
			var _album = str[1].trim();
			getDataFromMusicBrainz(_title,_album,str[2]); //For Bollywood Songs there is no artist name,only title And album
		}

			else{ // English Songs
			var Index = str.indexOf('-');
			var _artist = str[0].trim();
			var _title = str[1].trim();
			getLyrics( _artist, _title , '');   // getDataFromMusicBrainz_forYoutube(title2,album2,artist);
			
			}
			
			
		}
	
}



function changeToDominantColor(srcImg){


if(srcImg){
	
var img = new Image();

img.onload=function(){

	var canvas=document.createElement('canvas');
	canvas.height=img.height;
	canvas.width=img.width;
	var ctx=canvas.getContext('2d');
	
	ctx.drawImage(img,0,0);

	if(canvas.height && canvas.width){
		var imgPixels = ctx.getImageData(0,0,canvas.width,canvas.height);
		var r=0,g=0,b=0,count=0;
		var px_data= imgPixels.data;

  		for(var i = 0; i<px_data.length - 40; i=i+4*10){  
           count++;
           r =  r + px_data[i];
           g =  g + px_data[i + 1];
           b =  b + px_data[i + 2];  
        }  


		r=Math.floor(r/count);
		g=Math.floor(g/count);
		b=Math.floor(b/count);

		document.getElementById('header-wrap').style.backgroundColor =  'rgb(' + r + ',' + g + ',' + b + ')';
		$('.container').css('border-color','rgb(' + r + ',' + g + ',' + b + ')');
	
		}
	};

 	img.src =srcImg;


	}

}


function spinner(opt){

	switch(opt) {

		case 'show':
        $('.spinner_container').fadeIn(250);

        break;

    	case 'hide':
         $('.spinner_container').fadeOut(250);

        break;


    default:
        $('.spinner_container').hide();

	}

}


function focusWindow(){
	changeToDominantColor($('#imgart').attr('src'));
	chrome.extension.getBackgroundPage().focusWindow();
}

function noName(){
		spinner('hide');
		$('.popup').prepend('<b class="err" > Cannot Get Song Title... </b></br>');
		setHeader('---','---');
		$('#test').show( 400,'swing'); //openPopup() //
}

