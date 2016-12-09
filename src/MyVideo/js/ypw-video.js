(function(){
	var ypwVideo = document.querySelector("#ypwVideo");
	function initVideo(){
	var v = '<div class="video-dashboard" id="videoDashBoard">'+
				'<div class="video-control" >'+
					'<div class="video-pause"><i class="ico ico-pause"></i></div>'+
					'<div class="video-progress">'+
						'<span class="current-time"></span>'+
						'<span class="duration"></span>'+
						'<div class="progress-load"></div>'+
						'<div class="progress-bar"><i class="ico ico-bar"></i></div>'+
						'<div class="progress-seek"></div>'+
					'</div>'+
				'</div>'+
			'</div>'+
			'<div class="video-loading" id="videoLoading"><i class="ico-loading"></i></div>'+
			'<div class="video-mask" id="videoMask"><i class="video-play"></i></div>';
	ypwVideo.insertAdjacentHTML("afterEnd",v);
//									<!--<div class="video-full"><i class="ico ico-fullscreen"></i></div>-->
				}
	initVideo();
	var videoLoading = document.querySelector("#videoLoading");
	var play = document.querySelector("#videoMask");
	var dashBoard = document.querySelector("#videoDashBoard");
	var pause = document.querySelector("#videoDashBoard .video-pause");
//	var full = document.querySelector("#videoDashBoard .video-full");
	var progress = document.querySelector("#videoDashBoard .video-progress");
	var progressLoad = document.querySelector("#videoDashBoard .progress-load");
	var progressBar = document.querySelector("#videoDashBoard .progress-bar");
	var progressSeek = document.querySelector("#videoDashBoard .progress-seek");
	var barDrag = false;
	var isfull = false;
				
	//监听时间更新
	ypwVideo.addEventListener("timeupdate",function(){
		var curTime = parseInt(this.currentTime);
		var duration = parseInt(this.duration);
		if(!isNaN(duration)){
			document.querySelector("#videoDashBoard .current-time").innerText = timeFormat(curTime);
			document.querySelector("#videoDashBoard .duration").innerText = timeFormat(duration);
		}
		var per = parseInt((curTime/duration)*100);
		progressBar.style.left = per + "%";
		progressLoad.style.width = per + "%";
		if (duration != 0 && curTime === duration) {
            // 播放结束
        }
	});
	
	//缓冲
	function bufferSeek(){
		var curBuffer = parseInt(ypwVideo.buffered.end(0));
		var duration = parseInt(ypwVideo.duration);
		var per = parseInt((curBuffer/duration)*100);
		progressSeek.style.width = per + "%";
		if(curBuffer < duration){
			setTimeout(bufferSeek,500);
		}
	}
	ypwVideo.addEventListener("loadedmetadata",function(){
		setTimeout(bufferSeek,500);
	});
	ypwVideo.addEventListener("waiting",function(){
		videoLoading.style.display = "block";
	});
	ypwVideo.addEventListener("playing",function(){
		videoLoading.style.display = "none";
	});
	//播放结束
	ypwVideo.addEventListener("ended",function(){
		play.style.display = "block";
		dashBoard.style.display = "none";
	});
	ypwVideo.addEventListener("click",function(){
		dashBoard.style.display = "block";
		setTimeout(function(){
			dashBoard.style.display = "none";
		},3000);
		return false;
	});
	//播放
	play.addEventListener("click",function(){
		if(ypwVideo.paused){
			ypwVideo.play();
			play.style.display = "none";
			dashBoard.style.display = "block";
			setTimeout(function(){
				dashBoard.style.display = "none";
			},3000);
		}
		if(ypwVideo.ended){
			ypwVideo.currentTime = 0;
			play.style.display = "none";
			dashBoard.style.display = "block";
		}
	});
	//暂停
	pause.addEventListener("click",function(){
		if(!ypwVideo.paused){
			ypwVideo.pause();
			play.style.display = "block";
			dashBoard.style.display = "none";
		}
	});
	//全屏与否
//				full.addEventListener("click",function() {
//					if(isfull){//退出全屏
//						isfull = false;
//						this.firstChild.classList.remove("ico-exitscreen");
//						this.firstChild.classList.add("ico-fullscreen");
//						
//						ypwVideo.parentNode.classList.remove("full-video");
//					}else{//打开全屏
//						isfull = true;
//						this.firstChild.classList.remove("ico-fullscreen");
//						this.firstChild.classList.add("ico-exitscreen");
////						launchFullScreen(ypwVideo);
//						ypwVideo.parentNode.classList.add("full-video");
//						ypwVideo.width = window.screen.availWidth; //不适用PC端
//						ypwVideo.height = window.screen.availHeight; //不适用PC端
//					}
//				});
	progressBar.addEventListener("touchstart",function(e){
		barDrag = true;
		updateBar(e.touches[0].pageX);
	});
	document.addEventListener("touchend",function(e){
		if(barDrag){
			barDrag = false;
			updateBar(e.touches[0].pageX);
		}
	});
	document.addEventListener("touchmove",function(e){
		if(barDrag){
			updateBar(e.touches[0].pageX);
		}
	});
	progress.addEventListener("click",function(e){
		updateBar(e.pageX);
	});
	//更新进度
	function updateBar(x){
		var duration = ypwVideo.duration;
		var curBuffer = duration;
		if(ypwVideo.buffered.length > 0){ //android4.2.2 的buffered.length==0
			curBuffer = parseInt(ypwVideo.buffered.end(0));
		}
		var pos = x - progress.getBoundingClientRect().left;
		var per = (pos/progress.offsetWidth)*100;
		if((per*duration/100) > curBuffer){
			return false;
		}
		if(per > 100){
			per = 100;
		}else if(per < 0){
			per = 0;
		}
		if(!barDrag){
			progressBar.style.left = per + "%";
		}
		progressLoad.style.width = per + "%";
		ypwVideo.currentTime = duration*per/100;
	}
	//秒数时间格式化：hh:mm:ss
	function timeFormat(time){
		time = Math.floor(time);
		var h,m,s;
		if(time > 3600){
			h = Math.floor(time / 3600);
			var ms = Math.floor(time % 3600);
			m = Math.floor(ms / 60);
			s = Math.floor(ms % 60);
			h = (h < 10 ? "0"+h : h) + ":";
		}else{
			h = "";
			m = Math.floor(time / 60);
			s = Math.floor(time % 60);
		}
		m = (m < 10 ? "0"+m : m) + ":";
		s = s < 10 ? "0"+s : s;
		var t = h + m + s;
		return t;
	}
	
})();