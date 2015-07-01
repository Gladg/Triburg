'use strict';

// Entity classifications controller
angular.module('entity-classifications').controller('EntityClassificationsController', ['$scope', '$stateParams', '$location', 'Authentication', 'EntityClassifications',
	function($scope, $stateParams, $location, Authentication, EntityClassifications) {
		$scope.authentication = Authentication;

		// Create new Entity classification
		$scope.create = function() {
			// Create new Entity classification object
			var entityClassification = new EntityClassifications ({
				name: this.name,
				code: this.code
			});

			// Redirect after save
			entityClassification.$save(function(response) {
				$location.path('entity-classifications/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Entity classification
		$scope.remove = function(entityClassification) {
			if ( entityClassification ) { 
				entityClassification.$remove();

				for (var i in $scope.entityClassifications) {
					if ($scope.entityClassifications [i] === entityClassification) {
						$scope.entityClassifications.splice(i, 1);
					}
				}
			} else {
				$scope.entityClassification.$remove(function() {
					$location.path('entity-classifications');
				});
			}
		};

		// Update existing Entity classification
		$scope.update = function() {
			var entityClassification = $scope.entityClassification;

			entityClassification.$update(function() {
				$location.path('entity-classifications/' + entityClassification._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Entity classifications
		$scope.find = function() {
			$scope.entityClassifications = EntityClassifications.query();
		};

		// Find existing Entity classification
		$scope.findOne = function() {
			$scope.entityClassification = EntityClassifications.get({ 
				entityClassificationId: $stateParams.entityClassificationId
			});
		};
	}
]);