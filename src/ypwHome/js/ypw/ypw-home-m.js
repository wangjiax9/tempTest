~(function(){
	
	
	function init(){
		$(".ypw-back").click(function(){
			
		})
	}
	function shareInit(){
		$(".ypw-share > li ").hover(function(){
			$(this).addClass("active");
		},function(){
			$(this).removeClass("active");
		});
	}
	
	$(function(){
		$("#menu").click(function(){
			$(".ypw-left").animate({left:"0"},300);
		});
		
		$(".ypw-left .mask, .ypw-left .ypw-back").click(function(){
			$(".ypw-left").animate({left:"-100%"},100);
		})
		$("#btnLogin").click(function(){
			window.login();
		});
		$("#btnRegister").click(function(){
			window.register();
		});
		$(".ypw-float-ad .close").click(function(){
			$(this).parent().remove();
			//一天出现几次还是每次都出现，需确定
		})
		shareInit();
	});
})();
