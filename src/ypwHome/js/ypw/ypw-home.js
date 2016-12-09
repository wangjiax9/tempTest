~(function(){
	
	var count = 0;
	
	function loadMore(){
		
		$(window).scroll(function(e){
			var sTop = $(document.body).scrollTop();
			loadMoreGame(sTop);
		});
	}
	function loadMoreGame(sTop){
		
		var $loadMore = $("#loadMore");
		var h = $(window).height();
		var ot = $loadMore.offset().top ;
		if(ot > h+sTop){
			return ;
		}
		count++;
		if(count > 1){
			$loadMore.hide();
			return;
		} 
		var data = {
				games:[
					{
						id:"76",
						title:"Break  Liner",
						updateTime:"2016.11.14",
						state:"free",
						logo:"http://gameapp.fp.ps.netease.com/file/580ecd2896dee408e60b0f90RgC6DYSQ",
						poster:"http://gameapp.fp.ps.netease.com/file/5772514a5e6027a49e2ccd13QuOKupsN",
						describeTitle:"不走寻常路的飞船，突破线条的封锁",
						describe:"清新风格，充满简约美感；打破线条，飞船冲上云霄；玩法纯粹，挑战从未停止。",
						userId:"90234239",
						userIcon:"http://tva1.sinaimg.cn/crop.0.0.180.180.50/7fa03a7fjw1e8qgp5bmzyj2050050aa8.jpg",
						userName:"传说的背影"
					}
				]
			}
			for (var i = 0; i < 5; i++) {
				var game  = data.games[0];
				var lump = '<div class="ypw-lump">'
						+'<div class="lump-head">'
							+'<a class="logo" href="#"><img src="'+game.logo+'"/></a>'
							+'<dl class="t">'
								+'<dt class="color-common">'+game.updateTime+'</dt>'
								+'<dd><a href="">'+game.title+'</a><span class="label label-beta-soon"><i class="ico ico-16 ico-clock"></i><em>即将开测</em></span></dd>'
							+'</dl>'
							+'<dl class="u">'
								+'<dd><img src="'+game.userIcon+'"/></dd>'
								+'<dd>'+game.userName+'</dd>'
								+'<dd><span class="color-common">推荐</span></dd>'
							+'</dl>'
						+'</div>'
						+'<div class="lump-body">'
							+'<a class="poster" href=""><img src="'+game.poster+'"/></a>'
							+'<div class="intro">'
								+'<div class="intro-h"><i class="ico ico-quot"></i>'+game.describeTitle+'</div>'
								+'<div class="intro-c">'+game.describe+'</div>'
							+'</div>'
						+'</div>'
						+'<div class="ypw-download"><i class="ico ico-download"></i><em>下载</em></div>'
					+'</div>';
				$(lump).appendTo($(".ypw-lumps"));
			}
	}
	function shareInit(){
		$(".ypw-share > li ").hover(function(){
			$(this).addClass("active");
		},function(){
			$(this).removeClass("active");
		});
	}
	//banner
	var banner = {
		$banner:$("#ypwBanner .banner"),
		size:$("#ypwBanner .banner >li").size(),
		curIndex:0,
		speed:1000,
		complete:true,
		init:function(){
			var self = this;
			var $prev = $("#ypwBanner .prev");
			var $next = $("#ypwBanner .next");
			self.$banner.find("li").eq(self.curIndex).addClass("cur");
			self.createBannerIndex();
			self.loop();
			$prev.click(function(){self.prev(self)});
			$next.click(function(){self.next(self)});
		},
		loop:function(){
			var self = this;
			self.interval = setInterval(function(){
				self.next(self);
			},2000);
		},
		stopLoop:function(){
			clearInterval(self.interval);
		},
		//创建banner索引
		createBannerIndex:function(){
			var self = this;
			var $bIndex = $("<ul class='banner-index'></ul>");
			for(var i = 0; i < self.size; i++){
				var $li = "<li></li>";
				$bIndex.append($li);
			}
			$bIndex.find("li").eq(self.curIndex).addClass("cur");
			self.$banner.after($bIndex);
			self.$bannerIndex = $bIndex;
			
			$bIndex.find("li").click(function(){
				if(!self.complete) return;
				self.complete = false;
				var oriIndex = self.curIndex;
				self.curIndex = $(this).index();
				self.switch(oriIndex,self.curIndex);
			})
		},
		prev : function(self){
			if(!self.complete) return;
			self.complete = false;
			var oriIndex = self.curIndex;
			self.curIndex--;
			if(self.curIndex < 0){
				self.curIndex = self.size-1;
			}
			self.switch(oriIndex,self.curIndex);
		},
		next : function(self){
			if(!self.complete) return;
			self.complete = false;
			var oriIndex = self.curIndex;
			self.curIndex++;
			if(self.curIndex >= self.size){
				self.curIndex = 0;
			}
			self.switch(oriIndex,self.curIndex);
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
				
			self.$bannerIndex.find("li").eq(desIndex).addClass("cur").siblings().removeClass("cur");
		}
	}
	
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
	
	$(function(){
		shareInit();
		banner.init();
		loadMore();
		fixedBar();
		
		$("#goLogin").click(function(){
			window.login();
		});
	});
})()
