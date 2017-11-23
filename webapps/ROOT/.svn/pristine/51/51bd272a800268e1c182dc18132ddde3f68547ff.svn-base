var DriverList = function(){
	this.param = {};
	
	this.table = new YSJTable({
		page : $('.handle-page'),
		content : $('.driver_list_tab > table > tbody'),
		url : '/api/driver/pageDriverAndVehicleList',
		method  : 'POST',
		pageNumber : 0,
		pageSize : 10,
		rowRender : function(index, row){
			var plateNumber = row.plateNumber;
			
			var driverInfoList = [];
			$.each(row.driverList, function(i, j){
				var info = "司机"+(i+1)+":"+j.realName+"   手机："+j.telphone;
				driverInfoList.push(info);
			});
			
			var driverInfo = driverInfoList.join("  ");
			var el = $('<tr> \
				    <th width="33"> \
			    	<div class="edit"></div> \
			    </th> \
			    <th width="135">车牌号:'+plateNumber+'</th> \
			    <th width="811"> \
				    <span class="contacter">'+driverInfo+'</span> \
			    </th> \
			</tr>');
			
			el.find('.edit').click(function(){
				location.href = global.getContextPath() + '/edit_driver_info.htm?vehicleInfoId='+row.vehicleInfoId;
				return false;
			});
			el.click(function(){
				location.href = global.getContextPath() + '/driver_info.htm?vehicleInfoId='+row.vehicleInfoId;
				return false;
			});
			
			return el;
		},
		onBeforeLoad : function(param){
			return param.status != null;
		}
	});
	
	this.bindEvent = function(){
		var _this = this;
		$('.tab_tit').on('click','li',function(){
			$(this).siblings('li').removeClass('current');
			$(this).addClass('current');
			var type = $(this).data('type');
			_this.load(type);
		});
	}
	
	this.init = function(){
		var _this = this;
		_this.bindEvent();
		_this.load('00');
	}
	
	this.load = function(type){
		var _this = this;
		_this.param.status = type;
		_this.table.load(_this.param);
	}
	
	this.init()
};

$(function(){
	new DriverList();
	
	global.coffee({
		"click":{
			".exit" :function(){
				if(confirm("确认退出？")){
					global.Logout();
				}
			}
		}
	})
})