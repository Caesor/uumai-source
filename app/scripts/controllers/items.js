(function(){
	'use strict';

	angular
		.module('uumaiApp')
		.factory('ItemDetail', ItemDetail);

	function ItemDetail($http, $routeParams){
		return {
			getData : getData
		}
		function getData(){
			return $http.get('data/detail'+ $routeParams.pid + '.json')
				.then(function(response){
					return response.data;
	        	});
		}
	}
})();