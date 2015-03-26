var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var express = require('express');
//information variables:
var users = [];
var usersNum = 0;
//
var isCallOpen = false; // is there already an open() call?
var whoinited = ""; //who initiated the call in the first place?
//control variables:
				 
app.get('/', function(req, res){
  res.sendFile(__dirname + '/home.html');
  app.use("/", express.static(__dirname));
  app.use("/", express.static("emote"));
  app.use("/", express.static("movie"));
  
});

// EVENTS

io.on('connection', function(socket)
{
  
  socket.on('chatIN', function(msg,us)
  {
	   msg = command(msg,us);
	   //todo:change this to a for loop with i's max as length of message
	   //and see if the ' ' characters occurences === length of message
	   if(msg === '<li></li>' || msg === '<li> </li>')
	   {
		   //breakSpam
	   } 
	   else
	   {
	   io.emit('chatOUT', msg, us);
       }
	   console.log('==================================');
  });

	socket.on('typing', function(us)
	{
		io.emit('typing',us);
	});
	
	socket.on('join',function(us)
	{
		socket.username = us;
		users.push(us);
		++usersNum;
		io.emit('announcement',us+' joined the chat.');
	});
	
	socket.on('disconnect',function(socket)
	{
		io.emit('leave');
		var a = users.indexOf(socket.username);
		users.splice(a,1);
		--usersNum;
	});
	
	socket.on('getUsersFromServer',function()
	{
		console.log('Sent users to client on request: getUsersFromServer');
		io.emit('returnUsersFromServer', users);
	});
	
	//CALL CHECKING AND REQUESTS::
	
	socket.on('callCheck',function(us)
	{
	if(isCallOpen === false)
	{
	whoinited = us;
	}
	io.emit('callStatus',whoinited);
	});
	
	
	
});

  
http.listen(3000,function(){
	console.log("ayy lmao");
});

//non core, save your eyes from the pain pls:

