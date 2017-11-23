(function(){
	var paramId = { 
		"sourceId": global.QueryString.id?global.QueryString.id:"",
		"quotedId":global.QueryString.quotedId?global.QueryString.quotedId:""
	},gType = global.QueryString.type,gStatus = global.QueryString.statusCn,isBegin="",times=0;
	getDetails(paramId);

	global.coffee({
		"click":{
			".close_p":function(){
				$(".dialog_wrap").show();
			},
			".priceBtn": function(){//提交报价
				var priceCom = $("input[name=doller]").val(),
					price = priceCom.substring(1,priceCom.length-3);
				var params = {
					"sourceId": global.QueryString.id,
					"price": parseInt(price),
					"remark": $(".remark_r>textarea").val()
				}
				if(params.price && params.price!=0){
					addQuotedInfo(params);
				}else{
					window.confirm("请填写报价金额！")
				}
			},
			".price_r" : function(){//弹出关闭报价按钮
				$(".close_p").toggle();
			},
			".resure>.cancel,.close" : function(){
				$(".dialog_wrap").hide();
			},
			".carBrand>span" : function(){
				var key = $(this).text(),driverList = $(".nameBrand>span");
				times=0;
				driverList.each(function(){
					if(key != $(this).attr("data-car")){
						$(this).removeClass("active").attr("disabled",true).addClass("disabled");
					}else{
						$(this).removeClass("active").removeClass("disabled").attr("disabled",false)
					}
				})
				$(this).addClass("active").siblings().removeClass("active");
				$(".saveCarInfo").removeClass("active").attr("disabled",true);
			},
			".nameBrand>span" : function(){
				if(!$(this).attr("disabled")){
					$(this).toggleClass("active");

					var chosen_len = $(".nameBrand>.active"),
						curren_len = chosen_len.length,
						needDriverNum = parseInt($(".saveCarInfo").attr("data-dnum"));
						if(curren_len !=0){
							$(".saveCarInfo").addClass("active").attr("disabled",false);
						}else{
							$(".saveCarInfo").removeClass("active").attr("disabled",true);
						}
				}
			},
			".saveCarInfo" : function(){
				var driverList=[],
					dom = $(".nameBrand>.active"),
					bidDriverInfoList=[],
					driverInfoId={},
					sourceId = global.QueryString.id,
					drverLen = parseInt($(this).attr("data-dnum"));
				if(dom.length != drverLen){
					var num = drverLen - dom.length;
					if(num>0){
						window.confirm("请再选择"+num+"个司机！");
					}else{
						window.confirm("请减少"+Math.abs(num)+"个司机！");
					}
					return false;
				}else{
					for(var i=0;i<dom.length;i++){
						driverList.push($(dom[i]).attr("data-id"));
					}
					$.each(driverList,function(s,item){
						driverInfoId={
							"driverInfoId": item
						}
						bidDriverInfoList.push(driverInfoId);
					})
					var params={
						"sourceId" : $(this).attr("data-source"),
						"vehicleInfoId": $(".carBrand>.active").attr("data-id"),
						"bidDriverInfoList": bidDriverInfoList
					}
					var dataStringify = JSON.stringify(params),
						url = '/api/quoted/finishQuotedInfo';
				    $.ajax({
				        url: global.server + url,
				        type: "POST",
				        contentType: "application/json; charset=utf-8",
				        data: dataStringify,
				        dataType: "Json",
				        success: function (msg) {
				            if (msg && msg.status && msg.status.statusCode == global.status.success) {
				            	$(".wscg").show();
				            	setTimeout(function(){
				            		window.location.href=global.getContextPath()+"/my_order.htm";
				            	},1500)
				            } else {
				            	alert(msg.status.errorMsg);
				            }
				        }
				    });
				}
				
			}
		},
		"blur":{
			"input[name=doller]": function(){
				if($("input[name=doller]").val()){
					if(isNaN(parseInt(($(this).val())))){
						var priceCom = $(this).val(),
							price = priceCom.substring(1,priceCom.length-3);
						$(this).val("¥"+price+".00");
					}else{
						$(this).val("¥"+parseInt($(this).val())+".00");
					}
				}
			}
		},
		"focus":{
			"input[name=doller]": function(){
				$(this).val("");
			}
		}
	});
	

	//新增报价
	function addQuotedInfo(params){
		$.post(global.server + "/api/quoted/addQuotedInfo",params,function(strData){
			console.log(strData);
			if (strData && strData.status && strData.status.statusCode == global.status.success) {
				$(".dialog_wrap").show();
				$(".ishide").hide();
				setTimeout(function(){
					window.location.href=global.getContextPath()+"/my_order.htm"
				},3000);
			}else{
				window.confirm(strData.status.errorMsg);
			}
		})
	}

	//订单毁约 /api/quoted/invalidTheBid
	function invalidTheBid(params){
		$.post(global.server + "/api/quoted/invalidTheBid",param,function(strData){

		});
	}

	//推荐列表
	function getRecommendList(params) {
		$.get( global.server + "/api/source/query",params,function(strData){
			if (strData && strData.status && strData.status.statusCode == global.status.success) {
				var data = strData.data;

			}
		});
	}

	//货源详情
	function getDetails(param){
		var url= global.server + "/api/source/info";
		switch(gType){
			case "1":
				url=global.server + "/api/quoted/getQuotedOrderDetail"
			break;
		}
		$.get( url,param,function(strData){
				if (strData && strData.status && strData.status.statusCode == global.status.success) {
					var data = strData.data,
						transferCodeCHtml = "",
						beginDay = "",
						addr_str ="",
						sourceId = data.sourceId,
						sourceNo = data.sourceNo,
						startC = data.startCodeCCn?data.startCodeCCn:data.startCodePCn,
						endC = data.endCodeCCn?data.endCodeCCn:data.endCodePCn,
						needType = data.needType,
						needLength = data.needLength,
						transferCodeC = data.transferCodeC,
						startTime = data.startTime,
						endTime = data.endTime,
						goodsName = data.goodsName,
						hasBegin = data.hasBegin,
						quoteNum = data.quoteNum,
						hasQuote = data.hasQuote,
						price = data.price,
						remark = data.remark,
						senderAreaList = data.senderAreaList,
						arriveCustomerTime = data.arriveCustomerTime,
						needArriveTime = data.needArriveTime,
						goodsWeight = data.goodsWeight,
						status = data.status,
						needDriverNum = data.needDriverNum,
						ageTime = global.fromNow(data.ageTime),						
						quotedId = data.quotedId,
						statusCn = data.statusCn,
						allowBid = data.allowBid,
						isShowTime = data.isShowTime?data.isShowTime:"",
						actionList = data.actionList,
						goodsVolumne = data.goodsVolumne;
						$(".saveCarInfo").attr({"data-dnum":needDriverNum,"data-source":sourceId});

						if(senderAreaList.length>0){
							var senderAddr = data.senderAreaList.reverse();
							$.each(senderAddr, function(i, j){
								addr_str += j.regionName+" ";
							});
						}
						
						
						if(transferCodeC !=null ){
							transferCodeCHtml = '<span class="font14">经停</span>\
												<span class="font18">'+transferCodeC+'</span>\
												<span class="route_end"></span>';
						}

						if(hasBegin == 1){
							beginDay = ageTime +"结束";
						}else{
							beginDay = ageTime +"开始";
						}

						$(".doller").text(price);
						
						$(".remark_r").text(remark);
						var statusSp=["01","02","04","06","07"];

						if(gType == 1){
							if(status == "03"){
								GetRevDriver();
								$(".hyDialog").hide();
								$(".sp_style").css("padding","0");
								$(".giveUp").text("毁约");
							}else if(status =="05"){
								$(".giveUp").text("毁约");
								$(".ordinaryDialog").remove();
								$(".sp_style").css("padding","0")
								getBidVehicleInfo({"sourceId":sourceId});
							}else if($.inArray(status,statusSp) != -1){
								$(".sp_style").remove();
								if(status == "01"){
									$(".hyDialog").remove();
								}
							}

							if(actionList == null || actionList[0].name == "已关闭" && actionList.length>1){
								$(".price_r").remove();
							}
							if(isShowTime == false){
								beginDay = statusCn;
							}
						}else if(hasQuote > 0){
							$(".quoted_price").text("已报价");
						}else{
							$(".quoted_price").remove();
						}
						
						if(allowBid == false){
							$(".ishide").remove();
						}

                    var e = 
						$('<div class="content_l">\
							<p class="clearfix">\
								<span class="city">'+global.filterWord(startC)+'</span>\
								<span class="route_start"></span>\
								'+transferCodeCHtml+'\
								<span class="city">'+global.filterWord(endC)+'</span>\
							</p>\
							<p class="time">\
								<span>提货时间&nbsp;&nbsp;&nbsp;&nbsp;'+arriveCustomerTime+'</span>\
								<span class="arrive_time">到达时间&nbsp;&nbsp;&nbsp;&nbsp;'+needArriveTime+'</span>\
							</p>\
							<div class="car_detail clearfix">\
								<p class="detail_l">\
									<span>需求车型：</span>\
									<span class="m5">需求车长：</span>\
								</p>\
								<p class="detail_l w82">\
									<span>'+needType+'</span>\
									<span class="font18 m5">'+needLength+'米</span>\
								</p>\
								<p class="detail_l w110">\
									<span>货物吨位</span>\
									<span class="font18 m5">'+goodsWeight+'吨</span>\
								</p>\
								<p class="detail_l w105">\
									<span>货物体积</span>\
									<span class="font18 m5">'+goodsVolumne+'方</span>\
								</p>\
								<p class="detail_l w313">\
									<span>货物类型</span>\
									<span class="font18 m5">'+goodsName+'</span>\
								</p>\
							</div>\
							<p class="addr_detail">\
								<span class="name">广州志鸿物流有限公司</span>\
							 	<span class="address">提货地点:'+addr_str+'</span>\
							</p>\
						</div>\
						<div class="content_r">\
							<p class="font14">应标&nbsp;<i class="font18">'+quoteNum+'</i>&nbsp;人</p>\
							<p class="font18">'+beginDay+'</p>\
						</div>\
						<div class="tel">\
							<span class="consult">咨询电话</span>\
							<span class="num">400-800-0906</span>\
						</div>');
					$('.tit').text("货源编号:"+ sourceNo);
					$('.content').html(e);

					$(".resure>.sure").on("click",function(){
						var params = {"quotedId": quotedId,"sourceId": global.QueryString.id}
						if(gStatus == "got" || status =="05"){
							$.post(global.server + "/api/quoted/invalidTheBid",params,function(strData){
								if (strData && strData.status && strData.status.statusCode == global.status.success && gType==1) {
									$(".ishide").remove();
									$(".dialog_wrap").hide();
									setTimeout(function(){window.location.href=global.getContextPath()+"/order_detail.htm?quotedId="+quotedId+"&id="+sourceId+"&type=1";},2000)
								}
							})
						}else{
							$.post(global.server + "/api/quoted/closeQuotedInfo",params,function(strData){
								if (strData && strData.status && strData.status.statusCode == global.status.success && gType==1) {
									$(".dialog_wrap").hide();
									setTimeout(function(){window.location.reload();},2000)
								}
							})
						}
					});
                }		
		})
	}

	function GetRevDriver(){
		$.get(global.server + "/api/driver/getReviewedDriverAndVehicleList",function(strData){
			if (strData && strData.status && strData.status.statusCode == global.status.success) {
				var data = strData.data,html="",driverHtml="";
				$.each(data,function(i,item){
					html +='<span data-id="'+item.vehicleInfoId+'">'+item.plateNumber+'</span>';
					$.each(item.DriverInfo,function(s,items){
						driverHtml += '<span class="disabled" disabled="disabled" data-car="'+item.plateNumber+'" data-id="'+items.driverInfoId+'">'+items.realName+'</span>'
					})	
				})
				$(".carBrand").html(html);
				$(".nameBrand").html(driverHtml);
			}
		})
	}

	//获取中标运输车辆信息 
	function getBidVehicleInfo(param){
		$.get(global.server + "/api/quoted/getBidVehicleInfo",param,function(strData){
			if (strData && strData.status && strData.status.statusCode == global.status.success) {
				$(".saveCarInfo,.add").remove();
				$(".lstyle").css("margin-left","0")
				var data = strData.data,html="",driverHtml="",id="",carNo="";
				console.log(data.driverList);
				$.each(data.driverList,function(i,item){
					id = item.vehicleInfoId;
					if(carNo != item.plateNumber){
						html +='<span class="active" data-id="'+item.vehicleInfoId+'">'+item.plateNumber+'</span>';
					}
					driverHtml += '<span class="active" data-id="'+item.driverInfoId+'">'+item.realName+'</span>';

					carNo = item.plateNumber;
				})
				$(".select_car").on("click",function(){
					window.location.href=global.getContextPath() + "/driver_info.htm?vehicleInfoId="+id;
				})
				$(".carBrand").html(html);
				$(".nameBrand").html(driverHtml);
			}
		})
	}

	//完善资料  /api/quoted/finishQuotedInfo
	function finishQuotedInfo(params){
		$.post(global.server + "/api/quoted/finishQuotedInfo",params,function(strData){
			if (strData && strData.status && strData.status.statusCode == global.status.success) {
				$(".wscg").show();
				setTimeout(function(){window.location.href=global.getContextPath() + "/order_detail.htm"},2000)
			}
		})
	}

})();