var YSJLineSelect = function(options){
	this.opt = $.extend({},options);
	this.startSelect = this.opt.startSelect;
	this.endSelect = this.opt.endSelect;
	this.addBtn = this.opt.addBtn;
	this.max = this.opt.max;
	this.lines = new YSJLines({max : this.max, errorTip : this.opt.errorTip});
	this.render = this.opt.render;
	
	this.init = function(){
		var _this = this;
		_this.startSelect.multiselect({
			header : false,
			multiple : false,
			selectedList : 1,
			noneSelectedText: '请选择',
			minWidth: 424
		});
		_this.endSelect.multiselect({
			header : false,
			multiple : false,
			selectedList : 1,
			noneSelectedText: '请选择',
			minWidth: 424
		});
		_this.load();
		_this.addBtn.click(function(){
			_this.addLine();
		});
	};
	
	this.show = function(data){
		var _this = this;
		_this.startSelect.empty();
		_this.endSelect.empty();
		_this.startSelect.append('<option value="请选择" selected disabled="disabled">请选择</option>');
		_this.endSelect.append('<option value="请选择" selected disabled="disabled">请选择</option>');
		$.each(data, function(i, j){
			_this.startSelect.append('<option data-id="'+ j.regionId +'" value="' + j.regionCode + '">' + j.regionName +'</option>');
			_this.endSelect.append('<option data-id="'+ j.regionId +'" value="' + j.regionCode + '">' + j.regionName +'</option>');
		});
		_this.startSelect.multiselect("refresh");
		_this.endSelect.multiselect("refresh");
	};
	
	this.load = function(){
		var _this = this;
		$.ajax({
	        url: global.server + '/api/region/findById',
	        type: "get",
	        data: {"parentId":"1"},
	        success: function (msg) {
	            if (msg && msg.status && msg.status.statusCode == global.status.success) {
	            	var data = msg.data;
	            	_this.show(data);
	            }
	        }
	    });
	};
	
	this.getLines = function(){
		var _this = this;
		return _this.lines.getData();
	};
	
	this.addLine = function(){
		var _this = this;
		var start = _this.startSelect.val();
		var end = _this.endSelect.val();
		var row = {
			start :start,
			end:end
		}
		var id = _this.lines.addLine(start, end);
		if(id != null){
			row.id = id;
			row.from = _this.startSelect.find("option:selected").text();
			row.to = _this.endSelect.find("option:selected").text();
			_this.render.call(_this, row);
		}
	};
	
	this.delLine = function(id){
		var _this = this;
		_this.lines.delLine(id);
	};
	
	this.valid = function(){
		var _this = this;
		return _this.lines.valid();
	}
	
	this.reloadLines = function(data){
		var _this = this;
		_this.lines.loadLines(data);
	}
	
	this.init();
}



var YSJLines = function(options){
	this.opt = $.extend({},{max:5}, options);
	this.max = this.opt.max;
	this.lines = [];
	
	this.loadLines = function(data){
		var _this = this;
		_this.lines.length = 0;
		$.each(data, function(i, j){
			var id = j.lineInfoId;
			var start = j.departureCode;
			var end = j.destinationCode;
			var line = {id:id, start:start, end:end};
			_this.lines.push(line);
		});
	}
	
	this.addLine = function(start, end){
		var _this = this;
//		console.log(_this.opt.errorTip);
		if(start == end){
			_this.opt.errorTip.text("起运地不能等于目的地");
			console.log("起运地不能等于目的地");
			return null;
		} else {
			if(_this.lines.length+1 > _this.max){
				_this.opt.errorTip.text("只能添加最多5条线路");
				console.log("只能添加最多5条线路");
				return null;
			}
			var exists = _this.exists(start, end);
			if(exists){
				_this.opt.errorTip.text("该线路已经存在");
				console.log("该线路已经存在");
				return null;
			} else {
				var id = global.uuid();
				var line = {id:id, start:start, end:end};
				_this.lines.push(line);
				_this.opt.errorTip.empty();
				return id;
			}
		}
		return null;
	};
	
	this.delLine = function(id){
		var _this = this;
		$.each(_this.lines, function(i, j){
			if(j.id == id){
				_this.lines.splice(i, 1);
				return false;
			}
		});
	}
	
	this.valid = function(){
		var _this = this;
		var count = _this.lines.length;
		if(count<1){
			_this.opt.errorTip.text("请添加至少一条线路");
			console.log("请添加至少一条线路");
			return false;
		}
		if(count>5){
			console.log("只能添加最多5条线路");
			_this.opt.errorTip.text("只能添加最多5条线路");
			return false;
		}
		_this.opt.errorTip.empty();
		return true;
	};
	
	this.getData = function(){
		var _this = this;
		return _this.lines;
	}
	
	this.exists = function(start, end){
		var _this = this;
		var exists = false;
		$.each(_this.lines, function(i, j){
			if(j.start==start && j.end == end){
				exists = true;
				return false;
			} else if(j.start == end && j.end == start){
				exists = true;
				return false;
			}
		});
		return exists;
	};
	
};