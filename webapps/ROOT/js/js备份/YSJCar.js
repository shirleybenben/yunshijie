/**
 * 
 */
var YSJCar = function(options){
	this.opt = $.extend({}, options);
	this.driverNum = 1;
	this.el = $('<div class="tab" style="display:block;"> \
				<div class="driver_w edit_driver_w clearfix"> \
				<div class="status"> \
				<div class="inps"> \
					<p> \
						<label for=""><strong>车牌号</strong></label> \
						<input maxlength="7" data-column="plateNumber" class="text-column to-readonly" type="text" placeholder="请填写车牌号"/> \
					</p> \
				</div> \
			</div> \
			<ul class="upload_img_w clearfix"> \
				<li> \
					<div class="upload_img" data-column="licenseImageRefId" data-category="clxsz"> \
						<img src="img/car.png"> \
						<span class="close"></span> \
					</div> \
					<p class="txt">车辆行驶证照片</p> \
				</li> \
				<li> \
					<div class="upload_img" data-column="licenseImage2RefId" data-category="clxsz"> \
						<img src="img/car.png"> \
						<span class="close"></span> \
					</div> \
					<p class="txt">车辆行驶证照片</p> \
				</li> \
				<li> \
					<div class="upload_img" data-column="ocImage2RefId" data-category="clyyz"> \
						<img src="img/trans.png"> \
						<span class="close"></span> \
					</div> \
					<p class="txt">车辆营运证照片</p> \
				</li> \
				<li> \
					<div class="upload_img" data-column="ocImage3RefId" data-category="clyyz"> \
						<img src="img/trans.png"> \
						<span class="close"></span> \
					</div> \
					<p class="txt">车辆营运证照片</p> \
				</li> \
				<li> \
					<div class="upload_img" data-column="viImageRefId" data-category="clsyx"> \
						<img src="img/add_sybx.png"> \
						<span class="close"></span> \
					</div> \
					<p class="txt">商业保险照片</p> \
				</li> \
				<li> \
					<div class="upload_img" data-column="ciImageRefId" data-category="clqzx"> \
						<img src="img/add_qzbx.png"> \
						<span class="close"></span> \
					</div> \
					<p class="txt">强制险照片</p> \
				</li> \
				<li class="left-img"> \
					<div class="upload_img" data-column="ocImageRefId" data-category="clyyz"> \
						<img src="img/trans.png"> \
						<span class="close"></span> \
					</div> \
					<p class="txt">车辆营运证照片</p> \
				</li> \
			</ul> \
		</div> \
	</div>');
	
	this.modify = false;
	this.allowSave = true;
	
	this.imageList = [];
	this.driverList = [];
	
	this.addDriver = function(driverInfo){
		var _this = this;
		var num = $('.tab_tit').find('.driver_tab_title').size();
		var tempId = global.uuid();
		var el = $('<li class="driver_tab_title"><a href="javascript:;" class="check"><strong>司机信息</strong></a></li>');
		el.attr('ref', tempId);
		el.insertBefore('.add_driver');
		var append = $('#info_tab')
		var driver = new YSJDriver({
			append : append,
			data : driverInfo,
			tempId : tempId,
			car : _this
		});
		_this.driverList.push(driver);
		_this.driverNum = num+1;
	}
	
	this.delDriver = function(tempId){
		var _this =this;
		if(_this.driverNum==1){
			alert("必须保留一位司机信息");
		} else {
			if(confirm("是否要删除该司机的信息？")){
				var find = false;
				$.each(_this.driverList, function(i, j){
					if(j.isDriver(tempId)){
						find = true;
						_this.driverList.removeAt(i);
						_this.driverNum--;
						return false;
					}
				});
				if(find){
					$('.tab_tit').find('li.driver_tab_title[ref="' + tempId + '"]').remove();
					$('#info_tab').find('div.driver_tab[ref="' + tempId + '"]').remove();
					$('.tab_tit > li.car_tab_title').click();
				}
			}
		}
	}
	
	this.bindEvent = function(){
		var _this = this;
		$('.add_driver').click(function(){
			_this.addDriver();
			var len = $(".driver_tab_title").length-1;
			$(".driver_tab_title:eq("+len+")").addClass("current").siblings().removeClass("current");
			$('#info_tab>.tab').hide();
			$('#info_tab>.tab:last-child').show();
			if(_this.driverNum>5){
				$(this).remove();
			}
		});
		
		$('.tab_tit').on('click','li',function(){
			$(this).siblings('li').removeClass('current');
			$(this).addClass('current');
			var i = $(this).index();
			$('#info_tab>.tab').hide();
			$('#info_tab>.tab:eq('+i+')').show();
		});
		
	}
	
	
	this.init = function(options){
		var _this = this;
		$("#info_tab").append(_this.el);
		_this.bindEvent();
		 if (options && options.vehicleInfoId) {
			 console.log('init vehicle data with id: ' + options.vehicleInfoId);
	            var url = "/api/driver/queryDriverAndVehicleDetail?vehicleInfoId=" + options.vehicleInfoId;
	            var _this = this;
	            $.get(global.server + url, function (msg) {
	                if (msg && msg.status && msg.status.statusCode == global.status.success) {
	                	var data = msg.data;
	                	_this.fillData(data);
	                }
	            });
		 } else {
			 console.log('new vehicle');
			 _this.el.find('.upload_img').each(function(i, j){
				var image = new YSJImage({
	           		view: $(this),
	           		delBtn : $(this).find('.close'),
	           		category: $(this).data('column'),
	           		exClass :$(this).data('category')
	            });
				_this.imageList.push(image);
			})
			_this.addDriver({});
		 }
	}
	
	this.fillData = function(data){
		var _this = this;
		this.modify = true;
		_this.el.find('.text-column').each(function(i, j){
			var self = $(j);
			var _p = self.data('column');
			self.val(data[_p]);
		});
		_this.el.find('.upload_img').each(function(i, j){
			var _p = $(this).data('column');
			var image = new YSJImage({
           		view: $(this),
           		category: _p,
           		delBtn : $(this).find('.close'),
           		exClass :$(this).data('category'),
           		imageId : data[_p]
            });
			_this.imageList.push(image);
		});
		var status = data.status;
		
		var driverList = data.driverList;
    	$.each(driverList, function(i, driver){
    		driver.status = status;
    		_this.addDriver(driver);
    	});
    	
    	if(status == '00'){//审核通过
    		_this.el.find(".to-readonly").attr('readonly', true);
    	} else if(status == '02'){ //审核不通过
    		
    	} else if(status == '01'){//审核中
    		_this.el.find(".to-readonly").attr('readonly', true);
    		this.allowSave = false;
    		$('.add_driver').remove();
    	} else if(status = '99'){//草稿状态
    		
    	}
	}
	
	this.getData = function(){
		var _this = this;
		var data = {};
		_this.el.find('.text-column').each(function(i, j){
			var self = $(j);
			var _p = self.data('column');
			var _v = self.val();
			data[_p] = _v;
		});
		if(_this.modify){
			data.vehicleInfoId = _this.opt.vehicleInfoId;
		}
		$.each(_this.imageList, function(i, j){
			var result = j.postToServer('/api/driver/imageUpload');
			var column = result.column;
			var imageId = result.imageId;
			if(imageId != null){
				data[column] = imageId;
			} else {
				data[column] = "";
			}
		});
		var driverList = [];
		$.each(_this.driverList, function(i, j){
			var data = j.getData();
			driverList.push(data);
		});
		data.driverList = driverList;
		return data;
	}
	
	this.init(options);
};

