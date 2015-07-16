compose.require(['mod/page/first-page.js?first=true'], function(pfirst){
	//该文件入口
	compose.require(['mod/page/second-page.js?'], function(wthird){
		//该文件入口
		alert('second');
	});
	setTimeout(function(){
		compose.require(['mod/a', 'mod/b'], function(a, b){
			//该文件入口
			alert('third');
		}, ['a', 'b']);
	}, 1000);
}, ['pfirst']);

compose.require(['mod/k'], function(k){
	//该文件入口
	alert('first');
}, ['k']);

