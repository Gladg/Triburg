'use strict';

// Order planning operation details controller
angular.module('order-planning-operation-details').controller('OrderPlanningOperationDetailsController', ['$scope', '$stateParams', '$location', 'Authentication', 'OrderPlanningOperationDetails',
	function($scope, $stateParams, $location, Authentication, OrderPlanningOperationDetails) {
		$scope.authentication = Authentication;

		// Create new Order planning operation detail
		$scope.create = function() {
			// Create new Order planning operation detail object
			var orderPlanningOperationDetail = new OrderPlanningOperationDetails ({
				sLNo: this.sLNo,
				operationName: this.operationName,
				plannedStartDate: this.plannedStartDate,
				plannedEndDate: this.plannedEndDate
			});

			// Redirect after save
			orderPlanningOperationDetail.$save(function(response) {
				$location.path('order-planning-operation-details/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Order planning operation detail
		$scope.remove = function(orderPlanningOperationDetail) {
			if ( orderPlanningOperationDetail ) { 
				orderPlanningOperationDetail.$remove();

				for (var i in $scope.orderPlanningOperationDetails) {
					if ($scope.orderPlanningOperationDetails [i] === orderPlanningOperationDetail) {
						$scope.orderPlanningOperationDetails.splice(i, 1);
					}
				}
			} else {
				$scope.orderPlanningOperationDetail.$remove(function() {
					$location.path('order-planning-operation-details');
				});
			}
		};

		// Update existing Order planning operation detail
		$scope.update = function() {
			var orderPlanningOperationDetail = $scope.orderPlanningOperationDetail;

			orderPlanningOperationDetail.$update(function() {
				$location.path('order-planning-operation-details/' + orderPlanningOperationDetail._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Order planning operation details
		$scope.find = function() {
			$scope.orderPlanningOperationDetails = OrderPlanningOperationDetails.query();
		};

		// Find existing Order planning operation detail
		$scope.findOne = function() {
			$scope.orderPlanningOperationDetail = OrderPlanningOperationDetails.get({ 
				orderPlanningOperationDetailId: $stateParams.orderPlanningOperationDetailId
			});
		};
	}
]);