function command(msg,us)
{
	//slice needed section
	//remove HTML
	msg = msg.replace(/<(.*?)>/g, "<li> I just tried to inject HTML! <i>God I love cock!</i></li>");
	//emoticons:
	msg = msg.replace(/:snoop:/g, '<img src="/emote/snoop.png">');
	msg = msg.replace(/Kappa/g, '<img src="/emote/Kappa.png">');
	msg = msg.replace(/:gasm:/g, '<img src="/emote/gasm.png">');
	msg = msg.replace(/:smirk:/g, '<img src="/emote/smirk.png">');
	msg = msg.replace(/:cheeki:/g, '<img src="/emote/cheekibreeki.png">');
	msg = msg.replace(/:yee:/g, '<img src="/emote/yee.png">');
	msg = msg.replace(/:sadmike:/g, '<img src="/emote/ixmike.png">');
	msg = msg.replace(/:axe:/g, '<img src="/emote/axe.png">');
	msg = msg.replace(/:pepe:/g, '<img src="/emote/pepe.png">');
	msg = msg.replace(/:feel:/g, '<img src="/emote/feel.png">');
	msg = msg.replace(/:frog:/g, '<img src="/emote/frog.gif">');
	msg = msg.replace(/:shrekayy:/g, '<img src="/emote/shrekayy.png">');
	msg = msg.replace(/:shrekohno:/g, '<img src="/emote/shrekohno.png">');
	msg = msg.replace(/:shreksmug:/g, '<img src="/emote/shreksmug.png">');
	msg = msg.replace(/:shrekyeah:/g, '<img src="/emote/shrekyeah.png">');
	msg = msg.replace(/:hot:/g, '<img src="/emote/hot.png">');
	msg = msg.replace(/:wow:/g, '<img src="/emote/wow.png">');
	msg = msg.replace(/:srs:/g, '<img src="/emote/srs.png">');
	msg = msg.replace(/:bush:/g, '<img src="/emote/bush.png">');
	msg = msg.replace(/:polska:/g, '<img src="/emote/polska.png">');
	msg = msg.replace(/:wiz:/g, '<img src="/emote/wiz.png">');
	msg = msg.replace(/:bushappa:/g, '<img src="/emote/bushappa.png">');
	//hidden emotes
	msg = msg.replace(/:denko:/g, '(´･ω･`)');
	msg = msg.replace(/:lenny:/g, '( ͡° ͜ʖ ͡°)');
	//dancing letters:
	msg = msg.replace(/:a:/g, '<img src="/emote/a.gif">');
	msg = msg.replace(/:b:/g, '<img src="/emote/b.gif">');
	msg = msg.replace(/:c:/g, '<img src="/emote/c.gif">');
	msg = msg.replace(/:d:/g, '<img src="/emote/d.gif">');
	msg = msg.replace(/:e:/g, '<img src="/emote/e.gif">');
	msg = msg.replace(/:f:/g, '<img src="/emote/f.gif">');
	msg = msg.replace(/:g:/g, '<img src="/emote/g.gif">');
	msg = msg.replace(/:h:/g, '<img src="/emote/h.gif">');
	msg = msg.replace(/:i:/g, '<img src="/emote/i.gif">');
	msg = msg.replace(/:j:/g, '<img src="/emote/j.gif">');
	msg = msg.replace(/:k:/g, '<img src="/emote/k.gif">');
	msg = msg.replace(/:l:/g, '<img src="/emote/l.gif">');
	msg = msg.replace(/:m:/g, '<img src="/emote/m.gif">');
	msg = msg.replace(/:n:/g, '<img src="/emote/n.gif">');
	msg = msg.replace(/:o:/g, '<img src="/emote/o.gif">');
	msg = msg.replace(/:p:/g, '<img src="/emote/p.gif">');
	msg = msg.replace(/:q:/g, '<img src="/emote/q.gif">');
	msg = msg.replace(/:r:/g, '<img src="/emote/r.gif">');
	msg = msg.replace(/:s:/g, '<img src="/emote/s.gif">');
	msg = msg.replace(/:t:/g, '<img src="/emote/t.gif">');
	msg = msg.replace(/:u:/g, '<img src="/emote/u.gif">');
	msg = msg.replace(/:v:/g, '<img src="/emote/v.gif">');
	msg = msg.replace(/:w:/g, '<img src="/emote/w.gif">');
	msg = msg.replace(/:x:/g, '<img src="/emote/x.gif">');
	msg = msg.replace(/:y:/g, '<img src="/emote/y.gif">');
	msg = msg.replace(/:z:/g, '<img src="/emote/z.gif">');
	
	if(msg.substring(0,4) === '/pic' || msg.substring(0,4) === '/img')
	{
		var url = msg.substring(4,msg.length);
		return('<img id="imgShare" src='+url+'>');
	}
	if(msg.substring(0,4) === '/web' || msg.substring(0,4) === '/www')
	{
		var url = msg.substring(4,msg.length);
		return('<iframe src='+url+'>');
	}
	if(msg.substring(0,3) === '/yt')
	{
		var id = msg.slice(-11,msg.length);
		return('<iframe src="http://www.youtube.com/embed/'+id+'"></iframe>');
	}
	// slice end section	
	switch(msg)
	{
		case '/roll':
		case '/rawl':
		case '/dubsGET':
		case '/tripsGET':
		case '/quadsGET':
		case '/quintsGET':
		case '/hexsGET':
		case '/heptaGET':
		case '/octaGET':
		case '/jimmyrollins':
		case '/rollan':
return ('<li>↳ rolled ' + roll() + '!</li>');
	    case 'nice':
	    case 'noice':		
return ('<li>'+msg+'</li><video src="/movie/nice.mp4" height="320" width="480" autoplay onended="this.remove()"></video>');
		case 'wow':
return ('<li>'+msg+'</li><video src="/movie/wow.mp4" height="320" width="480" autoplay onended="this.remove()"></video>');
		case 'MOTHER 3':
		case 'mother 3':
		case 'earthbound':
		case 'MOTHER':
return ('<video src="/movie/bestgame.mp4" height="320" width="480" autoplay></video>' + msg);
		case '/polska':
		case '/sciernisko':
		case 'kurwa':
return ('<li>GLUPI MURZYN!!! POLSKA JEST SUPER!</li><img src="/cancer/polishFlag.jpg"><audio src="/music/POLSKA.mp3" autoplay onended="this.remove()">');
		case 'cheekibreeki':
		case 'RU':
		case 'CHEEKI BREEKI':
		case 'CHEEKIBREEKI':
return ('<img id="CHEEKI" src="/cancer/VDAMKE.png" style="left:0;"> <audio src="/music/ru.mp3" autoplay onended="this.remove(); document.getElementById("CHEEKI").remove();">')
		default:
return ('<li>'+msg+'</li>');
	}
}
function rngesus(min,max)
{
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function roll()
{
	//may the quads gods bless this function ~<3 behold, the h  o  l  y  f u n c t i o n.
	
	var intGET = Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000;
	
	//calculate percentage of WIN and GET:
	var checkGET = intGET.toString();
	var lastDIGIT = checkGET.charAt(checkGET.length - 1);
	var counter = 0;
	for(i = checkGET.length - 1; i > 0; i--)
	{
		if(checkGET.charAt(i) === lastDIGIT)
		{
			counter++;
		}
		else
		{
			break;
		}
	}
	switch(counter)
	{
	 case 2:
	 io.emit('GET2');
	 break;
	  case 3:
	 io.emit('GET3');
	 break;
	  case 4:
	 io.emit('GET4');
	 break;
	  case 5:
	 io.emit('GET5');
	 break;
	  case 6:
	 io.emit('GET6');
	 break;
	  case 7:
	 io.emit('GET7');
	 break;
	  case 8:
	 io.emit('GET8');
	 break;
	}
	if(checkGET.substr(5,3) === '420')
	{
		var which = rngesus(1,2);
		var movie = "";
		if(which == 1)
		{
			movie = "/movie/4201.mp4";
		}
		else
		{
			movie = "/movie/4202.webm";
		}
		io.emit('GET420',movie);
	}
	return intGET;
}