YSJCar.prototype.hasRepeat = function(arr){
	var hash = {};
	for(var i in arr) {
	if(hash[arr[i]])
		return true;
		hash[arr[i]] = true;
	}
	return false;
}

YSJCar.prototype.validDriverData = function(data){
	var _this = this;
	var realName = data.realName;
	var idno = data.idno;
	var telphone = data.telphone;
	if(realName==''){
		alert("请输入司机姓名");
		return false;
	}
	if(global.isChinese(realName)){
		if(realName.length>5){
			alert("请输入正确的司机姓名");
			return false;
		}
	} else {
		alert("请输入正确的司机姓名");
		return false;
	}
	if(idno == ''){
		alert("请输入正确的司机身份证号");
		return false;
	}
	if(!IdCardNoUtil.check18IdCardNo(idno)){
		alert("请输入正确的司机身份证号");
		return false;
	}
	if(data.idFImageRefId == ''){
		alert("请上传身份证正面照");
		return false;
	}
	if(data.idBImageRefId == ''){
		alert("请上传身份证背面照");
		return false;
	}
	if(data.drivingFImageRefId == ''){
		alert("请上传司机驾驶证照");
		return false;
	}
	if(data.qualifiImageRefId == ''){
		alert("请上传司机从业资格证照");
		return false;
	}
	if(data.qualifiImage2RefId == ''){
		alert("请上传司机从业资格证照");
		return false;
	}
	
	return true;
}

