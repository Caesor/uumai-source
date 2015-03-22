(function(){
	'use strict';

	angular
		.module('uumaiApp')
		.controller('ListCtrl', ListCtrl);

	function ListCtrl($scope, $http){
		$http({
			method: 'GET',
			url: 'data/list.json'
		}).success(
			function(data){
				$scope.lists = data;
			}
		)
    }
})();