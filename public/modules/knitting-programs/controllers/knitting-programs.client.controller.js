'use strict';

// Knitting programs controller
angular.module('knitting-programs').controller('KnittingProgramsController', ['$scope', '$stateParams', '$location', 'Authentication', 'KnittingPrograms',
	function($scope, $stateParams, $location, Authentication, KnittingPrograms) {
		$scope.authentication = Authentication;

		// Create new Knitting program
		$scope.create = function() {
			// Create new Knitting program object
			var knittingProgram = new KnittingPrograms ({
				orderNo: this.orderNo,
				styleNo: this.styleNo,
				workOrderNo: this.workOrderNo,
				workOrderDate: this.workOrderDate,
				party: this.party,
				requiredDate: this.requiredDate,
				remarks: this.remarks
			});

			// Redirect after save
			knittingProgram.$save(function(response) {
				$location.path('knitting-programs/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Knitting program
		$scope.remove = function(knittingProgram) {
			if ( knittingProgram ) { 
				knittingProgram.$remove();

				for (var i in $scope.knittingPrograms) {
					if ($scope.knittingPrograms [i] === knittingProgram) {
						$scope.knittingPrograms.splice(i, 1);
					}
				}
			} else {
				$scope.knittingProgram.$remove(function() {
					$location.path('knitting-programs');
				});
			}
		};

		// Update existing Knitting program
		$scope.update = function() {
			var knittingProgram = $scope.knittingProgram;

			knittingProgram.$update(function() {
				$location.path('knitting-programs/' + knittingProgram._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Knitting programs
		$scope.find = function() {
			$scope.knittingPrograms = KnittingPrograms.query();
		};

		// Find existing Knitting program
		$scope.findOne = function() {
			$scope.knittingProgram = KnittingPrograms.get({ 
				knittingProgramId: $stateParams.knittingProgramId
			});
		};
	}
]);