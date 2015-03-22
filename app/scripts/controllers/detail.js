(function(){
	'use strict';

	angular
		.module('uumaiApp')
		.controller('DetailCtrl', DetailCtrl);

	function DetailCtrl($scope, ItemDetail){
		$scope.item = ItemDetail;
		ItemDetail.getData().then(function(data) {
		    $scope.item = data;
		});
	}
})();