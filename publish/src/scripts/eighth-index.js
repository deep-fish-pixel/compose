compose.require("mod/object/third",function(){return function(){}});
compose.require("mod/object/forth",function(){return function(){}});
compose.require("mod/wight/third-wight",["mod/object/third","mod/object/forth"],function(a,b){return{id:"third-wight",third:a,forth:b}});
compose.require("mod/wight/forth-wight",function(){return function(){}});
compose.require("mod/page/second-page",["mod/wight/third-wight","mod/wight/forth-wight"],function(a,b){return{id:"secondPage",wthird:a,wforth:b}});
compose.require(["mod/page/second-page"],function(a){alert(a.id)});