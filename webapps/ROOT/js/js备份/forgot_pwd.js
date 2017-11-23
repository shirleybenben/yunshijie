$(function(){
	getAjax.captcha()();
	var reg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
	global.coffee({
		"click":{
			".picCode": function(){
				getAjax.captcha()();
			},
			".getTelCode" : function(){
				var params ={"telphone":$("#reg_phone").val(),"codeType":"01"};
				if(params.telphone && reg.test($.trim(params.telphone))){
					if(!reg.test($.trim(params.telphone))){
							$(".reg_hint").show();
							$("#reg_phone").focus().css("border","1px solid red");
							window.confirm("请填写正确的手机号码！");
							return false;
					}else{
						delete params.isSendCode;
						if(getAjax.isExist()(params) == "error"){
							$("#reg_phone").focus().css("border","1px solid red");
							window.confirm("该手机号未注册！");
							return false;
						}else{
							$("#reg_phone").focus().css("border","1px solid #d9d9d9");
						}
					}
					params.isSendCode ="1";
					getAjax.isExist()(params);
				}else{
					$(".reg_hint").show();
					$("#reg_phone").focus().css("border","1px solid red");
				}
			},
			"#LoginBtn" : function(){
				var dxcode = $("#dxcode").val(),
					token = $("#reg_val_code").val(),
					validId = $("#reg_val_code").attr("data-id"),
					isExist =0,
					params = {"telphone":$("#reg_phone").val(),"barCode":dxcode,"codeType": "01","token":token,"validId":validId}
					
					if(params.telphone){
						if(!reg.test($.trim(params.telphone))){
							$(".reg_hint").show();
							$("#reg_phone").focus().css("border","1px solid red");
							window.confirm("请填写正确的手机号码！");
							return false;
						}else{
							delete params.isSendCode;
							if(getAjax.isExist()(params) == "error"){
								$("#reg_phone").focus().css("border","1px solid red");
								window.confirm("该手机号未注册！");
								return false;
							}else{
								$("#reg_phone").focus().css("border","1px solid #d9d9d9");
							}
						}
					}else{
						$("#reg_phone").focus().css("border","1px solid red");
						window.confirm("请填写手机号！");
						return false;
					}

					if(params.token){
						if(getAjax.captcha()(params) == "error"){
							$("#reg_val_code").focus().css("border","1px solid red");
							window.confirm("图片验证码有误！");
							return false;
						}else{
							$("#reg_val_code").focus().css("border","1px solid #d9d9d9");
						}
					}else{
						$("#reg_val_code").focus().css("border","1px solid red");
						window.confirm("请填写图片验证码！");
						return false;
					}

					if(params.barCode){
						if(getAjax.validSmsCode()(params) == "error"){
							$("#dxcode").focus().css("border","1px solid red");
							window.confirm("短信验证码有误！");
							return false;
						}else{
							$("#dxcode").focus().css("border","1px solid #d9d9d9");
						}
					}else{
						$("#dxcode").focus().css("border","1px solid red");
						window.confirm("请填写短信验证码！");
						return false;
					}
			},
			"#savePwd" : function(){
				if($("#reg_pass").val()==$("#re_pass").val()){
					var params = {"telphone":$("#reg_phone").val(),"barCode":$("#dxcode").val(),"password": $("#reg_pass").val()}
					getAjax.resetPassword()(params);
				}else{
					window.confirm("两次输入的密码不一致！");
				}
			}
		},
		"keyup":{
			"#reg_phone" : function(){
				if(isNaN($("#reg_phone").val())){
					window.confirm("手机号码不正确！");
				}else{
					$(".reg_hint").hide();
					$("#reg_phone").css("border","1px solid #d9d9d9");
				}
			}
		}
	})
})