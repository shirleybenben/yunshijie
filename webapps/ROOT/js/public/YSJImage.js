var YSJImage = function(options) {
	this.opt = $.extend({}, options);
	
	this.container = $('<div class="dialog_wrap" style="display:none;"> \
		<div class="dialog_w"> \
	  		<div class="upload_c clearfix"> \
	  			<div class="clearfix"> \
	  				<div class="upload_c_l"> \
		  				<img class="intro_bg" src=""> \
		  			</div> \
		  			<div class="upload_c_l upload_c_r"> \
		  				<img id="imgUpload" src="'+ global.getContextPath()+ '/img/upload_bg.png" style="display:block;"> \
						<input type="file" id="inputUploadFile" class="hide" accept="image/jpg,image/gif,image/png"/> \
						<span></span> \
		  			</div> \
	  			</div> \
	  			<p class="require"></p> \
	  		</div> \
	  		<span class="close"></span> \
		</div> \
		<div class="mask"></div> \
	</div>');
	this.hasUpload = true;
	this.category = null;
	this.imageId = null;
	
	var _this = this;
	
	this.getTips = function(exClass){
		
		var result ={
			bg:"/img/shili.png",
			text:"请确保证件四角完整，文字清晰可辨认",
			btn:'/img/add_img.png'
		};
		
		switch(exClass){
			case "grsfzzm":{ // 个人身份证正面
				result.bg = "/img/id_card.png";
				result.text="请确保证件四角完整，文字清晰可辨认。";
				result.btn = '/img/add_img.png';
				break;
			}
			case "grsfzfm":{ // 个人身份证反面
				result.bg = "/img/id_card.png";
				result.text="请确保证件四角完整，文字清晰可辨认。";
				result.btn = '/img/cards_f.png';
				break;
			}
			case "gsyyzz":{ // 公司营业执照
				result.bg = "/img/business_license.png";
				result.text="请确保证件四角完整，文字清晰可辨认。";
				result.btn = '/img/add_yyzz.png';
				break;
			}
			case "clxsz":{ // 车辆行驶证
				result.bg = "/img/traval_license.png";
				result.text="请确保证件四角完整，文字清晰可辨认。";
				result.btn = '/img/car.png';
				break;
			}
			case "clyyz":{ // 车辆营运证
				result.bg = "/img/taxi_license.png";
				result.text="请确保证件四角完整，文字清晰可辨认。";
				result.btn = '/img/trans.png';
				break;
			}
			case "clsyx":{ // 车辆商业险
				result.bg = "/img/commercial_insurance.png";
				result.text="请确保证件四角完整，文字清晰可辨认。";
				result.btn = '/img/add_sybx.png';
				break;
			}
			case "clqzx":{ // 车辆强制险
				result.bg = "/img/compulsory_insurance.png";
				result.text="请确保证件四角完整，文字清晰可辨认。";
				result.btn = '/img/add_qzbx.png';
				break;
			}
			case "sjsfzzm":{ // 司机身份证正面
				result.bg = "/img/id_card.png";
				result.text="请确保证件四角完整，文字清晰可辨认。";
				result.btn = '/img/add_img.png';
				break;
			}
			case "sjsfzfm":{ // 司机身份证反面
				result.bg = "/img/id_card.png";
				result.text="请确保证件四角完整，文字清晰可辨认。";
				result.btn = '/img/cards_f.png';
				break;
			}
			case "sjjsz":{ // 司机驾驶证
				result.bg = "/img/driving_license.png";
				result.text="请确保证件四角完整，文字清晰可辨认。";
				result.btn = '/img/driver.png';
				break;
			}
			case "sjcyzgz":{ // 司机从业资格证
				result.bg = "/img/qualificate_certificate.png";
				result.text="请确保证件四角完整，文字清晰可辨认。";
				result.btn = '/img/career.png';
				break;
			}
		}
		
		return result;
	}
	
	this.template = {
		photo: function (data, init) {
			if(init){
				var el = $('<img class="add-btn picture" src="' + global.imgsrc(data.imageId,{}) + '" />');
				return el;
			} else {
				var el = $('<img class="add-btn picture" src="' + data.imgContent + '" />');
				return el;
			}
		}
	};
	
	this.fillData = function(data) {
		var _this = this;
		var isInit = data.init;
		if(isInit){
			this.hasUpload = true;
			this.imageId = data.imageId;
		} else {
			this.file = data.file;
			this.hasUpload = false;
			this.imageId = null;
		}
		this.el = this.template.photo(data, isInit);
		
		return this;
	};
	
	this.clearPhoto = function(tips){
		var _this = this;
		var target = _this.opt.view;
		target.find('img').remove();
		var el = $('<img class="add-btn picture" src="' + global.getContextPath() + tips.btn + '" />');
		target.append(el);
		_this.hasUpload = false;
		_this.imageId = null;
	}
	
	
	this.postToServer = function(url) {
		var _this = this;
		if(_this.hasUpload){
			if(_this.imageId){
				return {"column":_this.category,"imageId":_this.imageId};
			} else {
				return {"column":_this.category,"imageId":null};
			}
		} else {
			var result = {};
			result.column = _this.category;
			if (this.file) {
				if (window.FormData) {
					var success = false;
					var formdata = new FormData();
					formdata.append("image", this.file);
					$.ajax({
						url: global.server + url,
						type: 'POST',
						data: formdata,
						cache: false,
						async: false,
						contentType: false,
						processData: false,
						success: function(msg) {
				            if (msg && msg.status && msg.status.statusCode == global.status.success) {
				            	var imageId = msg.data.imageId;
				            	_this.imageId = imageId;
				            	_this.hasUpload = true;
				            	result.imageId = imageId;
				            	success = true;
				            } else {
				            	console.log('upload occur error' + msg.status.errorMsg);
				            }
						}
					});
					if(success){
						return result;
					} else {
		            	result.imageId = null;
		            	return result;
					}
				} else {
					console.log('not support formdata');
	            	result.imageId = null;
	            	return result;
				}
			} else {
            	result.imageId = null;
            	return result;
			}
		}
	};
	
	this.dropPhoto = function(data) {
		var _this = this;
		var target = _this.opt.view;
		_this.destoryDialog();
		target.find('img').remove();
		_this.fillData(data);
		target.append(this.el);
	};
	
	
	
	this.init = function(options) {
		var _this = this;
		var target = _this.opt.view;
		var exClass = _this.opt.exClass;
		this.category = _this.opt.category;
		
		var readMultipleFiles = function(evt) {
			var files = evt.target.files;
			if (files) {
				for (var i = 0; i < files.length; i++) {
					if (files[i].type != 'image/jpeg' && files[i].type != 'image/gif' && files[i].type != 'image/png') {
						alert("文件类型错误，请上传JPG、GIF、PNG格式的文件！");
						continue;
					}
					if (files[i].size > 3*1024*1024) {
						alert("文件过大，请上传3M以内的文件！");
						continue;
					}
					console.log('FileUpload:' +files[i].name+' will be uploaded ...');
					(function(i) {
						var reader = new FileReader();
						reader.onload = function(event) {
							var imageObj = {
								"init": false,
								"imgContent": event.target.result,
								"file": files[i]
							};
							_this.dropPhoto(imageObj);
						};
						reader.readAsDataURL(files[i]);
					})(i);
				}
				evt.target.outerHTML = evt.target.outerHTML;
			} else {
				console.log("Failed to load files"); 
			}
		}
		
		target.on('click', function() {
			$('body').append(_this.container);
			
			var tips = _this.getTips(exClass);
			
			_this.container.find('.require').html('上传要求：'+tips.text);
			_this.container.find('.intro_bg').attr('src',global.getContextPath()+ tips.bg);
			
			
			_this.container.find('.close').click(function(){
				_this.destoryDialog();
			});
			
			_this.container.find('#imgUpload').click(function(){
				var trigger = $(this).next('input:file')[0];
				trigger.addEventListener('change', readMultipleFiles, false);
				trigger.click();
			});
			
			_this.showDialog();
			return false;
		});
		
		var delBtn = _this.opt.delBtn;
		if(delBtn){
			delBtn.on('click', function(){
				var tips = _this.getTips(exClass);
				_this.clearPhoto(tips);
				return false;
			});
		}
		
		if(_this.opt.imageId){
			var imageObj = {
				"init": true,
				"imageId": _this.opt.imageId
			};
			_this.dropPhoto(imageObj);
		}
	};
	
	
	
	this.showDialog = function(){
		var _this = this;
		_this.container.show();
	};
	
	this.destoryDialog = function(){
		var _this = this;
		_this.container.remove();
	}
	
	this.init(options);
};