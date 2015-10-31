!function(){"use strict";function a(b,c,d){var e=Object.prototype.toString,f="[object Array]";b=b||{};for(var g in c)d===!0&&c.hasOwnProperty(g)&&"object"==typeof c[g]?(b[g]||(b[g]=e.call(c[g])===f?[]:{}),a(b[g],c[g])):b[g]=c[g];return b}function b(a,b,c){a&&"undefined"!=typeof a.onload?(a.onload=function(){this.onload=null,this.onerror=null,b(!1)},a.onerror=function(){this.onload=null,this.onerror=null,b(!0)}):a&&(a.onreadystatechange=function(a){("complete"==this.readyState||"loaded"==this.readyState)&&(this.onreadystatechange=null,b())})}function c(a){return a&&"object"==typeof a&&Array==a.constructor}function d(a){if(a){var b,c=a.match(/^\s*(\S*)\s*$/);if(c)return b=c[1].match(/(.*)\?+$/),b?b[1]:c[1]}return a}var e=function(){function a(){for(var a=0;a<b.length;a++)b[a]();b=null}document.all?window.attachEvent("onload",a):window.addEventListener("load",a,!1);var b=[];return{on:function(a){b?b.push(a):a()}}}(),f={_config:{basePath:"",contextPath:!1,paths:{}},_process:[],_satisfies:[],_completedPaths:{},_onLoadEvents:[],_delayer:{time:0,used:!1,push:function(a,b){var c=this;this.used=!0,this._callback=function(){a&&a(),c._timer=null,c._callback=null},this.time=b||0,this._timer=setTimeout(this._callback,this.time)},delay:function(a){this._timer&&clearTimeout(this._timer),this._callback&&(void 0!==a&&(this._timer=a),this._timer=setTimeout(this._callback,this.time))}},initConfig:function(){for(var a,b,c,d,e,f,g=this._config,h=document.getElementsByTagName("script"),i=h.length,j=0;i>j;j++)if(a=h[j],b=a.getAttribute("data-contextpath")||"",c=a.getAttribute("data-dependonload")||"",d=a.getAttribute("data-basepath")||"",e=a.getAttribute("data-param")||"",f=a.getAttribute("data-main")||"",b||c||d){g.contextPath=b?b+"/":"",g.dependOnload=c,g.basePath=d,g.param=e,g.main=f;break}},initLoad:function(){var a,b=this._config,c=b.main;if(c){a=this.handlePath(c,b.contextPath,b.basePath,b.param);var d=document.head||document.getElementsByTagName("head")[0],e=this.createTag("script",a);d.appendChild(e)}},config:function(b){var c=this._config;a(c,b,!0),c.contextPath=c.contextPath||"",c.dependOnload=c.dependOnload||"",c.basePath=c.basePath||"",c.param=c.param||""},getContext:function(a){return this._config.contextPath},require:function(a,b,c,d,e){this.req(a,b,c,d,e)},async:function(a,b,c,d,e){this.req(a,b,c,d,e,{type:"async"})},paral:function(a,b,c,d){this.req(a,b,c,d,null,{type:"parall"})},req:function(a,b,d,e,f,g){return this._delayer.delay(),(c(a)||"function"==typeof a)&&(g=f,f=e,e=d,d=b,b=a,a=null),"function"==typeof b&&(g=f,f=e,e=d,d=b,b=[]),d&&"string"!=typeof d||(d=function(){}),"function"!=typeof e&&(g=f,f=e,e=function(){}),f===!0&&(f=null),b._opts=g=g||{},b._existObjectNames=f||[],b.pathId=a,b.callback=d,b.contextPath=this._config.contextPath,b.param=this._config.param,b.basePath=this._config.basePath,b.fail=e,"parall"===g.type?(b=this.preHandleRequires(b),void this.handlingParamRequires(b)):1==this.isWaitingForChild()&&"async"!==g.type?(b.parent=this._handlingRequire,b=this.preHandleRequires(b),void this.handleRequires()):this._handlingRequire&&this._handlingRequire.parent?(b.parent=this._handlingRequire.parent,void(b=this.preHandleRequires(b))):this._handlingRequire&&"async"===g.type?void(b=this.preHandleRequires(b)):(b=this.preHandleRequires(b),void(this._handling||this.handleRequires()))},satisfy:function(a,b){var c=this._onLoadEvents.shift(),d=this._handlingRequire;b===!0&&(d.fail=b),c!==d&&c&&c._process.length||(c&&c._process.length&&this.setWaitingForChild(!1),d?(a?d.resourceObject=a:d.resourceObject||this.checkAndSetObjectByName(d),this.excCompleteAndExcNext(d)):this._satisfies.push({value:a}))},preHandleRequires:function(a,b){for(var c,d,e,f,g,h=(a.length,a.callback),i=a.pathId,j=a._existObjectNames,k=a.parent?a.parent._process:this._process,l=a.parent?a.parent._satisfies:this._satisfies,m=k.length,n=/\.js$|\.js\?/,o=[],p=0,m=0;m<k.length;m++)p+=k[m].length;for(var q=0;q<=a.length;q++){if(c=a[q],d=c&&c.match(/\.css$/)?"css":"js",e=l[p+q],g=e&&e.value,f={type:d,handled:e?!0:!1,j:q,i:m,parent:a.parent,resourceObject:g,resourceObjectPath:j[q],_process:[],_satisfies:[]},c){var r=this._config.paths[c];r?(f.path=r&&r.match(n)?r:r+".js",f.resourceObjectPath=c):this.handleRequirePath(f,c,a)}q==a.length&&(f.callback=h,i&&this.handleRequirePath(f,i,a)),e&&(this._completedPaths[f.path]=f),b||o.push(f)}return i&&this.handleRequirePath(o,i,a),a.fail&&(o.fail=a.fail),k.push(o),o},handleRequirePath:function(a,b,c){var d=c.basePath,e=c.contextPath,f=c.param;a.path=this.handlePath(b,e,d,f)},handlePath:function(a,b,c,e){var f,g=/\.js$|\.js\?/;if(a=d(a),a.match(/\.css$/))f=b?b+"/"+a:a;else{var h=b+c;f=(h?h+"/":"")+(a.match(g)?a:a+".js")}return e&&(f+=require.path.match(/\.js\?/)?require.path.match(/\?$/)?e:"&"+e:"?"+e),f},handleRequires:function(){this._handling=!0;var a,b,c=this.getNextRequire(this._handlingRequire),d=c&&c.i||0,e=c&&c.j||0,f=c&&c.parent&&c.parent._process?c.parent._process:this._process;if(!c&&this._handlingRequire)return void(this._handling=!1);for(var g=d;g<f.length;g++){a=f[g];var h=0;for(g==d&&(h=e);h<a.length;h++){if(this.setHandlingRequire(b=a[h]),b.resourceObject||this.checkAndSetObjectByName(b),!b.handled&&b.callback)return void this.checkComplete(b);if(!b.handled)return void this.handleRequire(b)}}a&&a.length||this.checkComplete({i:d,j:e})},handleRequire:function(a,c){if(!a||!a.parent&&a.handled)return void(this._handling=!1);if(this.checkAndSetObjectByName(a),a.handled||!a.callback||c)if(c||a.path&&!a.resourceObject&&(1!=a.handled||"css"!==a.type)){{var d,f=this;this._config}d=this.createTag(a.type,a.path),this._config.dependOnload&&!c&&b(d,function(a){f.satisfy(null,a)},function(a){f.satisfy(null,a)});var g=document.head||document.getElementsByTagName("head")[0];this._onLoadEvents.push(a);var f=this;c?g.appendChild(d):e.on(function(){f.setWaitingForChild(!0),g.appendChild(d)})}else this.excCompleteAndExcNext(a);else this.checkComplete(a)},createTag:function(a,b){var c,d=this._config;return"css"===a?(c=document.createElement("link"),c.setAttribute("type","text/css"),c.setAttribute("rel","stylesheet"),c.setAttribute("href",b)):(c=document.createElement("script"),c.setAttribute("type","text/javascript"),c.setAttribute("src",b),c.setAttribute("data-basepath",d.basePath)),c.setAttribute("data-contextpath",d.contextPath),c.setAttribute("data-dependonload",d.dependOnload),c},excCompleteAndExcNext:function(a){a.handled=!0;var b=this.excCompleteAnGetNext(a);b&&this.setHandlingRequire(b),this.handleRequire(b)},excCompleteAnGetNext:function(a){return this.checkComplete(a),this.getNextRequire(a)},getNextRequire:function(a){if(a){if(a._process&&a._process.length)for(var b=a._process,c=b.length,d=0;c>d;d++)if(!b[d]._called)return b[d][0];var d=a.i,e=a.j,b=a.parent&&a.parent._process?a.parent._process:this._process,f=b[a.i];if(!f)return a;if(e==f.length-1||0==e&&0==f.length){if(d+=1,e=0,f=b[d],!f&&a.parent)return this.checkComplete(a.parent),this.getNextRequire(a.parent)}else e+=1;var g=b[d]&&b[d][e];return g}},checkComplete:function(a){if(a){this._handling=!0;var b=a.i,c=a.j,d=a.parent&&a.parent._process?a.parent._process:this._process,e=d[a.i];if(a.fail&&e.fail)return a.fail=!0,e.fail(),e.failed=!0,void delete a.fail;if(e&&(0==e.length||c==e.length-1)){if(a._process&&a._process.length)for(var d=a._process,f=d.length,b=0;f>b;b++)if(!d[b]._called)return;if(!e._called){for(var g,h=[],f=e.length,b=0;f-1>b;b++)g=e[b].resourceObject,g||(g=this.checkAndSetObjectByName(e[b])),h.push(g);var i=a.callback.apply({success:!e.failed},h);if(a.resourceObject=i,a.handled=!0,e.path&&(this._completedPaths[a.path]=a),a.parent?(a.parent.resourceObject=i,a.parent.handled=!0,(e||a.parent._process[0])._called=!0):this._process[a.i]._called=!0,a!==this._handlingRequire)return;a.parent?(this.setHandlingRequire(a.parent),a.parent.callback||this.setWaitingForChild(!0),this.excCompleteAndExcNext(a.parent)):this.handleRequires()}}}},checkAndSetObjectByName:function(a){var b=this._completedPaths[a.path],c=a.resourceObjectPath,d=d;if(a.resourceObject)return a.resourceObject;if(b){if(d=b.resourceObject)return a.resourceObject=d,a.handled=!0,d}else!b&&a.path&&(this._completedPaths[a.path]=a);if(!c)return void 0;if(!a||!a.callback){for(var e,f=c.split("."),g=f.length,h=window,i=0;g>i;i++)e=f[i],(0!=i||"window"!=e)&&(h=h&&h[e]);return h?(a.resourceObject=h,a.handled=!0,this._completedPaths[a.path]||(this._completedPaths[a.path]=a),h):void 0}},setWaitingForChild:function(a){this._handlingRequire&&(this._handlingRequire.waitingForChild=a)},isWaitingForChild:function(a){var b=a||this._handlingRequire;return b&&b.waitingForChild},setHandlingRequire:function(a){this.setWaitingForChild(!1),this._handlingRequire=a,a&&a.callback&&this.setWaitingForChild(!1)},handlingParamRequires:function(a){if(a){for(var b=a.length,c=0;b>c;c++)this.handleRequire(a[c]);a.callback&&a.callback()}}};f.initConfig(),f.initLoad(),window.compose=f}();