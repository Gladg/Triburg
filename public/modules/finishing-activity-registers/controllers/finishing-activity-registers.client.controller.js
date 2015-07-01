'use strict';

// Finishing activity registers controller
angular.module('finishing-activity-registers').controller('FinishingActivityRegistersController', ['$scope', '$stateParams', '$location', 'Authentication', 'FinishingActivityRegisters',
	function($scope, $stateParams, $location, Authentication, FinishingActivityRegisters) {
		$scope.authentication = Authentication;

		// Create new Finishing activity register
		$scope.create = function() {
			// Create new Finishing activity register object
			var finishingActivityRegister = new FinishingActivityRegisters ({
				personCompanyName: this.personCompanyName,
				registerDate: this.registerDate,
				operationName: this.operationName,
				preparedBy: this.preparedBy,
				sLNo: this.sLNo,
				refNo: this.refNo,
				uoM: this.uoM,
				units: this.units

			});

			// Redirect after save
			finishingActivityRegister.$save(function(response) {
				$location.path('finishing-activity-registers/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Finishing activity register
		$scope.remove = function(finishingActivityRegister) {
			if ( finishingActivityRegister ) { 
				finishingActivityRegister.$remove();

				for (var i in $scope.finishingActivityRegisters) {
					if ($scope.finishingActivityRegisters [i] === finishingActivityRegister) {
						$scope.finishingActivityRegisters.splice(i, 1);
					}
				}
			} else {
				$scope.finishingActivityRegister.$remove(function() {
					$location.path('finishing-activity-registers');
				});
			}
		};

		// Update existing Finishing activity register
		$scope.update = function() {
			var finishingActivityRegister = $scope.finishingActivityRegister;

			finishingActivityRegister.$update(function() {
				$location.path('finishing-activity-registers/' + finishingActivityRegister._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Finishing activity registers
		$scope.find = function() {
			$scope.finishingActivityRegisters = FinishingActivityRegisters.query();
		};

		// Find existing Finishing activity register
		$scope.findOne = function() {
			$scope.finishingActivityRegister = FinishingActivityRegisters.get({ 
				finishingActivityRegisterId: $stateParams.finishingActivityRegisterId
			});
		};
	}
]);