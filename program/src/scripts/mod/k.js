compose.require(['mod/a','mod/b','mod/c','mod/d'], function(a, b, c, d){
	//该文件入口
	window.k = {id:'k'};
}, ['a','b','c','d']);