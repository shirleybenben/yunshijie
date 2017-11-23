'use strict';

(function (win) {
    //配置baseUrl
    var baseUrl = document.getElementById('main').getAttribute('data-baseurl');

    /*
     * 文件依赖
     */
    var config = {
        baseUrl: baseUrl,           //依赖相对路径
        paths: {                    //如果某个前缀的依赖不是按照baseUrl拼接这么简单，就需要在这里指出
            jquery: '/js/jquery-2.1.1.min',
            angular: '/js/angular.min',
            moment: '/js/moment',
            store: '/js/store.min',
            cookie: '/js/jquery.cookie',
            md5: '/js/jquery.md5',
            ui: '/js/jquery-ui.min',
            multiselect: '/js/jquery.multiselect',
            multfilter: '/js/jquery.multiselect.filter',
            datepicker: '/js/datepicker.min',
            gconfig: '/js/global_config',
            lobal: '/js/global',
            countrySelect: '/js/countrySelect',
            YSJTable: '/js/YSJTable',
            YSJSourceRowL: '/js/YSJSourceRowL',
            YSJSupplyHall: '/js/YSJSupplyHall',
            angularResource: '/js/angular-resource.min',
            router: '/js/angular-route.min',
            text: 'libs/text'             //用于requirejs导入html类型的依赖
        },
        shim: {                     //引入没有使用requirejs模块写法的类库。例如underscore这个类库，本来会有一个全局变量'_'。这里shim等于快速定义一个模块，把原来的全局变量'_'封装在局部，并导出为一个exports，变成跟普通requirejs模块一样
            // underscore: {
            //     exports: '_'
            // },
            angular: {
                deps:['jquery','gconfig','lobal'],
                exports: 'angular'
            },
            angularResource: {
                deps: ['angular']   //依赖什么模块
            }
        }
    };

    require.config(config);

    require(['angular','/js/controller.js','router'], function(angular,controller,router){
        // angular.bootstrap(document, ['webapp']);
    });

})(window);