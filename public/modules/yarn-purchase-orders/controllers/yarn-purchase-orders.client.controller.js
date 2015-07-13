'use strict';

// Yarn purchase orders controller
angular.module('yarn-purchase-orders').controller('YarnPurchaseOrdersController', ['$scope', '$stateParams', '$location', 'Authentication', 'YarnPurchaseOrders',
	function($scope, $stateParams, $location, Authentication, YarnPurchaseOrders) {
		$scope.authentication = Authentication;

		// Create new Yarn purchase order
		$scope.create = function() {
			// Create new Yarn purchase order object
			var yarnPurchaseOrder = new YarnPurchaseOrders ({
				orderNo: this.orderNo,
				styleNo: this.styleNo,
				supplier: this.supplier,
				pONo: this.pONo,
				pODate: this.pODate,
				deliveryDate: this.deliveryDate,	
				payment: this.payment,
				specialNote: this.specialNote,
				sLNo: this.sLNo,
				yarnDescription: this.yarnDescription,
				count: this.count,
				color: this.color,
				quantity: this.quantity

			});

			// Redirect after save
			yarnPurchaseOrder.$save(function(response) {
				$location.path('yarn-purchase-orders/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Yarn purchase order
		$scope.remove = function(yarnPurchaseOrder) {
			if ( yarnPurchaseOrder ) { 
				yarnPurchaseOrder.$remove();

				for (var i in $scope.yarnPurchaseOrders) {
					if ($scope.yarnPurchaseOrders [i] === yarnPurchaseOrder) {
						$scope.yarnPurchaseOrders.splice(i, 1);
					}
				}
			} else {
				$scope.yarnPurchaseOrder.$remove(function() {
					$location.path('yarn-purchase-orders');
				});
			}
		};

		// Update existing Yarn purchase order
		$scope.update = function() {
			var yarnPurchaseOrder = $scope.yarnPurchaseOrder;

			yarnPurchaseOrder.$update(function() {
				$location.path('yarn-purchase-orders/' + yarnPurchaseOrder._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Yarn purchase orders
		$scope.find = function() {
			$scope.yarnPurchaseOrders = YarnPurchaseOrders.query();
		};

		// Find existing Yarn purchase order
		$scope.findOne = function() {
			$scope.yarnPurchaseOrder = YarnPurchaseOrders.get({ 
				yarnPurchaseOrderId: $stateParams.yarnPurchaseOrderId
			});
		};
	}
]);