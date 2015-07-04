compose.require(['mod/i','mod/j'], function(i, j){
	//该文件入口
	alert(i);
	return {id:'sixthIndex'};
}, ['i','j']);