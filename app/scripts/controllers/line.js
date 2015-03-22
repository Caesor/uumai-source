'use strict';

(function(){
	angular
		.module('uumaiApp')
		.controller('LineCtrl', lineChart);

	function lineChart($scope, ItemDetail){
		ItemDetail.getData().then(function(data){
			$scope.labels = data.priceTrend.dates;
			//$scope.series = ['iphone6'];
			$scope.data = [data.priceTrend.prices];
		});	
	}
})();