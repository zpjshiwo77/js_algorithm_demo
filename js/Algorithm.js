///<jscompress sourcefile="Algorithm.js" />
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
})();;
///<jscompress sourcefile="Algorithm.sort.js" />
Algorithm.$package(function(Algorithm){
	//定义变量
	var sort = {};

	//冒泡排序
	sort.BubbleSort = function(arr){

		return arr;
	}//end func

	Algorithm.sort = sort;
});
;
///<jscompress sourcefile="Algorithm.linkList.js" />
Algorithm.$package(function(Algorithm){
	//定义变量
	var linkList = {};

	//单项链表
	linkList.LinkedList = function(){
		var _self = this;

		//头节点
		_self._head = {
			content:"head",
			next:null
		};

		//尾节点
		_self.lastNode = _self._head;

		//链表长度
		_self.length = 0;

		//新建一个节点
		_self.newNode = function(content,node){
			if(node){
				var item = {
					content:content,
					next:node.next
				}
				node.next = item;
			}
			else{
				var item = {
					content:content,
					next:null
				}
				_self.lastNode.next = item;
				_self.lastNode = item;
			}
			_self.length++;
		}//end func

		//查找一个节点
		_self.find = function(content){
			var node = _self._head;
			while(node.content != content){
				node = node.next;
				if(node == null) break;
				else if(node.content == _self.lastNode.content && node.next == _self.lastNode.next) break;
			}
			return node;
		}//end func

		//移除一个节点
		_self.removeNode = function(content){
			var node = _self._head;
			var prev = null;
			var find = true;
			while(1){
				prev = node;
				node = node.next;
				if(node == null) {
					find = false;
					break;
				}
				else if(node.content == content){
					break;
				}
				else if(node.content == _self.lastNode.content && node.next == _self.lastNode.next) {
					find = false;
					break;
				}
			}
			if(find){
				prev.next = node.next;
				node.content = null;
				node.next = null;
				node = null;
				_self.length--;
			}
		}//end func
	}//end func

	//双向链表
	linkList.doubleLinkList = function(){
		var _self = this;

		linkList.LinkedList.call(_self);

		//头节点
		_self._head.prev = null;

		//新建一个节点
		_self.newNode = function(content,node){
			if(node){
				var item = {
					content:content,
					next:node.next,
					prev:node
				}
				if(node.next != null) node.next.prev = item;
				node.next = item;
			}
			else{
				var item = {
					content:content,
					next:null,
					prev:_self.lastNode
				}
				_self.lastNode.next = item;
				_self.lastNode = item;
			}
			_self.length++;
		}//end func

		//移除一个节点
		_self.removeNode = function(content){
			var node = _self._head;
			var prev = null;
			var find = true;
			while(1){
				prev = node;
				node = node.next;
				if(node == null) {
					find = false;
					break;
				}
				else if(node.content == content){
					break;
				}
				else if(node.content == _self.lastNode.content && node.next == _self.lastNode.next) {
					find = false;
					break;
				}
			}
			if(find){
				prev.next = node.next;
				if(node.next != null) node.next.prev = prev;
				node.content = null;
				node.next = null;
				node = null;
				_self.length--;
			}
		}//end func
	}//end func
	linkList.doubleLinkList.prototype = new linkList.LinkedList();

	//循环链表
	linkList.LoopLinkList = function(){
		var _self = this;
		linkList.LinkedList.call(_self);

		_self.lastNode.next = _self._head;

		//新建一个节点
		_self.newNode = function(content,node){
			if(node){
				var item = {
					content:content,
					next:node.next
				}
				node.next = item;
			}
			else{
				var item = {
					content:content,
					next:_self._head
				}
				_self.lastNode.next = item;
				_self.lastNode = item;
			}
			_self.length++;
		}//end func
	}//end func
	linkList.LoopLinkList.prototype = new linkList.LinkedList();

	Algorithm.linkList = linkList;
});
;
///<jscompress sourcefile="Algorithm.Tree.js" />
Algorithm.$package(function(Algorithm){
	//定义变量
	var Tree = {};

	//二叉查找树
	Tree.BST = function(){
		var _self = this

		//根节点
		_self.root = null;
		//树
		_self.tree = _self.root;

		//插入节点
		_self.insert = function(data){
			var item = {
				data:data,
				count:1,
				left:null,
				right:null
			};

			if(_self.root == null) _self.root = item;
			else{
				var nowNode = _self.root;
				var parent;
				while(1){
					parent = nowNode;
					if(data < parent.data){
						if(nowNode.left == null){
							nowNode.left = item;
							break;
						}
						else{
							nowNode = nowNode.left;
						}
					}
					else if(data > parent.data){
						if(nowNode.right == null){
							nowNode.right = item;
							break;
						}
						else{
							nowNode = nowNode.right;
						}
					}
					else{
						nowNode.count++;
						break;
					}
				}
			}
		}//end func

		//遍历
		_self.traversals = function(type){
			var arr = [];

			if(type == "preOrder"){
				preOrder(_self.root);
			}
			else if(type == "inOrder"){
				inOrder(_self.root);
			}
			else if(type == "postOrder"){
				postOrder(_self.root);
			}

			//先序遍历
			function preOrder(node){
				if(node != null){
					arr.push(node.data);
					preOrder(node.left);
					preOrder(node.right);
				}
			}//end func

			//中序遍历
			function inOrder(node){
				if(node != null){
					inOrder(node.left);
					arr.push(node.data);
					inOrder(node.right);
				}
			}//end func

			//后序遍历
			function postOrder(node){
				if(node != null){
					postOrder(node.left);
					postOrder(node.right);
					arr.push(node.data);
				}
			}//end func

			return arr;
		}//end func

		//查找
		_self.search = function(data){
			var result;

			if(data == "max") searchMax(_self.root);
			else if(data == "min") searchMin(_self.root);
			else searchVal(_self.root);

			//搜索最大值
			function searchMax(node){
				if(node.right != null) searchMax(node.right);
				else result = node;
			}//end func

			//搜索最小值
			function searchMin(node){
				if(node.left != null) searchMin(node.left);
				else result = node;
			}//end func

			//搜索指定值
			function searchVal(node){
				var nowNode = node;
				while(1){
					if(nowNode.data == data) {
						result = nowNode;
						break;
					}
					else if(nowNode.data > data){
						if(nowNode.left != null) nowNode = nowNode.left;
						else{
							result = false;
							break;
						}
					}
					else if(nowNode.data < data){
						if(nowNode.right != null) nowNode = nowNode.right;
						else{
							result = false;
							break;
						}
					}
				}
				
			}//end func

			return result; 
		}//end func

		//删除节点
		_self.delNode = function(data){
			var result = _self.root;
			var search = false;

			deleteNode(_self.root,null,null);
			//删除节点
			function deleteNode(node,parentNode,side){
				if(node != null){
					if(node.data == data){
						if(parentNode == null){
							combinNode(_self.root.left,_self.root.right);
							if(_self.root.right != null) _self.root = _self.root.right;
							else if(_self.root.left != null) _self.root = _self.root.left;
							else _self.root = null;
							result = _self.root;
							search = true;
						}
						else{
							combinNode(node.left,node.right);
							var item = null;
							if(node.right != null) item = node.right;
							else if(node.left != null) item = node.left;
							if(side == "left") parentNode.left = item;
							else if(side == "right") parentNode.right = item;
							result = _self.root;
							search = true;
						}
					}
					else if(node.data < data) deleteNode(node.right,node,"right");
					else if(node.data > data) deleteNode(node.left,node,"left");
				}
			}//end func

			//拼接节点
			function combinNode(Lnode,Rnode){
				if(Rnode != null && Lnode != null){
					var nowNode = Rnode;
					while(1){
						if(Rnode.left == null){
							Rnode.left = Lnode;
							break;	
						} 
						else nowNode = Rnode.left;
					}
				}
			}//end func

			if(search) return result;
			else return false;
		}//end func
	}//end func

	Algorithm.Tree = Tree;
});
;
