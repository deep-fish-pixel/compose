compose.config({
    paths: {
        jQuery: 'http://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min'
    }
});
compose.require(['jQuery'], function(jquery){
	//该文件入口
	alert(jquery);
});