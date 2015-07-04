compose.require(['mod/object/first', 'mod/object/second'], function (first, second){
	window.wfirst = {
		id: 'firstWight',
		first: first,
		second: second
	};
}, ['first', 'second'])