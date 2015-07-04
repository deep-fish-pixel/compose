compose.require('mod/page/first-page', ['mod/wight/first-wight', 'mod/wight/second-wight'], function(wfirst, wsecond){
	//该文件入口
	window.pfirst = {
		id: 'firstPage',
		wfirst: wfirst,
		wsecond: wsecond
	};
}, ['wfirst', 'wsecond']);