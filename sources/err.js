
		function showErr (art,mus) {
			
				openPopup();
				
				if(art === undefined) art = '' ;
				document.getElementById('artist').value=art;
   				document.getElementById('title').value=mus;
				$('.popup').append(
					'<div class="err" id= "popupdiv" style="text-align: center;"></br></br></br></br><b>You May Try:</b></br><ul>'+
		  					'<li>(<a target="_blank" href="https://www.google.com/search?q='+ art+ ' '+ mus+ ' lyrics">Search Google</a>).</li><br>'+ 
							'<li>Contribute by adding lyrics at ' + '<a href="'+ 'http://lyrics.wikia.com/'+art+':'+mus+'?action=edit' + '" target="_blank">LyricWiki</a>. </li></ul></div> ');
				

		}