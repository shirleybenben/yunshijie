/**
 * 
 */
var YSJTable = function(options){
	this.opt = $.extend({}, options);
	
	this.pageContainer = this.opt.page;
	this.contentContainer = this.opt.content;
	this.pageIndex = this.opt.pageNumber;
	this.pageSize = this.opt.pageSize;
	this.hasNext = false;
	this.hasPrev = false;
	this.pageCount = 0;
	this.total = 0;
	this.param = $.extend({}, this.opt.queryParams);
	
	
	
	
	
	var _this = this;
	
	this.load = function(param){
		var _this = this;
		this.pageIndex = this.opt.pageNumber;
		this.pageSize = this.opt.pageSize;
		this.param = $.extend({}, this.opt.queryParams, param);
		_this.getData(_this.renderRow);
	};
	
	this.reload = function(){
		var _this = this;
		_this.getData(_this.renderRow);
	};
	
	this.renderRow = function(data){
		var _this = this;
		_this.contentContainer.empty();
		if(typeof _this.opt.rowRender === "function"){
			$.each(data,function(i, j){
				var el = _this.opt.rowRender(i, j);
				_this.contentContainer.append(el);
			});
		}
	}
	
	this.init = function(options){
		var _this = this;
		var param = {
			onSwitch : _this._switchToPage,
			totalPage : 0,// 总页数
			currentPage : _this.pageIndex,// 默认选中的页数
			page : _this.pageContainer
		};
		_this.pagination = new Pagination(param);
		_this.reload();
	};
	
	
	this._switchToPage = function(page) {
		_this.pageIndex = page-1;
		_this.reload();
		$(window).scrollTop(0);
	}
	
	this.getData = function(callback){
		var _this = this;
		var url = _this.opt.url;
		var param = _this.param;
		param.pageIndex = _this.pageIndex;
		param.pageSize = _this.pageSize;
		var onBeforeLoad = true;
		
		if(typeof _this.opt.onBeforeLoad === "function"){
			onBeforeLoad = _this.opt.onBeforeLoad(param);
		}
		var method = _this.opt.method;
		if(!method){
			method = "post";
		}
		if(onBeforeLoad){
			$.ajax({
		        url: global.server + url,
		        type: method,
		        data: param,
		        success: function (msg) {
		            if (msg && msg.status && msg.status.statusCode == global.status.success) {
		            	var data = msg.data;
		            	var pagination = _this.pagination;
		            	pagination.refresh(data.pageCount, (data.current+1));
		            	callback.call(_this,data.rows);
		            }
		        }
		    });
		}
	};
	
	
	this.init(this.opt);
};