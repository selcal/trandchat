var version = "0.9.0"; //version no.
var numberOfBanners = 5; //how many gif banners do you want to see
//9 by default
var UIClose='<b title="Remove this message" class="chatUIClose" onclick="deletePost(this.parentNode);">x</b>';
var UIQuote='<b title="Quote this message" class="chatUIQuote" onclick="quotePost(this.parentNode);">"</b>';
var UIMax ='<b title="Open this message in Split View (recommended for youtube and twitch streams)" class="chatUIMax" onclick="maxPost(this.parentNode);">|</b>';
var windowSplitted; //what is the element that is splited?
var windowSplittedSize;//splitted element last size.
var splitView = false; //when the user clicks UImax
//Options:
var audioMute = false; // is tr&chat's audio muted?
var autoScroll = true;

//Sound Effects:
var userLeftSFX = "leave.ogg";//a user left.
var userJoinSFX = "beep.ogg";//a user joined.
var messageGetSFX = "msg.ogg";//a message was received.

//Cores:
var userName = "Anonymous"; //by default
	
	function endSplit()
	{
		windowSplitted = null;
		splitView = false;
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
		if(parentPost === windowSplitted)
		{
			//if this is the window that was splitted, then allow chatContainer to resize
			$('#chatContainer').animate({width: "100%"}, 250, function() {endSplit()});
		}
	}
	
	function quotePost(parentPost)
	{
		socket.emit('quote',parentPost.lastChild.innerHTML,parentPost.firstChild.innerHTML);
	}
	
	function maxPost(parentPost)
	{
			//STOP SPLIT
		if(parentPost === windowSplitted)
		{
			$('#chatContainer').animate({width: "100%"}, 350, function() {endSplit()});
			$(parentPost).css("position","relative");
			$(parentPost).css("zIndex","inherit");
			$(parentPost).css("marginBottom","32px");
			$(parentPost).css("width","80%");
			$(parentPost).css("height",windowSplittedSize);
			$(parentPost).animate({marginLeft: "2%"},150);
		}
		if(splitView === true)
		{
			return;
		}
		else //START SPLIT
		{
			splitView = true;
			$(parentPost).animate({marginLeft: "200%"},100); //hide
			windowSplittedSize = $(parentPost).height();
			$(parentPost).css("position","fixed");
			$(parentPost).css("top","24px");
			$(parentPost).css("height","95vh");
			$(parentPost).css("width","50%");
			$('#chatContainer').animate({width: "50%"},100);
			$(parentPost).animate({marginLeft: "50%"}, 250);
			windowSplitted = parentPost; //grab element for comparision later down the line
		}
	}
	
$(document).ready(function()
{		
		var audioChannelREF = document.getElementById("audioChannel");
		//Set up, Hide UI elements.
		$('#title').hide();
		$('#openShare').hide();
		$('#smiles').hide();
		$('#chatBar').hide();
		$('#options').hide();
		$('#share').hide();
		$('#usersOnline').hide();
		$('#smileContainer').hide();
		$("#shareMenu").hide();

		//rng determine banner on login
		$('#login').css("background-image","url(banner/banner"+Math.floor((Math.random() * numberOfBanners) + 1)+".gif)");

		//CORES:
		var socket = io();
			
		//LOGIN:
		$('#login').submit(function()
		{
		//request the server to join with your username::
		socket.emit('join',$("#loginForm").val());
		userName = $("#loginForm").val().replace(/<(.*?)>/g,'.');
		$('#login').fadeOut();
		
		$('#title').show();
		$('#chatBar').show();
		$('#openShare').show();
		$('#smiles').show();
		setTimeout("$('#login').remove();",500); //remove the login screen to save memory after 500 mseconds after logging in
		return false;
		});
		
		$('#chatBar').submit(function(msg,us) //submit a message
		{	
			if($('#m').val() === '/at')
			{
				autoScroll = !autoScroll;
				$('#m').val('');
				return false;
			}
			if($('#m').val() === '/clear' || $('#m').val() === '/c')
			{
				$('#chatContainer').empty(); //clear on client side....
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
		
		document.querySelector('#optionsButton').onclick = function()
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
		
		socket.on('announcement',function(msg)//something happened
		{
			$("#chatContainer").append('<h3>'+msg+'<b style="float:right;margin-right:10px;"onclick="deletePost(this.parentNode)">x</b></h3>');
		});
		
		socket.on('audioCue',function(cue)
		{
			if(!audioMute)
			{	
				if(cue === 'message' && document.hidden)
				{
					audioChannelREF.src = messageGetSFX;	
					audioChannelREF.play();
				}
				else
				if(cue === 'left')
				{
					audioChannelREF.src = userLeftSFX;	
					audioChannelREF.play();
				}
				else
				if(cue === 'join')
				{
					audioChannelREF.src = userJoinSFX;	
					audioChannelREF.play();	
				}
			}
		});
		
		socket.on('chatOUT', function(msg,us,type)
		{
			if(type === 'quote')
			{
				$("#chatContainer").append('<div class="chat"><b id="userName">'+us+'</b>'+UIClose+'<div class="quote"><p id="message">'+msg+'</p></div><p>Quoted at '+new Date().toUTCString()+'</p></div>');	
			}
			else
			{
				//refactor this :(
				$("#chatContainer").append('<div class="chat"><b id="userName">'+us+'&nbsp;&nbsp;<i>'+new Date().toUTCString()+'</i></b>'+UIClose+UIQuote+UIMax+'<p id="message">'+msg+'</p></div>');
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
		$('#usersOnline').append('<p>Users online:</p>');
			
			for(var i=0;i<users.length;i++)
			{
				$('#usersOnline').append('<p>'+users[i]+'</p>');
			}
		});
});
