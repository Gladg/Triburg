'use strict';

// Cutting registers controller
angular.module('cutting-registers').controller('CuttingRegistersController', ['$scope', '$stateParams', '$location', 'Authentication', 'CuttingRegisters',
	function($scope, $stateParams, $location, Authentication, CuttingRegisters) {
		$scope.authentication = Authentication;

		// Create new Cutting register
		$scope.create = function() {
			// Create new Cutting register object
			var cuttingRegister = new CuttingRegisters ({
				orderNo: this.orderNo,
				styleNo: this.styleNo,
				registerDate: this.registerDate,
				bundleNo: this.bundleNo,
				lotNo: this.lotNo,
				color: this.color,
				size: this.size,
				pcs: this.pcs,
				cM: this.cM,
				preparedBy: this.preparedBy

			});

			// Redirect after save
			cuttingRegister.$save(function(response) {
				$location.path('cutting-registers/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Cutting register
		$scope.remove = function(cuttingRegister) {
			if ( cuttingRegister ) { 
				cuttingRegister.$remove();

				for (var i in $scope.cuttingRegisters) {
					if ($scope.cuttingRegisters [i] === cuttingRegister) {
						$scope.cuttingRegisters.splice(i, 1);
					}
				}
			} else {
				$scope.cuttingRegister.$remove(function() {
					$location.path('cutting-registers');
				});
			}
		};

		// Update existing Cutting register
		$scope.update = function() {
			var cuttingRegister = $scope.cuttingRegister;

			cuttingRegister.$update(function() {
				$location.path('cutting-registers/' + cuttingRegister._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Cutting registers
		$scope.find = function() {
			$scope.cuttingRegisters = CuttingRegisters.query();
		};

		// Find existing Cutting register
		$scope.findOne = function() {
			$scope.cuttingRegister = CuttingRegisters.get({ 
				cuttingRegisterId: $stateParams.cuttingRegisterId
			});
		};
	}
]);