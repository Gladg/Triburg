'use strict';

// Machinery equipment lists controller
angular.module('machinery-equipment-lists').controller('MachineryEquipmentListsController', ['$scope', '$stateParams', '$location', 'Authentication', 'MachineryEquipmentLists',
	function($scope, $stateParams, $location, Authentication, MachineryEquipmentLists) {
		$scope.authentication = Authentication;

		// Create new Machinery equipment list
		$scope.create = function() {
			// Create new Machinery equipment list object
			var machineryEquipmentList = new MachineryEquipmentLists ({
				sLNo: this.sLNo,
				machineName: this.machineName,
				machineCode: this.machineCode,
				machineNo: this.machineNo,
				modelNo: this.modelNo,
				manufacturerName: this.manufacturerName,
				capacity: this.capacity,
				application: this.application

			});

			// Redirect after save
			machineryEquipmentList.$save(function(response) {
				$location.path('machinery-equipment-lists/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Machinery equipment list
		$scope.remove = function(machineryEquipmentList) {
			if ( machineryEquipmentList ) { 
				machineryEquipmentList.$remove();

				for (var i in $scope.machineryEquipmentLists) {
					if ($scope.machineryEquipmentLists [i] === machineryEquipmentList) {
						$scope.machineryEquipmentLists.splice(i, 1);
					}
				}
			} else {
				$scope.machineryEquipmentList.$remove(function() {
					$location.path('machinery-equipment-lists');
				});
			}
		};

		// Update existing Machinery equipment list
		$scope.update = function() {
			var machineryEquipmentList = $scope.machineryEquipmentList;

			machineryEquipmentList.$update(function() {
				$location.path('machinery-equipment-lists/' + machineryEquipmentList._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Machinery equipment lists
		$scope.find = function() {
			$scope.machineryEquipmentLists = MachineryEquipmentLists.query();
		};

		// Find existing Machinery equipment list
		$scope.findOne = function() {
			$scope.machineryEquipmentList = MachineryEquipmentLists.get({ 
				machineryEquipmentListId: $stateParams.machineryEquipmentListId
			});
		};
	}
]);