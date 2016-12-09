~(function(){
	function eventHandle(){
		//发表评论表情
		$(".ypw-cmt-publish .emot .ico, .cmt-reply-box .emot .ico").click(function(){
			
			if(!$(this).parent().find(".ypw-emot-panel").is(":visible")){
				$(this).addClass("ico-emot").removeClass("ico-emot-open");
				$(this).parent().find(".ypw-emot-panel").fadeIn(100);
			}else{
				$(this).addClass("ico-emot-open").removeClass("ico-emot");
				$(this).parent().find(".ypw-emot-panel").fadeOut(100);
			}
		});
		//发表评论表情点击
		$(".ypw-cmt-publish .ypw-emot-panel > dl > dd").click(function(e){
			var curVal = $("#publishWord").val();
			$("#publishWord").text(curVal + $(this).text());
			$(this).closest(".ypw-emot-panel").fadeOut(100);
		});
		//表情点击
		$(".cmt-reply-box .ypw-emot-panel > dl > dd").click(function(e){
			var curVal = $(".cmt-reply-box .input").text();
			$(".cmt-reply-box .input").text(curVal + $(this).text());
			$(this).closest(".ypw-emot-panel").fadeOut(100);
		});
		//要回复
		$(".to-reply").click(function(){
			var replyBox = $(this).closest(".cmt-dinner").find(".cmt-reply-box");
			if(replyBox.is(":visible")) return;
			$(".cmt-reply-box").slideUp();
			replyBox.find(".input").html("");
			replyBox.slideDown();
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
		
		
		pageRoll();
		//事件处理
		eventHandle();
		
		//加载更多评论
		loadMoreData();
	});
})();