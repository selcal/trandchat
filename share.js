var socket = io();

function shareTwitch()
{
	$("#shareMenu").empty();
	$("#shareMenu").css("backgroundImage","url('logo/twitchShare.png')");
	$("#shareMenu").css("backgroundSize","cover");
	$("#shareMenu").fadeIn("slow");
	$("#shareMenu").append('<p id="shareText">Paste the URL of the stream you want to post.</p>');
	$("#shareMenu").append('<form id="url" action=""><input id="u" autocomplete="off" autofocus maxlength = "256"/><input type="submit" style="visibility:hidden"/></form>');
	
	$('#url').submit(function(e)
	{
		e.preventDefault();
		socket.emit('shareGUI', '<iframe src="'+$("#u").val()+'/embed" frameborder="0" scrolling="no"></iframe>','twitch',' posted a twitch stream:');
		$("#u").val('');
		$("#share").hide("fast");
		$("#shareMenu").empty();
		return false;	
	});
}
function shareTumblr()
{
	$("#shareMenu").empty();
	$("#shareMenu").css("backgroundImage","url('logo/tumblrShare.png')");
	$("#shareMenu").css("backgroundSize","cover");
	$("#shareMenu").fadeIn("slow");
	$("#shareMenu").append('<p id="shareText">Paste the URL of whatever it is you\'d like to post.</p>');
	$("#shareMenu").append('<form id="url" action=""><input id="u" autocomplete="off" autofocus maxlength = "256"/><input type="submit" style="visibility:hidden"/></form>');
	
	$('#url').submit(function(e)
	{
		e.preventDefault();
		socket.emit('shareGUI', '<iframe src="'+$("#u").val()+'"></iframe>','tumblr',' posted something from tumblr:');
		$("#u").val('');
		$("#share").hide("fast");
		$("#shareMenu").empty();
		return false;	
	});
}
function shareYoutube()
{
	$("#shareMenu").empty();
	$("#shareMenu").css("backgroundImage","url('logo/youtubeShare.png')");
	$("#shareMenu").css("backgroundSize","cover");
	$("#shareMenu").fadeIn("slow");
	$("#shareMenu").append('<p id="shareText">Paste the URL of the video you want to post.</p>');
	$("#shareMenu").append('<form id="url" action=""><input id="u" autocomplete="off" autofocus maxlength = "256"/><input type="submit" style="visibility:hidden"/></form>');
	
	$('#url').submit(function(e)
	{
		e.preventDefault();
		var id = $("#u").val().slice(-11,$("#u").val().length);
		socket.emit('shareGUI','<iframe src="http://www.youtube.com/embed/'+id+'"></iframe>','youtube', ' posted a youtube video:');
		$("#u").val('');
		$("#share").hide("fast");
		$("#shareMenu").empty();
		return false;	
	});
}
function shareReddit()
{
	$("#shareMenu").empty();
	$("#shareMenu").css("backgroundImage","url('logo/redditShare.png')");
	$("#shareMenu").css("backgroundSize","cover");
	$("#shareMenu").fadeIn("slow");
	$("#shareMenu").append('<p id="shareText">Paste the URL of the comment you want to post.</p>');
	$("#shareMenu").append('<form id="url" action=""><input id="u" autocomplete="off" autofocus maxlength = "256"/><input type="submit" style="visibility:hidden"/></form>');
	
	$('#url').submit(function(e)
	{		
		e.preventDefault();
		socket.emit('shareGUI',"<script src='//redditjs.com/subreddit.js' data-url='"+$("#u").val()+"' data-height='480' data-width='320' data-post-finder='mostComments' data-theme='dark'></script>",'kek', ' shared a post from reddit:');
		$("#u").val('');
		$("#share").hide("fast");
		$("#shareMenu").empty();
		return false;	
	});
}

