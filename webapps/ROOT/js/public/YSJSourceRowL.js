var YSJSourceRowL = function(data){
	
	this.template = function (data) {
			var needLength = data.needLength,
				arriveCustomerTime = data.arriveCustomerTime,
				quoteNum = data.quoteNum,
				startCodeC = data.startCodeCCn?data.startCodeCCn:data.startCodePCn,
				endCodeC = data.endCodeCCn?data.endCodeCCn:data.endCodePCn,
				needType = data.needType,
				needLength = data.needLength,
				goodsWeight = data.goodsWeight;
			
			var goodsVolumne = data.goodsVolumne;
			
			var goodsName = data.goodsName,
				status = data.status,
				sourceId = data.sourceId,
				quotedId = data.quotedId,
				statusCn = data.statusCn,
				hasBegin = data.hasBegin,
				ageTime = global.fromNow(data.ageTime);
			
			var el = $('<li> \
					<div class="list_top clearfix"> \
						<div class="list_top_l"> \
							<span class="city">'+global.filterWord(startCodeC)+'</span> \
							<span class="route_bg"></span> \
							<span class="city">'+global.filterWord(endCodeC)+'</span> \
						</div> \
						<div class="list_top_r">提货时间　　'+arriveCustomerTime+'</div> \
						<div class="list_con_r"> \
							<p class="num">应标&nbsp;<span>'+quoteNum+'</span>&nbsp;人</p> \
							<p class="end">已中标</p> \
						</div> \
					</div> \
					<div class="list_con clearfix"> \
						<div class="list_con_l"> \
							<p class="vehicle_l w97"> \
								<span>需求车长</span> \
								<span class="txt font18">'+needLength+'米</span> \
							</p> \
							<p class="vehicle_l w97"> \
								<span>车型</span> \
								<span class="txt font18">'+needType+'</span> \
							</p> \
							<p class="vehicle_l w97"> \
								<span>货物重量</span> \
								<span class="txt font18">'+goodsWeight+'吨</span> \
							</p> \
							<p class="vehicle_l w97"> \
								<span>体积</span> \
								<span class="txt font18">'+goodsVolumne+'方</span> \
							</p> \
							<p class="vehicle_l w97"> \
								<span>类型</span> \
								<span class="txt font18">'+goodsName+'</span> \
							</p> \
						</div> \
						<a class="goto_detail" href="javascript:void(0)">查看详情</a> \
					</div> \
					<div class="list_con_m clearfix"> \
						<p class="name">广州志鸿物流有限公司</p> \
						<p class="addr">提货地点：<span>广东省&nbsp;&nbsp;广州市</span></p> \
					</div> \
					<button class="quoted_price"></button> \
			</li>');
			if(data.type == 1){
				switch(statusCn){
					case "已中标":
						el.find(".goto_detail").attr("href","order_detail_perfectinfo.htm?quotedId="+quotedId+"&id="+sourceId+"&type=1&statusCn=got&status="+status);
					break;
					case "在途中":
						el.find(".goto_detail").attr("href","order_detail_transitinfo.htm?quotedId="+quotedId+"&id="+sourceId+"&type=1&"+"status="+status);
					break;
					default:
						el.find(".goto_detail").attr("href","order_detail.htm?quotedId="+quotedId+"&id="+sourceId+"&type=1");
					break;
				}
			}else{
				el.find(".goto_detail").attr({"href":"supply_detail.htm?id="+sourceId,"target":"_blank"});
			}
			
			if(data.hasQuote==0 || data.type==1){
				el.find('.quoted_price').remove();
			}
			if(hasBegin == 0){
				el.find('p.end').text(ageTime+"开始").addClass("start");
			}else{
				el.find('p.end').text(ageTime+"结束");
			}
			
			if(data.type==1){
				if(status!='01'){
					el.find('p.end').text(statusCn);
					switch(status){
						case "05":
							el.find('p.end').addClass("transit");
						break;
						case "04":
							el.find('p.end').addClass("cancel");
						break;
						case "03":
							el.find('p.end').addClass("bid");
						break;
						case "02":
							el.find('p.end').addClass("close");
						break;
						case "06":
							el.find('p.end').addClass("over");
						break;
					}
				}
			}
			var addr_str = "";
			if(data.senderAreaList.length>0){
				var senderAddr = data.senderAreaList.reverse();
				$.each(senderAddr, function(i, j){
					addr_str += j.regionName+" ";
				});
			}
			el.find('.addr span').text(addr_str);
			return el;
		};
	
	return this.template(data);
}