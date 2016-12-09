~(function(){
	//是否能获取验证码
	var canGetCode = false;
	//是否能登录
	var canLogin = false;
	//是否在倒计时中
	var isLoop = false;
	window.login = function(){
		$(".ypw-login-dialog").fadeIn(200);
	}
	//是否登录
	window.isLogin = function(){
		return false;
	}
	init();
	function init(){
		$("#goLogin").click(function(){
			window.login();
		});
		
		$(".ypw-login-dialog .ypw-tab > li").click(function() {
		    if (!$(this).hasClass("active")) {
		        $(this).addClass("active").siblings().removeClass("active");
		        $(".ypw-login-dialog .ypw-panels .ypw-panel").eq($(this).index()).show().siblings().hide();
		    }
		});
		//关闭登录弹出窗
		$("#loginDialogClose").click(function(){
			$(".ypw-login-dialog").fadeOut(200);
		});
		//去注册
		$("#toRegister").click(function(){
			$(".ypw-tab > li:eq(0)").hide();
			$(".ypw-tab > li:eq(1)").hide();
			$(".ypw-tab > li:eq(2)").show().click();
		});
		//去登录
		$("#toLogin").click(function(){
			$(".ypw-tab > li:eq(0)").show().click();
			$(".ypw-tab > li:eq(1)").show();
			$(".ypw-tab > li:eq(2)").hide();
		});
		controlHandle();
		emailLogin();
	}
	
	/**
	 * 控件处理
	 * 手机登录和注册的控件处理
	 */
	function controlHandle(){
		//监听手机号的输入
		$(".input-phone").on("input propertychange",function(){
			if(isLoop) return;
			var val = $(this).val();
			if(!/^\d+$/.test(val)){ //只允许输入数字
				$(this).val($(this).val().substring(0,$(this).val().length-1));
			}
			if(val.length >= 11){
				$(this).closest(".form-area").find(".btn-getcode").addClass("btn-info").removeClass("btn-disabled");
				canGetCode = true;
			}else{
				$(this).closest(".form-area").find(".btn-getcode").addClass("btn-disabled").removeClass("btn-info");
				canGetCode = false;
			}
		}).on("blur",function(){ //手机号失去焦点
			if(isLoop) return;
			var val = $(this).val();
			if(val.length >= 11){
				$(this).closest(".form-area").find(".btn-getcode").addClass("btn-info").removeClass("btn-disabled");
				canGetCode = true;
			}else{
				$(this).closest(".form-area").find(".btn-getcode").addClass("btn-disabled").removeClass("btn-info");
				canGetCode = false;
			}
		});
		
		//监听验证码输入
		$(".input-code").on("input propertychange",function(){
			if($(this).val().length > 0){
				$(this).closest(".form-area").find(".verify-login").addClass("btn-primary").removeClass("btn-disabled");
				canLogin = true;
			}else{
				$(this).closest(".form-area").find(".verify-login").addClass("btn-disabled").removeClass("btn-primary");
				canLogin = false;
			}
		});
		
		//获取验证码
		$(".btn-getcode").click(function(){
			var $phone = $(this).closest(".form-area").find(".input-phone");
			if(checkPhone($phone) && canGetCode && !isLoop){
				getCoding($phone);
			}
		});
		
		//自动登录
		$(".autoLogin").click(function(){
			if(!$(this).hasClass("checked")){//选中
				$(this).addClass("checked");
				//记录cookie，存多久？
//				FETool.setCookie();
			}else{
				$(this).removeClass("checked");
			}
			
		});
		
		//验证并登录
		$(".verify-login").click(function(){
			if(!canLogin) return;
			var phone = $(this).closest(".form-area").find(".input-phone").val();
			var code = $(this).closest(".form-area").find(".input-code").val();
			if(verifyCode()){
				loginOk();
			}else{
				$(this).closest(".form-area").find(".verify-error").slideDown().text("验证码错误，请重新输入");
			}
			
		});
		
	}
	
	/**
	 * 邮箱登录
	 */
	function emailLogin(){
		var canEmailLogin = false;
		$("#email").blur(function(){
			if(!verifyEmail($(this).val())){
				$(this).closest(".form-area").find(".verify-error").slideDown().text("邮箱格式不正确，请重新输入");
			}else{
				$(this).closest(".form-area").find(".verify-error").slideUp();
			}
		});
		$("#email,#emailPwd").on("input propertychange",function(){
			if(verifyEmail($("#email").val()) && $("#emailPwd").val().length > 0){
				$("#emailLogin").addClass("btn-primary").removeClass("btn-disabled");
				canEmailLogin = true;
			}else{
				$("#emailLogin").addClass("btn-disabled").removeClass("btn-primary");
				canEmailLogin = false;
			}
		});
		//邮箱密码是否明文
		$("#pwdEye").click(function(){
			if($(this).hasClass("ico-openeye")){
				$(this).prev().attr("type","text");
				$(this).addClass("ico-closeeye").removeClass("ico-openeye");
			}else{
				$(this).prev().attr("type","password");
				$(this).addClass("ico-openeye").removeClass("ico-closeeye");
			}
		});
		
		$("#emailLogin").click(function(){
			if(!canEmailLogin) return;
			var email = $("#email").val();
			var emailPwd = $("#emailPwd").val();
			
		});
	}
	function checkPhone(obj){
		var val = obj.val();
		if(val.length == 11 && verifyPhone(val)){
			obj.closest(".form-area").find(".verify-error").slideUp();
			canGetCode = true;
			return true;
		}else{
			obj.closest(".form-area").find(".verify-error").slideDown().text("您输入的手机格式有误，请重新输入");
			return false;
		}
	}
	//可以登录
	function loginOk(){
		
	}
	//获取验证码倒计时
	function getCoding(obj){
		if(!canGetCode) return;
		var count = 10;
		var $btnGetCode = obj.closest(".form-area").find(".btn-getcode");
		$btnGetCode.addClass("btn-disabled").removeClass("btn-info").text("重发 "+count+"s");
		
		count --;
		canGetCode = false;
		isLoop = true;
		
		var countDown = setInterval(function(){
			if(count > 0 ){
				$btnGetCode.text("重发 "+count+"s");
				count --;
			}else{
				$btnGetCode.removeClass("btn-disabled").addClass("btn-info").text("获取");
				canGetCode = true;
				isLoop = false;
				clearInterval(countDown);
			}
			console.log(isLoop);
		},1000);
	}
	//验证验证码
	function verifyCode(code){
		var result = false;
		$.ajax({  
	        url: "",
	        dataType : "json",  
	        data:{code:code},
	        success:function(data){ 
	            console.log(data);
	            if(data && data.code){
	            	if(code == data.code){
	            		result = true;
	            	}
	            }
	            return result;
	        },  
	        error: function () {
	            return result;  
	        }
	    });  
	}
	//正则校验手机号码
	function verifyPhone(val){
		var reg = /^1\d{10}$/;
		return reg.test(val);
	}
	//验证电子邮件
	function verifyEmail(val){
		var reg = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
		return reg.test(val);
	}
	
})();
