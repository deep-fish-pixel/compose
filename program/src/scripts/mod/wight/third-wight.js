compose.require('mod/wight/third-wight', ['mod/object/third', 'mod/object/forth'], function (third, forth){
	return {
		id: 'third-wight',
		third: third,
		forth: forth
	}
})