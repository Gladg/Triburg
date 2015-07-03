'use strict';

// Order enquiry forms controller
angular.module('order-enquiry-forms').controller('OrderEnquiryFormsController', ['$scope', '$stateParams', '$location', 'Authentication', 'OrderEnquiryForms',
	function($scope, $stateParams, $location, Authentication, OrderEnquiryForms) {
		$scope.authentication = Authentication;

		// Create new Order enquiry form
		$scope.create = function() {
			// Create new Order enquiry form object
			var orderEnquiryForm = new OrderEnquiryForms ({
				enquiryNo: this.enquiryNo,
				enquiryDate: this.enquiryDate,
				buyerName: this.buyerName,
				styleName: this.styleName,
				styleNo: this.styleNo,
				orderQuantity: this.orderQuantity,
				samplingRequiredQty: this.samplingRequiredQty,
				costingRequiredDate: this.costingRequiredDate,
				samplingRequiredDate: this.samplingRequiredDate

			});

			// Redirect after save
			orderEnquiryForm.$save(function(response) {
				$location.path('order-enquiry-forms/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Order enquiry form
		$scope.remove = function(orderEnquiryForm) {
			if ( orderEnquiryForm ) { 
				orderEnquiryForm.$remove();

				for (var i in $scope.orderEnquiryForms) {
					if ($scope.orderEnquiryForms [i] === orderEnquiryForm) {
						$scope.orderEnquiryForms.splice(i, 1);
					}
				}
			} else {
				$scope.orderEnquiryForm.$remove(function() {
					$location.path('order-enquiry-forms');
				});
			}
		};

		// Update existing Order enquiry form
		$scope.update = function() {
			var orderEnquiryForm = $scope.orderEnquiryForm;

			orderEnquiryForm.$update(function() {
				$location.path('order-enquiry-forms/' + orderEnquiryForm._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Order enquiry forms
		$scope.find = function() {
			$scope.orderEnquiryForms = OrderEnquiryForms.query();
		};

		// Find existing Order enquiry form
		$scope.findOne = function() {
			$scope.orderEnquiryForm = OrderEnquiryForms.get({ 
				orderEnquiryFormId: $stateParams.orderEnquiryFormId
			});
		};
	}
]);