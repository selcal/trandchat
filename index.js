var portGiven = process.env.PORT;

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var express = require('express');

//User Storage::

var users = [];
var usersNum = 0;

//Node::
	 
app.get('/', function(req, res)
{
  res.sendFile(__dirname + '/home.html');
  app.use("/", express.static(__dirname));
  app.use("/", express.static("emote"));
  app.use("/", express.static("movie"));
  app.use("/", express.static("logo"));
});

//Connect::Node::HTTP::
http.listen(portGiven,function(){
	console.log("ayy lmao");
	console.log("PORT:"+portGiven+" !");
});

//SocketIOEvents::

io.on('connection', function(socket)
{
  
  socket.on('chatIN', function(msg,us)
  {
	   //clean up/scrape and process input.
	   msg = command(msg,us);
	   //todo:change this to a for loop with i's max as length of message
	   //and see if the ' ' characters occurences === length of message
	   
	   if(msg === '' || msg === ' ')
	   {
		   //breakSpam
	   } 
	   else
	   {
	   io.emit('chatOUT', msg, us);
       }
  });

	socket.on('quote',function(getPost,us,type)
	{
		var postingus = us;
		us = socket.username;
		io.emit('chatOUT', getPost, us + '&nbsp;&nbsp;&nbsp;>' +postingus+' said...', 'quote');
	});
	
	socket.on('shareGUI',function(getInput,us,options)
	{		
		//sendouttochat, with HTML from share, and username shared blah
		 io.emit('chatOUT', getInput, socket.username+options); 
	});
	
//User Organization::
					 
	//NOTE (032715 selcal) normal socket.connect is NOT used in 
	//this case because the user 
	//actually 'connects' to the chat once they choose a name.
	
	socket.on('join',function(us)
	{
		socket.username = us;
		users.push(socket.username);
		++usersNum;
		io.emit('announcement',socket.username+' joined the chat.');
	});
	socket.on('disconnect',function()
	{
		if(socket.username !== undefined)
		{
		io.emit('announcement',socket.username+' left the chat.');
		var a = users.indexOf(socket.username);
		users.splice(a,1);
		--usersNum;
		}
	});
	socket.on('getUsersFromServer',function()
	{
		io.emit('returnUsersFromServer', users);
	});
	
});

//non core, save your eyes from the pain pls:

function command(msg,us)
{
	msg = msg.replace(/</g, '&lt;');
	
	msg = msg.replace(/:snoop:/g, '<img src="/emote/snoop.png">');
	msg = msg.replace(/:ok:/g, '<img src="/emote/ok.gif">');
	msg = msg.replace(/:he:/g, '<img src="/emote/HE.png">');
	msg = msg.replace(/Kappa/g, '<img src="/emote/Kappa.png">');
	msg = msg.replace(/:kfc:/g, '<img src="/emote/kfc.png">');
	msg = msg.replace(/:gasm:/g, '<img src="/emote/gasm.png">');
	msg = msg.replace(/:maniaczzz:/g, '<img src="/emote/maniacSleeper.png">');
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
	//slice needed section
	//remove HTML
	
	if(msg.substring(0,4) === '/pic' || msg.substring(0,4) === '/img')
	{
		var url = msg.substring(4,msg.length);
		return('<img id="imgShare" src='+url+'>');
	}
	if(msg.substring(0,4) === '/web' || msg.substring(0,4) === '/www')
	{
		var url = msg.substring(4,msg.length);
		return('<iframe sandbox="allow-forms allow-scripts" src='+url+'>');
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
return ('↳ rolled ' + roll() + '!');





	    case 'nice':
	    case 'noice':		
return ('<p>'+msg+'</p>'+'<video src="/movie/nice.mp4" height="320" width="480" autoplay onended="this.remove()"></video>');
		case 'wow':
return ('<p>'+msg+'</p>'+'<video src="/movie/wow.mp4" height="320" width="480" autoplay onended="this.remove()"></video>');
		case 'MOTHER 3':
		case 'mother 3':
		case 'earthbound':
		case 'MOTHER':
return ('<video src="/movie/bestgame.mp4" height="320" width="100%"></video>' + msg);
		case '/polska':
		case '/sciernisko':
		case 'kurwa':
return (msg+'GLUPI MURZYN!!! POLSKA JEST SUPER!<img src="/cancer/polishFlag.jpg"><audio src="/music/POLSKA.mp3" autoplay onended="this.remove()">');
		case 'cheekibreeki':
		case 'RU':
		case 'CHEEKI BREEKI':
		case 'CHEEKIBREEKI':
return ('<p>'+msg+'</p><img id="CHEEKI" src="/cancer/VDAMKE.png" style="left:0;"> <audio src="/music/ru.mp3" autoplay onended="this.remove(); document.getElementById("CHEEKI").remove();">')
		default:
return (msg);
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
	 io.emit('chatOUT','<br><video src="dubs.mp4" width:100% height:422px autoplay></video><br><p>V V V V V V</p>','Patrick Bateman likes those dubs.');
	 break;
	 case 3:
	 io.emit('chatOUT','<br><audio src="trips.mp3" width:100% height:422px autoplay></audio><br><p>V V V V V V</p>','OH BABY A TRIPLE');
	 break;
	  case 4:
	  io.emit('chatOUT','<br><video src="quads.mp4" width:100% height:422px autoplay></video><br><p>V V V V V V</p>','<img src="q.gif"><img src="u.gif"><img src="a.gif"><img src="d.gif"><img src="s.gif">');
	 break;
	  case 5:
	 io.emit('chatOUT', '<br><video src="quints.webm" width:100% height:422px autoplay></video><br><p>OH LAWD QUINTS</p>','<img src="q.gif"><img src="u.gif"><img src="i.gif"><img src="n.gif"><img src="t.gif"><img src="s.gif">');
	 break;
	  case 6:
	  io.emit('chatOUT', '<br><video src="hexes.mp4" width:100% height:422px autoplay></video><br><p style="color:red;font-size:24px;">OIUSAHOUIFEHOFNEFOUFNEOUFEHFLJH<img src="banner17.gif"></p>','<img src="h.gif"><img src="e.gif"><img src="x.gif"><img src="e.gif"><img src="s.gif">');
	 break;
	  case 7:
	 io.emit('chatOUT', '<video src="septa.mp4" autoplay>');
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


