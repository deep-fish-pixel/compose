/*compose.require(['mod/page/first-page', 'mod/page/second-page'], function(pfirst, psecond){
	//该文件入口
	alert(pfirst.id);
	alert(psecond.id);
}, ['pfirst']);*/
compose.require(['mod/page/first-page'], function(pfirst){
	//该文件入口
	alert(pfirst.id);
}, ['pfirst']);
compose.require(['mod/page/second-page'], function(wthird){
	//该文件入口
	alert(wthird.id);
});
compose.require(['mod/a', 'mod/b'], function(a, b){
	//该文件入口
	alert(a);
	alert(b);
}, ['a', 'b']);
compose.require(['mod/k'], function(k){
	//该文件入口
	alert(k.id);
}, ['k']);

