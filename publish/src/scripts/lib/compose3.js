!function(){"use strict";function a(b,c,d){var e=Object.prototype.toString,f="[object Array]";b=b||{};for(var g in c)d===!0&&c.hasOwnProperty(g)&&"object"==typeof c[g]?(b[g]||(b[g]=e.call(c[g])===f?[]:{}),a(b[g],c[g])):b[g]=c[g];return b}function b(a,b,c){a&&"undefined"!=typeof a.onload?(a.onload=function(){this.onload=null,this.onerror=null,b()},a.onerror=function(){this.onload=null,this.onerror=null,c()}):a&&(a.onreadystatechange=function(a){("complete"==this.readyState||"loaded"==this.readyState)&&(this.onreadystatechange=null,b())})}function c(a){return a&&"object"==typeof a&&Array==a.constructor}function d(a){if(a){var b,c=a.match(/^\s*(\S*)\s*$/);if(c)return b=c[1].match(/(.*)\?+$/),b?b[1]:c[1]}return a}var e=function(){function a(){for(var a=0;a<b.length;a++)b[a]();b=null}document.all?window.attachEvent("onload",a):window.addEventListener("load",a,!1);var b=[];return{on:function(a){b?b.push(a):a()},triggerLoad:a}}(),f={_config:{basePath:"",contextPath:!1,paths:{}},_process:[],_satisfies:[],_completedPaths:{},_onLoadEvents:[],_delayer:{time:0,used:!1,push:function(a,b){var c=this;this.used=!0,this._callback=function(){a&&a(),c._timer=null,c._callback=null},this.time=b||0,this._timer=setTimeout(this._callback,this.time)},delay:function(a){this._timer&&clearTimeout(this._timer),this._callback&&(void 0!==a&&(this._timer=a),this._timer=setTimeout(this._callback,this.time))}},initConfig:function(){for(var a,b,c,d,e,f,g=this._config,h=document.getElementsByTagName("script"),i=h.length,j=0;i>j;j++)if(a=h[j],b=a.getAttribute("data-contextpath")||"",c=a.getAttribute("data-dependonload")||"",d=a.getAttribute("data-basepath")||"",e=a.getAttribute("data-param")||"",f=a.getAttribute("data-main")||"",b||c||d){g.contextPath=b?b+"/":"",g.dependOnload=c,g.basePath=d,g.param=e,g.main=f;break}},initLoad:function(){var a,b=this._config,c=b.main;if(c){a=this.handlePath(c,b.contextPath,b.basePath,b.param);var d=document.head||document.getElementsByTagName("head")[0],e=this.createElement("script",a);e&&d.appendChild(e)}},config:function(b){var c=this._config;a(c,b,!0),c.contextPath=c.contextPath||"",c.dependOnload=c.dependOnload||"",c.basePath=c.basePath||"",c.param=c.param||""},getContext:function(a){return this._config.contextPath},require:function(a,b,c,d,e){this.req(a,b,c,d,e)},async:function(a,b,c,d,e){this.req(a,b,c,d,e,{method:"async"})},paral:function(a,b,c,d,e){this.req(a,b,c,d,e,{method:"paral"})},req:function(a,b,d,e,f,g){this._delayer.delay(),(c(a)||"function"==typeof a)&&(f=e,e=d,d=b,b=a,a=null),"function"==typeof b&&(f=e,e=d,d=b,b=[]),d&&"string"!=typeof d||(d=function(){}),"function"!=typeof e&&(f=e,e=function(){}),f===!0&&(f=null),b._opts=g=g||{},b._existObjectNames=f||[],b.pathId=a,b.callback=d,b.contextPath=this._config.contextPath,b.param=this._config.param,b.basePath=this._config.basePath,b.fail=e,b.method=g.method;var h=this._handlingRequire;return"paral"===g.method?(this.preHandleRequires(b),void this.handleRequires()):1==this.isWaitingForChild()&&"async"!==g.method?(b.parent=h,this.preHandleRequires(b),void this.handleRequires()):h&&h.parent?(b.parent=h.parent,void this.preHandleRequires(b)):h&&!h.handled&&"async"===g.method?void this.preHandleRequires(b):(this.preHandleRequires(b),void(this._handling||this.handleRequires()))},satisfy:function(a){if(a){var b=this._onLoadEvents.shift(),c=this._handlingRequire;if(b!==c&&b&&b._process.length)return;b&&b._process.length&&this.setWaitingForChild(!1),a.resourceObject||this.checkAndSetObjectByName(a),"paral"==a.method?(a.handled=!0,this.checkComplete(a)):this.excCompleteAndExcNext(a)}},unsatisfy:function(a){this._onLoadEvents.shift();var b=this.getRequires(a);b.fail&&(b.fail(),b.failed=!0,delete a.fail),this._handlingRequire===a&&(this._handlingRequire=null),a.element&&a.element.remove(),this._handling=!1,this.deleteRequires(a)},preHandleRequires:function(a){for(var b,c,d,e,f,g=(a.length,a.callback),h=a.pathId,i=a._existObjectNames,j=a.parent?a.parent._process:this._process,k=a.parent?a.parent._satisfies:this._satisfies,l=j.length,m=/\.js$|\.js\?/,n=[],o=0,l=0;l<j.length;l++)o+=j[l].length;for(var p=0;p<=a.length;p++){if(b=a[p],c=b&&b.match(/\.css$/)?"css":"js",d=k[o+p],f=d&&d.value,e={type:c,handled:d?!0:!1,j:p,i:l,parent:a.parent,resourceObject:f,resourceObjectPath:i[p],_process:[],_satisfies:[],method:a.method},b){var q=this._config.paths[b];q?(e.path=q&&q.match(m)?q:q+".js",e.resourceObjectPath=b):this.handleRequirePath(e,b,a)}p==a.length&&(e.callback=g,h&&this.handleRequirePath(e,h,a)),d&&(this._completedPaths[e.path]=e),n.push(e)}return h&&this.handleRequirePath(n,h,a),a.fail&&(n.fail=a.fail),j.push(n),n},handleRequirePath:function(a,b,c){var d=c.basePath,e=c.contextPath,f=c.param;a.path=this.handlePath(b,e,d,f)},handlePath:function(a,b,c,e){var f,g=/\.js$|\.js\?/;if(a=d(a),a.match(/\.css$/))f=b?b+"/"+a:a;else{var h=b+c;f=(h?h+"/":"")+(a.match(g)?a:a+".js")}return e&&(f+=a.match(/\.js\?/)?a.match(/\?$/)?e:"&"+e:"?"+e),f},handleRequires:function(){this._handling=!0;var a,b,c=this.getNextRequire(this._handlingRequire),d=c&&c.i||0,e=c&&c.j||0,f=c&&c.parent&&c.parent._process?c.parent._process:this._process;if(!c&&this._handlingRequire)return void(this._handling=!1);for(var g=d;g<f.length;g++){a=f[g];var h=0;for(g==d&&(h=e);h<a.length;h++){if(b=a[h],b.resourceObject||this.checkAndSetObjectByName(b),!b.handled&&b.callback)return void this.checkComplete(b);if(!b.handled)return void this.handleRequire(b)}}a&&a.length?this._handling=!1:this.checkComplete({i:d,j:e})},handleRequire:function(a){if(!a||!a.parent&&a.handled)return void(this._handling=!1);var b="paral"==a.method;if(this.checkAndSetObjectByName(a),a.handled||!a.callback||b)if(b||a.path&&!a.resourceObject&&(1!=a.handled||"css"!==a.type))if(b)for(var c=this.getRequires(a),d=0;d<c.length;d++)this.addEvent(c[d]);else this.addEvent(a);else this.excCompleteAndExcNext(a);else this.checkComplete(a)},addEvent:function(a){var c=this.createElement(a.type,a.path),d=this;if(c){this._config.dependOnload&&(b(c,function(){d.satisfy(a)},function(){d.unsatisfy(a)}),a.element=c);var f=document.head||document.getElementsByTagName("head")[0];this._onLoadEvents.push(a),e.on(function(){d.setWaitingForChild(!0),f.appendChild(c)})}},triggerLoad:e.triggerLoad,createElement:function(a,b){if(b){var c,d=this._config;return"css"===a?(c=document.createElement("link"),c.setAttribute("type","text/css"),c.setAttribute("rel","stylesheet"),c.setAttribute("href",b)):(c=document.createElement("script"),c.setAttribute("type","text/javascript"),c.setAttribute("src",b),c.setAttribute("data-basepath",d.basePath)),c.setAttribute("data-contextpath",d.contextPath),c.setAttribute("data-dependonload",d.dependOnload),c}},excCompleteAndExcNext:function(a){a.handled=!0;var b=this.excCompleteAnGetNext(a);b&&this.setHandlingRequire(b),this.handleRequire(b)},excCompleteAnGetNext:function(a){return this.checkComplete(a),this.getNextRequire(a)},getNextRequire:function(a){if(a){if(a._process&&a._process.length)for(var b=a._process,c=b.length,d=0;c>d;d++)if(!b[d]._called)return b[d][0];var d=a.i,e=a.j,b=a.parent&&a.parent._process?a.parent._process:this._process,f=b[a.i];if(!f)return a;if(e==f.length-1||0==e&&0==f.length){if(d+=1,e=0,f=b[d],!f&&a.parent)return this.checkComplete(a.parent),this.getNextRequire(a.parent)}else e+=1;var g=b[d]&&b[d][e];return g}},checkComplete:function(a){if(a){var b=a.j,c=this.getRequires(a),d=[];if("paral"==a.method){for(var e,f=0;f<c.length&&(a=c[f],a&&a.handled);f++)e=a.resourceObject,e||(e=this.checkAndSetObjectByName(c[f])),d.push(e);f==c.length-1&&(a.handled=!0,a.callback.apply({success:!0},d),this._handling=!1,this.handleRequires())}else if(c&&(0==c.length||b==c.length-1)){if(a._process&&a._process.length)for(var g=a._process,h=g.length,f=0;h>f;f++)if(!g[f]._called)return;if(!c._called){for(var e,h=c.length,f=0;h-1>f;f++)e=c[f].resourceObject,e||(e=this.checkAndSetObjectByName(c[f])),d.push(e);var i=a.callback.apply({success:!0},d);if(a.resourceObject=i,a.handled=!0,c.path&&(this._completedPaths[a.path]=a),a.parent?(a.parent.resourceObject=i,a.parent.handled=!0,(c||a.parent._process[0])._called=!0):this._process[a.i]._called=!0,this._handling=!1,a!==this._handlingRequire)return;a.parent?(this.setHandlingRequire(a.parent),a.parent.callback||this.setWaitingForChild(!0),this.excCompleteAndExcNext(a.parent)):this.handleRequires()}}}},getRequires:function(a){var b=(a.i,a.j,a.parent&&a.parent._process?a.parent._process:this._process),c=b[a.i];return c},deleteRequires:function(a){var b=a.i,c=(a.j,a.parent&&a.parent._process?a.parent:this),d=c._process,e=d[a.i];e&&(c._process=d.slice(0,b).concat(d.slice(b+1)))},checkAndSetObjectByName:function(a){var b=this._completedPaths[a.path],c=a.resourceObjectPath,d=d;if("css"==a.type)return a.handled?(this._completedPaths[a.path]=!0,a.resourceObject=!0):b?(a.handled=!0,!0):void 0;if(a.resourceObject)return a.resourceObject;if(b){if(d=b.resourceObject)return a.resourceObject=d,a.handled=!0,d}else!b&&a.path&&(this._completedPaths[a.path]=a);if(c&&(!a||!a.callback)){for(var e,f=c.split("."),g=f.length,h=window,i=0;g>i;i++)e=f[i],(0!=i||"window"!=e)&&(h=h&&h[e]);if(h)return a.resourceObject=h,a.handled=!0,this._completedPaths[a.path]||(this._completedPaths[a.path]=a),h}},setWaitingForChild:function(a){this._handlingRequire&&(this._handlingRequire.waitingForChild=a)},isWaitingForChild:function(a){var b=a||this._handlingRequire;return b&&b.waitingForChild},setHandlingRequire:function(a){this.setWaitingForChild(!1),this._handlingRequire=a,a&&a.callback&&this.setWaitingForChild(!1)},handlingParamRequires:function(a){if(a){for(var b=a.length,c=0;b>c;c++)this.handleRequire(a[c]);a.callback&&a.callback()}}};f.initConfig(),f.initLoad(),window.compose=f}();