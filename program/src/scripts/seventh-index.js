compose.require(['mod/page/first-page'], function(pfirst){
	//该文件入口
	alert(pfirst.id);
}, ['pfirst']);