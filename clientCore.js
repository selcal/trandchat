//User defined customization variables! 
//Edit these at your leisure:

var version = "tr&chat alpha 0.7.7"; //version no.
var numberOfBanners = 27; //how many banners do you have in ./banner?
//Remember, it goes from banner1.gif to banner(numberOfBanners).gif

//Options:
var audioMute = false; // is tr&chat's audio muted?
var memeMute = false; //is the user not fun?
var autoScroll = true;
var userName = "Anonymous";
	

var connection = new RTCMultiConnection('trautism');
	
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
	function deletePost(parentPost)
	{
		 $(parentPost).animate({opacity: 0,marginLeft: "100%",}, 200, function() {parentPost.remove()});
	}
	
$(document).ready(function()
{		
			
		//Set up, Hide UI elements.
		$('#title').hide();
		$('#chatBar').hide();
		$('#options').hide();
		$('#share').hide();
		$('#call').hide();
		$('#usersOnline').hide();
		$('#smileContainer').hide();
		$("#shareMenu").hide();

		//generate rng to determine banner on login
		$('#login').css("background-image","url(banner/banner"+Math.floor((Math.random() * numberOfBanners) + 1)+".gif)");

		//CORES:
		var socket = io();
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
		setTimeout(500,"$('#login').remove();");
		return false;
		});
		
		$('#chatBar').submit(function(msg,us)
		{
			//clientside commands:
			if($('#m').val() === '/clear' || $('#m').val() === '/c')
			{
				$('#chatContainer').empty();
			}
			else
			{
				socket.emit('chatIN', $('#m').val(),userName);
			}		
	
			$('#m').val(''); //empty
			
			$("html, body").animate({ scrollTop: $(document).height() }, 0.1);
			return false;
		});
		//GUI AND EVENT FIRING: 
		
		document.querySelector('#cog').onclick = function()
		{
			$("#options").slideToggle("fast");
		};
		
		document.querySelector('#openShare').onclick = function()
		{
			$("#share").slideToggle("fast");
			$("#shareMenu").empty();
			$("#shareMenu").hide();
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
		
		//CHAT FUNCTIONS:
		function quote(post)
		{
			$("#chatContainer").append('<div class="chat"><b id="userName">'+userName.innerHTML+'</b><b id="chatUI" onclick="this.parentNode.remove();">x</b><div class="quote">'+post.innerHTML+'</div></div>');	
		}
		
		
		// SOCKET EVENTS:
		
		socket.on('announcement',function(msg)
		{
			$("#chatContainer").append('<h3>'+msg+'</h3>');
		});
		
		socket.on('chatOUT', function(msg,us)
		{
			if(document.hidden === true && audioMute === false)
			{
				document.getElementById('audioChannel').src = 'msg.ogg';
				document.getElementById('audioChannel').play();
			}
			//sorry for this long ass line
			
			$("#chatContainer").append('<div class="chat"><b id="userName">'+us+'</b><b id="chatUI" onclick="deletePost(this.parentNode);">x</b><p id="message">'+msg+'</p></div>');
				
				if(autoScroll === true)
				{
				$("html, body").animate({ scrollTop: $(document).height() }, "fast");
				}
		});
		
		socket.on('returnUsersFromServer',function(users)
		{
		$('#usersOnline').empty();
		//empty old data, insert new data from server directly.
		for(i=0;i<users.length;i++)
		{
		$('#usersOnline').append('<p>'+users[i]+'</p>');
		}
		});
});

	
