'use strict';

// Order registration roots controller
angular.module('order-registration-roots').controller('OrderRegistrationRootsController', ['$scope', '$stateParams', '$location', 'Authentication', 'OrderRegistrationRoots',
	function($scope, $stateParams, $location, Authentication, OrderRegistrationRoots) {
		$scope.authentication = Authentication;

		// Create new Order registration root
		$scope.create = function() {
			// Create new Order registration root object
			var orderRegistrationRoot = new OrderRegistrationRoots ({
				orderNo: this.orderNo,
				orderDate: this.orderDate,
				styleNo: this.styleNo,
				buyerName: this.buyerName,
				quantity: this.quantity

			});

			// Redirect after save
			orderRegistrationRoot.$save(function(response) {
				$location.path('order-registration-roots/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Order registration root
		$scope.remove = function(orderRegistrationRoot) {
			if ( orderRegistrationRoot ) { 
				orderRegistrationRoot.$remove();

				for (var i in $scope.orderRegistrationRoots) {
					if ($scope.orderRegistrationRoots [i] === orderRegistrationRoot) {
						$scope.orderRegistrationRoots.splice(i, 1);
					}
				}
			} else {
				$scope.orderRegistrationRoot.$remove(function() {
					$location.path('order-registration-roots');
				});
			}
		};

		// Update existing Order registration root
		$scope.update = function() {
			var orderRegistrationRoot = $scope.orderRegistrationRoot;

			orderRegistrationRoot.$update(function() {
				$location.path('order-registration-roots/' + orderRegistrationRoot._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Order registration roots
		$scope.find = function() {
			$scope.orderRegistrationRoots = OrderRegistrationRoots.query();
		};

		// Find existing Order registration root
		$scope.findOne = function() {
			$scope.orderRegistrationRoot = OrderRegistrationRoots.get({ 
				orderRegistrationRootId: $stateParams.orderRegistrationRootId
			});
		};
	}
]);