function first(){}
function second(){}
compose.require(['mod/object/first', 'mod/object/second'], function (first, second){
	window.wfirst = {
		id: 'firstWight',
		first: first,
		second: second
	};
}, ['first', 'second'])
function wsecond(){}
compose.require('mod/page/first-page', ['mod/wight/first-wight', 'mod/wight/second-wight'], function(wfirst, wsecond){
	//该文件入口
	window.pfirst = {
		id: 'firstPage',
		wfirst: wfirst,
		wsecond: wsecond
	};
}, ['wfirst', 'wsecond']);
compose.require(['mod/page/first-page'], function(pfirst){
	//该文件入口
	alert(pfirst.id);
}, ['pfirst']);