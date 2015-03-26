var version = "tr&chat alpha 0.70";
/*
 * Client-side JS.
 * */

var connection = new RTCMultiConnection('trautism');
	var audioMute = false; // is tr&chat's audio muted?
	var funMute = false; //is the user not fun?
	function loadHistory()
	{
		alert('stub@loadHistory(); >> ~~Line 48');
	}
	function addEmote(inp)
	{
		$('#m').val(function(n,c)
	{
		return c + inp;
	});
	}
	
$(document).ready(function()
{		
		//Customization!!
		var numberOfBanners = 25; //how many banners do you have in ./banner? Remember, start from banner1.gif.
		
		//generate rng to determine banner on login
		$('#login').css("background-image","url(banner/banner"+Math.floor((Math.random() * numberOfBanners) + 1)+".gif)");
		
		//Set up, Hide UI elements.
		
		$('#options').hide();
		$('#title').hide();
		$('#chatBar').hide();
		$('#call').hide();
		$('#usersOnline').hide();
		$('#smileContainer').hide();
		
		//CORES:
		var socket = io();
		var userName = "Anonymous";
		var historyRequested = false;
		
		var IN = false; // Call div toggle
		
		$('#login').submit(function()
		{
			userName = $('#loginForm').val();
			userName = userName.replace(/<(.*?)>/g,' ');
			connection.userid = userName;
			//noscriptattacks:pleb edition
		
		if(userName === '' || userName === ' ' || userName === null)
		{
			//Set to anon if n/a
			userName = 'Anonymous';
		}
		
		//join with your username.
		socket.emit('join',userName);
		$('#login').fadeOut();
		$('#title').show();
		$('#chatBar').show();
		return false;
		});
		
		$('#chatBar').submit(function(msg,us)
		{
			//clientside commands:
			if($('#m').val() === '/clear' || $('#m').val() === '/c')
			{
				$('#chat').empty();
			}	
			else
			{
				socket.emit('chatIN', $('#m').val(),userName);
			}		
	
			$('#m').val('');
			$("html, body").animate({ scrollTop: $(document).height() }, "fast");
			return false;
		});
		
		//GUI AND EVENT FIRING: 
		
		$("#cog").click(function(){$("#options").slideToggle("fast");});
		
		document.querySelector('#phone').onclick = function() 
		{
			if(IN)
			{
				connection.disconnect('trautism');
			}
			else
			{
				connection.connect('trautism');
			}
			$("#call").slideToggle("fast");
		};
		
		document.querySelector('#smiles').onclick = function()
		{
			$("#smileContainer").fadeToggle();
		};
		
		document.querySelector('#whoson').onclick = function()
		{
			$("#usersOnline").slideToggle("fast");
			socket.emit('getUsersFromServer');
		};
		
		//VIDEO CALLING AND AUDIO CALLING: 
		connection.direction = 'many-to-many';
		connection.session =
		{
			audio:true,
			video:true,
			data: true
		};
		connection.bandwidth =
		{
			audio:128,
			video:256
		};
		connection.onmute = function(e) 
		{
		e.mediaElement.setAttribute('poster', 'talk.jpg');
		};
		connection.on
		connection.userid = userName;
		
		//END OPTIONS AND SETTINGS:
		
		
		//
		//
		//
		//Every stream that comes in, gets appended to the div.
		connection.onstream = function(e) 
		{
			$("#call").append(e.mediaElement);			
			e.mediaElement.play();
		};

		connection.onstreamended = function(e)
		{
			e.mediaElement.parentNode.removeChild(e.mediaElement);
		};
		
		
		// SOCKET EVENTS:
		socket.on('announcement',function(msg)
		{
			$("#chat").append('<h3>'+msg+'</h3>');
		});
		
		socket.on('chatOUT', function(msg,us)
		{
			if(document.hidden === true && audioMute === false)
			{
				document.getElementById('audioChannel').src = 'msg.ogg';
				document.getElementById('audioChannel').play();
			}
			$('#chat').append('<li><b id="userName">'+us+'</b>'+msg+'</li>');
		});
		
		socket.on('returnUsersFromServer',function(users)
		{
		$('#usersOnline').empty();
		$('#usersOnline').append('<b>whos online?</b>'); 


		//empty old data, insert new data from server directly.
		for(i=0;i<users.length;i++)
		{
		$('#usersOnline').append('<p>'+users[i]+'</p>');
		}
		});
		
		//GET
		socket.on('GET2', function()
		{
			$('#chat').append($('<video src="dubs.mp4" height="320px" width="480px" autoplay></video>'));
			$('#chat').append($('<li><img src="d.gif" width="64px" height="64px"><img src="u.gif" width="64px" height="64px"><img src="b.gif" width="64px" height="64px"><img src="s.gif" width="64px" height="64px"></li>'));

		});
		socket.on('GET3', function()
		{
			$('#chat').append($('<audio src="trips.mp3" autoplay ></audio>'));
			$('#chat').append($('<li><img src="t.gif" width="64px" height="64px"><img src="r.gif" width="64px" height="64px"><img src="i.gif" width="64px" height="64px"><img src="p.gif" width="64px" height="64px"><img src="s.gif" width="64px" height="64px"></li>'));
		});
		socket.on('GET4', function()
		{
			$('#chat').append($('<video src="quads.mp4" height="320" width="480" autoplay onended="this.destroy()"></video>'));
			$('#chat').append($('<img src="q.gif" width="64px" height="64px"><img src="u.gif" width="64px" height="64px"><img src="a.gif" width="64px" height="64px"><img src="d.gif" width="64px" height="64px"><img src="s.gif" width="64px" height="64px">'));
		});
		socket.on('GET5', function()
		{
			$('#chat').append($('<video src="quints.mp4" height="320" width="480" autoplay onended="this.destroy()"></video>'));
			$('#chat').append($('<img src="q.gif" width="64px" height="64px"><img src="u.gif" width="64px" height="64px"><img src="i.gif" width="64px" height="64px"><img src="n.gif" width="64px" height="64px"><img src="t.gif" width="64px" height="64px"><img src="s.gif" width="64px" height="64px">'));
		});
		socket.on('GET420', function(video)
		{
			$('#chat').append($('<video src="'+video+'" height="420" width="420" autoplay onended="this.destroy()"></video>'));
			$('#chat').append($('<img src="snoop.png" width="420" height="420"> <li color="green">Inhale combusted cannabis material on a daily basis!</li>'));
		});
});

	
