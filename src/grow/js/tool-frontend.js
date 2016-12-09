~(function(){
	window.FETool = {};
	
	/**
	 * 检测是否支持游品味协议 ypw://
	 * 		-如果支持则跳转url
	 * 		-主要游品味客户端旧版本
	 */
	FETool.CheckSchemeHost = function(url){
		if(typeof(Kzweb) == 'undefined') return false;
		if(Kzweb.isSupportSchemeHost && Kzweb.isSupportSchemeHost(url)){
			return true;
		}
	}
	/**
	 * 检测是否支持ypw协议分享
	 * 		-如果支持则跳转到分享页
	 */
	FETool.CheckShareThis = function(){
		if(typeof(Kzweb) == 'undefined') return false;
		if(Kzweb.shareThis){
			return true;
		}else{
			return false;
		}
	}
	
	/**
	 * 统计上报
	 * @param opt 
	 * 		opt = {
	 * 			type : "view",   //目前有两种类型：view(活动浏览)，attend(活动参与)
	 * 			icode : 4	//和type配套出现
	 * 		}
	 */
	FETool.statsReport = function(opt){
		var img = new Image();
		var reqUrl = "";
		if(opt.type && opt.icode){
			if(opt.type == "view"){ //活动浏览
				reqUrl = "/share/event_view/"+opt.icode;
			}else if(opt.type == "attend"){ //活动参与
				reqUrl = "/share/event_attend/"+opt.icode;
			}else if(opt.type == "view_new"){
				reqUrl = "/share/event_id_view/"+opt.icode;
			}else if(opt.type == "attend_new"){
				reqUrl = "/share/event_id_attend/"+opt.icode;
			}
			img.src = reqUrl;
		}
	}
	/**
	 * 协议检测
	 * 		-主要用于检测游品味协议ypw:// 是否有效，有效则跳转，无效随便
	 * 用法：在需要使用的标签添加属性：
	 * 		data-protocol-check //属性类型目前有两种：["schemeHost","share"]
	 * 		data-ypw-url	//需要跳转的地址
	 * 		data-ypw-fun //需要调用的方法名
	 * 		data-custom-url //自定义url，如果存在，当schemeHost检测不通过的时候，打开该url
	 * url和fun可只填其一，实际情况如果不是直接跳转，而是需要做其他处理，可使用data-ypw-fun
	 * 如：<a href="javascript:void(0)" data-protocol-check="schemeHost" data-ypw-url="/share/event_view/2"></a>
	 */
	function protocolCheck(){
		$("[data-protocol-check]").on("click",function(){
			var type = $(this).data("protocol-check");
			var url = $(this).data("ypw-url");
			var fun = $(this).data("ypw-fun");
			var customUrl = $(this).data("custom-url");
			if(type == "schemeHost" && FETool.CheckSchemeHost(url)){
				location.href = url;
			}else if(type == "share"){
				if(FETool.CheckShareThis()){
					try{
						var url,poster,title,intro;
						var opt = $(this).data("opt");
						if(opt != undefined){
							alert(opt);
							opt = parseOpt(opt);
							url = opt.url;
							poster = opt.poster;
							title = opt.title;
							intro = opt.intro;
						}else{
							url = "http://m.ypw.163.com/share/grow";
							poster = "http://gameapp.fp.ps.netease.com/file/5810554b143cfaad040a47a3vNsiINAY";
							title = "《万物生长》安卓首发";
							intro = "App Store 2015年度精选，中国独立游戏嘉年华最佳移动游戏奖。与你一起披荆斩棘，来到星空树下。";
						}
						Kzweb.shareThis(url,poster,title,intro);
					}catch (err){
					}
				}else if(typeof(window[fun]) == "function"){
					window[fun]();
				}
			}else{
				location.href = url;
				setTimeout(function(){
					if(customUrl != undefined){
						//跳转到自定义链接
						window.location.href = customUrl;
					}else{
						//如果超时就跳转到app下载页
						window.location.href = "http://ypw.163.com/m/";
					}
				},1500);
			}
		});
		function parseOpt(opt){
			var arr = opt.split(",");
			if(arr[0] == "True"){
				opt.url = arr[1];
				opt.poster = arr[2];
				opt.title = arr[3];
				opt.intro = arr[4];
				return opt;
			}
		}
	}
	
	/**
	 * 图片懒加载
	 * 		-img标签添加class:lazy-img
	 * 		-添加data-origin为图片的真实地址
	 * 		-src为默认图片地址
	 * 示例如下：
	 * 	<img class="lazy-img" data-origin="gif/richman1.gif" src="默认图片地址"/>
	 * 在需要使用的页面初始调用即可监听：
	 *		//图片懒加载
	 *		FETool.lazyImg();
	 */
	FETool.lazyImg = function(){
		//检测累计
		var checkCount = 0;
		//滚动触发距离
		var scrollSize = 300;
		checkLazyImg();
		$(window).scroll(function(e){
			var sTop = $(document.body).scrollTop();
			if(sTop > scrollSize * checkCount){
				checkLazyImg(sTop);
			}
		});
		//检测是否有懒加载img
		function checkLazyImg(sTop){
			checkCount ++;
			$("img.lazy-img").each(function(){
				var h = $(window).height();
				var ot = $(this).offset().top ;
				if(ot < h+sTop || ot < h){
					if($(this).data("origin") != undefined){
						$(this).attr("src",$(this).data("origin"));
					}
				}
			});
		}
	}
	
	$(function(){
		//协议检测
		protocolCheck();
		
	});
	
})();


