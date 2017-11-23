var YSJAgent = function(options){
	this.opt = $.extend({}, options);
	this.columns = $('.column');
	this.imageColumns = $('.image-column');
	this.inModify = false;
	this.imageList = [];
    var _this = this;
    
    this.init = function (options) {
    	var _this = this;
        if (options && options.vehicleInfoId) {
            console.log('init agent data with id: ' + options.accountId);
            var url = "/api/agent/addOrUpdateAgent?accountId=" + options.accountId;
            var _this = this;
            $.get(global.server + url, function (msg) {
                if (msg && msg.status && msg.status.statusCode == global.status.success) {
                    var data = msg.data;
                    _this.fillContentFromJsonData(data);
                    _this.modify();
                }
            }).done(function (msg) {
            	var data = msg.data;
    //         	$('select').multiselect({
				// 	header : false,
				// 	multiple : false,
				// 	selectedList : 1
				// });
            });
        } else {
            console.log('new agent');
            // 加载照片控件
            if (typeof CBSImage === "function") {
            	this.imageColumns.each(function(i, j){
                	var image = new CBSImage({
                		view: $(this),
                		category: $(this).data("column")
                    });
                	_this.imageList.push(image);
                });
            }
   //          $('select').multiselect({
			// 	header : false,
			// 	multiple : false,
			// 	selectedList : 1
			// });
        }
        
        $('.use-date').attr("readonly",true).each(function(i, j){
        	var position = $(this).data('position');
        	if(!position){
        		position = 'bottom left';
        	} 
        	$(this).datepicker({
    			language: 'zh-cn',
    			position:position,
    			autoClose:true,
    			todayButton:false,
    			clearButton:false
    		});
        });
    }
	this.init(options);
	
};

YSJAgent.prototype.doSave = function () {
    var _this = this;
    var result = _this.getJsonDataFromContent();
    var url = null;
    if(_this.inModify){
    	url = "/api/agent/addOrUpdateAgent";
    	result.accountId = _this.opt.accountId;
    	result.agentType=_this.opt.agentType;
    } else {
    	url = "/api/agent/addOrUpdateAgent";
    	result.agentType=_this.opt.agentType;
    }
    $.ajax({
        url: global.server + url,
        type: "POST",
        data: result,
        success: function (msg) {
            if (msg && msg.status && msg.status.statusCode == global.status.success) {
            	var vehicleInfoId = null;
            	if(_this.inModify){
            		accountId = _this.opt.accountId;
            		location.href = 'info_agent.htm?accountId='+accountId;
            	} else {
            		accountId = msg.data.accountId;
            		location.href = 'edit_material.htm?accountId='+accountId;
            	}
            }
        }
    });
    
};

YSJAgent.prototype.getJsonDataFromContent = function(){
	var data = {};
	this.columns.each(function(i, j){
		var _this = $(this);
		var pName = _this.data("column");
		var pValue = _this.val();
		data[pName] = pValue;
	});
	$.each(this.imageList,function(i, j){
		var result = j.postToServer('/api/agent/uploadAgentImage');
		if(result != null){
			var pName = result.column;
			var pValue = result.imageId;
			data[pName] = pValue;
		}
	});
	return data;
};

YSJAgent.prototype.fillContentFromJsonData = function (data) {
    if (!data) return;
    this.data = data;
    var _this = this;
    this.columns.each(function (i, j) {
    	var _this = $(this);
    	var pName = _this.data("column");
    	var pValue = data[pName];
    	_this.val(pValue);
    });
    // 加载照片控件
    if (typeof CBSImage === "function") {
    	this.imageColumns.each(function(i, j){
    		var category = $(this).data("column");
    		var imageId = data[category];
        	var image = new CBSImage({
        		view: $(this),
        		category: $(this).data("column"),
        		imageId: imageId
            });
        	_this.imageList.push(image);
        });
    }
};

YSJAgent.prototype.modify = function () {
    this.inModify = true;
};/**
 * 
 */