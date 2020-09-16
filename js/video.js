var video_array=document.getElementsByClassName('video_sec');
console.log(video_array.length+' video(s) on this page.');
for(var i=0;i<video_array.length;i++)
{
	video_array[i].getElementsByTagName('video')[0].addEventListener("pause",video_onpause);
	video_array[i].getElementsByTagName('video')[0].addEventListener("play",video_onplay);
	var video_ele_source=video_array[i].getElementsByClassName('video_source');
	for(var j=0;j<video_ele_source.length;j++)
	{
		video_ele_source[j].addEventListener("change",video_change_source);
	}
	var video_ele_playback=video_array[i].getElementsByClassName('video_playback');
	for(var j=0;j<video_ele_playback.length;j++)
	{
		video_ele_playback[j].addEventListener("change",video_change_playback_speed);
	}
}

function video_onpause()
{
	if(typeof video_onmousemove_check!="undefined")
	{
		clearTimeout(video_onmousemove_check);
	}
	this.parentNode.removeEventListener("mousemove",video_onmousemove);
	for(var i=0;i<this.parentNode.getElementsByClassName('video_custom_controls').length;i++)
	{
		this.parentNode.getElementsByClassName('video_custom_controls')[i].removeEventListener("mouseover",video_onmouseover);
		this.parentNode.getElementsByClassName('video_custom_controls')[i].removeEventListener("mouseout",video_onmouseout);
	}
	video_show_controls(this.parentNode);
	return;
}

function video_onplay()
{
	video_hide_controls(this.parentNode);
	var video_onmousemove_check;
	this.parentNode.addEventListener("mousemove",video_onmousemove);
	for(var i=0;i<this.parentNode.getElementsByClassName('video_custom_controls').length;i++)
	{
		this.parentNode.getElementsByClassName('video_custom_controls')[i].addEventListener("mouseover",video_onmouseover);
		this.parentNode.getElementsByClassName('video_custom_controls')[i].addEventListener("mouseout",video_onmouseout);
	}
	return;
}
function video_onmousemove()
{
	if(this.getElementsByClassName('video_custom_controls')[0].style.visibility=="hidden")
	{
		video_show_controls(this);
		video_onmousemove_check=setTimeout(function(this2){video_hide_controls(this2);},1000,this);
	}
	else if(typeof video_onmousemove_check!="undefined")
	{
		clearTimeout(video_onmousemove_check);
		video_onmousemove_check=setTimeout(function(this2){video_hide_controls(this2);},1000,this);
	}
	return;
}
function video_onmouseover()
{
	this.parentNode.removeEventListener("mousemove",video_onmousemove);
	if(typeof video_onmousemove_check!="undefined")
	{
		clearTimeout(video_onmousemove_check);
	}
	video_show_controls(this.parentNode);
	return;
}
function video_onmouseout()
{
	this.parentNode.addEventListener("mousemove",video_onmousemove);
	video_hide_controls(this.parentNode);
	return;
}
function video_show_controls(video_all_obj)
{
	var video_custom_controls_array=video_all_obj.getElementsByClassName('video_custom_controls');
	for(var j=0;j<video_custom_controls_array.length;j++)
	{
		var obj=video_custom_controls_array[j];
		obj.style.visibility="visible";
	}
	return;
}
function video_hide_controls(video_all_obj)
{
	var video_custom_controls_array=video_all_obj.getElementsByClassName('video_custom_controls');
	for(var j=0;j<video_custom_controls_array.length;j++)
	{
		var obj=video_custom_controls_array[j];
		obj.style.visibility="hidden";
	}
	return;
}

function video_change_source()
{
	var video_action_mp4=this.parentNode.getElementsByTagName('video')[0],video_current_time=video_action_mp4.currentTime,video_play_status=video_action_mp4.paused;
	video_action_mp4.getElementsByTagName('source')[0].src=this.value;
	video_action_mp4.load();
	video_action_mp4.currentTime=video_current_time;
	video_action_mp4.playbackRate=parseFloat(this.parentNode.getElementsByClassName('video_playback')[0].value);
	if(video_play_status==false)
	{
		video_action_mp4.play();
	}
	return;
}
function video_change_playback_speed()
{
	this.parentNode.getElementsByTagName('video')[0].playbackRate=parseFloat(this.value);
	return;
}