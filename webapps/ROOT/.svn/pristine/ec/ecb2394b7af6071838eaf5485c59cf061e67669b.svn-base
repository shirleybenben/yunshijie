var YSJDriver = function(options){
	this.opt = $.extend({}, options);
	this.tempId = this.opt.tempId;
	this.container = this.opt.append;
	this.isNew = true;
	this.infoId = null;
	
	this.imageList = [];
	
	this.el = $('<div class="tab driver_tab"> \
			<div class="driver_w edit_driver_w clearfix"> \
			<ul class="upload_img_w clearfix"> \
				<li> \
					<div class="upload_img" data-column="idFImageRefId" data-category="sjsfzzm"> \
						<img src="img/add_img.png"> \
						<span class="close"></span> \
					</div> \
					<p class="txt">身份证正面照片</p> \
				</li> \
				<li> \
					<div class="upload_img" data-column="idBImageRefId" data-category="sjsfzfm"> \
						<img src="img/cards_f.png"> \
						<span class="close"></span> \
					</div> \
					<p class="txt">身份证反面照片</p> \
				</li> \
				<li> \
					<div class="upload_img" data-column="qualifiImageRefId" data-category="sjcyzgz"> \
						<img src="img/career.png"> \
						<span class="close"></span> \
					</div> \
					<p class="txt">从业资格证照片</p> \
				</li> \
				<li> \
					<div class="upload_img" data-column="qualifiImage2RefId" data-category="sjcyzgz"> \
						<img src="img/career.png"> \
						<span class="close"></span> \
					</div> \
					<p class="txt">从业资格证照片</p> \
				</li> \
				<li> \
					<div class="upload_img" data-column="drivingFImageRefId" data-category="sjjsz"> \
						<img src="img/driver.png"> \
						<span class="close"></span> \
					</div> \
					<p class="txt">驾驶证照片</p> \
				</li> \
		</ul> \
		<div class="status"> \
			<div class="inps"> \
				<p> \
					<label for=""><strong>姓名</strong></label> \
					<input maxlength="20" type="text" data-column="realName" class="text-column to-readonly" placeholder="请填写真实姓名"/> \
				</p> \
				<p> \
					<label for=""><strong>身份证号</strong></label> \
					<input maxlength="18" type="text" data-column="idno" class="text-column to-readonly" placeholder="请填写身份证号"/> \
				</p> \
				<p> \
					<label for=""><strong>手机号</strong></label> \
					<input maxlength="11" type="text" data-column="telphone" class="text-column" placeholder="请填写手机号"/> \
				</p> \
			</div> \
		</div> \
		<button class="delete del_btn">删除</button> \
		</div> \
	</div>');
	
	
	this.getData = function(){
		var _this = this;
		var data = {};
		_this.el.find('.text-column').each(function(i, j){
			var self = $(j);
			var _p = self.data('column');
			var _v = self.val();
			data[_p] = _v;
		});
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
		if(!_this.isNew){
			data.driverInfoId = _this.infoId;
		}
		data.tempId = _this.tempId;
		return data;
	}
	
	this.delDriver = function(){
		var _this = this;
		_this.opt.car.delDriver(_this.tempId);
	}
	
	this.isDriver = function(id){
		var _this = this;
		return id == _this.tempId;
	}
	
	this.init = function(options){
		var _this = this;
		_this.el.attr('ref', _this.tempId);
		_this.container.append(_this.el);
		var data = _this.opt.data;
		if(!$.isEmptyObject(data)){
			_this.isNew = false;
			_this.fillData(data);
		} else {
			_this.el.find('.upload_img').each(function(i, j){
				var image = new YSJImage({
	           		view: $(this),
	           		category: $(this).data('column'),
	           		delBtn : $(this).find('.close'),
	           		exClass :$(this).data('category')
	            });
				_this.imageList.push(image);
			})
		}
		_this.el.find('.del_btn').click(function(){
			_this.delDriver();
		})
	}
	
	this.fillData = function(data){
		var _this = this;
		_this.infoId = data.driverInfoId;
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
           		exClass :$(this).data('category'),
           		delBtn : $(this).find('.close'),
           		imageId : data[_p]
            });
			_this.imageList.push(image);
		});
		var status = data.status;
		if(status == '00'){//审核通过
    		_this.el.find(".to-readonly").attr('readonly', true);
    	} else if(status == '02'){ //审核不通过
    		
    	} else if(status == '01'){//审核中
    		_this.el.find(".to-readonly").attr('readonly', true);
    	} else if(status = '99'){//草稿状态
    		
    	}
	}
	
	this.init(options);
};


