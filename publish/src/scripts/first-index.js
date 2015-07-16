function a(){}
function b(){}
compose.require(["mod/a","mod/b"],function(a,b){return{id:"firstIndex"}},["a","b"]);