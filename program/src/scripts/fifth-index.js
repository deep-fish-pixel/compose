compose.require(['mod/g','mod/h'], function(g, h){
	//该文件入口
	alert(g);
	return {id:'fifthIndex'};
}, ['g','h']);