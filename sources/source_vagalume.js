function showLetra (data,art,mus,arrayid) {
			console.log('show');
			if (! arrayid) arrayid = 0;
			if (data.type == 'exact' || data.type == 'aprox') {
				console.log('exact');
				data.mus[arrayid].text = data.mus[arrayid].text.replace(/\r\n|\n|\r/gm, '<br />');
				
				lyrics= data.mus[arrayid].text;
				focusWindow();
				document.getElementById('main').innerHTML=lyrics + '</p> Source <a href="'
								+ data.mus[arrayid].url + '" target="_blank"> Vagalume.com </a>';
						$('.scrollbar').perfectScrollbar('update');;

				// Show buttons to open original and portuguese translation
				if (data.mus[arrayid].translate) {
					$('#letra .text').prepend('<input type=button value="Portuguese &raquo;" onClick="$(document).trigger(\'translate\')"><br/>');
					$(document).one('translate',function() {
						$('#letra .text').text(data.mus[arrayid].translate[0].text);
						$('#letra .text').prepend('<input type=button value="&laquo; Original" onClick="$(document).trigger(\'original\')"><br/>');
						$(document).one('original',function() {
							showLetra(data,art,mus,arrayid);
						});
					});
				}
				// If not exact match (ex: U2 / Beautiful)
				if (data.type == 'aprox' && !$('#aprox').is('div')) {
						console.log('app');
					document.getElementById('main').prepend('<div id=aprox>We found something similar<br/><span class=songname>"' + data.mus[arrayid].name + '"</span></div>');
					// If Vagalume found more than one possible matches
					if (data.mus.length > 0) {
						var html = '<select class=songselect>';
						for (var i = 0; i < data.mus.length; i++) {
							html += '<option value="'+i+'"'+(i==arrayid?' selected':'')+'>'+data.mus[i].name+'</option>';
						}
						html += '</select>';
						$('#aprox span.songname').html(html);
						$('#aprox select.songselect').change(function() {
							var aID = $('option:selected',this).val();
							showLetra (data,art,mus,aID);
						});
					}
				}
			} else {
				console.log('notfound');
				// Song not found, but artist was found
				// You can list all songs from Vagalume here
				document.getElementById('main').innerHTML =
					'Sorry.. :( </br> <b>Lyrics not found...</b>' + '</br></br> <b>You May Try To:</b></br> <ul>\
		  					<li>(<a target="_blank" href="https://www.google.com/search?q='+ art+ ' '+ mus+ ' lyrics">Search Google</a>).</li>\
		  					<br>'+ 
							'<li>Contribute by adding lyrics at ' + '<a href="'+ 'http://lyrics.wikia.com/'+art+':'+mus+'?action=edit' + '" target="_blank">LyricWiki</a>. </li></ul>';
				
			} 
		}


		function fetchLetra (art,mus) {
			
			spinner('hide');
			var data = jQuery.data(document,art + mus); // cache read
			if (data) {
				showLetra(data, art, mus);
				return true;
			}
			var url = "http://api.vagalume.com.br/search.php"
				+"?art="+encodeURIComponent(art)
				+"&mus="+encodeURIComponent(mus);
			// Check if browser supports CORS - http://www.w3.org/TR/cors/
			jQuery.getJSON(url,function(data) {
				// What we do with the data
				jQuery.data(document,art + mus,data); // cache write
				
				showLetra(data, art, mus);
			});
		}