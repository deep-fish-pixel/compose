/**
 * mawei(14020803)
 */
;(function(){
	'use strict'
	/**
	 * 属性覆盖
	 */
	function extend(orig, target, deep){
		var toStr = Object.prototype.toString,
			arrayFlag = "[object Array]";
		orig = orig || {};
		for (var i in target) {
			if(deep === true && target.hasOwnProperty(i)) {
				if (typeof target[i] === "object") {
					if(!orig[i]){
						orig[i] = toStr.call(target[i]) === arrayFlag ? [] : {};
					}
					arguments.callee(orig[i], target[i]);
				}
				else {
					orig[i] = target[i];
				}
			}
			else orig[i] = target[i];
		}
		return orig;
	}
	function addOnloadEvent(dom, callback){
		if(!dom)return;
		dom.onload = callback; 
		dom.onreadystatechange = callback; 
	}
	
	
	var compose = {
		/**
		 * 配置信息
		 */
		_config: {
			basePath:"",//基本路径
			contextPath: false//上下文路径设置，字符串标示绝对路径，true标示从compose中获取
		},
		/**
		 * 需求列表状态相关信息
		 */
		_process: [],
		/**
		 * satisfyMap记录
		 */
		_satisfies: [],
		/**
		 * 完成组需求标识
		 */
		_completedes: [],
		/**
		 * 回调集合
		 */
		_completes: [],
		/**
		 * 完成的js文件路径集合
		 */
		_completedPaths: {},
		/**
		 * 添加script属性配置
		 */
		initConfig: function(){
			var _config = this._config;
			if(this._completes.length == 0){
				var scripts = document.getElementsByTagName('script');
				var l = scripts.length, script, contextPath, dependOnload, basePath;
				for(var i=0; i<l; i++){
					script = scripts[i];
					contextPath = script.getAttribute('data-contextpath') || '';
					dependOnload = script.getAttribute('data-dependonload') || '';
					basePath = script.getAttribute('data-basepath') || '';
					if(contextPath || dependOnload || basePath){
						_config.contextPath = contextPath?(contextPath+"/"):"";
						_config.dependOnload = dependOnload;
						_config.basePath = basePath;
						break;
					}
				}
			}
		},
		/**
		 * 添加javascript配置
		 */
		config: function(opt){
			var _config = this._config;
			extend(_config, opt);
			_config.contextPath = _config.contextPath || "";
			_config.dependOnload = _config.dependOnload || "";
			_config.basePath = _config.basePath || "";
		},
		/**
		 * 获取项目路径
		 */
		getContext: function(opt){
			return this._config.contextPath;
		},
		/**
		 * 需求
		 */
		require: function(requires, callback, existObjectNames){
			var start = 2;
			if(typeof callback === 'string'){
				start = 1;
			}
			if(typeof requires  === 'function'){
				callback = requires;
				requires = [];
			}
			else if(!callback || typeof callback === 'string'){
				callback = function(){}
			}
			this.preHandleCompleted(requires, existObjectNames);
			requires = this.preHandleRequires(requires);
			this.complete(callback || function(){});
			this._process.push(requires);
			if(this._handling){return;}
			this._handling = true;
			this.handleRequires();
		},
		/**
		 * 满足
		 */
		satisfy: function(){
			var require = this._handlingRequire;
			if(require){
				require.handled = true;
				if(!require.resourceObject){
					this.isExistObjectByName(require);
				}
				this.excCompleteAndExcNext(require);
			}
			else{
				//标注当前js文件已执行
				this._satisfies.push(true);
			}
		},
		/**
		 * 完成
		 */
		complete: function(callback){
			this._completes.push(callback);
		},
		/**
		 * 用于标识已完成当前组.例如: grunt配置concat: {
		 * options: {
		 *		stripBanners: true,
		 *		banner:' //header-footer  \n'
		 *			+'compose.completed();\n'
		 * }
		 *
		 */
		completed: function(){
			this._completedes.push(true);
		},
		/**
		 * completed的预处理
		 */
		preHandleCompleted: function(requires, existObjectNames){
			var length = this._completedes;
			if(length){
				var completed = this._completedes.pop();
				if(completed === true){
					requires._completed = true;
				}
			}
			requires._existObjectNames = existObjectNames || [];
		},
		/**
		 * 预处理
		 */
		preHandleRequires: function(requires){
			var l = requires.length, 
				item,
				basePath = this._config.basePath,
				contextPath = this._config.contextPath,
				i = this._process.length,
				jsRegExp = /\.js$/,
				path,
				_requires = [],
				_process = this._process,
				_satisfies = this._satisfies,
				count = 0,
				type,
				existObjectNames = requires._existObjectNames;
			for(var i=0; i<_process.length; i++){
				count += _process[i].length;
			}
			for(var j=0; j<requires.length; j++){
				path = requires[j];
				type = path.match(/\.css$/)?'css':'js';
				item = {
					type: type,
					path: type=='js'?contextPath + basePath + '/' + (path.match(jsRegExp)?path : path+'.js'):(contextPath + path),
					handled: _satisfies[count+j]?true:false,
					j: j,
					i: i,
					resourceObjectPath: existObjectNames[j]
				};
				_requires.push(item);
			}
			if(requires.length ==0){
				_requires.push({
					handled: false,
					j: j,
					i: i
				});
			}
			_requires._existObjectNames = existObjectNames;
			return _requires;
		},
		/**
		 * 处理方法
		 */
		handleRequires: function(){
			var _process = this._process, 
				requires, 
				require, 
				existObjectNames, 
				existObjectName, 
				object,
				handling = this.excCompleteAnGetNext(this._handlingRequire),
				handlingI = handling && handling.i || 0,
				handlingJ = handling && handling.j || 0;
			for(var i=handlingI; i<_process.length; i++){
				requires = _process[i];
				var j = 0;
				if(i == handlingI){
					j = handlingJ;
				}
				for(; j<requires.length; j++){
					this._handlingRequire = require = requires[j];
					if(!require.resourceObject){
						this.isExistObjectByName(require);
					}
					if(require && !require.handled && (requires._completed ||object)){
						require.handled = true;
						this._completedPaths[require.path] = require;
						this.checkAndExcuteComplete(require);
					}
					else{
						if(!require.handled){
							this.handleRequire(require);
							return;
						}
						else if(!requires._called){
							this.checkAndExcuteComplete(require);
						}
					}
				}
			}
		},
		/**
		 * 处理单个require
		 */
		handleRequire: function(require){
			//对处理过的需求直接返回
			if(!require || require.handled)return;
			var origRequire = this._completedPaths[require.path];
			
			if(origRequire){
				if(origRequire.resourceObject){
					require.resourceObject = origRequire.resourceObject;
				}
				if(origRequire.handled){
					require.handled = origRequire.handled;
				}
			}
			else if(!origRequire){
				this._completedPaths[require.path] = require;
			}
			if(!require.path || require.resourceObject || (require.handled == true && require.type === 'css')){
				require.handled = true;
				this.checkAndExcuteComplete(require);
				var nextRequire = this.getNextRequire(require);
				if(nextRequire){
					this._handlingRequire = nextRequire;
				}
				this.handleRequire(nextRequire);
				return;
			}
			/*if(this._completedPaths[require.path]){
				throw new Error('has loaded the some '+require.type+':' + require.path);
			}*/
			var script;
			if(require.type === 'css'){
				script = document.createElement("link");
				script.setAttribute('type', 'text/css');
				script.setAttribute('rel', 'stylesheet');
				script.setAttribute('href', require.path);
			}
			else{
				script = document.createElement("script");
				script.setAttribute('type', 'text/javascript');
				script.setAttribute('src', require.path);
			}
			var config = this._config;
			script.setAttribute('data-contextpath', config.contextPath);
			script.setAttribute('data-dependonload', config.dependOnload);
			script.setAttribute('data-basepath', config.basePath);
			
			if(this._config.dependOnload){
				addOnloadEvent(script, function(){
					compose.satisfy();
				})
			}
			var head = document.head || document.getElementsByTagName('head')[0];
			head.appendChild(script);
		},
		/**
		 * 完成当前complete并执行下一个需求
		 */
		excCompleteAndExcNext: function(require){
			var nextRequire = this.excCompleteAnGetNext(require);
			if(nextRequire){
				this._handlingRequire = nextRequire;
			}
			this.handleRequire(nextRequire);
		},
		/**
		 * 获取下一个需求并判断当前是否需要执行回调
		 */
		excCompleteAnGetNext: function(require){
			this.checkAndExcuteComplete(require);
			return this.getNextRequire(require);
		},
		/**
		 * 获取下一个需求
		 */
		getNextRequire: function(require){
			if(!require)return;
			var i = require.i,
				j = require.j,
				_process = this._process,
				requires = _process[require.i];
			if(j == requires.length - 1 || (j==0 && requires.length == 0)){
				i += 1;
				j = 0;
				requires = _process[i];
				if(!requires)return;
			}
			else{
				j += 1;
			}
			var nextRequire = _process[i][j];
			//不存在时构建一个伪请求,记录坐标用
			if(!nextRequire){
				nextRequire = {
					i:i,
					j:j
				};
			}
			return nextRequire;
		},
		/**
		 * 是否需要执行回调
		 */
		checkAndExcuteComplete: function(require){
			if(!require)return;
			this._handling = true;
			var i = require.i,
				j = require.j,
				requires = this._process[require.i];
			if(j == requires.length - 1){
				var complete = this._completes[i];
				if(complete && !requires._called){
					//先把状态置为true，防止重复
					requires._called = true;
					var resources = [], l = requires.length, object;
					for(var i=0; i<l; i++){
						object = requires[i].resourceObject;
						if(!object){
							this.isExistObjectByName(requires[i]);
						}
						resources.push(object);
					}
					complete.apply(window, resources);
					this._handling = false;
				}
			}
		},
		/**
		 * 判断当前对象是否存在，如存在，则不加载对应组的js文件
		 */
		isExistObjectByName: function(require){
			var origRequire = this._completedPaths[require.path],
				resourceObjectPath = require.resourceObjectPath,
				resourceObject = resourceObject;
			if(require.resourceObject){return require.resourceObject}
			if(origRequire){
				resourceObject = origRequire.resourceObject;
				if(resourceObject){
					require.resourceObject = resourceObject;
					return resourceObject;
				}
			}
			if(!resourceObjectPath){
				return undefined;
			}
			var names = resourceObjectPath.split('.'), 
				namesLength = names.length,
				name,
				obj = window;
			for(var j=0; j<namesLength; j++){
				name = names[j];
				if(!(j==0 && name == 'window')){
					obj = obj[name];
				}
			}
			if(!obj){
				return undefined;
			}
			require.resourceObject = obj;
			return obj;
		}
	}
	compose.initConfig();
	window.compose = compose;
})();