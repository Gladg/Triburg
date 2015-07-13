'use strict';

// Goods received notes controller
angular.module('goods-received-notes').controller('GoodsReceivedNotesController', ['$scope', '$stateParams', '$location', 'Authentication', 'GoodsReceivedNotes',
	function($scope, $stateParams, $location, Authentication, GoodsReceivedNotes) {
		$scope.authentication = Authentication;

		// Create new Goods received note
		$scope.create = function() {
			// Create new Goods received note object
			var goodsReceivedNote = new GoodsReceivedNotes ({
				orderNo: this.orderNo,
				styleNo: this.styleNo,
				party: this.party,
				dCNo: this.dCNo,
				dCDate: this.dCDate,
				sLNo: this.sLNo,
				refNo: this.refNo,
				itemName: this.itemName,
				uoM: this.uoM,
				units: this.units,
				uoM2: this.uoM2,
				units2: this.units2
			});

			// Redirect after save
			goodsReceivedNote.$save(function(response) {
				$location.path('goods-received-notes/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Goods received note
		$scope.remove = function(goodsReceivedNote) {
			if ( goodsReceivedNote ) { 
				goodsReceivedNote.$remove();

				for (var i in $scope.goodsReceivedNotes) {
					if ($scope.goodsReceivedNotes [i] === goodsReceivedNote) {
						$scope.goodsReceivedNotes.splice(i, 1);
					}
				}
			} else {
				$scope.goodsReceivedNote.$remove(function() {
					$location.path('goods-received-notes');
				});
			}
		};

		// Update existing Goods received note
		$scope.update = function() {
			var goodsReceivedNote = $scope.goodsReceivedNote;

			goodsReceivedNote.$update(function() {
				$location.path('goods-received-notes/' + goodsReceivedNote._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Goods received notes
		$scope.find = function() {
			$scope.goodsReceivedNotes = GoodsReceivedNotes.query();
		};

		// Find existing Goods received note
		$scope.findOne = function() {
			$scope.goodsReceivedNote = GoodsReceivedNotes.get({ 
				goodsReceivedNoteId: $stateParams.goodsReceivedNoteId
			});
		};
	}
]);