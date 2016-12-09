~(function(){
	
	
	
	function eventHandle(){
		//tab点击切换
		$(".ypw-info .ypw-tab > li").click(function() {
		    if (!$(this).hasClass("active")) {
		        $(this).addClass("active").siblings().removeClass("active");
		        $(".ypw-info .ypw-panels .ypw-panel").eq($(this).index()).show().siblings().hide();
		    }
		});
		
		//详情展开
		$(".look-more .unfold").click(function(){
			$(this).parent().addClass("expand");
			$(".ypw-detail-area .detail-c").addClass("expand");
		});
		//详情收起
		$(".look-more .fold").click(function(){
			$(this).parent().removeClass("expand");
			$(".ypw-detail-area .detail-c").removeClass("expand");
		});
	}
	//随机显示游戏标签背景色
	function randomLabel(){
		var rana = [];
		//创建不重复的小于6的3个随机数
		for (var i = 0; i < 10; i++) {
			var r = parseInt(Math.random()*6);
			var repeat = false;
			for(var j = 0 ; j<rana.length;j++){
				if(r == rana[j]){
					repeat = true;
					break;
				}
			}
			if(!repeat){
				rana.push(r);
			}
			if(rana.length == 3){
				break;
			}
		}
		$(".ypw-info-base .lb .label").each(function(){
			$(this).removeClass("label-rd-0").addClass("label-rd-"+rana[$(this).index()]);
		});
		
	}
	//分享组件
	function shareInit(){
		$(".ypw-share > li ").hover(function(){
			$(this).addClass("active");
		},function(){
			$(this).removeClass("active");
		});
	}
	//加载右侧固定bar
	function fixedBar(){
		$(window).scroll(function(e){
			var sTop = $(document.body).scrollTop();
			if(sTop > $(window).height()){
				$("#ypwFixedBar").fadeIn(500);
			}else{
				$("#ypwFixedBar").fadeOut(500);
			}
		});
		$("#ypwFixedBar").css("left",$(".ypw-main").offset().left+$(".ypw-main").width()+20+"px");
		$("#toTop").click(function(){
			$("body").stop().animate({
	            scrollTop: 0
	       },1000);
		});
	}
	//浏览图片幻灯片
	var banner = {
		$banner:$("#ypwBanner .banner"),
		size:$("#ypwBanner .banner >li").size(),
		curIndex:0,
		speed:0,
		complete:true,
		init : function(){
			var self = this;
			self.$prev = $("#ypwBanner .prev");
			self.$prev.hide();
			self.$next = $("#ypwBanner .next");
			self.$banner.find("li").eq(self.curIndex).addClass("cur");
			self.$prev.click(function(){self.prev(self)});
			self.$next.click(function(){self.next(self)});
			
		},
		checkThin : function(){ //检查是图片是宽还是瘦
			var self = this;
			var $curPic = $("#ypwBanner .banner >li").eq(self.curIndex);
			if($curPic.hasClass("thin") && !$("#ypwBanner").hasClass("banner-thin")){
				$("#ypwBanner").addClass("banner-thin");
			}else if($("#ypwBanner").hasClass("banner-thin")){
				$("#ypwBanner").removeClass("banner-thin");
			}
		},
		prev : function(self){
			if(!self.complete) return;
			var oriIndex = self.curIndex;
			self.curIndex--;
			self.checkThin();
			self.complete = false;
			self.switch(oriIndex,self.curIndex);
			if(self.curIndex <= 0){
				self.$prev.fadeOut(100);
				return;
			}else{
				self.$next.fadeIn(100);
			}
		},
		next : function(self){
			if(!self.complete) return;
			var oriIndex = self.curIndex;
			self.curIndex++;
			self.checkThin();
			self.complete = false;
			self.switch(oriIndex,self.curIndex);
			if(self.curIndex >= self.size-1){
				self.$next.fadeOut(100);
				return;
			}else{
				self.$prev.fadeIn(100);
			}
		},
		switch : function(curIndex,desIndex){
			var self = this;
			self.$banner.find("li").eq(curIndex).stop()
				.animate({opacity:0},self.speed,function(){
					$(this).animate({opacity:1},0).removeClass("cur");
					self.complete = true;
				});
				
			self.$banner.find("li").eq(desIndex).addClass("cur").stop()
				.animate({opacity:0},0)
				.animate({opacity:1},self.speed,function(){
					
				});
		}
	}
	//浏览图片
	function browsePic(){
		$(".slide-area li:not(.v)").click(function(){
			$(".ypw-browse-pic").show();
		});
		$(".ypw-browse-pic .mask,.ypw-browse-pic .close").click(function(){
			$(".ypw-browse-pic").hide();
		});
		banner.init();
	}
	//观看视频
	function watchVideo(){
		/*视频*/
		$(".videoPlay").bind("click", function() {
			var index = $(".videoPlay").index(this);
			var vurl = $('.videoPlay').eq(index).data('video');
			var video;
			nie.define(function(){
				var videoModule = nie.require("nie.util.videoV2");
				video = videoModule({
			        fat : "#video-pop",//放视频的容器
			        width:"600",//视频宽度
			        height:"400",//视频高度
			        //wmode:"direct",//flash wmode值,默认direct
			        movieUrl:vurl,//标清视频地址
			        HDmovieUrl : "",//高清视频地址
			        SHDmovieUrl : "",//超清视频地址
			        vtype : "d",//默认选用哪种清晰度，分别有d,hd,shd，默认不填则会采用校验网速然后自动匹配
			    });
				
			});
			$(".ypw-watch-video").show();
			$(".ypw-watch-video .mask, .ypw-watch-video .close").bind("click", function() {
				$(".ypw-watch-video").hide();
				video.stop();
			});
		});
	}
	//计算评分显示
	function calcGradeShow(){
		$(".ypw-grade-show").each(function(){
			var grade = $(this).find(".grade-num").data("num");
			var $circle = $(this).find(".circle");
			var $leftCircle = $(this).find(".left-circle");
			var $rightCircle = $(this).find(".right-circle");
			//45°是左半圆和右半圆的基数
			var deg = 45+360-(grade/10)*360;
			if(grade > 5){
				$leftCircle.css({
					'transform':           'rotate(45deg)',  
			        '-moz-transform': 'rotate(45deg)',  
			        '-o-transform':      'rotate(45deg)'
				});
				$rightCircle.css({
					'transform':           'rotate('+deg+'deg)',  
			        '-moz-transform': 'rotate('+deg+'deg)',  
			        '-o-transform':      'rotate('+deg+'deg)'
				});
			}else{
				$leftCircle.css({
					'transform':           'rotate('+(deg-180)+'deg)',  
			        '-moz-transform': 'rotate('+(deg-180)+'deg)',  
			        '-o-transform':      'rotate('+(deg-180)+'deg)'
				});
			}
			if(grade > 8){
				$circle.addClass("circle-5");
			}else if(grade > 6){
				$circle.addClass("circle-4");
			}else if(grade > 4){
				$circle.addClass("circle-3");
			}else if(grade > 2){
				$circle.addClass("circle-2");
			}else if(grade > 0){
				$circle.addClass("circle-1");
			}
		});
	}
	//评论打分 
	function cmtGrade(){
		//为了hover移出时恢复之前的打分
		var oriGrade = 0;
		var word = ["嫌弃","无聊","一般","不错","神作"];
		$("#cmtGrade > dd").click(function(){
			var grade = oriGrade = $(this).index()+1;
			$("#cmtGrade > dd:lt("+grade+")").find(".ico").removeClass().addClass("ico ico-36 ico-star-"+grade);
			$("#cmtGrade > dd:gt("+(grade-1)+")").find(".ico").removeClass().addClass("ico ico-36 ico-star-0");
			$("#cmtGrade").prev().fadeIn(100).find("em").text(word[grade-1]);
			
			$("#cmtGrade").attr("data-grade",grade);
		});
		//hover效果
		$("#cmtGrade > dd").hover(function(){
			var grade = $(this).index()+1;
			$("#cmtGrade > dd:lt("+grade+")").find(".ico").removeClass().addClass("ico ico-36 ico-star-"+grade);
			$("#cmtGrade > dd:gt("+(grade-1)+")").find(".ico").removeClass().addClass("ico ico-36 ico-star-0");
			$("#cmtGrade").prev().fadeIn(100).find("em").text(word[grade-1]);
		},function(){
			if(oriGrade == 0){ //说明没有打过分
				$("#cmtGrade > dd").find(".ico").removeClass().addClass("ico ico-36 ico-star-0");
				$("#cmtGrade").prev().fadeOut(100);
			}else{
				$("#cmtGrade > dd:lt("+oriGrade+")").find(".ico").removeClass().addClass("ico ico-36 ico-star-"+oriGrade);
				$("#cmtGrade > dd:gt("+(oriGrade-1)+")").find(".ico").removeClass().addClass("ico ico-36 ico-star-0");
				$("#cmtGrade").prev().fadeIn(100).find("em").text(word[oriGrade-1-1]);
			}
		});
	}
	$(function(){
		for (var i = 0; i < 4; i++) {
			$(".ypw-ruku>ul>li:first").clone().appendTo($(".ypw-ruku>ul"));
		}
		for (var i = 0; i < 2; i++) {
			var $cmtsub = $(".ypw-cmt-box-sub .ypw-cmt-sub:first").clone();
			var $cmt = $(".ypw-cmt:first").clone();
			$cmtsub.find(".cmt-reply-box").hide();
			if(i == 1){
				$cmtsub.addClass("no-mb");
				$cmt.addClass("no-mb");
			}
			$cmtsub.appendTo($(".ypw-cmt-box-sub"));
			$cmt.appendTo($(".ypw-cmt-box"));
		}
		//事件处理
		eventHandle();
		//分享组件
		shareInit();
		//浏览海报图
		browsePic();
		//观看视频
		watchVideo();
		//加载右侧固定bar
		fixedBar(); 
		//随机显示游戏标签背景色
		randomLabel();
		//计算评分显示
		calcGradeShow();
		//评论打分
		cmtGrade();
	});
	
})();
