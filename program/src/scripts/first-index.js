compose.require(['a', 'b'], function(a, b){
	//该文件入口
	alert(a + '--------');
}, ['a', 'b']);