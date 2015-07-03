'use strict';

// Entity attributes details controller
angular.module('entity-attributes-details').controller('EntityAttributesDetailsController', ['$scope', '$stateParams', '$location', 'Authentication', 'EntityAttributesDetails',
	function($scope, $stateParams, $location, Authentication, EntityAttributesDetails) {
		$scope.authentication = Authentication;

		// Create new Entity attributes detail
		$scope.create = function() {
			// Create new Entity attributes detail object
			var entityAttributesDetail = new EntityAttributesDetails ({
				attributename: this.attributename,
				attributevalue: this.attributevalue
			});

			// Redirect after save
			entityAttributesDetail.$save(function(response) {
				$location.path('entity-attributes-details/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Entity attributes detail
		$scope.remove = function(entityAttributesDetail) {
			if ( entityAttributesDetail ) { 
				entityAttributesDetail.$remove();

				for (var i in $scope.entityAttributesDetails) {
					if ($scope.entityAttributesDetails [i] === entityAttributesDetail) {
						$scope.entityAttributesDetails.splice(i, 1);
					}
				}
			} else {
				$scope.entityAttributesDetail.$remove(function() {
					$location.path('entity-attributes-details');
				});
			}
		};

		// Update existing Entity attributes detail
		$scope.update = function() {
			var entityAttributesDetail = $scope.entityAttributesDetail;

			entityAttributesDetail.$update(function() {
				$location.path('entity-attributes-details/' + entityAttributesDetail._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Entity attributes details
		$scope.find = function() {
			$scope.entityAttributesDetails = EntityAttributesDetails.query();
		};

		// Find existing Entity attributes detail
		$scope.findOne = function() {
			$scope.entityAttributesDetail = EntityAttributesDetails.get({ 
				entityAttributesDetailId: $stateParams.entityAttributesDetailId
			});
		};
	}
]);