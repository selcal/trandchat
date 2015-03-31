//User defined customization variables! 
//Use these to add your own personal flair to the back-end.

var version = "tr&chat alpha 0.7.9"; //version no.
var numberOfBanners = 28; //how many gif banners do you have in ./banner?
//Remember, it goes from banner1.gif to banner(numberOfBanners).gif.

//Options:
var audioMute = false; // is tr&chat's audio muted?
var memeMute = false; //is the user not fun?
var autoScroll = true;

//Cores:
var chatUIString = '<b id="chatUI"onclick="deletePost(this.parent)"></b><b id="chatUI"onclick="this.parentNode.remove();">x</b>'
var userName = "Anonymous";
	
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
		$(parentPost).animate({marginLeft: "250%"}, 250, function() {parentPost.remove()});
	}
	
	function quotePost(parentPost)
	{
		socket.emit('quote',parentPost.lastChild.innerHTML,parentPost.firstChild.innerHTML);
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
			
		//LOGIN:
		$('#login').submit(function()
		{
			userName = $('#loginForm').val();
			userName = userName.replace(/<(.*?)>/g,' ');
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
				$('#chatContainer').empty(); //clear
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
		
		// SOCKET EVENTS:
		
		socket.on('announcement',function(msg)
		{
			$("#chatContainer").append('<h3>'+msg+'<b style="float:right;margin-right:10px;"onclick="deletePost(this.parentNode)">x</b></h3>');
		});
		
		socket.on('chatOUT', function(msg,us,type)
		{
			if(document.hidden === true && audioMute === false)
			{
				document.getElementById('audioChannel').src = 'msg.ogg';
				document.getElementById('audioChannel').play();
			}
			if(type === 'quote')
			{
				$("#chatContainer").append('<div class="chat"><b id="userName">'+us+'</b><b id="chatUI" onclick="deletePost(this.parentNode);">x</b><div class="quote"><p id="message">'+msg+'</p></div></div>');	
			}
			else
			{//sorry for this long ass line, I know it must be painful.	
			$("#chatContainer").append('<div class="chat"><b id="userName">'+us+'</b><b id="chatUI" onclick="deletePost(this.parentNode);">x</b><b id="chatUI" onclick="quotePost(this.parentNode);">"</b><p id="message">'+msg+'</p></div>');
			}	
				if(autoScroll === true)
				{
				$("html, body").animate({ scrollTop: $(document).height() }, 0.2);
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

	
