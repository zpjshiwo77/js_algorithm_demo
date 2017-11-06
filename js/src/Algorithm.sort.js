Algorithm.$package(function(Algorithm){
	//定义变量
	var sort = {};

	//冒泡排序
	sort.BubbleSort = function(arr){
		for (var i = 0; i < arr.length - 1; i++) {
			for (var j = 0; j < arr.length - i - 1; j++) {
				if(arr[j] > arr[j+1]) changePos(arr,j,j+1);
			};
		};
		return arr;
	}//end func

	//选择排序
	sort.SelectionSort = function(arr){
		for (var i = 0; i < arr.length - 1; i++) {
			for (var j = i + 1; j < arr.length; j++) {
				if(arr[i] > arr[j]) changePos(arr,i,j);
			};
		};
		return arr;
	}//end func

	//插入排序
	sort.insertionSort = function(arr,dif){
		dif = dif || 1;
		for (var i = dif; i < arr.length; i++) {
			var item = arr[i];
			j = i - dif;
			while(j >= 0 && item < arr[j]){
				arr[j + dif] = arr[j];
				j --;
			}
			arr[j + dif] = item;
		};
		return arr;
	}//end func

	//希尔排序
	sort.shellSort = function(arr,gap){
		var gap = gap || [1,4,10];
		for (var i = 0; i < gap.length; i++) {
			sort.insertionSort(arr,gap[i]);
		};
		return arr;
	}//end func

	//归并排序
	sort.mergeSort = function(arr){
		return mergeSort(arr);
		//分组
		function mergeSort(arr){
			if(arr.length <= 1) return arr;
			else{
				var mid = parseInt(arr.length / 2);
				var left = arr.slice(0,mid);
				var right = arr.slice(mid);
				return merge(mergeSort(left),mergeSort(right));
			}
		}//end func

		//合并
		function merge(left,right){
			var arr = [];
			while(left.length && right.length){
				if(left[0] < right[0]) arr.push(left.shift());
				else arr.push(right.shift());
			}
			while(left.length){
				arr.push(left.shift());
			}
			while(right.length){
				arr.push(right.shift());
			}
			return arr;
		}//end func
	}//end func

	//快速排序
	sort.quickSort = function(arr){
		return qSort(arr);
		//排序
		function qSort(arr){
			if(arr.length <= 1) return arr;
			var minArr = [];
			var maxArr = [];
			for (var i = 1; i < arr.length; i++) {
				if(arr[i] < arr[0]) minArr.push(arr[i]);
				else maxArr.push(arr[i]);
			};

			return qSort(minArr).concat(arr[0],qSort(maxArr));
		}//end func
	}//end func

	//修改两个元素的位置
	function changePos(arr,i,j){
		var item = arr[j];
		arr[j] = arr[i];
		arr[i] = item;
	}//end func

	Algorithm.sort = sort;
});
