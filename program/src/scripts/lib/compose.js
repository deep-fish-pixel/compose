/**
 * v1.0.1
 * mawei(14020803)
 * qq:120290590
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
					extend(orig[i], target[i]);
				}
				else {
					orig[i] = target[i];
				}
			}
			else orig[i] = target[i];
		}
		return orig;
	}
	/**
	 * 添加script事件 
	 */
	function addOnloadEvent(dom, callback){
		if(dom && typeof dom.onload !== 'undefined'){
			dom.onload = function(){
				this.onload = null;
				callback();
			};
		}
		else if(dom){
			dom.onreadystatechange = function(){
				if(this.readyState =='complete' || this.readyState =='loaded'){
					this.onreadystatechange = null;
					callback();
				}
			};
		}
	}
	function isArray(object){
		return object && typeof object==='object' &&
				Array == object.constructor;
	}
	function trimUrl(str){
		if(str){
			var ret = str.match(/^\s*(\S*)\s*$/), retS;
			if(ret){
				retS = ret[1].match(/(.*)\?+$/);
				if(retS){
					return retS[1];
				}
				else return ret[1];
			}
		}
		return str;
	}
	/**
	 * 添加window load事件 
	 */
	var windowLoader = (function (){
		if (document.all) {
			window.attachEvent('onload', loader)
		}
		else {
			window.addEventListener('load', loader, false);
		}
		function loader(){
			for(var i=0; i<callbacks.length; i++){
				callbacks[i]();
			}
			callbacks = null;
		}
		var callbacks = [];
		return {
			on: function(callback){
				if(callbacks){
					callbacks.push(callback);
				}
				else{
					callback();
				}
			}
		}
	})();
	
	
	var compose = {
		/**
		 * 配置信息
		 */
		_config: {
			basePath:"",//基本路径
			contextPath: false,//上下文路径设置，字符串标示绝对路径，true标示从compose中获取
			paths:{}
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
		 * 完成的js文件路径集合
		 */
		_completedPaths: {},
		/**
		 * 发生onload后获取事件源
		 */
		_onLoadEvents: [],
		/**
		 * 延迟执行
		 */
		_delayer: {
			time: 0,
			used: false,
			push: function(callback, time){
				var self = this;
				this.used = true;
				this._callback = function(){
					if(callback){
						callback();
					}
					self._timer = null;
					self._callback = null;
				};
				this.time = time || 0;
				this._timer = setTimeout(this._callback, this.time);
			},
			delay: function(time){
				if(this._timer){
					clearTimeout(this._timer);
				}
				if(this._callback){
					if(time !== undefined) this._timer = time;
					this._timer = setTimeout(this._callback, this.time);
				}
			}
		},
		/**
		 * 添加script属性配置
		 */
		initConfig: function(){
			var _config = this._config,
				scripts = document.getElementsByTagName('script'),
				l = scripts.length, script, contextPath, dependOnload, basePath, param;
			for(var i=0; i<l; i++){
				script = scripts[i];
				contextPath = script.getAttribute('data-contextpath') || '';
				dependOnload = script.getAttribute('data-dependonload') || '';
				basePath = script.getAttribute('data-basepath') || '';
				param = script.getAttribute('data-param') || '';
				if(contextPath || dependOnload || basePath){
					_config.contextPath = contextPath?(contextPath+"/"):"";
					_config.dependOnload = dependOnload;
					_config.basePath = basePath;
					_config.param = param;
					break;
				}
			}
		},
		/**
		 * 添加javascript配置
		 */
		config: function(opt){
			var _config = this._config;
			extend(_config, opt, true);
			_config.contextPath = _config.contextPath || "";
			_config.dependOnload = _config.dependOnload || "";
			_config.basePath = _config.basePath || "";
			_config.param = _config.param || "";;
		},
		/**
		 * 获取项目路径
		 */
		getContext: function(opt){
			return this._config.contextPath;
		},
		/**
		 * 需求
		 * param depend 判断此模块是否有依赖并需要提前获取该资源
		 */
		require: function(pathId, requires, callback, existObjectNames){
			this._delayer.delay();
			if(isArray(pathId) || typeof pathId  === 'function'){
				existObjectNames = callback;
				callback = requires;
				requires = pathId;
				pathId = null;
			}
			if(typeof requires  === 'function'){
				existObjectNames = callback;
				callback = requires;
				requires = [];
			}
			if(!callback || typeof callback === 'string'){
				callback = function(){}
			}
			if(existObjectNames === true){
				existObjectNames = null;
			}
			requires._existObjectNames = existObjectNames || [];
			requires.pathId = pathId;
			requires.callback = callback;
			requires.contextPath = this._config.contextPath;
			requires.param = this._config.param;
			requires.basePath = this._config.basePath;
			if(this.isWaitingForChild() == true){
				requires.parent = this._handlingRequire;
				requires = this.preHandleRequires(requires);
				this.handleRequires();
				return;	

			}
			else if(this._handlingRequire && this._handlingRequire.parent){
				requires.parent = this._handlingRequire.parent;
				requires = this.preHandleRequires(requires);
				return;	
			}
			requires = this.preHandleRequires(requires);
			if(this._handling){return;}
			this.handleRequires();
		},
		/**
		 * 满足
		 */
		satisfy: function(resourceObject){
			var loadRequire = this._onLoadEvents.shift();
			var require = this._handlingRequire;
			if(loadRequire !== require && (loadRequire && loadRequire._process.length)){
				return;
			}
			if(loadRequire && loadRequire._process.length){
				this.setWaitingForChild(false);
			}
			
			if(require){
				if(resourceObject){
					require.resourceObject = resourceObject;
				}
				else if(!require.resourceObject){
					this.checkAndSetObjectByName(require);
				}
				this.excCompleteAndExcNext(require);
			}
			else{
				//标注当前js文件已执行
				this._satisfies.push({value:resourceObject});
			}
		},
		/**
		 * 预处理
		 */
		preHandleRequires: function(requires){
			var l = requires.length, 
				callback = requires.callback,
				pathId = requires.pathId,
				existObjectNames = requires._existObjectNames,
				_process = requires.parent? requires.parent._process: this._process,
				_satisfies = requires.parent? requires.parent._satisfies: this._satisfies,
				i = _process.length,
				jsRegExp = /\.js$|\.js\?/,
				path,
				_requires = [],
				count = 0,
				type,
				_satisfy,
				require,
				resourceObject;
			for(var i=0; i<_process.length; i++){
				count += _process[i].length;
			}
			for(var j=0; j<=requires.length; j++){
				path = requires[j];
				type = path&&path.match(/\.css$/)?'css':'js';
				_satisfy = _satisfies[count+j];
				resourceObject = _satisfy && _satisfy.value;
				require = {
					type: type,
					handled: _satisfy?true:false,
					j: j,
					i: i,
					parent: requires.parent,
					resourceObject: resourceObject,
					resourceObjectPath: existObjectNames[j],
					_process:[],
					_satisfies:[]
				};
				if(path){
					var p = this._config.paths[path];
					if(p){
						require.path = p&&p.match(jsRegExp)?p : p+'.js';
						require.resourceObjectPath = path;
					}
					else{
						this.handlePath(require, path, requires);
					}
				}
				if(j == requires.length){
					require.callback = callback;
					if(pathId){
						this.handlePath(require, pathId, requires);
					}
				}
				if(_satisfy){
					this._completedPaths[require.path] = require;
				}
				_requires.push(require);
			}
			if(pathId){
				this.handlePath(_requires, pathId, requires);
			}
			_process.push(_requires);
			return _requires;
		},
		/**
		 * 处理path
		 */
		handlePath: function(require, pathId, requires){
			var basePath = requires.basePath,
				contextPath = requires.contextPath,
				param = requires.param,
				jsRegExp = /\.js$|\.js\?/;
			pathId = trimUrl(pathId);
			if(pathId.match(/\.css$/)){
				require.path = contextPath ? contextPath + '/' + pathId : pathId;
			}
			else{
				require.path = contextPath + basePath + '/' + (pathId.match(jsRegExp)?pathId : pathId+'.js');
			}
			if(require.path && param){
				require.path += require.path.match(/\.js\?/) ? require.path.match(/\?$/) ? param : '&' + param : '?'+ param;
			}
		},
		/**
		 * 处理方法
		 */
		handleRequires: function(){
			this._handling = true;
			var requires, 
				require, 
				existObjectNames, 
				existObjectName, 
				handling = this.getNextRequire(this._handlingRequire),
				handlingI = handling && handling.i || 0,
				handlingJ = handling && handling.j || 0,
				_process = (handling && handling.parent && handling.parent._process)? handling.parent._process : this._process;
			if(!handling && this._handlingRequire){
				this._handling = false;
				return;
			}
			for(var i=handlingI; i<_process.length; i++){
				requires = _process[i];
				var j = 0;
				if(i == handlingI){
					j = handlingJ;
				}
				for(; j<requires.length; j++){
					this.setHandlingRequire(require = requires[j]);
					if(!require.resourceObject){
						this.checkAndSetObjectByName(require);
					}
					if(!require.handled && require.callback){
						this.checkComplete(require);
						return;
					}
					else if(!require.handled){
						this.handleRequire(require);
						return;
					}
				}
			}
			if(!requires || !requires.length){
				this.checkComplete({
					i: handlingI,
					j: handlingJ
				});
			}
		},
		/**
		 * 处理单个require
		 */
		handleRequire: function(require){
			//对处理过的需求直接返回
			if(!require || !require.parent && require.handled){
				this._handling = false;
				return;
			}
			this.checkAndSetObjectByName(require);
			
			if(!require.handled && require.callback){
				this.checkComplete(require);
			}
			else if(!require.path || require.resourceObject || (require.handled == true && require.type === 'css')){
				this.excCompleteAndExcNext(require);
			}
			else{
				var script, self = this, config = this._config;
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
					script.setAttribute('data-basepath', config.basePath);
				}
				script.setAttribute('data-contextpath', config.contextPath);
				script.setAttribute('data-dependonload', config.dependOnload);
				
				if(this._config.dependOnload){
					addOnloadEvent(script, function(){
						self.satisfy(null);
					})
				}
				var head = document.head || document.getElementsByTagName('head')[0];
				this._onLoadEvents.push(require);
				var self = this;
				windowLoader.on(function (){
					self.setWaitingForChild(true);
					head.appendChild(script);
				});
			}
		},
		/**
		 * 完成当前complete并执行下一个需求
		 */
		excCompleteAndExcNext: function(require){
			require.handled = true;
			var nextRequire = this.excCompleteAnGetNext(require);
			if(nextRequire){
				this.setHandlingRequire(nextRequire);
			}
			this.handleRequire(nextRequire);
		},
		/**
		 * 获取下一个需求并判断当前是否需要执行回调
		 */
		excCompleteAnGetNext: function(require){
			this.checkComplete(require);
			return this.getNextRequire(require);
		},
		/**
		 * 获取下一个需求 
		 */
		getNextRequire: function(require){
			if(!require)return;
			if(require._process && require._process.length){
				var _process = require._process, l = _process.length;
				for(var i=0; i<l; i++){
					if(!_process[i]._called){
						return _process[i][0];
					}
				}
			}
			var i = require.i,
				j = require.j,
				_process = require.parent && require.parent._process?require.parent._process:this._process,
				requires = _process[require.i];
			if(!requires){
				return require;
			}
			else if(j == requires.length - 1 || (j==0 && requires.length == 0)){
				i += 1;
				j = 0;
				requires = _process[i];
				if(!requires){
					if(require.parent){
						this.checkComplete(require.parent);
						return this.getNextRequire(require.parent);
					}
				}
			}
			else{
				j += 1;
			}
			var nextRequire = _process[i] && _process[i][j];
			return nextRequire;
		},
		/**
		 * 是否需要执行回调
		 */
		checkComplete: function(require){
			if(!require)return;
			this._handling = true;
			var i = require.i,
				j = require.j,
				_process = require.parent && require.parent._process ? require.parent._process : this._process,
				requires = _process[require.i];
			if(requires && (requires.length == 0 || j == requires.length - 1)){
				if(require._process && require._process.length){
					var _process = require._process, l = _process.length;
					for(var i=0; i<l; i++){
						if(!_process[i]._called){
							return;
						}
					}
				}
				if(!requires._called){
					//先把状态置为true，防止重复
					var resources = [], l = requires.length, object;
					for(var i=0; i<l-1; i++){
						object = requires[i].resourceObject;
						if(!object){
							object = this.checkAndSetObjectByName(requires[i]);
						}
						resources.push(object);
					}
					var ret = require.callback.apply(window, resources);
					require.resourceObject = ret;
					require.handled = true;
					if(requires.path){
						this._completedPaths[require.path] = require;
					}
					if(require.parent){
						require.parent.resourceObject = ret;
						require.parent.handled = true;
						(requires || require.parent._process[0])._called = true;
					}
					else{
						this._process[require.i]._called = true;
					}
					if(require !== this._handlingRequire){
						return;
					}
					if(require.parent){
						this.setHandlingRequire(require.parent);
						if(!require.parent.callback){
							this.setWaitingForChild(true);
						}
						this.excCompleteAndExcNext(require.parent);
					}
					else{
						this.handleRequires();
					}
				}
			}
		},
		/**
		 * 判断当前对象是否存在，如存在，则不加载对应组的js文件
		 */
		checkAndSetObjectByName: function(require){
			var origRequire = this._completedPaths[require.path],
				resourceObjectPath = require.resourceObjectPath,
				resourceObject = resourceObject;
			if(require.resourceObject){return require.resourceObject}
			if(origRequire){
				resourceObject = origRequire.resourceObject;
				if(resourceObject){
					require.resourceObject = resourceObject;
					require.handled = true;
					return resourceObject;
				}
			}
			else if(!origRequire && require.path){
				this._completedPaths[require.path] = require;
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
					obj = obj && obj[name];
				}
			}
			if(!obj){
				return undefined;
			}
			require.resourceObject = obj;
			require.handled = true;
			if(!this._completedPaths[require.path]){
				this._completedPaths[require.path] = require;
			}
			return obj;
		},
		/*
		* 设置接收状态
		*/
		setWaitingForChild: function(value){
			this._handlingRequire && (this._handlingRequire.waitingForChild = value);
		},
		/*
		* 获取接收状态
		*/
		isWaitingForChild: function(require){
			var r = require || this._handlingRequire
			return r && r.waitingForChild;
		},
		/*
		* 设置当前处理对象
		*/
		setHandlingRequire: function(require){
			this.setWaitingForChild(false);
			this._handlingRequire = require;
			if(require && require.callback){
				this.setWaitingForChild(false);
			}
		}
	}
	compose.initConfig();
	
	window.compose = compose;
})();