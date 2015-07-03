'use strict';

// Order registration accessory details controller
angular.module('order-registration-accessory-details').controller('OrderRegistrationAccessoryDetailsController', ['$scope', '$stateParams', '$location', 'Authentication', 'OrderRegistrationAccessoryDetails',
	function($scope, $stateParams, $location, Authentication, OrderRegistrationAccessoryDetails) {
		$scope.authentication = Authentication;

		// Create new Order registration accessory detail
		$scope.create = function() {
			// Create new Order registration accessory detail object
			var orderRegistrationAccessoryDetail = new OrderRegistrationAccessoryDetails ({
				accessoryTRIMSName: this.accessoryTRIMSName,
				uoM: this.uoM,
				units: this.units

			});

			// Redirect after save
			orderRegistrationAccessoryDetail.$save(function(response) {
				$location.path('order-registration-accessory-details/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Order registration accessory detail
		$scope.remove = function(orderRegistrationAccessoryDetail) {
			if ( orderRegistrationAccessoryDetail ) { 
				orderRegistrationAccessoryDetail.$remove();

				for (var i in $scope.orderRegistrationAccessoryDetails) {
					if ($scope.orderRegistrationAccessoryDetails [i] === orderRegistrationAccessoryDetail) {
						$scope.orderRegistrationAccessoryDetails.splice(i, 1);
					}
				}
			} else {
				$scope.orderRegistrationAccessoryDetail.$remove(function() {
					$location.path('order-registration-accessory-details');
				});
			}
		};

		// Update existing Order registration accessory detail
		$scope.update = function() {
			var orderRegistrationAccessoryDetail = $scope.orderRegistrationAccessoryDetail;

			orderRegistrationAccessoryDetail.$update(function() {
				$location.path('order-registration-accessory-details/' + orderRegistrationAccessoryDetail._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Order registration accessory details
		$scope.find = function() {
			$scope.orderRegistrationAccessoryDetails = OrderRegistrationAccessoryDetails.query();
		};

		// Find existing Order registration accessory detail
		$scope.findOne = function() {
			$scope.orderRegistrationAccessoryDetail = OrderRegistrationAccessoryDetails.get({ 
				orderRegistrationAccessoryDetailId: $stateParams.orderRegistrationAccessoryDetailId
			});
		};
	}
]);