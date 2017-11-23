var Pagination = function(options) {
	
//	var options = {
//		page : $('.handle-page'),
//		totalPage : 0,// 总页数
//		currentPage : 1,// 默认选中的页数
//		onSwitch : function(n){
			
//		} //页面跳转回调
//	}
	
	this.opt = $.extend({
		totalPage : 0,// 总页数
		currentPage : 1,// 默认选中的页数
		preposePagesCount: 2, // 当前页的最大紧邻前置页数（不包括最前面的显示页数）
		postposePagesCount: 2, // 当前页的最大紧邻后置页数
		firstPagesCount: 2, // 第一个"..."前显示的页数
		lastPagesCount: 0, // 第二个"..."后显示的页数
		onSwitch : $.noop //当页面跳转
	}, options);
	
	this.totalPage = this.opt.totalPage;
	this.currentPage = this.opt.currentPage;
	this.page = this.opt.page;
	
	this.init = function() {
		var _this = this;
		
		_this.page.addClass('skin-tb');
		
		_this.page.off('click','.pagination-spec').on('click','.pagination-spec',function(e){
			var toPage = parseInt($(this).data('page'));
			_this._switchToPage(toPage, true);
		});
		
		_this.page.off('click','.pagination-prev').on('click','.pagination-prev',function(e){
			_this._switchToPage((_this.currentPage-1), true);
		});

		_this.page.off('click','.pagination-next').on('click','.pagination-next',function(e){
			_this._switchToPage((_this.currentPage+1), true);
		});

		_this.page.off('click','.pagination-select').on('click','.pagination-select',function(e){
			_this._switchToPage(parseInt($(".selectPart").val()), true);
		})

		_this.page.off('keyup','.selectPart').on('keyup','.selectPart',function(e){
			var allPage = _this.totalPage;
			if(isNaN($(this).val())){
				$(this).val('');
			}else if($(this).val()>allPage){
				$(this).val(allPage);
			}
		})
		
		_this._switchToPage(_this.currentPage, false);
	}
	
	this.refresh = function(total, current){
		var _this = this;
		_this.totalPage = total;
		_this.currentPage = current;
		_this._resetPagination();
	}
	
	this._switchToPage = function(page, handler) {
		$("body").scrollTop(0,0);
		var _this = this;
		_this.currentPage = page;
		_this._onSwitch(page);
		if(handler){
			_this.opt.onSwitch(page);
		}
	}
	
	this._onSwitch = function(page){
		var _this = this;
		var total = _this.totalPage;
		var offset = total-page;
		if(page >= 4){
			_this.opt.postposePagesCount = 2;
		} else {
			_this.opt.postposePagesCount = 5 - page;
		}
		if(offset==3){
			_this.opt.postposePagesCount = 3;
		}
		if(offset <= 2){
			_this.opt.preposePagesCount = 4-offset;
		} else {
			_this.opt.preposePagesCount = 2;
		}
		_this._resetPagination();
	}
	
	this._resetPagination = function() {
		var _this = this;
		
		var paginationInner = '',
			selectPart = '',
			totalPage = _this.totalPage > 0 ? _this.totalPage : 1,
			currPage = (_this.currentPage <= totalPage && _this.currentPage) > 0 ? _this.currentPage : 1,
			preposePagesCount = _this.opt.preposePagesCount >= 0 ? _this.opt.preposePagesCount : 2,
			postposePagesCount = _this.opt.postposePagesCount >= 0 ? _this.opt.postposePagesCount : 1,
			firstPagesCount = _this.opt.firstPagesCount >= 0 ? _this.opt.firstPagesCount : 2,
			lastPagesCount = _this.opt.lastPagesCount >= 0 ? _this.opt.lastPagesCount : 0;

		// currPage前的页码展示
		paginationInner += currPage === 1 ? '<span class="pagination-start"><span>上一页</span></span>' : '<a class="pagination-prev"><span>上一页</span></a>';

		if (currPage <= firstPagesCount + preposePagesCount + 1) {
			for(var i=1; i<currPage; i++) {
				paginationInner += _this._renderActivePage(i);
			}
		} else {
			for(var i=1; i<=firstPagesCount; i++) {
				paginationInner += _this._renderActivePage(i);
			}
			paginationInner += '<span class="pagination-break">...</span>';
			for(var i=currPage-preposePagesCount; i<=currPage-1; i++) {
				paginationInner += _this._renderActivePage(i);
			}
		}

		// currPage的页码展示
		paginationInner += '<span class="pagination-curr">' + currPage + '</span>';

		// currPage后的页码展示
		if (currPage >= totalPage - lastPagesCount - postposePagesCount) {
			for(var i=currPage+1; i<=totalPage; i++) {
				paginationInner += _this._renderActivePage(i);
			}

		} else {
			for(var i=currPage+1; i<=currPage+postposePagesCount; i++) {
				paginationInner += _this._renderActivePage(i);
			}
			paginationInner += '<span class="pagination-break">...</span>';
			for(var i=totalPage-lastPagesCount+1; i<=totalPage; i++) {
				paginationInner += _this._renderActivePage(i);
			}
		}

		for(var i=0;i<totalPage;i++){
			var index = i+1;
			selectPart+='<option>'+index+'</option>'
		}

		paginationInner += currPage === totalPage ? '<span class="pagination-end"><span>下一页</span></span>' : '<a class="pagination-next"><span>下一页<span></a>';
		paginationInner += '共&nbsp;'+totalPage+'&nbsp;页，到第';
		paginationInner += '<input class="selectPart" type="tel" value="' + (currPage<totalPage?(currPage+1):totalPage) + '">';
		paginationInner +='页';
		paginationInner += '<button class="pagination-select">确定</button>'
		_this.page.html(paginationInner);
	}
	
	this._renderActivePage = function(index) {
		return '<a class="pagination-spec" data-page="' + index + '">' + index + '</a>';
	}
	
	this.init();
}
