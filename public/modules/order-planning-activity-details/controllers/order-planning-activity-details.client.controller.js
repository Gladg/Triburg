'use strict';

// Order planning activity details controller
angular.module('order-planning-activity-details').controller('OrderPlanningActivityDetailsController', ['$scope', '$stateParams', '$location', 'Authentication', 'OrderPlanningActivityDetails',
	function($scope, $stateParams, $location, Authentication, OrderPlanningActivityDetails) {
		$scope.authentication = Authentication;

		// Create new Order planning activity detail
		$scope.create = function() {
			// Create new Order planning activity detail object
			var orderPlanningActivityDetail = new OrderPlanningActivityDetails ({
				sLNo: this.sLNo,
				activityName: this.activityName,
				plannedStartDate: this.plannedStartDate,
				plannedEndDate: this.plannedEndDate
			});

			// Redirect after save
			orderPlanningActivityDetail.$save(function(response) {
				$location.path('order-planning-activity-details/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Order planning activity detail
		$scope.remove = function(orderPlanningActivityDetail) {
			if ( orderPlanningActivityDetail ) { 
				orderPlanningActivityDetail.$remove();

				for (var i in $scope.orderPlanningActivityDetails) {
					if ($scope.orderPlanningActivityDetails [i] === orderPlanningActivityDetail) {
						$scope.orderPlanningActivityDetails.splice(i, 1);
					}
				}
			} else {
				$scope.orderPlanningActivityDetail.$remove(function() {
					$location.path('order-planning-activity-details');
				});
			}
		};

		// Update existing Order planning activity detail
		$scope.update = function() {
			var orderPlanningActivityDetail = $scope.orderPlanningActivityDetail;

			orderPlanningActivityDetail.$update(function() {
				$location.path('order-planning-activity-details/' + orderPlanningActivityDetail._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Order planning activity details
		$scope.find = function() {
			$scope.orderPlanningActivityDetails = OrderPlanningActivityDetails.query();
		};

		// Find existing Order planning activity detail
		$scope.findOne = function() {
			$scope.orderPlanningActivityDetail = OrderPlanningActivityDetails.get({ 
				orderPlanningActivityDetailId: $stateParams.orderPlanningActivityDetailId
			});
		};
	}
]);