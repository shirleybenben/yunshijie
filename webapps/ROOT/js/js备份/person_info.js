/*
* @Author: Administrator
* @Date:   2016-06-17 16:25:28
* @Last Modified by:   Administrator
* @Last Modified time: 2016-07-05 08:54:43
*/
$(function(){
	// tab
    function tab(name){
    	$(name).on('click', 'li', function(event) {
	    	$(this).addClass('current').siblings('li').removeClass('current');
	        var i=$(this).index();
	        $('.tab_con .tab').eq(i).show().siblings('.tab').hide();
	    });
    }
    tab("#driver_tab");
    tab("#editDriverTab");
})