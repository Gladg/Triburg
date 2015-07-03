'use strict';

// Entity roots controller
angular.module('entity-roots').controller('EntityRootsController', ['$scope', '$stateParams', '$location', 'Authentication', 'EntityRoots',
	function($scope, $stateParams, $location, Authentication, EntityRoots) {
		$scope.authentication = Authentication;

		// Create new Entity root
		$scope.create = function() {
			// Create new Entity root object
			var entityRoot = new EntityRoots ({
				code: this.code,
				name: this.name,
				contactName: this.contactName,
				addressline1: this.addressline1,
				addressline2: this.addressline2,
				city: this.city

			});

			// Redirect after save
			entityRoot.$save(function(response) {
				$location.path('entity-roots/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Entity root
		$scope.remove = function(entityRoot) {
			if ( entityRoot ) { 
				entityRoot.$remove();

				for (var i in $scope.entityRoots) {
					if ($scope.entityRoots [i] === entityRoot) {
						$scope.entityRoots.splice(i, 1);
					}
				}
			} else {
				$scope.entityRoot.$remove(function() {
					$location.path('entity-roots');
				});
			}
		};

		// Update existing Entity root
		$scope.update = function() {
			var entityRoot = $scope.entityRoot;

			entityRoot.$update(function() {
				$location.path('entity-roots/' + entityRoot._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Entity roots
		$scope.find = function() {
			$scope.entityRoots = EntityRoots.query();
		};

		// Find existing Entity root
		$scope.findOne = function() {
			$scope.entityRoot = EntityRoots.get({ 
				entityRootId: $stateParams.entityRootId
			});
		};
	}
]);