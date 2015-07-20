
var portGiven = process.env.PORT;

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var express = require('express');

//User Storage::

var users = [];
var usersNum = 0;

//Core::
var lastmsg = '<';//the last message that was typed. 

//Node::
	 
app.get('/', function(req, res)
{
  res.sendFile(__dirname + '/home.html');
  app.use("/", express.static(__dirname));
  app.use("/", express.static("emote"));
  app.use("/", express.static("logo"));
});

//Connect::Node::HTTP::
http.listen(portGiven,function()
{
	console.log("PORT:"+portGiven+"!");
});

//SocketIOEvents::

io.on('connection', function(socket)
{ 
  socket.on('chatIN', function(msg,us)
  {
	   msg = msg.replace(/<(.*?)>/g,''); //remove any html injection opportunities
	   
	   if(msg === '' || msg === ' ' || msg === lastmsg)
	   {
			return;
	   }
	   else
	   {
	   lastmsg = msg;
	   setTimeout(function(){ lastmsg = null; },1000);
	   
	   msg = emoteScrub(msg);//scrub for emotes
	   msg = command(msg,us);//scrub for command syntax and check for any mute triggers
	   
	   io.emit('chatOUT', msg, us);
	   io.emit('audioCue','message');
	   }
  });

	socket.on('quote',function(getPost,us,type)
	{
		var postingus = us;
		us = socket.username;
		io.emit('chatOUT', getPost, us + '&nbsp;&nbsp;&nbsp;>' +postingus, 'quote');
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
		us = us.replace(/<(.*?)>/g,'');
		
		if(us === '' || us === ' ' || us === null)
		{
			us = 'Anonymous';			//Set to anon if n/a
		}
		
		socket.username = us;
		users.push(socket.username);
		++usersNum;
		io.emit('announcement',socket.username+' joined the chat.');
		io.emit('audioCue', 'join');
	});
	socket.on('disconnect',function()
	{
		if(socket.username !== undefined)
		{
		io.emit('announcement',socket.username+' left the chat.');
		io.emit('audioCue', 'left');
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
//TODO: Refactor emoticons to use the actual filename of the picture
//instead of this atrocity:

function command(msg,us,type)
{
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
	return msg;
	// slice end section
}

function emoteScrub(msg)
{	
	//TODO: Refactor completely, perhaps set these into array?
	msg = msg.replace(/:snoop:/g, '<img src="/emote/snoop.png">');
	msg = msg.replace(/:ok:/g, '<img src="/emote/ok.gif">');
	msg = msg.replace(/:he:/g, '<img src="/emote/HE.png">');
	msg = msg.replace(/Kappa/g, '<img src="/emote/Kappa.png">');
	msg = msg.replace(/:smirk:/g, '<img src="/emote/smirk.png">');
	msg = msg.replace(/:yee:/g, '<img src="/emote/yee.png">');
	msg = msg.replace(/:frog:/g, '<img src="/emote/frog.gif">');
	msg = msg.replace(/:wow:/g, '<img src="/emote/wow.png">');
	msg = msg.replace(/:srs:/g, '<img src="/emote/srs.png">');
	msg = msg.replace(/:wiz:/g, '<img src="/emote/wiz.png">');
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
	return msg;
}
function rngesus(min,max)
{
	return Math.floor(Math.random() * (max - min + 1)) + min;
}


