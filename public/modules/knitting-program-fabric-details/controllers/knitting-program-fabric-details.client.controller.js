'use strict';

// Knitting program fabric details controller
angular.module('knitting-program-fabric-details').controller('KnittingProgramFabricDetailsController', ['$scope', '$stateParams', '$location', 'Authentication', 'KnittingProgramFabricDetails',
	function($scope, $stateParams, $location, Authentication, KnittingProgramFabricDetails) {
		$scope.authentication = Authentication;

		// Create new Knitting program fabric detail
		$scope.create = function() {
			// Create new Knitting program fabric detail object
			var knittingProgramFabricDetail = new KnittingProgramFabricDetails ({
				sLNo: this.sLNo,
				fabricType: this.fabricType,
				gauge: this.gauge,
				gREYGSM: this.gREYGSM,
				gREYTexture: this.gREYTexture,
				dia: this.dia,
				weight: this.weight
			});

			// Redirect after save
			knittingProgramFabricDetail.$save(function(response) {
				$location.path('knitting-program-fabric-details/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Knitting program fabric detail
		$scope.remove = function(knittingProgramFabricDetail) {
			if ( knittingProgramFabricDetail ) { 
				knittingProgramFabricDetail.$remove();

				for (var i in $scope.knittingProgramFabricDetails) {
					if ($scope.knittingProgramFabricDetails [i] === knittingProgramFabricDetail) {
						$scope.knittingProgramFabricDetails.splice(i, 1);
					}
				}
			} else {
				$scope.knittingProgramFabricDetail.$remove(function() {
					$location.path('knitting-program-fabric-details');
				});
			}
		};

		// Update existing Knitting program fabric detail
		$scope.update = function() {
			var knittingProgramFabricDetail = $scope.knittingProgramFabricDetail;

			knittingProgramFabricDetail.$update(function() {
				$location.path('knitting-program-fabric-details/' + knittingProgramFabricDetail._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Knitting program fabric details
		$scope.find = function() {
			$scope.knittingProgramFabricDetails = KnittingProgramFabricDetails.query();
		};

		// Find existing Knitting program fabric detail
		$scope.findOne = function() {
			$scope.knittingProgramFabricDetail = KnittingProgramFabricDetails.get({ 
				knittingProgramFabricDetailId: $stateParams.knittingProgramFabricDetailId
			});
		};
	}
]);