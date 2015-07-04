function e(){}
compose.satisfy(e);
function f(){}
compose.satisfy(f);
compose.require(['mod/e','mod/f'], function(e, f){
	//该文件入口
	alert(f);
	return {id:'forthIndex'};
});