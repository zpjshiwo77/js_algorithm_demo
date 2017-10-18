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
