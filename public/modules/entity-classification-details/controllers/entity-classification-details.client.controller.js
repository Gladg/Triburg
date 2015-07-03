'use strict';

// Entity classification details controller
angular.module('entity-classification-details').controller('EntityClassificationDetailsController', ['$scope', '$stateParams', '$location', 'Authentication', 'EntityClassificationDetails',
	function($scope, $stateParams, $location, Authentication, EntityClassificationDetails) {
		$scope.authentication = Authentication;

		// Create new Entity classification detail
		$scope.create = function() {
			// Create new Entity classification detail object
			var entityClassificationDetail = new EntityClassificationDetails ({
				classcode: this.classcode,
				classname: this.classname
			});

			// Redirect after save
			entityClassificationDetail.$save(function(response) {
				$location.path('entity-classification-details/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Entity classification detail
		$scope.remove = function(entityClassificationDetail) {
			if ( entityClassificationDetail ) { 
				entityClassificationDetail.$remove();

				for (var i in $scope.entityClassificationDetails) {
					if ($scope.entityClassificationDetails [i] === entityClassificationDetail) {
						$scope.entityClassificationDetails.splice(i, 1);
					}
				}
			} else {
				$scope.entityClassificationDetail.$remove(function() {
					$location.path('entity-classification-details');
				});
			}
		};

		// Update existing Entity classification detail
		$scope.update = function() {
			var entityClassificationDetail = $scope.entityClassificationDetail;

			entityClassificationDetail.$update(function() {
				$location.path('entity-classification-details/' + entityClassificationDetail._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Entity classification details
		$scope.find = function() {
			$scope.entityClassificationDetails = EntityClassificationDetails.query();
		};

		// Find existing Entity classification detail
		$scope.findOne = function() {
			$scope.entityClassificationDetail = EntityClassificationDetails.get({ 
				entityClassificationDetailId: $stateParams.entityClassificationDetailId
			});
		};
	}
]);