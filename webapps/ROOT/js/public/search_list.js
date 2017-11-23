var searchList = function(param){
	this.table = new YSJTable({
		page : $('.handle-page'),
		content : $('.order_list'),
		url : '/api/source/queryHall?queryContent='+param,
		method  : 'get',
		pageNumber : 0,
		pageSize : 10,
		rowRender : function(index, row){
			// row.type = 1;
			return new YSJSourceRowL(row);
		},
		onBeforeLoad : function(param){
			return param.sourceType != null;
		}
	});

	this.loadData = function(param){
		var _this = this;
		var table = _this.table;
		table.load(param);
	}

	this.getList = function(){
		var param = {"sourceType": 0},_this = this;
		$(".tab_tit").on("click","li",function(){
			$(this).addClass("current").siblings().removeClass("current");
			param = {"sourceType": $(this).attr("data-check")};
			_this.loadData(param)
		})
		_this.loadData(param)
	}

	this.init = function(){
		var _this = this;
		_this.getList();
	}

	this.init();
}

$(function(){
	var queryContent = global.QueryString.queryContent;
	new searchList(queryContent);
})