/*compose.require(['mod/page/first-page', 'mod/page/second-page'], function(pfirst, psecond){
	//该文件入口
	alert(pfirst.id);
	alert(psecond.id);
}, ['pfirst']);*/
compose.require(['mod/page/first-page'], function(pfirst){
	//该文件入口
	compose.require(['mod/page/second-page'], function(wthird){
		//该文件入口
		alert('second');
	});
	setTimeout(function(){
		compose.require(['mod/a', 'mod/b'], function(a, b){
			//该文件入口
			alert('third');
		}, ['a', 'b']);
	}, 0);
	
}, ['pfirst']);

compose.require(['mod/k'], function(k){
	//该文件入口
	alert('first');
}, ['k']);

