(function(window,angular,undefined){
	var editApp = angular.module("editApp",['main_services','main_filters','main_directives','ngRoute','lazyload']).controller('navState',navState)
	.controller('head',head)
	.controller('getRecommendSource',getRSource)
	.controller('getQOList',getQOList)
	.controller('getLoaBill',getLoaBill)
	.controller('getTrackInfo',getTrackInfo)
	.controller('getMessageList',getMessageList)
	.controller('getUnreadMessageCount',getUnreadMessageCount)
	.controller('getInfo',getInfo)
	.controller('addQuote',addQuote)
	.controller('getAgent',getAgent)
	.controller('supplyHall_getLineList',getLineList)
	.controller('getCity',getCity)
	.controller('getQuotedDeatil',getQuotedDeatil)
	.controller('closeQuotedInfo',closeQuotedInfo)
	.controller('getOrderList',getOrderList)
	.controller('login',personLogin)
	.controller('pageDAVList',pageDAVList)
	.controller('qDVDeatil',qDVDeatil)
	.controller('getVehicleInfo',getVehicleInfo)
	.controller('getDriverInfo',getDriverInfo)
	.controller('queryHall',queryHall)
	.config(function ($routeProvider, $httpProvider) {
	    $httpProvider.interceptors.push('responseObserver');
	})

	function head($scope,$log){
		$scope.path = global.getContextPath()+"/img/bitbug_favicon.ico";
	}
	head.$inject=['$scope','$log']
	function queryHall(queryHall,$scope,$log){
		$scope.key = global.QueryString.queryContent;
		var params={
			queryContent: global.QueryString.queryContent,
			pageSize:5
		}
		queryHall.get(params,{},function(strData){
			$scope.lines = strData.data.rows;
			$scope.lineLen = strData.data.rows.length;
			$scope.isExit = strData.data.rows.length>0?true:false;
			if($scope.lineLen>0){
				new Pagination({
	        		page:$("#kkpager"),
	        		totalPage: strData.data.pageCount,
	        		currentPage : strData.data.current+1,
	        		onSwitch : function(n){
						var _index = n-1;
						params.pageIndex = _index;
						queryHall.get(params,{},function(strData){
							$scope.lines = strData.data.rows;
						})
					}
	        	})
			}else{
				$("#kkpager").empty();
			}
		})
	}
	queryHall.$inject=['queryHall','$scope','$log']

	function getDriverInfo(getDriverInfo,$scope,$log){
		getDriverInfo.get({driverInfoId: global.QueryString.id},{},function(strData){
			$scope.driverInfo = strData.data;
			$scope.server = global.server+'/api/image/';
            $scope.cut = '?width=96&height=64&cut=1';
            $scope.bigcut = '?width=794&height=485&cut=1';
            var defaultPic = global.getContextPath()+"/img/img_default.png";
            $scope.idFImageRefId = $scope.driverInfo.idFImageRefId?$scope.server+$scope.driverInfo.idFImageRefId+$scope.cut:defaultPic;
            $scope.idBImageRefId = $scope.driverInfo.idBImageRefId?$scope.server+$scope.driverInfo.idBImageRefId+$scope.cut:defaultPic;
            $scope.drivingFImageRefId = $scope.driverInfo.drivingFImageRefId?$scope.server+$scope.driverInfo.drivingFImageRefId+$scope.cut:defaultPic;
            $scope.qualifiImageRefId = $scope.driverInfo.qualifiImageRefId?$scope.server+$scope.driverInfo.qualifiImageRefId+$scope.cut:defaultPic;
            $scope.qualifiImage2RefId = $scope.driverInfo.qualifiImage2RefId?$scope.server+$scope.driverInfo.qualifiImage2RefId+$scope.cut:defaultPic;
            $scope.showImg = function(e){
                var dom = $(e.target).attr("attr-src"),p = dom.split("image/"),
                    title = $(e.target).parents("li").find(".text").text();
                if(p[1]!=""){
                    $(".tit").text(title);
                    $(".bigImg img").attr("src",dom+$scope.bigcut);
                    $("#bigImg").removeClass("hide");
                }
            }
            $scope.close = function(){
                $("#bigImg").addClass("hide");
            }
		})
	}
	getDriverInfo.$inject=['getDriverInfo','$scope','$log']

	function getVehicleInfo(getVehicleInfo,$scope,$log){
		getVehicleInfo.get({vehicleInfoId: global.QueryString.id},{},function(strData){
			$scope.carInfo = strData.data;
			$scope.server = global.server+'/api/image/';
            $scope.cut = '?width=96&height=64&cut=1';
            $scope.bigcut = '?width=794&height=485&cut=1';
            var defaultPic = global.getContextPath()+"/img/img_default.png";
            $scope.licenseImageRefId = $scope.carInfo.licenseImageRefId?$scope.server+$scope.carInfo.licenseImageRefId+$scope.cut:defaultPic;
            $scope.licenseImage2RefId = $scope.carInfo.licenseImage2RefId?$scope.server+$scope.carInfo.licenseImage2RefId+$scope.cut:defaultPic;
            $scope.ocImageRefId = $scope.carInfo.ocImageRefId?$scope.server+$scope.carInfo.ocImageRefId+$scope.cut:defaultPic;
            $scope.ocImage2RefId = $scope.carInfo.ocImage2RefId?$scope.server+$scope.carInfo.ocImage2RefId+$scope.cut:defaultPic;
			$scope.ocImage3RefId = $scope.carInfo.ocImage3RefId?$scope.server+$scope.carInfo.ocImage3RefId+$scope.cut:defaultPic;
            $scope.ciImageRefId = $scope.carInfo.ciImageRefId?$scope.server+$scope.carInfo.ciImageRefId+$scope.cut:defaultPic;
            $scope.viImageRefId = $scope.carInfo.viImageRefId?$scope.server+$scope.carInfo.viImageRefId+$scope.cut:defaultPic;
            $scope.showImg = function(e){
                var dom = $(e.target).attr("attr-src"),p = dom.split("image/"),
                    title = $(e.target).parents("li").find(".text").text();
                if(p[1]!="") {
                    $(".tit").text(title);
                    $(".bigImg img").attr("src", dom+$scope.bigcut);
                    $("#bigImg").removeClass("hide");
                }
            }
            $scope.close = function(){
                $("#bigImg").addClass("hide");
            }
		})
	}
	getVehicleInfo.$inject=['getVehicleInfo','$scope','$log']

	function qDVDeatil(qDVDeatil,$scope,$log){
		var params={
			vehicleInfoId: global.QueryString.id
		}
		qDVDeatil.post({vehicleInfoId:global.QueryString.id},{},function(strData){
		})
	}
	qDVDeatil.$inject=['qDVDeatil','$scope','$log']

	function pageDAVList(pageDAVList,$scope,$log){
		var params = {
			status: "00",
			pageSize: 4
		}
		pageDAVList.post(params,{},function(strData){
			$scope.lists = strData.data.rows;
			$scope.lineLen = strData.data.rows.length;
			if($scope.lineLen>0){
				new Pagination({
	        		page:$("#kkpager"),
	        		totalPage: strData.data.pageCount,
	        		currentPage : strData.data.current+1,
	        		onSwitch : function(n){
						var _index = n-1;
						params.pageIndex = _index;
						pageDAVList.post(params,{},function(strData){
							$scope.lists = strData.data.rows;
						})
					}
	        	})
			}else{
				$("#kkpager").empty();
			}
		})

		$scope.searchByCNo = function(){
			params.pageIndex= 0;
			$("#kkpager").empty();
			var carNo = $("#queryContent").val();
            carNo = carNo.replace(/\s/g,"");
			params.keyWord = carNo;
			pageDAVList.post(params,{},function(strData){
				$scope.lists = strData.data.rows;
				$scope.lineLen = strData.data.rows.length;
				if($scope.lineLen>0){
					new Pagination({
						page:$("#kkpager"),
						totalPage: strData.data.pageCount,
						currentPage : strData.data.current+1,
						onSwitch : function(n){
							var _index = n-1;
							params.pageIndex = _index;
							pageDAVList.post(params,{},function(strData){
								$scope.lists = strData.data.rows;
							})
						}
					})
				}else{
					$("#kkpager").empty();
				}
			})
		}

		$scope.changeTab = function(index,value){
			delete params.keyWord;
			$("#queryContent").val("");
			$scope.status=value;
			$(".tab:eq("+index+")").addClass("current").siblings().removeClass("current");
			params.status = value;
			params.pageIndex = 0;
			pageDAVList.post(params,{},function(strData){
				$scope.lists = strData.data.rows;
				$scope.lineLen = strData.data.rows.length;
				if($scope.lineLen>0){
					new Pagination({
		        		page:$("#kkpager"),
		        		totalPage: strData.data.pageCount,
		        		currentPage : strData.data.current+1,
		        		onSwitch : function(n){
							var _index = n-1;
							params.pageIndex = _index;
							pageDAVList.post(params,{},function(strData){
								$scope.lists = strData.data.rows;
							})
						}
		        	})
				}else{
					$("#kkpager").empty();
				}
			})
		}
	}
	pageDAVList.$inject=['pageDAVList','$scope','$log']

	function personLogin(login,isExit,$scope,$log,$window){
		$scope.close = function(){
			$("#tel").val("").addClass("clear");
		}

		$scope.keyDown = function(){
			$("#tel").removeClass("clear");
		}

		$scope.login = function(){
			var params = {
					telphone: $("#tel").val(),
					password: $("#pwd").val(),
					deviceType: "01",
					source: "02"
				};
			if(params.telphone && params.password){
				login.post(params,{},function(strData){
					switch(strData.status.statusCode){
						case "11004":
							$(".error").text("请输入正确的手机号").show();
						break;
						case "11018":
							$(".error").text("手机号未注册,请到APP端注册").show();
						break;
						case "11027":
							$(".error").text("密码不正确,忘记密码请到APP端找回").show();
						break;
						case "11024":
							$(".error").text("该用户已被删除").show();
						break;
						case "11025":
							$(".error").text("用户状态异常").show();
						break;
						case "11037":
							$(".error").text("WEB网站只允许审核通过的经纪人才能访问").show();
						break;
						case "200":
							global.login(strData.data);
							if($.cookie("currentLink") && $.cookie("currentLink")!="null"){
								$window.location =global.getContextPath() +"/"+ $.cookie("currentLink");
							}else{
								$window.location =global.getContextPath() + "/index.htm"
							}
						break;
					}
				})
			}else{
				$(".error").text("请输入手机号和密码").show();
			}
		}
	}
	personLogin.$inject=['login','isExit','$scope','$log','$window']

	function getOrderList(getOrderList,pageIndex,param,$scope,$log){
		$scope.numPages = [];
		$scope._index = 0;
		getOrderList().then(function(strData){
			$scope.lines = strData.data.rows;
			$scope.lineLen= $scope.num = strData.data.rows.length;
			$scope.isExit = strData.data.rows.length>0?true:false;
			if($scope.lineLen>0){
				new Pagination({
	        		page:$("#kkpager"),
	        		totalPage: strData.data.pageCount,
	        		currentPage : strData.data.current+1,
	        		onSwitch : function(n){
						var _index = n-1;
						pageIndex.index = _index;
						getOrderList().then(function(strData){
							$scope.lines = strData.data.rows;
						})
					}
	        	})
			}else{
				$("#kkpager").empty();
			}
		})

		$scope.changeOrderList = function(index){
			pageIndex.index = 0;
			param.sourceType = index;
			$scope._index = index;
			getOrderList().then(function(strData){
				$scope.lines = strData.data.rows;
				$scope.lineLen = strData.data.rows.length;
				$scope.isExit = strData.data.rows.length>0?true:false;
				if($scope.lineLen>0){
					new Pagination({
		        		page:$("#kkpager"),
		        		totalPage: strData.data.pageCount,
		        		currentPage : strData.data.current+1,
		        		onSwitch : function(n){
							var _index = n-1;
							pageIndex.index = _index;
							getOrderList().then(function(strData){
								$scope.lines = strData.data.rows;
							})
						}
		        	})
				}else{
					$("#kkpager").empty();
				}
			})
		}
	}
	getOrderList.$inject =['getOrderList','getPageIndex','defOrderParam','$scope','$log']

	function navState($scope,$location,$log){
		var href = $location.absUrl();
		if(href.indexOf("supply")>=0){
			$scope.states = 2;
		}else if(href.indexOf("index")>=0){
			$scope.states = 1;
		}else if(href.indexOf("order")>=0 || href.indexOf("location")>=0){
			$scope.states = 3;
		}else if(href.indexOf("center_basicinfo")>=0){
			$scope.states = 5;
		}

		$scope.saveLink = function(e){
			var link = $(e.target).attr("attr-mark")+".htm",opt ={expires : 365};
			$.cookie("currentLink",link, opt);
		}
	}
	navState.$inject=['$scope','$location','$log']

	function closeQuotedInfo(closeQuoted,invalidTheBid,$timeout,$scope,$log){
		var params={
			sourceId: global.QueryString.id
		}
		$scope.giveUpPrice = function(){
			closeQuoted.giveUp(params,{},function(strData){
				$(".closePrice_dialog").addClass("hide_dialog");
				if(strData.status.statusCode =="200"){
					$(".cancelPrice_success").removeClass("hide_dialog");
					$timeout(function(){
						window.location.href=global.getContextPath()+"/my_order.htm"
					},2000)
				}else{
					$scope.errorMsg = strData.status.errorMsg;
					$(".cancelPrice_fail").removeClass("hide_dialog");
					return false;
				}
			})
		}

		$scope.cancel = function(){
			$(".dialog_wrap").addClass("hide_dialog");
		}
	}
	closeQuotedInfo.$inject=['closeQuotedInfo','invalidTheBid','$timeout','$scope','$log']

	function getQuotedDeatil($window,$timeout,$http,invalidTheBid,getLoadBillByQuotedId,getBidVehicleInfo,gRS,getQuotedDeatil,getRecordList,gRDList,finishQuotedInfo,$scope,$rootScope,$log){
		getQuotedDeatil().then(function(data){
			$scope.info = data.data;
			var price = $scope.info.price.split(".")[0];
			if(price.length==4){
				$scope.info.price = price.substring(0,1) + "," + price.substring(1,4)+".00";
			}else if(price.length>4){
				$scope.info.price = price.substring(0,price.length-3)+ "," + price.substring(price.length-3,price.length)+".00";
			}
		}).then(function(){
			var gbParams = {
				"sourceCount": "4",
				"startCodeP": $scope.info.endCodeP,
				"endCodeP": $scope.info.startCodeP
			}
			gRS.get(gbParams,{},function(strData){
				$scope.items = strData.data;
				$scope.len = strData.data.length;
			})

			if($scope.info.status == "05" || $scope.info.status == "09" || $scope.info.status == "10"){
				var params= {
					"targetId": $scope.info.loadInfo.loadId,
					"remarkType": "05"
				}
				if(params.targetId){
					getRecordList.get(params,{},function(strData){
						$scope.news = strData.data;
						$scope.server = global.server+'/api/image/';
                        $scope.cut = '?width=96&height=54&cut=1';
                        $scope.bigcut = '?width=794&height=485&cut=1';
					})
				}
				getBidVehicleInfo.get({sourceId:$scope.info.sourceId},{},function(strData){
					$scope.driverInfo = strData.data;
				})
				getLoadBillByQuotedId.get({quotedId:$scope.info.quotedId},{},function(strData){
					$scope.loadBillInfo = strData.data;
				})
			}
			if($scope.info.status =='03'){
				var pageIndex ={};
				pageIndex.index = 0;
				gRDList.get({pageSize:"4"},{},function(strData){
					$scope.driverList = strData.data.rows;
					$scope.lineLen = strData.data.rows.length;
					if($scope.lineLen>0){
						new Pagination({
			        		page:$("#kkpager"),
			        		totalPage: strData.data.pageCount,
			        		currentPage : strData.data.current+1,
			        		onSwitch : function(n){
								var _index = n-1;
								pageIndex.index = _index;
								gRDList.get({pageSize:"4",pageIndex: pageIndex.index},{},function(strData) {
									$scope.driverList = strData.data.rows;
									$scope.lineLen = strData.data.rows.length;
									$timeout(function(){
										$.each($scope.driIdList,function(i,item){
											var dom = $(".dlist");
											$.each(dom,function(j,itemj){
												$.each($(itemj).find(".driver"),function(n,itemn){
													if($(itemn).attr("attrid")==item.driverInfoId){
														$(itemn).addClass("selected");
													}
												})
											})
										})
									},10)
								})
							}
			        	})
					}else{
						$("#kkpager").empty();
					}
				})
			}
		})

        $scope.showImg = function(e){
            var dom = $(e.target).attr("attr-src"),p = dom.split("image/");
            if(p[1]!=""){
                $(".bigImg img").attr("src",dom+$scope.bigcut);
                $("#bigImg").removeClass("hide");
            }
        }

        $scope.notShow = function() {
            $("#bigImg").addClass("hide");
        }

		$scope.driIdList =[];
		$scope.dirName=[];
		$scope.vehicleInfoId = "";

		$scope.submit = function(){
			var params={
				bidDriverInfoList:$scope.driIdList,
				sourceId: $scope.info.sourceId,
				vehicleInfoId: $scope.vehicleInfoId
			}
			var jsonType = JSON.stringify(params);
			finishQuotedInfo.post({},jsonType,function(strData){
				/*
				if(strData.status.statusCode == "200"){
					$(".confirm_car").addClass("hide_dialog");
					$(".complete_success").removeClass("hide_dialog");
					$timeout(function(){
						$window.location.reload();
					},1000)
				}else if(strData.status.statusCode == "22002" || strData.status.statusCode == "22003"){
					if(strData.status.statusCode == "22002"){
						$(".wrong_txt").text("该车辆已被使用请重新选择");
					}else{
						$(".wrong_txt").text("该司机已被使用请重新选择");
					}
					$(".wrong_txt").removeClass("hide");
					$(".resure").addClass("misposition");
					$(".missubmit").hide();
					$(".misfail").addClass("miscolor");
				}else{
					$(".errtxt").html(strData.status.errorMsg);
					$(".complete_fail").removeClass("hide_dialog");
				}
				*/
				if(strData.status.statusCode == "200" || strData.status.statusCode == "400"){
					$(".confirm_car").addClass("hide_dialog");
					$(".complete_success").removeClass("hide_dialog");
					$timeout(function(){
						$window.location.reload();
					},1000)
				}else{
					$(".errtxt").html(strData.status.errorMsg);
					$(".complete_fail").removeClass("hide_dialog");
				}
			})
		}

		$scope.showConfirm = function(num){
			$(".wrong_txt").addClass("hide");
			$(".resure").removeClass("misposition");
			$(".missubmit").show();
			$(".misfail").removeClass("miscolor");
			if($scope.driIdList.length!=num){
				$(".errtxt").html("请选择"+num+"个司机");
				$(".complete_fail").removeClass("hide_dialog");
			}else{
				$(".confirm_car").removeClass("hide_dialog");
			}
		}

		$scope.bkPromise = function(){
			invalidTheBid.break({sourceId: $scope.info.sourceId},{},function(strData){
				$(".break_promise").addClass("hide_dialog");
				if(strData.status.statusCode =="200"){
					$(".giveUp_success").removeClass("hide_dialog");
					$timeout(function(){
						window.location.href=global.getContextPath()+"/my_order.htm"
					},2000)
				}else{
					$scope.errorMsg = strData.status.errorMsg;
					$(".giveUp_fail").removeClass("hide_dialog");
					return false;
				}
			})
		}

		$scope.hide = function() {
			$scope.chosen_carName ="";
			$scope.nameList =[];
			$scope.driIdList =[];
			$(".driver").removeClass("selected");
			$(".clearchosen").addClass("hide");
		}

		$scope.chosen = function(pindex,index){
			$scope.driIdList =[];
			var dom = $(".dlist").find(".driver"),flagList=[];
			$scope.nameList = [];
			$scope.carlength = $(".dlist:eq("+pindex+")").find(".car_length").text();
			$scope.cartype = $(".dlist:eq("+pindex+")").find(".car_type").text();
			$scope.vehicleInfoId = $(".dlist:eq("+pindex+")").attr("attrvId");
			$scope.chosen_carName = $(".dlist:eq("+pindex+")").find(".car_name").text();
			$(".dlist:eq("+pindex+")").find(".driver:eq("+index+")").toggleClass("selected");
			$(".dlist:eq("+pindex+")").siblings().find(".driver").removeClass("selected");

			$.each(dom,function(i,item){
				var flag = false,dirInfo={},dirIdList={};
				if($(item).hasClass("selected")){
					flag = true;
					dirInfo.name = $(item).find(".name").text();
					dirIdList.driverInfoId = $(item).attr("attrId");
					$scope.nameList.push(dirInfo);
					$scope.driIdList.push(dirIdList);
				}
				flagList.push(flag);
			})

			if(flagList.indexOf(true)==-1){
				$scope.chosen_carName ="";
				$(".clearchosen").addClass("hide")
			}else{
				$(".clearchosen").removeClass("hide")
			}
		}

		$scope.showCPDiag = function(){
			$(".closePrice_dialog").removeClass("hide_dialog");
		}

		$scope.showGPDiag = function(){
			$(".break_promise").removeClass("hide_dialog");
		}

		$scope.closeFail = function(){
			$(".dialog_wrap").addClass("hide_dialog");
		}
	}
	getQuotedDeatil.$inject = ['$window','$timeout','$http','invalidTheBid','getLoadBillByQuotedId','getBidVehicleInfo','getRecommendSource','getQuotedDeatil','getRecordList','gRDList','finishQuotedInfo','$scope','$rootScope','$log']

	function getCity(getCity,getLineList,addline,delLine,$scope,$log){
		getCity().then(function(strData){
			$scope.cities = strData.data.subRegion;
		}).then(function(){
			getLineList().then(function(strData){
				$scope.Lines = strData.data;
				$scope.len = strData.data.length;
			})
		}).then(function(){
			$(".scroll").mCustomScrollbar();
		})

		var _index="",__index="";

		$scope.showSelect = function(index,event){
			_index = index;
			$(".warn").hide();
			var dom = $(".con_l_l:eq("+index+") .select_c");
			dom.toggleClass("hide").parents(".con_l_l").siblings().find(".select_c").addClass("hide");
		}

		$scope.selected = function(name,val){
			var dom = $(".con_l_l:eq("+_index+")");
			dom.find(".select_t>.txt").text(name).attr("attr-id",val);
		}

		$scope.addOrLine = function(){
			var lineCode = {
				departureCode : $(".startC").attr("attr-id"),
				destinationCode : $(".endC").attr("attr-id")
			}
			if(!$(".startC").attr("attr-id")){
				_index = 0;
				$(".con_l_l:eq(0)").find(".select_c").removeClass("hide");
				$(".con_l_l:eq(1)").find(".select_c").addClass("hide");
				return false;
			}else if(!$(".endC").attr("attr-id")){
				_index = 1;
				$(".con_l_l:eq(1)").find(".select_c").removeClass("hide");
				$(".con_l_l:eq(0)").find(".select_c").addClass("hide");
				return false;
			}else{
				$(".con_l_l:eq(0)").find(".select_c").addClass("hide");
				$(".con_l_l:eq(1)").find(".select_c").addClass("hide");
			}
			addline.saveLine(lineCode,lineCode,function(strData){
				if(strData.status.statusCode == "200"){
					getLineList().then(function(strData){
						$scope.Lines = strData.data;
						$scope.len = strData.data.length;
					})
				}else{
					// window.confirm(strData.status.errorMsg);
					$(".warn").text(strData.status.errorMsg).show();
				}
			})
		}

		$scope.close = function(index,sName,eName){
			__index = index;
			$scope.sName = sName;
			$scope.eName = eName;
			$(".dialog_wrap").removeClass("hide_dialog");
		}

		$scope.down = function(){
			$(".dialog_wrap").addClass("hide_dialog");
		}

		$scope.deleteLine = function(){
			var lineInfoId = { lineInfoId:$(".addedLine>li:eq("+__index+")").attr("ref")};
			$scope.Lines.splice(__index, 1);
			delLine.deleteLine(lineInfoId,{},function(strData){
				if(strData.status.statusCode =="200"){
					getLineList().then(function(strData){
						$scope.Lines = strData.data;
						$scope.len = strData.data.length;
					})
					$(".dialog_wrap").addClass("hide_dialog");
				}
			});
		}

		$(document).on("click",function(e){
			if(e.target.className!="addbnt" &&e.target.className != "txt startC"&&e.target.className != "txt endC"&&e.target.className != "select_t"&&e.target.className != "select_dropdown"&&e.target.className != "select_l select_list"){
				$(".select_c").addClass("hide");
			}
		})
	}
	getCity.$inject = ['getCity','getLineList','addLine','delLine','$scope','$log']

	function getLineList(getLineList,getallLines,selectLines,lID,pageIndex,recode,getSubReg,$scope,$location,$log){
		var params = {};

		$location.path('');
		getLineList().then(function(strData){
			$scope.Lines = strData.data;
			$scope.len = strData.data.length;
			lID.lineId = params.lineId = strData.data[0].lineInfoId;
			$scope.defDepartureCode = strData.data[0].departureCode;
			$scope.defDestinationCode = strData.data[0].destinationCode;
			$scope.addClass = function(index){
				if(index == 0){
					return true;
				}
			}
			$scope.changeClass = function(index){
				$(".filter_w>li").find(".ol_w").addClass("hide");
				pageIndex.index = 0;
				$(".unchecked").removeClass("checked");
				$(".pubdate").removeClass("check_up").removeClass("check_down");
				$('select').prop('selectedIndex', 0);
				var _index = index+1,
					$ele = $(".tab_tit>li:nth-child("+_index+")"),
					lineId = $ele.attr("ref");
				$ele.addClass("current").siblings().removeClass("current");
				$location.path('/'+lineId);
				lID.lineId = lineId;
				params = {
					lineId: lineId,
					pageSize: 5
				}

				$(".returned").attr("checked",false);
				$scope.defDepartureCode = $(".tab_tit>li:nth-child("+_index+")").attr("data-dept");
				$scope.defDestinationCode = $(".tab_tit>li:nth-child("+_index+")").attr("data-dest");

				getallLines().then(function(strData){
					pageIndex.index = 0;
					$scope.lines = strData.data.rows;
					$scope.isExit = strData.data.rows.length>0?true:false;
					$scope.lineLen = strData.data.rows.length;
					if($scope.lineLen>0){
						new Pagination({
			        		page:$("#kkpager"),
			        		totalPage: strData.data.pageCount,
			        		currentPage : strData.data.current+1,
			        		onSwitch : function(n){
								var _index = n-1;
								pageIndex.index = _index;
								getallLines().then(function(strData){
									$scope.lines = strData.data.rows;
								})
							}
			        	})
					}else{
						$("#kkpager").empty();
					}
				}).then(function(){
					recode.code = $scope.defDepartureCode;
					getSubReg().then(function(strData){
						$scope.selfVals = strData.data;
					})
				}).then(function(){
					recode.code = $scope.defDestinationCode;
					getSubReg().then(function(strData){
						$scope.selsVals = strData.data;
					})
				})
			}
		}).then(function(){
			getallLines().then(function(strData){
				$scope.lines = strData.data.rows;
				$scope.lineLen = strData.data.rows.length;
				$scope.isExit = strData.data.rows.length>0?true:false;
				if($scope.lineLen>0){
					new Pagination({
		        		page:$("#kkpager"),
		        		totalPage: strData.data.pageCount,
		        		currentPage : strData.data.current+1,
		        		onSwitch : function(n){
							var _index = n-1;
							pageIndex.index = _index;
							getallLines().then(function(strData){
								$scope.lines = strData.data.rows;
							})
						}
		        	})
				}
				
			})
		}).then(function(){
			recode.code = $scope.defDepartureCode;
			getSubReg().then(function(strData){
				$scope.selfVals = strData.data;
			})
		}).then(function(){
			recode.code = $scope.defDestinationCode;
			getSubReg().then(function(strData){
				$scope.selsVals = strData.data;
			})
		}).then(function(){
			$(".select_ol").mCustomScrollbar();
		})

		$scope.searchByNo = function(){
			var queryContent = $("#queryContent").val().newtrim();
			if(queryContent == ''){
				// alert('请输入搜索关键字')
			} else {
				window.open('search_list.htm?queryContent='+queryContent,'_blank')
			}
		}

		$scope.showSelect = function(index,event){
			var dom = $(".filter_w>li:eq("+index+")").find(".ol_w");
			if(dom.find("li").length<5){
				$(".filter_w>li:eq("+index+")").find(".select_ol").addClass("height_atuo");
			}else{
				$(".filter_w>li:eq("+index+")").find(".select_ol").removeClass("height_atuo");
			}
			dom.toggleClass("hide").parents("li").siblings().find(".ol_w").addClass("hide");
		}

		$scope.sortByTime = function(){
			if(!params.sort){
				params.sort = "02"
				$(".pubdate").addClass("check_down").removeClass("check_up");
			}else{
				if(params.sort == "01"){
					$(".pubdate").addClass("check_down").removeClass("check_up");
					params.sort = "02"
				}else{
					$(".pubdate").addClass("check_up").removeClass("check_down");
					params.sort = "01"
				}
			}

			selectLines.get(params,{},function(strData){
				$scope.lines = strData.data.rows;
				$scope.lineLen = strData.data.rows.length;
				$scope.isExit = strData.data.rows.length>0?true:false;
				$scope.numPages = [];
				for (var i = 0; i <strData.data.pageCount; i++) {
					$scope.numPages.push([]);
				}
			})
		}

		$scope.getBack = function(){
			$(".unchecked").toggleClass("checked");
			if(!params.returned){
				params.returned = "01"
			}else{
				delete params.returned
			}

			selectLines.get(params,{},function(strData){
				$scope.lines = strData.data.rows;
				$scope.isExit = strData.data.rows.length>0?true:false;
				$scope.lineLen = strData.data.rows.length;
				if($scope.lineLen>0){
					new Pagination({
		        		page:$("#kkpager"),
		        		totalPage: strData.data.pageCount,
		        		currentPage : strData.data.current+1,
		        		onSwitch : function(n){
							var _index = n-1;
							pageIndex.index = _index;
							getallLines().then(function(strData){
								$scope.lines = strData.data.rows;
							})
						}
		        	})
				}else{
					$("#kkpager").empty();
				}
			})
		}

		$scope.changeSC = function(index){
			params.startCodeC = $(".class_2 > li:eq("+index+")").attr("value");
			selectLines.get(params,{},function(strData){
				$scope.lines = strData.data.rows;
				$scope.isExit = strData.data.rows.length>0?true:false;
				$scope.lineLen = strData.data.rows.length;
				if($scope.lineLen>0){
					new Pagination({
		        		page:$("#kkpager"),
		        		totalPage: strData.data.pageCount,
		        		currentPage : strData.data.current+1,
		        		onSwitch : function(n){
							var _index = n-1;
							pageIndex.index = _index;
							getallLines().then(function(strData){
								$scope.lines = strData.data.rows;
							})
						}
		        	})
				}else{
					$("#kkpager").empty();
				}
			})
		}

		$scope.changeEC = function(index){
			params.endCodeC = $(".class_3 > li:eq("+index+")").attr("value");
			selectLines.get(params,{},function(strData){
				$scope.lines = strData.data.rows;
				$scope.isExit = strData.data.rows.length>0?true:false;
				$scope.lineLen = strData.data.rows.length;
				if($scope.lineLen>0){
					new Pagination({
		        		page:$("#kkpager"),
		        		totalPage: strData.data.pageCount,
		        		currentPage : strData.data.current+1,
		        		onSwitch : function(n){
							var _index = n-1;
							pageIndex.index = _index;
							getallLines().then(function(strData){
								$scope.lines = strData.data.rows;
							})
						}
		        	})
				}else{
					$("#kkpager").empty();
				}
			})
		}

		$(".needLength>li").on("click",function(e){
			var index = $(this).index();
			params.needLength = $(".needLength>li:eq("+index+")").attr("val");
			selectLines.get(params,{},function(strData){
				$scope.lines = strData.data.rows;
				$scope.isExit = strData.data.rows.length>0?true:false;
				$scope.lineLen = strData.data.rows.length;
				if($scope.lineLen>0){
					new Pagination({
		        		page:$("#kkpager"),
		        		totalPage: strData.data.pageCount,
		        		currentPage : strData.data.current+1,
		        		onSwitch : function(n){
							var _index = n-1;
							pageIndex.index = _index;
							getallLines().then(function(strData){
								$scope.lines = strData.data.rows;
							})
						}
		        	})
				}else{
					$("#kkpager").empty();
				}
			})
		})

		$(".needType>li").on("click",function(){
			var index = $(this).index();
			params.needType = $(".needType>li:eq("+index+")").attr("value");
			selectLines.get(params,{},function(strData){
				$scope.lines = strData.data.rows;
				$scope.isExit = strData.data.rows.length>0?true:false;
				$scope.lineLen = strData.data.rows.length;
				if($scope.lineLen>0){
					new Pagination({
		        		page:$("#kkpager"),
		        		totalPage: strData.data.pageCount,
		        		currentPage : strData.data.current+1,
		        		onSwitch : function(n){
							var _index = n-1;
							pageIndex.index = _index;
							getallLines().then(function(strData){
								$scope.lines = strData.data.rows;
							})
						}
		        	})
				}else{
					$("#kkpager").empty();
				}
			})
		})

		$scope.changeLG = function(index){
			params.needLength = lg;
			selectLines.get(params,{},function(strData){
				$scope.lines = strData.data.rows;
				$scope.isExit = strData.data.rows.length>0?true:false;
				$scope.lineLen = strData.data.rows.length;
				if($scope.lineLen>0){
					new Pagination({
		        		page:$("#kkpager"),
		        		totalPage: strData.data.pageCount,
		        		currentPage : strData.data.current+1,
		        		onSwitch : function(n){
							var _index = n-1;
							pageIndex.index = _index;
							getallLines().then(function(strData){
								$scope.lines = strData.data.rows;
							})
						}
		        	})
				}else{
					$("#kkpager").empty();
				}
			})
		}

		$scope.changeTY = function(type){
			params.needType = type;
			selectLines.get(params,{},function(strData){
				$scope.lines = strData.data.rows;
				$scope.isExit = strData.data.rows.length>0?true:false;
				$scope.lineLen = strData.data.rows.length;
				if($scope.lineLen>0){
					new Pagination({
		        		page:$("#kkpager"),
		        		totalPage: strData.data.pageCount,
		        		currentPage : strData.data.current+1,
		        		onSwitch : function(n){
							var _index = n-1;
							pageIndex.index = _index;
							getallLines().then(function(strData){
								$scope.lines = strData.data.rows;
							})
						}
		        	})
				}else{
					$("#kkpager").empty();
				}
			})
		}

		$scope.repeatDown = function(len){
			$("div.holder").jPages({
		      containerID : "order_list",
		      perPage : len
		    });
		    $(".order_list").css("min-height","auto");
		}

		$scope.getPages = function(index){
			pageIndex.index = index;
			$("body").scrollTop(0,0);
			selectLines.get(params,{},function(strData){
				$scope.lines = strData.data.rows;
				$scope.lineLen = strData.data.rows.length;
				$scope.numPages = [];
				for (var i = 0; i <strData.data.pageCount; i++) {
					$scope.numPages.push([]);
				}
			})
		}

		$(document).on("click",function(e){
			if(e.target.className != "text"&&e.target.className != "text car_length"&&e.target.className != "select_dropdown triangle-all"){
				$(".ol_w").addClass("hide");
			}
		})
	}
	getLineList.$inject = ['getLineList','getallLines','selectLines','lineId','getPageIndex','defSupCode','getSubReg','$scope','$location','$log']

	function getAgent(getAgent,$scope,$log){
		getAgent.get({},{},function(strData){
			$scope.perInfo = strData.data;
			var user = global.getUser(),
				fullData = $.extend({},user,strData.data);
            $scope.server = global.server+'/api/image/';
            $scope.cut = '?width=106&height=106&cut=1';
			$scope.userHeader = fullData.userHead?global.imgsrc(fullData.userHead,{})+$scope.cut:"img/head.png";
			$scope.tel = fullData.telphone;
		});
	}
	getAgent.$inject=['getAgent','$scope','$log']

	function addQuote(doAddQuote,driverLen,$scope,$timeout,$window,$log){
		$scope.price = "";

		$scope.addZero = function(){
			var pricStr = $scope.price.toString();
			if(pricStr && !isNaN(pricStr)){
				if(pricStr.indexOf(".")<0){
					pricStr = parseFloat(pricStr).toFixed(2);
				}else{
					var mini = pricStr.split("."),split ="";
					if(mini[1].length>2){
						split = mini[1].substring(0,3);
						split = Math.round(parseFloat(split.substring(0,2)+"."+split.substring(2,3)));
					}else{
						split = mini[1]
					}
					pricStr = parseFloat(pricStr.split(".")[0]+"."+split);
				}
				$scope.price = pricStr;
			}else{
				$scope.price = ""
			}
		}

		$scope.addQuote = function(){
			var params = {
				sourceId: global.QueryString.id,
				price: $scope.price,
				remark : $("textarea").val()
			}
			doAddQuote.saveQuote(params,{},function(strData){
				$scope.status = strData.status.statusCode;
				if($scope.status == "200"){
					$(".price_success").show();
					$timeout(function(){
						window.location.href=global.getContextPath()+"/my_order.htm"
					},2000)
				}else{
					var errorMsg = strData.status.errorMsg;
					$("input[name=doller]").addClass("warn");
					switch($scope.status){
						case "900003":
							$(".errorTxt").text("请输入报价金额").show();
						break;
						case "900005":
							$(".errorTxt").text("金额必须为数字或小数，小数点后不超过2位").show();
						break;
						case "500005":
							$(".errorTxt").text("输入的金额不能小于0").show();
						break;
						case "500006":
							$(".errorTxt").text("输入的金额不能大于10万").show();
						break;
						case "500001":
							$(".errorTxt").text("竞标失败").show();
						break;
					}
					
					// $scope.price ="";
					// $(".errtxt").text(errorMsg);
					// $(".price_fail").show();
				}
			})
		}
		$scope.focus = function(){
			$("input[name=doller]").removeClass("warn");
			$(".errorTxt").hide();
		}
		$scope.close_dialog = function(){
			$(".price_fail").hide();
		}
		$scope.showGiveUp = function(){
			$(".giveUp").toggle();
		}
		$scope.giveUp = function(){
			$(".ordinaryDialog,.hyDialog").show();
		}

		$scope.count = function(){
			$(".def-val").remove();
			$scope.sum = $("textarea").val().length;
		}
	}
	addQuote.$inject=['doAddQuote','driverLen','$scope','$timeout','$window','$log']

	function getInfo(getInfo,gRS,$scope,$log){
		getInfo.get({sourceId:global.QueryString.id},{},function(strData){
			$scope.Info = strData.data;
			$scope.flag = false;
			if($scope.Info.hasBegin ==0){
				$scope.flag = true
			}
			var gbParams = {
				"sourceCount": "4",
				"startCodeP": $scope.Info.endCodeP,
				"endCodeP": $scope.Info.startCodeP
			}
			gRS.get(gbParams,{},function(strData){
				$scope.items = strData.data;
				$scope.len = strData.data.length;
			})
		})
		$scope.close_dialog = function(){
			$(".price_fail").hide();
		}
	}
	getInfo.$inject=['getInfo','getRecommendSource','$scope','$log']

	function getUnreadMessageCount($http,$window,$location,$scope,$log){
		$scope.flag = true;
		$scope.hover = true;
		$scope.ishover = false;
		$scope.isLogin = global.isLogin();
		$scope.count = 0;

		if(!$scope.isLogin){
			$scope.mark1 = "login_dialog.htm";
			$scope.mark2 = "login_dialog.htm";
			$scope.mark3 = "login_dialog.htm";
			$scope.mark4 = "login_dialog.htm";
		}else{
			$scope.mark1 ="supply_hall.htm";
			$scope.mark2 ="my_order.htm";
			$scope.mark3 ="center_news.htm";
			$scope.mark4 ="center_basicinfo.htm";
		}

		var href = $location.absUrl().split("/").pop();
		if(href.indexOf("car_info")>=0 ||href.indexOf("driver_info")>=0 ||href.indexOf("center_basicinfo")>=0 || href.indexOf("driver_list")>=0||href.indexOf("running_route")>=0||href.indexOf("help")>=0){
			$scope.states =5;
		}else if(href.indexOf("center_news")>=0){
			$scope.states =4;
		}else if(href.indexOf("login_dialog")>=0){
			$scope.states = 10;
		}else{
			$scope.states = 0;
		}

		if(href!="center_news.htm"){
			setTimeout(function(){
				$(".go_news").hover(function(){
					$(this).find(".news").toggleClass("press_no_news");
				})
			},100)
		}
		if(href!="center_basicinfo.htm"&&href!="driver_list.htm"&&href!="running_route.htm"&&href!="help.htm"){
			setTimeout(function(e){
				$(".go_center").hover(function(){
					$(this).toggleClass("current");
				})
				$(".user_select").hover(function(e){
					$(".go_center").toggleClass("current");
				})
			},100)
		}

		$scope.saveLink = function(e){
			var link = $(e.target).attr("attr-mark")+".htm",opt ={expires : 1};
			$.cookie("currentLink",link, opt);
		}

		$scope.showDialog = function(){
			$(".logout_dialog").removeClass("hide_dialog");
		}

		$scope.cancel = function(){
			$(".logout_dialog").addClass("hide_dialog");
		}

		$scope.logout = function(){
			$.cookie("currentLink",null);
			global.Logout();
		}

		if($scope.isLogin){
			$http.get(
				global_config.server+"/api/message/getUnreadMessageCount",
				{
					headers:{'Authorization':global.getUserId() + ':' + global.getToken()
	            }
	        }).success(function(strData){
				$scope.count = strData.data.count;
			})
            setInterval(function(){
				$http.get(
					global_config.server+"/api/message/getUnreadMessageCount",
					{
						headers:{'Authorization':global.getUserId() + ':' + global.getToken()
		            }
		        }).success(function(strData){
					$scope.count = strData.data.count;
				})
            },3000000)
		}
		
		$scope.$watch('count',function(newValue,oldValue, scope){
			if($scope.count>0){
				$scope.flag = true;
			}else{
				$scope.flag = false;
			}
		})
	}
	getUnreadMessageCount.$inject=['$http','$window','$location','$scope','$log']

	function getMessageList(getMessageList,$scope,$log){
		$scope.news =[];
		var params = {
			pageSize: 5
		}
        getMessageList.get(params,{},function(strData){
        	$scope.news = strData.data.rows;
        	$scope.len = strData.data.rows.length;
        	var num = strData.data.current+1;

        	new Pagination({
        		page:$("#kkpager"),
        		totalPage: strData.data.pageCount,
        		currentPage : num,
        		onSwitch : function(n){
					var _index = n-1;
					params.pageIndex = _index;
					getMessageList.get(params,{},function(strData){
						$scope.news = strData.data.rows;
					})
				}
        	});
        })
	}
	getMessageList.$inject = ['getMessageList','$scope','$log']

	function getTrackInfo(getTrackInfo,getGeo,$scope,$log){
		var count=0;
		getTrackInfo().then(function(strData){
			$scope.Info = strData.data.info;
			$scope.track = strData.data.track;
		}).then(function(){
			var param={},
				trackList=[],
				// starCity = $scope.Info.senderArea[1].regionName+$scope.Info.senderArea[0].regionName+$scope.Info.senderAddress,
				// endCity = $scope.Info.receiverArea[1].regionName+$scope.Info.receiverArea[0].regionName+$scope.Info.receiverAddress;
				starCity = getCompArr($scope.Info.senderArea,1);
				endCity = getCompArr($scope.Info.receiverArea,2);
				trackList.push([starCity]);
				trackList.push([endCity]);
			if($scope.track.length>0){
				var speedList=[],exception=[],exceptionName=[],expSTime=[],expETime=[],track = $scope.track,param={};
				
				for(var i = 0;i<track.length;i++){
					trackList.push([track[i].latitude,track[i].longitude]);
					speedList.push(track[i].speed);
					exception.push([track[i].isException]);
					exceptionName.push([track[i].itemName]);
					expSTime.push([track[i].feedbackTime]);
					expETime.push([track[i].endTime]);
				}
			}
			param ={
				okey : trackList,
				carNo : $scope.Info.plateNumber,
				exception : exception,
				speed : [],
				exceptionName : exceptionName,
				expSTime: expSTime,
				expETime: expETime,
				addStar: starCity,
				addEnd: endCity,
				speed: speedList,
				sourceNo: $scope.Info.sourceNo
			}
			$scope.map = $("#big_map").GdMap(param);

		})

		function getCompArr(addList,num){
			var add ="",list=[];
			if(addList){
				for(var i=addList.length-1;i>=0;i--){
					if($.inArray(addList[i].regionName,list)==-1){
						list.push(addList[i].regionName);
						add += addList[i].regionName + "  ";
					}
				}
				if(num ==1){
					add += $scope.Info.senderAddress
				}else{
					add += $scope.Info.receiverAddress
				}
			}
			return add
		}

		$scope.getGeo = function(){
			var action = new MarkerAction();
			$(".getLPos").attr("disabled","disabled").addClass("disabled-class");
			getGeo().then(function(strData){
				if(strData.status.statusCode == "200"){
					var options = {
						position:[strData.data.longitude,strData.data.latitude],
						speed:strData.data.speed,
						feedbackTime: strData.data.feedbackTime,
						carNo: $scope.Info.plateNumber
					};
					if(count == 0){
						action.addMarker($scope.map, options);
					}else{
						action.updateMarker($scope.map, options);
					}
					count = 1;
				}else{
					window.confirm("获取实时位置超时,请稍后再试。");
				}
				$(".getLPos").removeAttr("disabled").removeClass("disabled-class");
			})
		}
	}
	getTrackInfo.$inject=['getTrackInfo','getGeo','$scope','$log'];

	function getLoaBill(getLoaBill,gRList,loadId,$scope,$log){
		if(global.QueryString.status || global.QueryString.status =="05"){
			getLoaBill().then(function(strData){
				loadId.loadId = strData.data.loadId;
				$scope.Info = strData.data;
			}).then(function(){
				gRList().then(function(strData){
					$scope.news = strData.data;
				})
			})
		}
	}
	getLoaBill.$inject=['getLoaBill','getRecordList','getloadId','$scope','$log'];

	function getRSource(gRS,$scope,$log){
		gRS.get({sourceCount:'4'},{},function(strData){
			$scope.items = strData.data;
			$scope.len = strData.data.length;
		})
	}
	getRSource.$inject=['getRecommendSource','$scope','$log'];

	function getQOList(gQ,$scope,$log){//test
		gQ().then(function(strData){
			$scope.lines = strData.data.rows;
		})

		$scope.repeatDown = function(){
			$("div.holder").jPages({
		      containerID : "itemContainer",
		      perPage : 5
		    });
		}
	}
	getQOList.$inject =['getQuotedOrderList','$scope','$log']
})(window,window.angular)