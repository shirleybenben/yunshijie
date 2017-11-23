var getCountrySelect = {
	getSecondLevel: function(){//二级:区县
		var level ={};
		return function(level){
			$.get(global.server+"/api/region/findByCode",level,function(strData){
				if (strData && strData.status && strData.status.statusCode == global.status.success) {
					var subRegion = strData.data,optList="",lineId="",el;
					$(".class_"+level.class).empty();
					$.each(subRegion, function(i, item){
						var regionName = item.regionName,parentCode = item.regionCode;
						el=$("<li value="+parentCode+">"+regionName+"</li>");
						$(".class_"+level.class).attr("ref",lineId).append(el);
					})
					if(global.QueryString.key){
						lineId = global.QueryString.key;
					}
					setTimeout(function(){
						$(".select_ol").mCustomScrollbar();
					},100)
				}
			})
		}
	}
}
