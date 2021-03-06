(function(window,angular,undefined){
	'use strict';
	var services = angular.module('main_services',['ngResource','ngRoute'])
	// .factory('getRecoSour',getRecoSour)
	.factory('getRecommendSource',getRecommendSource)
	.factory('getRList',getRList)
	.factory('getRecordList',getRecordList)
	.factory('getloadId',getloadId)
	.factory('getQOList',getQOList)///api/quoted/getQuotedOrderList
	.factory('getQuotedOrderList',getQuotedOrderList)
	.factory('loaBillQuery',loaBillQuery)///api/quoted/getLoaBillByQuotedId
	.factory('getLoaBill',getLoaBill)
	.factory('trackInfoQuery',trackInfoQuery)///api/trip/trackInfo
	.factory('getTrackInfo',getTrackInfo)
	.factory('geoQuery',geoQuery)///api/trip/getgeo
	.factory('getGeo',getGeo)
	.factory('getUnreadMessageCount',getUnreadMessageCount)///api/message/getUnreadMessageCount
	.factory('getMessageList',getMessageList)
	.factory('getInfo',getInfo)///api/source/info
	.factory('doAddQuote',doAddQuote)
	.service('driverLen',getDriverLen)
	.service('getAgent',getAgent)///api/agent/query
	.factory('getUserhead',getUserhead)///api/account/userhead
	.factory('getLineListQuery',getLineListQuery)
	.factory('getLineList',getLineList)
	.factory('selectLines',selectLines)
	.factory('getallLinesQuery',getallLinesQuery)
	.factory('getallLines',getallLines)
	.service('getPageIndex',getPageIndex)
	.service('lineId',getLineId)
	.factory('getCityQuery',getCityQuery)
	.factory('getCity',getCity)
	.factory('addLine',addLine)
	.factory('delLine',delLine)
	.factory('subRegionQuery',subRegionQuery)
	.factory('getSubReg',getSubReg)
	.factory('defSupCode',reSupCode)
	.factory('qOrderDetailQuery',qOrderDetailQuery)///api/quoted/getQuotedOrderDetail
	.factory('getQuotedDeatil',getQuotedDeatil)
	.service('driverLen',getDriverLen)
	.factory('getRecordList',getRecordList)
	.factory('closeQuotedInfo',closeQuotedInfo)
	.factory('invalidTheBid',invalidTheBid)
	.factory('doAddQuote',doAddQuote)

	function invalidTheBid($resource){
		return $resource(global_config.server+"/api/quoted/invalidTheBid",{},{
	        break:{
	            method:"POST",
	            headers:{
	            	'Authorization':global.getUserId() + ':' + global.getToken()
	            }
	        }
	    })
	}
	invalidTheBid.$inject=['$resource']

	function closeQuotedInfo($resource){
		return $resource(global_config.server+"/api/quoted/closeQuotedInfo",{},{
	        giveUp:{
	            method:"POST",
	            headers:{
	            	'Authorization':global.getUserId() + ':' + global.getToken()
	            }
	        }
	    })
	}
	closeQuotedInfo.$inject=['$resource']	

	function doAddQuote($resource){
		return $resource(global_config.server+"/api/quoted/addQuotedInfo",{},{
	        saveQuote:{
	            method:"POST",
	            headers:{
	            	'Authorization':global.getUserId() + ':' + global.getToken()
	            }
	        }
	    })
	}
	doAddQuote.$inject=['$resource']	

	function getRecordList($resource){
		return $resource(global_config.server+"/api/record/getRecordList",{},{
	        get:{
	            method:"GET",
	            headers:{
	            	'Authorization':global.getUserId() + ':' + global.getToken()
	            }
	        }
	    })
	}
	getRecordList.$inject = ['$resource']

	function getDriverLen(){
		return {
			len: "",
			status: "",
			price: "",
			mark:""
		}
	}

	function qOrderDetailQuery($resource){
		return $resource(global_config.server+"/api/quoted/getQuotedOrderDetail",{},{
	        get:{
	            method:"GET",
	            headers:{
	            	'Authorization':global.getUserId() + ':' + global.getToken()
	            }
	        }
	    })
	}
	qOrderDetailQuery.$inject = ['$resource']

	function getQuotedDeatil(qODQ,$q,$log){
		return function(){
			var delay = $q.defer();
			qODQ.get({quotedId:global.QueryString.quotedId},function(data){
				delay.resolve(data)
			},function(){
				delay.reject('Error');
			})
			return delay.promise;
		}
	}
	getQuotedDeatil.$inject =['qOrderDetailQuery','$q','$log']	

	function reSupCode(){
		return {
			code: ""
		}
	}

	function subRegionQuery($resource){
		return $resource(global_config.server+"/api/region/findByCode",{},{
	        get:{
	            method:"GET",
	            headers:{
	            	'Authorization':global.getUserId() + ':' + global.getToken()
	            }
	        }
	    })
	}
	subRegionQuery.$inject = ['$resource']

	function getSubReg(sRQ,dcode,$q,$log){
		return function(){
			var delay = $q.defer();
			sRQ.get({regionCode: dcode.code},function(data){
				delay.resolve(data)
			},function(){
				delay.reject('Error');
			})
			return delay.promise;
		}
	}
	getSubReg.$inject =['subRegionQuery','defSupCode','$q','$log']

	function delLine($resource){
		return $resource(global_config.server+"/api/line/delLine",{}, {
			deleteLine:{
				method:"POST",
				headers:{
					'Authorization':global.getUserId() + ':' + global.getToken()
				}
			}
		})
	}

	function addLine($resource){
		return $resource(global_config.server+"/api/line/addLine",{},{
	        saveLine:{
	            method:"POST",
	            headers:{
	            	'Authorization':global.getUserId() + ':' + global.getToken()
	            }
	        }
	    })
	}
	addLine.$inject=['$resource']

	function getCityQuery($resource){
		return $resource(global_config.server+"/api/region/list",{},{
	        get:{
	            method:"GET",
	            headers:{
	            	'Authorization':global.getUserId() + ':' + global.getToken()
	            }
	        }
	    })
	}
	getCityQuery.$inject = ['$resource']

	function getCity(gCQ,$q,$log){
		return function(){
			var delay = $q.defer();
			gCQ.get(function(data){
				delay.resolve(data)
			},function(){
				delay.reject('Error');
			})
			return delay.promise;
		}
	}
	getCity.$inject = ['getCityQuery','$q','$log']

	function getLineId(){//controller间通讯
		return {
			lineId:""
		}
	}

	function getPageIndex(){
		return {
			index: "0"
		}
	}

	function getallLinesQuery($resource){
		return $resource(global_config.server+"/api/source/query",{},{
	        get:{
	            method:"GET",
	            headers:{
	            	'Authorization':global.getUserId() + ':' + global.getToken()
	            }
	        }
	    })
	}
	getallLinesQuery.$inject = ['$resource']

	function selectLines($resource){
		return $resource(global_config.server+"/api/source/query", {}, {
	        get:{
	            method:"GET",
	            headers:{
	            	'Authorization':global.getUserId() + ':' + global.getToken()
	            }
	        }
	    })
	}
	selectLines.$inject=['$resource']

	function getallLines(gAQ,lineId,pageIndex,$location,$route,$q,$log){
		return function(){
			var delay = $q.defer();
			gAQ.get({lineId:lineId.lineId,pageIndex:pageIndex.index,pageSize:5},function(data){
				delay.resolve(data)
			},function(){
				delay.reject('Error');
			})
			return delay.promise;
		}
	}
	getallLines.$inject = ['getallLinesQuery','lineId','getPageIndex','$location','$route','$q','$log']

	function getLineListQuery($resource){
		return $resource(global_config.server+"/api/line/getLineList",{},{
	        get:{
	            method:"GET",
	            headers:{
	            	'Authorization':global.getUserId() + ':' + global.getToken()
	            }
	        }
	    })
	}
	getLineListQuery.$inject = ['$resource'];

	function getLineList(gLQ,$q,$log){
		return function(){
			var delay = $q.defer();
			gLQ.get(function(data){
				delay.resolve(data);
			},function(){
				delay.reject('Error');
			})
			return delay.promise;
		}
	}
	getLineList.$inject =['getLineListQuery','$q','$log']

	function getUserhead($resource){
		return $resource(global_config.server+"/api/account/userhead",{},{
	        get:{
	            method:"get",
	            headers:{
	            	'Authorization':global.getUserId() + ':' + global.getToken()
	            }
	        }
	    })
	}
	getUserhead.$inject=['$resource']

	function getAgent($resource){
		return $resource(global_config.server+"/api/agent/query",{},{
	        get:{
	            method:"get",
	            headers:{
	            	'Authorization':global.getUserId() + ':' + global.getToken()
	            }
	        }
	    })
	}
	getAgent.$inject=['$resource']

	function getDriverLen(){
		return {
			len: "",
			status: "",
			price: "",
			mark:""
		}
	}

	function doAddQuote($resource){
		return $resource(global_config.server+"/api/quoted/addQuotedInfo",{},{
	        saveQuote:{
	            method:"POST",
	            headers:{
	            	'Authorization':global.getUserId() + ':' + global.getToken()
	            }
	        }
	    })
	}
	doAddQuote.$inject=['$resource']	

	function getInfo($resource){
		return $resource(global_config.server+"/api/source/info",{},{
	        get:{
	            method:"GET",
	            headers:{
	            	'Authorization':global.getUserId() + ':' + global.getToken()
	            }
	        }
	    });
	}
	getInfo.$inject = ['$resource']

	function getMessageList($resource){
		return $resource(global_config.server+"/api/message/getMessageList",{},{
	        get:{
	            method:"GET",
	            headers:{
	            	'Authorization':global.getUserId() + ':' + global.getToken()
	            }
	        }
	    });
	}
	getMessageList.$inject = ['$resource']

	function getUnreadMessageCount($resource){
		return $resource(global_config.server+"/api/message/getUnreadMessageCount",{},{
	        get:{
	            method:"GET",
	            headers:{
	            	'Authorization':global.getUserId() + ':' + global.getToken()
	            }
	        },
	    });
	}
	getUnreadMessageCount.$inject = ['$resource']

	function geoQuery($resource){
		return $resource(global_config.server+"/api/trip/getgeo",{},{
	        get:{
	            method:"GET",
	            headers:{
	            	'Authorization':global.getUserId() + ':' + global.getToken()
	            }
	        },
	    });
	}
	geoQuery.$inject=['$resource'];

	function getGeo(gQy,$q,$log){
		return function(){
			var delay = $q.defer();
			gQy.get({loadId: global.QueryString.loadId},function(data){
				delay.resolve(data);
			},function(){
				delay.reject('Error');
			})
			return delay.promise;
		}
	}
	getGeo.$inject=['geoQuery','$q','$log'];


	function trackInfoQuery($resource){
		return $resource(global_config.server+"/api/trip/trackInfo",{},{
	        get:{
	            method:"GET",
	            headers:{
	            	'Authorization':global.getUserId() + ':' + global.getToken()
	            }
	        },
	    });
	}
	trackInfoQuery.$inject=['$resource'];

	function getTrackInfo(tIQ,$q,$log){
		return function(){
			var delay = $q.defer();
			tIQ.get({loadId: global.QueryString.loadId},function(data){
				delay.resolve(data);
			},function(data){//待整理
				if(data.statusText=="Forbidden" && data.status == "403"){
					$.cookie("user","");
					window.confirm("您的帐号已经被登出");
	                window.location.href = global.getContextPath()+"/login.htm"
	            }
				delay.reject('Error');
			})
			return delay.promise;
		}
	}
	getTrackInfo.$inject=['trackInfoQuery','$q','$log'];

	function loaBillQuery($resource){
		return $resource(global_config.server+"/api/quoted/getLoadBillByQuotedId",{},{
	        get:{
	            method:"GET",
	            headers:{
	            	'Authorization':global.getUserId() + ':' + global.getToken()
	            }
	        },
	    });
	}
	loaBillQuery.$inject=['$resource'];

	function getLoaBill(lBQ,$q,$log){
		return function(){
			var delay = $q.defer();
			lBQ.get({quotedId: global.QueryString.quotedId},function(data){
				delay.resolve(data);
			},function(){
				delay.reject('Error');
			})
			return delay.promise;
		}
	}
	getLoaBill.$inject=['loaBillQuery','$q','$log'];


	function getQOList($resource){
		return $resource("/text.json");
	}
	getQOList.$inject=['$resource'];

	function getQuotedOrderList(gQ,$q,$log){
		return function(){
			var delay = $q.defer();
			gQ.get({sourceType:'0'},function(data){
				delay.resolve(data);
			},function(){
				delay.reject('Error');
			})
			return delay.promise;
		}
	}
	getQuotedOrderList.$inject=['getQOList','$q','$log'];

	function getRecommendSource($resource){
		return $resource(global_config.server+"/api/source/getRecommendSource",{},{
	        get:{
	            method:"GET",
	            headers:{
	            	'Authorization':global.getUserId() + ':' + global.getToken()
	            }
	        },
	    });
	}
	getRecommendSource.$inject=['$resource'];

	// function getRecommendSource(gR,$q,$log){
	// 	return function(){
	// 		var delay = $q.defer();
	// 		gR.get({sourceCount:'4'},function(data){
	// 			delay.resolve(data);
	// 		},function(){
	// 			delay.reject('Error');
	// 		})
	// 		return delay.promise;
	// 	}
	// }
	// getRecommendSource.$inject=['getRecoSour','$q','$log'];

	function getloadId(){
		return {
			loadId: ""
		}
	}

	function getRList($resource){
		return $resource(global_config.server+"/api/record/getRecordList",{},{
	        get:{
	            method:"GET",
	            headers:{
	            	'Authorization':global.getUserId() + ':' + global.getToken()
	            }
	        },
	    });
	}

	getRList.$inject=['$resource'];

	function getRecordList(gL,loadId,$q,$route,$location,$log){
		return function(){
			var delay = $q.defer();
			gL.get({remarkType:'05',targetId: loadId.loadId},function(data){
				delay.resolve(data);
			},function(){
				delay.reject('Error');
			})
			return delay.promise;
		}
	}
	getRecordList.$inject=['getRList','getloadId','$q','$route','$location','$log'];
})(window,window.angular)
