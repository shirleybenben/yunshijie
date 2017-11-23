(function($){
	var map;
	$.fn.GdMap = function(options){
		var defaultValue = {
			name: "高德地图",
			version: "v1.0.0",
			okey: [],//历史路线
			exception: [],
			carNo: "沪A6545",//车牌
			exceptionName: [],
			addStar: "",//起点地址
			addEnd: "",//终点地址
			expSTime: [],//异常开始时间
			expETime: [],//异常结束时间
			speed: "xx.x Km/h"//速度
		},
			options = options;
		options = $.extend({},defaultValue,options||{}),
		_this = this,
		mapId = _this.selector.substring(1,_this.selector.length);

		//初始化地图
		map = new AMap.Map(mapId, {
	        resizeEnable: true,
	        zoom: 16 //地图显示的缩放级别
	    })

	    //显示车辆信息及当前位置
	    _this.showCarInfo = function(map){
			var lnglats= options.okey,
				lnglatsLen = lnglats.length-1,
				infoWindow = new AMap.InfoWindow({offset:new AMap.Pixel(10,-30)}),
				exceptions = options.exception,
				markers = [];
			for(var i=0;i< lnglats.length;i++){
				markers[i] = {
					position: lnglats[i]
				}
				if(i>1){
					switch(exceptions[i-2][0]){
						case "01":
							markers[i].icon = "img/abnormal_circle.png";
							markers[i].exception = "01"
						break;
						default: 
							markers[i].icon = "img/circle.png";
							markers[i].exception = "00"
						break;
					}
				}else{
					if(lnglats.length<3){
						switch(i){
							case 0:
								markers[i].icon = "img/end.png"
							break;
							case 1:
								markers[i].icon = "img/origin.png"
							break;
						}
					}else{
						switch(i){
							case 0:
								markers[i].icon = "img/origin.png"
							break;
							case 1:
								markers[i].icon = "img/end.png"
							break;
						}
					}
				}
			}

			for(var j=0;j< markers.length;j++){
				var marker = new AMap.Marker({
						offset: new AMap.Pixel(-10,-40),
						icon: markers[j].icon,
						map:map
					}),
					info=[],
					curSped ="";
					if(markers.length<3){
						marker.setPosition([markers[markers.length-1-j].position[1],markers[markers.length-1-j].position[0]])
					}else{
						marker.setPosition([markers[j].position[1],markers[j].position[0]])
					}
				if(j>1){
					if(options.speed[j] === null || options.speed[j] === undefined){
						curSped = "暂未获得数据"
					}else{
						curSped = options.speed[j];
					}
					if(markers[j].exception == "01"){
				        //构建信息窗体中显示的内容
				        info.push("<div style=\"font-size: 14px;\"><p><span style=\"width: 105px; display:inline-block;\">车牌号</span>"+options.carNo+"</p>");
				        info.push("<div style=\"font-size: 14px;\"><p><span style=\"width: 105px; display:inline-block;\">异常类型</span>"+options.exceptionName[j-2]+"</p>");
				        info.push("<div style=\"font-size: 14px;\"><p><span style=\"width: 105px; display:inline-block;\">异常开始时间</span>"+options.expSTime[j-2]+"</p>");
				        info.push("<div style=\"font-size: 14px;\"><p><span style=\"width: 105px; display:inline-block;\">异常结束时间</span>"+options.expETime[j-2]+"</p>");
				        info.push("<p><span style=\"width: 105px; display:inline-block;\">位置</span>"+markers[j].position[1]+","+ markers[j].position[0] +"</p>");
				        info.push("<p><span style=\"width: 105px; display:inline-block;\">行驶速度</span>"+curSped+"KM/H</p></div>");
					}else{
				        //构建信息窗体中显示的内容
				        info.push("<div style=\"font-size: 14px;\"><p><span style=\"width: 75px; display:inline-block;\">车牌号</span>"+options.carNo+"</p>");
				        info.push("<p><span style=\"width: 75px; display:inline-block;\">获取时间</span>"+options.expSTime[j-2] +"</p>");
				        info.push("<p><span style=\"width: 75px; display:inline-block;\">位置</span>"+markers[j].position[1]+","+ markers[j].position[0] +"</p>");
				        info.push("<p><span style=\"width: 75px; display:inline-block;\">行驶速度</span>"+curSped+"KM/H</p></div>");
					}
				}else{
					//设置起点终点的信息
					var address = "";
					if(markers.length<3){
						switch(j){
							case 0:
								address = options.addEnd;
							break;
							case 1:
								address = options.addStar;
							break;
						}
					}else{
						switch(j){
							case 0:
								address = options.addStar;
							break;
							case 1:
								address = options.addEnd;
							break;
						}
					}
					info.push("<div style=\"font-size: 14px;\"><p><span style=\"width: 40px; display:inline-block;\">地址:</span>"+address+"</p>");
				}

				marker.content=info.join("");
				marker.on('click',markerClick);
				marker.emit('click',{target:marker});
			}

			function markerClick(e){
				infoWindow.setContent(e.target.content);
				infoWindow.open(map, e.target.getPosition());
			}

			map.setFitView();
	    }

	    _this.getSTEPosition = function(startCity,endCity){
	        var geocoder = new AMap.Geocoder({
		            radius: 1000 
		        }),
	        	_self = this,
	        	key=0;
	        getPos(startCity);

	        //地理编码,返回地理编码结果
	        function getPos(city,con){
		        geocoder.getLocation(city, function(status, result) {
		            if (status === 'complete' && result.info === 'OK') {
		              	var geocode = result.geocodes;
			                options.okey.splice(0,1);
			                options.okey.splice(1,0,[""+geocode[0].location.lat,""+geocode[0].location.lng])
			            if(con){
			            	key++;
			            	map.setCenter([options.okey[options.okey.length-1][1], options.okey[options.okey.length-1][0]]);
					        setTimeout(function(){
								_self.showCarInfo(map);
					        },100)
			            }
			            if(key == 0){
	        				getPos(endCity,"end");
			            }
		            }
		        })
	        }
	    }

	    _this.init = function(){
	    	var _self = this;
		    	_self.getSTEPosition(options.okey[0],options.okey[1]);
	    }

		_this.init();
		return map;
	}
})(jQuery)


