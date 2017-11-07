Algorithm.$package(function(Algorithm){
	//定义变量
	var search = {};

	//顺序查找
	search.seqsearch = function(arr,item){
		for (var i = 0; i < arr.length; i++) {
			if(arr[i] == item) return i;
		};
		return false;
	}//end func

	//二分法查找
	search.binSearch = function(arr,item){
		var result = false;

		var up = arr.length - 1;
		var down = 0;
		while(down <= up){
			var index = parseInt((up + down) / 2);
			if(arr[index] == item){
				result = index;
				break;
			}
			else if(arr[index] > item){
				up = index - 1;
			}
			else if(arr[index] < item){
				down = index + 1;
			}
		}

		return result;
	}//end func

	Algorithm.search = search;
});
