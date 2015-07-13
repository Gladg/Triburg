'use strict';

// Costing sheets controller
angular.module('costing-sheets').controller('CostingSheetsController', ['$scope', '$stateParams', '$location', 'Authentication', 'CostingSheets',
	function($scope, $stateParams, $location, Authentication, CostingSheets) {
		$scope.authentication = Authentication;

		// Create new Costing sheet
		$scope.create = function() {
			// Create new Costing sheet object
			var costingSheet = new CostingSheets ({
				orderNo: this.orderNo,
				description: this.description,
				styleNo: this.styleNo,
				deliverydate: this.deliverydate,
				gSM: this.gSM,
				yarnCount: this.yarnCount,
				orderQuantity: this.orderQuantity,
				buyerName: this.buyerName,
				sLNo: this.sLNo,
				itemName: this.itemName,
				uoM: this.uoM,
				units: this.units,
				unitCost1: this.unitCost1,
				unitCost2: this.unitCost2
			});

			// Redirect after save
			costingSheet.$save(function(response) {
				$location.path('costing-sheets/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Costing sheet
		$scope.remove = function(costingSheet) {
			if ( costingSheet ) { 
				costingSheet.$remove();

				for (var i in $scope.costingSheets) {
					if ($scope.costingSheets [i] === costingSheet) {
						$scope.costingSheets.splice(i, 1);
					}
				}
			} else {
				$scope.costingSheet.$remove(function() {
					$location.path('costing-sheets');
				});
			}
		};

		// Update existing Costing sheet
		$scope.update = function() {
			var costingSheet = $scope.costingSheet;

			costingSheet.$update(function() {
				$location.path('costing-sheets/' + costingSheet._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Costing sheets
		$scope.find = function() {
			$scope.costingSheets = CostingSheets.query();
		};

		// Find existing Costing sheet
		$scope.findOne = function() {
			$scope.costingSheet = CostingSheets.get({ 
				costingSheetId: $stateParams.costingSheetId
			});
		};
	}
]);