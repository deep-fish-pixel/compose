compose.config({
    paths: {
        jQuery: 'http://res.suning.cn/public/v3/js/jquery.js'
    }
});
compose.require(['jQuery', 'mod/page/first-page'], function(jquery){
	//该文件入口
	alert(jquery);
});