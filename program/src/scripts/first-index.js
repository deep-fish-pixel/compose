compose.require(['mod/a', 'mod/b'], function(a, b){
	//该文件入口
	return {id:'firstIndex'};
}, ['a', 'b']);