'use strict';

// Order registration size color details controller
angular.module('order-registration-size-color-details').controller('OrderRegistrationSizeColorDetailsController', ['$scope', '$stateParams', '$location', 'Authentication', 'OrderRegistrationSizeColorDetails',
	function($scope, $stateParams, $location, Authentication, OrderRegistrationSizeColorDetails) {
		$scope.authentication = Authentication;

		// Create new Order registration size color detail
		$scope.create = function() {
			// Create new Order registration size color detail object
			var orderRegistrationSizeColorDetail = new OrderRegistrationSizeColorDetails ({
				sLNo: this.sLNo,
				color: this.color,
				size: this.size,
				quantity: this.quantity

			});

			// Redirect after save
			orderRegistrationSizeColorDetail.$save(function(response) {
				$location.path('order-registration-size-color-details/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Order registration size color detail
		$scope.remove = function(orderRegistrationSizeColorDetail) {
			if ( orderRegistrationSizeColorDetail ) { 
				orderRegistrationSizeColorDetail.$remove();

				for (var i in $scope.orderRegistrationSizeColorDetails) {
					if ($scope.orderRegistrationSizeColorDetails [i] === orderRegistrationSizeColorDetail) {
						$scope.orderRegistrationSizeColorDetails.splice(i, 1);
					}
				}
			} else {
				$scope.orderRegistrationSizeColorDetail.$remove(function() {
					$location.path('order-registration-size-color-details');
				});
			}
		};

		// Update existing Order registration size color detail
		$scope.update = function() {
			var orderRegistrationSizeColorDetail = $scope.orderRegistrationSizeColorDetail;

			orderRegistrationSizeColorDetail.$update(function() {
				$location.path('order-registration-size-color-details/' + orderRegistrationSizeColorDetail._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Order registration size color details
		$scope.find = function() {
			$scope.orderRegistrationSizeColorDetails = OrderRegistrationSizeColorDetails.query();
		};

		// Find existing Order registration size color detail
		$scope.findOne = function() {
			$scope.orderRegistrationSizeColorDetail = OrderRegistrationSizeColorDetails.get({ 
				orderRegistrationSizeColorDetailId: $stateParams.orderRegistrationSizeColorDetailId
			});
		};
	}
]);