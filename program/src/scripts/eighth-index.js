compose.require(['mod/page/second-page'], function(wthird){
	//该文件入口
	alert(wthird.id);
});