YSJCar.prototype.validCarData = function(data){
	var _this = this;
	var plateNumber = data.plateNumber;
	if(plateNumber==''){
		alert('请填写车牌号');
		return false;
	}
	if(data.licenseImageRefId == ''){
		alert("请上传车辆行驶证照片");
		return false;
	}
	if(data.licenseImage2RefId == ''){
		alert("请上传车辆行驶证照片");
		return false;
	}
	if(data.ocImageRefId == ''){
		alert("请上传车辆营运证照片");
		return false;
	}
	if(data.ocImage2RefId == ''){
		alert("请上传车辆营运证照片");
		return false;
	}
	if(data.ocImage3RefId == ''){
		alert("请上传车辆营运证照片");
		return false;
	}
//	if(!data.viImageRefId){
//		alert("请上传车辆商业保险照片");
//		return false;
//	}
//	if(!data.ciImageRefId){
//		alert("请上传车辆强制险照片");
//		return false;
//	}
	return true;
}

YSJCar.prototype.validAllDriverData = function(driverList){
	var _this = this;
	var valid = true;
	var driverList = driverList;
	$.each(driverList, function(i, j){
		if(!_this.validDriverData(j)){//单个司机信息校验不通过
			$('.tab_tit').find('li.driver_tab_title[ref="' + j.tempId + '"]').click();
			valid = false;
			return false;
		}
	});
	if(valid){//司机信息校验通过
		var arr = [];
		$.each(driverList, function(i, j){
			arr.push(j.idno);
		});
		var de = _this.hasRepeat(arr); //是否存在相同的司机
		if(de){
			alert("不能添加相同的司机信息");
			return false;
		}else{
			return true;
		}
	} else {
		return false;
	}
}

YSJCar.prototype.validPost = function(data){
	var _this = this;
	var allow = _this.allowSave;
	if(!allow){
		alert("当前信息审核中，不能修改。");
		return false;
	} else {
		var cv = _this.validCarData(data);
		if(cv){//车辆信息校验通过
			var driverList = data.driverList;
			var ev = _this.validAllDriverData(driverList);
			if(!ev){//车辆信息校验通过
				return false;
			} else{
				var plateNumber = data.plateNumber;
				var isAudit = _this.isAudit(plateNumber);
				if(isAudit){
					alert("当前信息审核中，不能修改。");
					return false;
				}
			}
		} else {
			return false;
		}
	}
	return true;
}

YSJCar.prototype.isAudit = function(plateNumber){
	var isAudit = false;
	$.ajax({
        url: global.server + '/api/driver/isPendingAudit',
        type: "get",
        async: false,
        data: {plateNumber:plateNumber},
        success: function (msg) {
            if (msg && msg.status && msg.status.statusCode == global.status.success) {
            	var data = msg.data;
            	isAudit = data.isPendingAudit;
            } 
        }
    });
	return isAudit;
}

YSJCar.prototype.doSave = function(){
	var _this = this;
	var data = _this.getData();
	var valid = _this.validPost(data);
	if(valid){
		var dataStringify = JSON.stringify(data);
		var url = '/api/driver/addDriverAndVehicle';
		if(_this.modify){
			url = '/api/driver/updateDriverAndVehicleInfo'
		}
	    $.ajax({
	        url: global.server + url,
	        type: "POST",
	        contentType: "application/json; charset=utf-8",
	        data: dataStringify,
	        dataType: "json",
	        success: function (msg) {
	            if (msg && msg.status && msg.status.statusCode == global.status.success) {
	            	var vehicleInfoId = msg.data.vehicleInfoId;
	            	alert("保存成功");
	            	location.href = global.getContextPath() + '/driver_list.htm';
	            } else {
	            	alert(msg.status.errorMsg);
	            }
	        }
	    });
	}
}



