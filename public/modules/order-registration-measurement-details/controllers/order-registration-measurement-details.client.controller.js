'use strict';

// Order registration measurement details controller
angular.module('order-registration-measurement-details').controller('OrderRegistrationMeasurementDetailsController', ['$scope', '$stateParams', '$location', 'Authentication', 'OrderRegistrationMeasurementDetails',
	function($scope, $stateParams, $location, Authentication, OrderRegistrationMeasurementDetails) {
		$scope.authentication = Authentication;

		// Create new Order registration measurement detail
		$scope.create = function() {
			// Create new Order registration measurement detail object
			var orderRegistrationMeasurementDetail = new OrderRegistrationMeasurementDetails ({
				sLNo: this.sLNo,
				size: this.size,
				measurementpart: this.measurementpart,
				uoM: this.uoM,
				units: this.units

			});

			// Redirect after save
			orderRegistrationMeasurementDetail.$save(function(response) {
				$location.path('order-registration-measurement-details/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Order registration measurement detail
		$scope.remove = function(orderRegistrationMeasurementDetail) {
			if ( orderRegistrationMeasurementDetail ) { 
				orderRegistrationMeasurementDetail.$remove();

				for (var i in $scope.orderRegistrationMeasurementDetails) {
					if ($scope.orderRegistrationMeasurementDetails [i] === orderRegistrationMeasurementDetail) {
						$scope.orderRegistrationMeasurementDetails.splice(i, 1);
					}
				}
			} else {
				$scope.orderRegistrationMeasurementDetail.$remove(function() {
					$location.path('order-registration-measurement-details');
				});
			}
		};

		// Update existing Order registration measurement detail
		$scope.update = function() {
			var orderRegistrationMeasurementDetail = $scope.orderRegistrationMeasurementDetail;

			orderRegistrationMeasurementDetail.$update(function() {
				$location.path('order-registration-measurement-details/' + orderRegistrationMeasurementDetail._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Order registration measurement details
		$scope.find = function() {
			$scope.orderRegistrationMeasurementDetails = OrderRegistrationMeasurementDetails.query();
		};

		// Find existing Order registration measurement detail
		$scope.findOne = function() {
			$scope.orderRegistrationMeasurementDetail = OrderRegistrationMeasurementDetails.get({ 
				orderRegistrationMeasurementDetailId: $stateParams.orderRegistrationMeasurementDetailId
			});
		};
	}
]);