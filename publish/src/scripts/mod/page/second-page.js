compose.require('mod/page/second-page', ['mod/wight/third-wight', 'mod/wight/forth-wight'], function(wthird, wforth){
	//该文件入口
	return {
		id:'secondPage',
		wthird: wthird,
		wforth: wforth
	};
});