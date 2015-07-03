'use strict';

// Delivery challans controller
angular.module('delivery-challans').controller('DeliveryChallansController', ['$scope', '$stateParams', '$location', 'Authentication', 'DeliveryChallans',
	function($scope, $stateParams, $location, Authentication, DeliveryChallans) {
		$scope.authentication = Authentication;

		// Create new Delivery challan
		$scope.create = function() {
			// Create new Delivery challan object
			var deliveryChallan = new DeliveryChallans ({
				orderNo: this.orderNo,
				styleNo: this.styleNo,
				party: this.party,
				dCNo: this.dCNo,
				dCDate: this.dCDate,
				sLNo: this.sLNo,
				refNo: this.refNo,
				itemName: this.itemName,
				uoM: this.uoM,
				units: this.units,
				uoM2: this.uoM2,
				units2: this.units2

			});

			// Redirect after save
			deliveryChallan.$save(function(response) {
				$location.path('delivery-challans/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Delivery challan
		$scope.remove = function(deliveryChallan) {
			if ( deliveryChallan ) { 
				deliveryChallan.$remove();

				for (var i in $scope.deliveryChallans) {
					if ($scope.deliveryChallans [i] === deliveryChallan) {
						$scope.deliveryChallans.splice(i, 1);
					}
				}
			} else {
				$scope.deliveryChallan.$remove(function() {
					$location.path('delivery-challans');
				});
			}
		};

		// Update existing Delivery challan
		$scope.update = function() {
			var deliveryChallan = $scope.deliveryChallan;

			deliveryChallan.$update(function() {
				$location.path('delivery-challans/' + deliveryChallan._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Delivery challans
		$scope.find = function() {
			$scope.deliveryChallans = DeliveryChallans.query();
		};

		// Find existing Delivery challan
		$scope.findOne = function() {
			$scope.deliveryChallan = DeliveryChallans.get({ 
				deliveryChallanId: $stateParams.deliveryChallanId
			});
		};
	}
]);