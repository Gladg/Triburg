'use strict';

// Process programs controller
angular.module('process-programs').controller('ProcessProgramsController', ['$scope', '$stateParams', '$location', 'Authentication', 'ProcessPrograms',
	function($scope, $stateParams, $location, Authentication, ProcessPrograms) {
		$scope.authentication = Authentication;

		// Create new Process program
		$scope.create = function() {
			// Create new Process program object
			var processProgram = new ProcessPrograms ({
				processName: this.processName
				orderNo: this.orderNo
				styleNo: this.styleNo
				workOrderNo: this.workOrderNo
				workOrderDate: this.workOrderDate
				party: this.party
				requiredDate: this.requiredDate
				remarks: this.remarks
				slNo: this.slNo
				refNo: this.refNo
				color: this.color
				specification: this.specification
				quantity: this.quantity
				
			});

			// Redirect after save
			processProgram.$save(function(response) {
				$location.path('process-programs/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Process program
		$scope.remove = function(processProgram) {
			if ( processProgram ) { 
				processProgram.$remove();

				for (var i in $scope.processPrograms) {
					if ($scope.processPrograms [i] === processProgram) {
						$scope.processPrograms.splice(i, 1);
					}
				}
			} else {
				$scope.processProgram.$remove(function() {
					$location.path('process-programs');
				});
			}
		};

		// Update existing Process program
		$scope.update = function() {
			var processProgram = $scope.processProgram;

			processProgram.$update(function() {
				$location.path('process-programs/' + processProgram._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Process programs
		$scope.find = function() {
			$scope.processPrograms = ProcessPrograms.query();
		};

		// Find existing Process program
		$scope.findOne = function() {
			$scope.processProgram = ProcessPrograms.get({ 
				processProgramId: $stateParams.processProgramId
			});
		};
	}
]);