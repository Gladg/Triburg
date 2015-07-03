'use strict';

// Order registration delivery details controller
angular.module('order-registration-delivery-details').controller('OrderRegistrationDeliveryDetailsController', ['$scope', '$stateParams', '$location', 'Authentication', 'OrderRegistrationDeliveryDetails',
	function($scope, $stateParams, $location, Authentication, OrderRegistrationDeliveryDetails) {
		$scope.authentication = Authentication;

		// Create new Order registration delivery detail
		$scope.create = function() {
			// Create new Order registration delivery detail object
			var orderRegistrationDeliveryDetail = new OrderRegistrationDeliveryDetails ({
				sLNo: this.sLNo,
				deliveryDate: this.deliveryDate,
				quantity: this.quantity

			});

			// Redirect after save
			orderRegistrationDeliveryDetail.$save(function(response) {
				$location.path('order-registration-delivery-details/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Order registration delivery detail
		$scope.remove = function(orderRegistrationDeliveryDetail) {
			if ( orderRegistrationDeliveryDetail ) { 
				orderRegistrationDeliveryDetail.$remove();

				for (var i in $scope.orderRegistrationDeliveryDetails) {
					if ($scope.orderRegistrationDeliveryDetails [i] === orderRegistrationDeliveryDetail) {
						$scope.orderRegistrationDeliveryDetails.splice(i, 1);
					}
				}
			} else {
				$scope.orderRegistrationDeliveryDetail.$remove(function() {
					$location.path('order-registration-delivery-details');
				});
			}
		};

		// Update existing Order registration delivery detail
		$scope.update = function() {
			var orderRegistrationDeliveryDetail = $scope.orderRegistrationDeliveryDetail;

			orderRegistrationDeliveryDetail.$update(function() {
				$location.path('order-registration-delivery-details/' + orderRegistrationDeliveryDetail._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Order registration delivery details
		$scope.find = function() {
			$scope.orderRegistrationDeliveryDetails = OrderRegistrationDeliveryDetails.query();
		};

		// Find existing Order registration delivery detail
		$scope.findOne = function() {
			$scope.orderRegistrationDeliveryDetail = OrderRegistrationDeliveryDetails.get({ 
				orderRegistrationDeliveryDetailId: $stateParams.orderRegistrationDeliveryDetailId
			});
		};
	}
]);