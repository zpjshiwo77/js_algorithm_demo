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
