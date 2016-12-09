~(function(){
	function eventHandle(){
		
		//发表评论表情
		$(".ypw-cmt-publish .emot").click(function(){
			if($(".ypw-cmt-publish .emot-panels").is(":visible")){
				$(this).find(".ico").addClass("ico-emot").removeClass("ico-emot-open");
				$(".ypw-cmt-publish .emot-panels").slideUp(100);
				$(".ypw-cmt-publish .emot-panels").css({
					width:$(window).width(),
					left:"-"+$('.ypw-cmt-publish .emot-panels').offset().left+"px"
				});
			}else{
				$(this).find(".ico").addClass("ico-emot-open").removeClass("ico-emot");
				$(".ypw-cmt-publish .emot-panels").slideDown(100);
				$(".ypw-cmt-publish .emot-panels").css({
					width:$(window).width(),
					left:"-"+$('.ypw-cmt-publish .emot-panels').offset().left+"px"
				});
			}
		});
		//发表评论表情点击
		$(".ypw-cmt-publish .emot-panel > dl > dd").click(function(){
			var curVal = $("#publishWord").val();
			$("#publishWord").text(curVal + $(this).text());
		});
		//要回复
		$(".to-reply").click(function(){
			var replyBox = $(".cmt-reply-box");
			replyBox.find(".input").html("");
			replyBox.show();
		});
		$(".cmt-reply-box .mask").click(function(){
			$(".cmt-reply-box").hide();
		});
		//监听回复输入
		$(".cmt-input > .input").on("input propertychange",function(){
			if($(this).html().length > 0){
				$(this).closest(".cmt-reply-box").find(".error-msg").fadeOut(100).text("");
			}
		});
		
		//回复按钮
		$("#reply").click(function(){
			//检查是否为空
			if(!checkEmpty($(this))) return;
			
			//判断是否登录
			
			
		});
		//表情面板
		$(".cmt-reply-box .emot").click(function(){
			if($(".cmt-reply-box .emot-panels").is(":visible")){
				$(this).find(".ico").addClass("ico-emot").removeClass("ico-emot-open");
				$(".cmt-reply-box .emot-panels").slideUp(100);
			}else{
				$(this).find(".ico").addClass("ico-emot-open").removeClass("ico-emot");
				$(".cmt-reply-box .emot-panels").slideDown(100);
			}
		});
		
		//输入框聚焦
		$(".cmt-reply-box .input").focus(function(){
			//表情面板隐藏
			$(".cmt-reply-box .emot-panels").slideUp(100);
		});
		//表情点击
		$(".cmt-reply-box .emot-panel > dl > dd").click(function(){
			var curVal = $(".cmt-reply-box .input").text();
			$(".cmt-reply-box .input").text(curVal + $(this).text());
		});
		
		//点赞
		$(".to-zan").click(function(){
			$("<span>+1</span>").appendTo($(this)).css({
				position:"absolute",
				left:"20%",
				top:0,
				opacity:1
			}).animate({top:"-0.3rem",opacity:0},300,function(){
				$(this).remove();
			});
			var em = $(this).find("em");
			em.text(parseInt(em.text())+1);
		});
	}
	//加载更多,暂时先点击加载
	function loadMoreData(){
		
		var $loadMore = $("#loadMore");
		$("#loadMore").click(function(){
			$(".ypw-cmt:first").clone().appendTo($(".ypw-cmt-box"));
			$loadMore.hide();
		});
		
	}
	function checkEmpty(obj){
		var $el = obj.closest(".cmt-reply-box").find(".input");
		if($el.html() == ""){
			obj.closest(".cmt-reply-box").find(".error-msg").fadeIn(100).text("评论内容不能为空，请说点什么");
			return false;
		}else{
			return true;
		}
	}
	//表情面板左右滑动
	function emotPanelSlide(){
		
		var startX, startY, endX, endY,perL,perR;
		$(".emot-panel").on("touchstart",function(e){
			
			startX = e.originalEvent.changedTouches[0].pageX,
    		startY = e.originalEvent.changedTouches[0].pageY;
		});
		$(".emot-panel").on("touchmove",function(e){
			e.preventDefault();
			//获取滑动屏幕时的X,Y
		    endX = e.originalEvent.changedTouches[0].pageX,
		    endY = e.originalEvent.changedTouches[0].pageY;
		    //获取滑动距离
		    distanceX = endX-startX;
		    distanceY = endY-startY;
		    //判断滑动方向
		    if(Math.abs(distanceX)>Math.abs(distanceY) && distanceX>0){
		    	var pos = $(this).data("pos");
		    	if(pos == "0") return;
		    	perR = distanceX;
		    	if(perR >= 120) return;
		    	//往右滑动
		    	$(this).css("left",(-100+perR)+"%");
		    }else if(Math.abs(distanceX)>Math.abs(distanceY) && distanceX<0){
		    	var pos = $(this).data("pos");
		    	if(pos == "1") return;
		    	perL = distanceX;
		    	if(perL <= -120) return;
		    	//往左滑动
		    	$(this).css("left",perL+"%");
		    	
		    }
		});
		$(".emot-panel").on("touchend",function(){
			console.log(perL+","+perR);
			if($(this).data("pos") == "0"){
				if(perL == undefined) return;
				if(perL > -50 ){
					$(this).animate({left:"0"},100);
				}else{
					$(this).animate({left:"-100%"},100);
					$(this).data("pos","1");
					$(this).find(".mark li").eq(1).addClass("active").siblings().removeClass("active");
				}
			}else{
				if(perR == undefined) return;
				if(perR < 50 ){
					$(this).animate({left:"-100%"},100);
				}else{
					$(this).animate({left:"0"},100);
					$(this).data("pos","0");
					$(this).find(".mark li").eq(0).addClass("active").siblings().removeClass("active");
				}
			}
		});
	}
	
	//total_page:总页数
    //boundary：页数临界值
    //front_range:前段显示页码数
    //mid_range:中段显示页码数
    //rear_range后段显示页码数
    //page_size：每页记录数
    var pagination_config = {total_page : 10,current_page:1, boundary : 5, front_range : 1, mid_range : 3,rear_range : 1,page_size:10};

    /**
     * 分頁格式處理，ex. prev 1 ... 8 9 10 11 12 ... 20 next
     * @return array 要顯示的頁碼
     */
    function pagintion_array(){
                var total_page = pagination_config.total_page,
                    boundary = pagination_config.boundary, 
                    front_range =  pagination_config.front_range, 
                    mid_range = pagination_config.mid_range,
                    rear_range = pagination_config.rear_range,
                    current_page = pagination_config.current_page;
        var pagintion = [];

        current_page = (current_page > total_page) ? total_page : current_page;

        // 總頁數小於頁數臨界值，則顯示所有頁碼
        if (total_page <= boundary) {
            for (i = 1; i <= total_page; i++) {
                pagintion.push(i);
            }
        } else {
            var front_end     = front_range; // 前段最後一個頁碼
            var mid_start     = current_page - Math.ceil(parseFloat(mid_range - 1) / 2); // 中段第一個頁碼
            var mid_end     = current_page + ((mid_range - 1) - Math.ceil((mid_range - 1) / 2)); // 中段最後一個頁碼
            var rear_start     = total_page - rear_range + 1; // 後段第一個頁碼
            // 中段第一個頁碼小於等於1，中斷頁碼往左位移
            while (mid_start <= 1) {
                if (mid_start < 1)
                    mid_end += 1;
                mid_start += 1;
            }

            // 中段第一個頁碼大於等於總頁數，中斷頁碼往右位移
            while (mid_end >= total_page) {
                if (mid_end > total_page)
                    mid_start -= 1;
                mid_end -= 1;
            }

            // 取出需要顯示的頁碼數
            for (var i = 1; i <= total_page; i++) {
                if (i <= front_end || (i >= mid_start && i <= mid_end) || i >= rear_start) {
                    if (i - pagintion[pagintion.length-1] > 1) {
                        pagintion.push('...');
                    }

                    pagintion.push(i);
                }
            }
        }

        return pagintion;
    }

    /**
     * 拼装分页的 html  ;
     * 样式 for jquery.simplepagination 
     * @return string
     */
    function buildPage(){
                var current_page = pagination_config.current_page,
                    total_page = pagination_config.total_page;
                if(total_page<=1){
                    return;
                }
        var html = '<ul>';
        //计算总页数;
        //计算分页
        var pagintion = pagintion_array();

        //上一页
        //上一页 不可点击
        if (current_page <= 1) {
            html+='<li class="pg-prev pg-off"><a href=""><i></i>上一页</a></li>';
        } else {
            //上一页可点击
            var page_prev = current_page - 1;
            html+='<li class="pg-prev" data-page-index='+page_prev+'><a href="javascript:void(0)"><i></i>上一页</a></li>';
        }

        //每一页的 链接
        for(var i=0;i<pagintion.length;i++){
            var page_id =  pagintion[i];
            if (page_id == current_page) {
                    html+='<li class="pg-on pg-index"  data-page-index='+page_id+'><a href="javascript:void(0)" class="on">'+page_id+'</a></li>';
            } else if (page_id == '...') {
                    html+='<li>...</li>';
            } else {
                    html+='<li pg-index data-page-index='+page_id+'><a href="javascript:void(0)">'+page_id+'</a></li>';
            }
        }

        //下一页
        //下一页 不可点击
        if (current_page >= total_page) {
            html+='<li class="pg-next pg-off"><a href="javascript:void(0)">下一页</a></li>';
        } else {
            //下一页 可点击
            var page_next = current_page + 1;
            html+='<li class="pg-next" data-page-index='+page_next+'><a href="javascript:void(0)">下一页</a></li>';
        }
        html+='</ul>';
        $('.pagintion').children().remove();
        $('.pagintion').append(html);
       	$(".pagintion").find('[data-page-index]').on("click",function(){
            if($(this).data('page-index')!=pagination_config.current_page){
                pagination_config.current_page = $(this).data('page-index');
                buildPage();
                //绑定列表
//                      get_comment_list();
            }
        });
    }
	function pageRoll(){
		buildPage();
	}
	$(function(){
		for (var i = 0; i < 1; i++) {
			var $cmt = $(".ypw-cmt-box-sub .ypw-cmt-sub:first").clone();
			$cmt.find(".cmt-reply-box").hide();
			if(i == 4){
				$cmt.addClass("no-mb");
			}
			$cmt.appendTo($(".ypw-cmt-box-sub"));
			
			$(".ypw-cmt:first").clone().appendTo($(".ypw-cmt-box"));
		}
		
		
		emotPanelSlide();
		pageRoll();
		//事件处理
		eventHandle();
		
		//加载更多评论
		loadMoreData();
	});
})();