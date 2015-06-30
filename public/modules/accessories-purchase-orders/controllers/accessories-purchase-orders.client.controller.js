'use strict';

// Accessories purchase orders controller
angular.module('accessories-purchase-orders').controller('AccessoriesPurchaseOrdersController', ['$scope', '$stateParams', '$location', 'Authentication', 'AccessoriesPurchaseOrders',
	function($scope, $stateParams, $location, Authentication, AccessoriesPurchaseOrders) {
		$scope.authentication = Authentication;

		// Create new Accessories purchase order
		$scope.create = function() {
			// Create new Accessories purchase order object
			var accessoriesPurchaseOrder = new AccessoriesPurchaseOrders ({
				orderNo: this.orderNo,
				styleNo: this.styleNo,
				poDate: this.poDate,
				poNo: this.poNo,
				orderQuantity: this.orderQuantity,
				supplier: this.supplier,
				specialNote: this.specialNote,
				slNo: this.slNo,
				itemName: this.itemName,
				uom: this.uom,
				units: this.units,
				requiredDate: this.requiredDate,
                                remarks: this.remarks
		});

			// Redirect after save
			accessoriesPurchaseOrder.$save(function(response) {
				$location.path('accessories-purchase-orders/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Accessories purchase order
		$scope.remove = function(accessoriesPurchaseOrder) {
			if ( accessoriesPurchaseOrder ) { 
				accessoriesPurchaseOrder.$remove();

				for (var i in $scope.accessoriesPurchaseOrders) {
					if ($scope.accessoriesPurchaseOrders [i] === accessoriesPurchaseOrder) {
						$scope.accessoriesPurchaseOrders.splice(i, 1);
					}
				}
			} else {
				$scope.accessoriesPurchaseOrder.$remove(function() {
					$location.path('accessories-purchase-orders');
				});
			}
		};

		// Update existing Accessories purchase order
		$scope.update = function() {
			var accessoriesPurchaseOrder = $scope.accessoriesPurchaseOrder;

			accessoriesPurchaseOrder.$update(function() {
				$location.path('accessories-purchase-orders/' + accessoriesPurchaseOrder._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Accessories purchase orders
		$scope.find = function() {
			$scope.accessoriesPurchaseOrders = AccessoriesPurchaseOrders.query();
		};

		// Find existing Accessories purchase order
		$scope.findOne = function() {
			$scope.accessoriesPurchaseOrder = AccessoriesPurchaseOrders.get({ 
				accessoriesPurchaseOrderId: $stateParams.accessoriesPurchaseOrderId
			});
		};
	}
]);