(function(){
	'use strict';

	angular
		.module('uumaiApp')
		.controller('RegisterCtrl', RegisterCtrl);

	function RegisterCtrl($scope, $http, $timeout, $location){
		// message tips
		$scope.showMsg = false;
		
		// switch register && sms vertify
		$scope.registerStage = true;
		$scope.smsCodeStage = false;

		// register form information
		$scope.currentUser = {
			username: "",
			email: "",
			password: "",
			mobilePhoneNumber: ""
		};

		// sms code information
		$scope.sms = {
			mobilePhoneNumber : "",
			codeNumber : ""
		}

		$scope.smsStatu = false;

		// http header init
		$http.defaults.headers.common['X-AVOSCloud-Application-Id'] = "s1s01ktw7ua0pv08pp39pp2kbjf0qvl5m2xckjj62lyzym31";
		$http.defaults.headers.common['X-AVOSCloud-Application-Key'] = "g5y8p8bbcxliay9xav9pwb6r9oknp4zrqltjxyjkei38ej6f";

		//register a new user
		$scope.submitRegister = function(){
			// register
			$http({
				method: 'POST',
				url: 'https://api.leancloud.cn/1.1/users',
				data: $scope.currentUser
			}).success(function(){
				// keep mobile phone number for vertify
				$scope.sms.mobilePhoneNumber = $scope.currentUser.mobilePhoneNumber;
				// show tips 
				$scope.isSuccess = true;
				$scope.messageText = "注册成功,请前往邮箱确认！";
				$scope.showMsg = true;
				// switch the interface
				$scope.registerStage = false;
				$scope.smsCodeStage = true;
				
			}).error(function(data){
				$scope.isSuccess = false;
				$scope.messageText = data.error;
				$scope.showMsg = true;
			});

			return false;
		};


		// get sms code again
		$scope.getMSN = function(){
			$http({
				method: 'POST',
				url: 'https://api.leancloud.cn/1.1/requestMobilePhoneVerify',
				data: {
					mobilePhoneNumber : $scope.currentUser.mobilePhoneNumber
				}
			}).success(function(){
				$scope.smsStatu = true;
				$scope.isSuccess = true;
				$scope.messageText = "验证码已发送！";
				$scope.showMsg = true;
				$timeout(function(){
					$scope.smsStatu = false;
				},5000);
			}).error(function(data){
				$scope.isSuccess = false;
				$scope.messageText = data.error;
				$scope.showMsg = true;
			});

			return false;
		};

		// vertity the  sms code for mobile phone
		$scope.submitVertifySmsCode = function(){
			$http({
				method : 'POST',
				url: 'https://api.leancloud.cn/1.1/verifyMobilePhone/' + $scope.sms.codeNumber
			}).success(function(){
				//show tips
				$scope.isSuccess = true;
				$scope.messageText = "手机号验证成功！";
				$scope.showMsg = true;
				//jump to login page
				$timeout(function(){
					$location.path('/login');
				}, 3000);
			}).error(function(data){
				$scope.isSuccess = false;
				$scope.messageText = data.error;
				$scope.showMsg = true;
			});

			return false;
		}
	}
})();