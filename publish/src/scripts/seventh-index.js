function first(){}
function second(){}
compose.require(["mod/object/first","mod/object/second"],function(a,b){window.wfirst={id:"firstWight",first:a,second:b}},["first","second"]);
function wsecond(){}
compose.require("mod/page/first-page",["mod/wight/first-wight","mod/wight/second-wight"],function(a,b){window.pfirst={id:"firstPage",wfirst:a,wsecond:b}},["wfirst","wsecond"]);
compose.require(["mod/page/first-page"],function(a){alert(a.id)},["pfirst"]);