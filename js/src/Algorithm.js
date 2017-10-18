(function() {
	"use strict";
	var _version = "0.0.1";
	var _debug = false;
	var Algorithm = {
		$namespace : function(name) {
			if (!name) {
				return window;
			}
			var i,l;
			var nsArr = name.split(".");
			var ns = window;
			var ns = window;
			for (i = 0, l = nsArr.length; i < l; i++) {
				var n = nsArr[i];
				ns[n] = ns[n] || {};
				ns = ns[n];
			}
			return ns;
		},
		$package : function(ns, func) {
			var target;
			if (typeof ns == "function") {
				func = ns;
				target = window;
			} else if (typeof ns == "string") {
				target = this.$namespace(ns);
			} else if (typeof ns == "object") {
				target = ns;
			}
			func.call(target, this);
		},
		extends : function(des, src, over) {
			var res = extend(des, src, over);
	
			function extend(des, src, over) {
				var override = true;
				if(over === false) {
					override = false;
				}
				if(src instanceof Array) {
					for(var i = 0, len = src.length; i < len; i++)
						extend(des, src[i], override);
				}
				for(var i in src) {
					if(override || !(i in des)) {
						des[i] = src[i];
					}
				}
				return des;
			}
			for(var i in src) {
				delete res[i]
			}
			return res;
		},
		setDebug : function(bool){
			bool = bool || false;
			_debug = value;
		},
		log : function(msg){
			console.log(msg);
		},
		warn : function(msg){
			console.warn(msg);
		},
		error : function(msg){
			console.error(msg);
		}
	};
	Algorithm.version = _version;
	Algorithm.isDebug = _debug;

	window.Algorithm = Algorithm;
	window.AL = Algorithm;

	if (typeof define === "function") {
		define(function() {
			return Algorithm;
		});
	}
})();