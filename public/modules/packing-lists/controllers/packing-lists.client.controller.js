'use strict';

// Packing lists controller
angular.module('packing-lists').controller('PackingListsController', ['$scope', '$stateParams', '$location', 'Authentication', 'PackingLists',
	function($scope, $stateParams, $location, Authentication, PackingLists) {
		$scope.authentication = Authentication;

		// Create new Packing list
		$scope.create = function() {
			// Create new Packing list object
			var packingList = new PackingLists ({
				orderNo: this.orderNo,
				styleNo: this.styleNo,
				description: this.description,
				buyerName: this.buyerName,
				packingListNo: this.packingListNo,
				packingListDate: this.packingListDate,
				asLNo: this.asLNo,
				abundleDescription: this.abundleDescription,
				asize: this.asize,
				acolor: this.acolor,
				apcs: this.apcs,
				csLNo: this.csLNo,
				ccartonNo: this.ccartonNo,
				ccolor: this.ccolor,
				csize: this.csize,
				cuoM: this.cuoM,
				cunits: this.cunits,
				cnetWt: this.cnetWt,
				cgrsWt: this.cgrsWt
			});

			// Redirect after save
			packingList.$save(function(response) {
				$location.path('packing-lists/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Packing list
		$scope.remove = function(packingList) {
			if ( packingList ) { 
				packingList.$remove();

				for (var i in $scope.packingLists) {
					if ($scope.packingLists [i] === packingList) {
						$scope.packingLists.splice(i, 1);
					}
				}
			} else {
				$scope.packingList.$remove(function() {
					$location.path('packing-lists');
				});
			}
		};

		// Update existing Packing list
		$scope.update = function() {
			var packingList = $scope.packingList;

			packingList.$update(function() {
				$location.path('packing-lists/' + packingList._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Packing lists
		$scope.find = function() {
			$scope.packingLists = PackingLists.query();
		};

		// Find existing Packing list
		$scope.findOne = function() {
			$scope.packingList = PackingLists.get({ 
				packingListId: $stateParams.packingListId
			});
		};
	}
]);