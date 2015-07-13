'use strict';

// Program sheets controller
angular.module('program-sheets').controller('ProgramSheetsController', ['$scope', '$stateParams', '$location', 'Authentication', 'ProgramSheets',
	function($scope, $stateParams, $location, Authentication, ProgramSheets) {
		$scope.authentication = Authentication;

		// Create new Program sheet
		$scope.create = function() {
			// Create new Program sheet object
			var programSheet = new ProgramSheets ({
				orderNo: this.orderNo,
				styleNo: this.styleNo,
				workOrderNo: this.workOrderNo,
				workOrderDate: this.workOrderDate,
				operatorName: this.operatorName,
				sLNo: this.sLNo,
				operationName: this.operationName,
				color: this.color,
				size: this.size,
				quantity: this.quantity
			});

			// Redirect after save
			programSheet.$save(function(response) {
				$location.path('program-sheets/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Program sheet
		$scope.remove = function(programSheet) {
			if ( programSheet ) { 
				programSheet.$remove();

				for (var i in $scope.programSheets) {
					if ($scope.programSheets [i] === programSheet) {
						$scope.programSheets.splice(i, 1);
					}
				}
			} else {
				$scope.programSheet.$remove(function() {
					$location.path('program-sheets');
				});
			}
		};

		// Update existing Program sheet
		$scope.update = function() {
			var programSheet = $scope.programSheet;

			programSheet.$update(function() {
				$location.path('program-sheets/' + programSheet._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Program sheets
		$scope.find = function() {
			$scope.programSheets = ProgramSheets.query();
		};

		// Find existing Program sheet
		$scope.findOne = function() {
			$scope.programSheet = ProgramSheets.get({ 
				programSheetId: $stateParams.programSheetId
			});
		};
	}
]);