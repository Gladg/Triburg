'use strict';

// Order plannings controller
angular.module('order-plannings').controller('OrderPlanningsController', ['$scope', '$stateParams', '$location', 'Authentication', 'OrderPlannings',
	function($scope, $stateParams, $location, Authentication, OrderPlannings) {
		$scope.authentication = Authentication;

		// Create new Order planning
		$scope.create = function() {
			// Create new Order planning object
			var orderPlanning = new OrderPlannings ({
				orderNo: this.orderNo,
				description: this.description,
				buyerName: this.buyerName
			});

			// Redirect after save
			orderPlanning.$save(function(response) {
				$location.path('order-plannings/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Order planning
		$scope.remove = function(orderPlanning) {
			if ( orderPlanning ) { 
				orderPlanning.$remove();

				for (var i in $scope.orderPlannings) {
					if ($scope.orderPlannings [i] === orderPlanning) {
						$scope.orderPlannings.splice(i, 1);
					}
				}
			} else {
				$scope.orderPlanning.$remove(function() {
					$location.path('order-plannings');
				});
			}
		};

		// Update existing Order planning
		$scope.update = function() {
			var orderPlanning = $scope.orderPlanning;

			orderPlanning.$update(function() {
				$location.path('order-plannings/' + orderPlanning._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Order plannings
		$scope.find = function() {
			$scope.orderPlannings = OrderPlannings.query();
		};

		// Find existing Order planning
		$scope.findOne = function() {
			$scope.orderPlanning = OrderPlannings.get({ 
				orderPlanningId: $stateParams.orderPlanningId
			});
		};
	}
]);