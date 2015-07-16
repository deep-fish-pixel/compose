function first(){}
function second(){}
compose.require(["mod/object/first","mod/object/second"],function(a,b){window.wfirst={id:"firstWight",first:a,second:b}},["first","second"]);
function wsecond(){}
compose.require("mod/page/first-page",["mod/wight/first-wight","mod/wight/second-wight"],function(a,b){window.pfirst={id:"firstPage",wfirst:a,wsecond:b}},["wfirst","wsecond"]);
compose.require("mod/object/third",function(){return function(){}});
compose.require("mod/object/forth",function(){return function(){}});
compose.require("mod/wight/third-wight",["mod/object/third","mod/object/forth"],function(a,b){return{id:"third-wight",third:a,forth:b}});
compose.require("mod/wight/forth-wight",function(){return function(){}});
compose.require("mod/page/second-page",["mod/wight/third-wight","mod/wight/forth-wight"],function(a,b){return{id:"secondPage",wthird:a,wforth:b}});
function a(){}
function b(){}
function c(){}
function d(){}
compose.require(["mod/a","mod/b","mod/c","mod/d"],function(a,b,c,d){window.k={id:"k"}},["a","b","c","d"]);
compose.require(["mod/page/first-page"],function(a){alert(a.id)},["pfirst"]),compose.require(["mod/page/second-page"],function(a){alert(a.id)}),compose.require(["mod/a","mod/b"],function(a,b){alert(a),alert(b)},["a","b"]),compose.require(["mod/k"],function(a){alert(a.id)},["k"]);