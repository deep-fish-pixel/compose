compose.require('mod/object/third', function (){
	return function third(){};
})
compose.require('mod/object/forth', function (){
	return function forth(){};
})
compose.require('mod/wight/third-wight', ['mod/object/third', 'mod/object/forth'], function (third, forth){
	return {
		id: 'third-wight',
		third: third,
		forth: forth
	}
})
compose.require('mod/wight/forth-wight', function (){
	return function wforth(){};
})
compose.require('mod/page/second-page', ['mod/wight/third-wight', 'mod/wight/forth-wight'], function(wthird, wforth){
	//该文件入口
	return {
		id:'secondPage',
		wthird: wthird,
		wforth: wforth
	};
});
compose.require(['mod/page/second-page'], function(wthird){
	//该文件入口
	alert(wthird.id);
});