var marker,infoWindow= new AMap.InfoWindow({offset:new AMap.Pixel(0,-30)});

function MarkerAction(){}

MarkerAction.prototype.addMarker = function(map,options){
	marker = new AMap.Marker({
		icon: "img/loc.png",
		position: options.position
	});
	marker.setMap(map);
	var info = reInfo(options);
    marker.content = info.join("");
    marker.on('click',function(e){
    	infoWindow.setContent(e.target.content);
		infoWindow.open(map, options.position);
    });
	marker.emit('click',{target:marker});
}

MarkerAction.prototype.updateMarker = function(map,options){
	var info = reInfo(options);
    marker.content = info.join("");
	marker &&　marker.setPosition(options);
	marker.on('click',function(e){
    	infoWindow.setContent(e.target.content);
		infoWindow.open(map, options.options);
    });
	marker.emit('click',{target:marker});
}


function reInfo(options){
	var info=[];
    info.push("<div style=\"font-size: 14px;\"><p><span style=\"width: 75px; display:inline-block;\">车牌号</span>"+options.carNo+"</p>");
    info.push("<p><span style=\"width: 75px; display:inline-block;\">获取时间</span>"+options.feedbackTime +"</p>");
    info.push("<p><span style=\"width: 75px; display:inline-block;\">位置</span>"+options.position[0]+","+ options.position[0] +"</p>");
    info.push("<p><span style=\"width: 75px; display:inline-block;\">行驶速度</span>"+options.speed+"KM/H</p></div>");
    return info;
}