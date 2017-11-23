var YSJLineManager = function(options){
	this.opt = $.extend({}, options);
	
	this.init = function(options){
		var _this = this;
		_this.getLines();
		var container = _this.opt.container;
		
		
		_this.lineSelect = new YSJLineSelect({
			startSelect : container.find("#start_line"),
			endSelect : container.find("#end_line"),
			addBtn : container.find('.add_r'),
			max : 5,
			errorTip : $('.error_tips'),
			render : function(data){
				_this.addLine(data);
			}
		});
	};

	this.getLines = function(){
		var _this = this;
		$.ajax({
			type: "get",
			url: global.server + '/api/line/getLineList',
			success: function (msg) {
				if (msg && msg.status && msg.status.statusCode == global.status.success) {
                    var data = msg.data;
                    _this.fillData(data);
                }
			}
		});
	}
	
	this.addLine = function(data){
		var _this = this;
		var param = {};
		param.departureCode = data.start;
		param.destinationCode = data.end;
		$.ajax({
			type: "post",
			data : param,
			url: global.server + '/api/line/addLine',
			success: function (msg) {
				if (msg && msg.status && msg.status.statusCode == global.status.success) {
					_this.getLines();
                }
			}
		});
	}
	
	this.fillData = function(data){
		var _this = this;
		var container = _this.opt.container.find('.routes');
		container.empty();
		$.each(data, function(i, j){
			var el = $('<li class="clearfix"> \
					<span><i>起运地</i><strong>' + j.departureCodeCn + '</strong></span> <b>—</b> <span class="to"><i>目的地</i><strong>' + j.destinationCodeCn+ '</strong></span> \
					<em></em> \
				</li>');
			el.hover(function(){
				el.find('em').addClass('r_close');
			},function(){
				el.find('em').removeClass('r_close');
			});
			el.attr('ref',j.lineInfoId);
			el.find('em').click(function(){
				var lineId = el.attr('ref');
				_this.delLine(lineId);
			})
			container.append(el);
		});
		
		_this.lineSelect.reloadLines(data);
	};
	
	this.delLine = function(lineId){
		var _this = this;
		var size = $('.routes >li').size();
		if(size>1){
			$.ajax({
				type: "post",
				url: global.server + '/api/line/delLine',
				data : {"lineInfoId":lineId},
				success: function (msg) {
					if (msg && msg.status && msg.status.statusCode == global.status.success) {
						alert('删除成功');
						_this.getLines();
	                }
				}
			});
		} else {
			alert('至少保留一条常跑线路');
		}
	}
	
	this.init(options);
}
$(function(){
	
	new YSJLineManager({
		container : $('.route_content')
	});
	
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