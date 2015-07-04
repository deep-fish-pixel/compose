function c (){}
function d(){}
compose.require(['mod/a','mod/b','mod/c','mod/d'], function(a, b, c, d){
	//该文件入口
	return {id:'thridIndex'};
}, ['a','b','c','d']);