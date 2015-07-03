'use strict';

// Qc forms controller
angular.module('qc-forms').controller('QcFormsController', ['$scope', '$stateParams', '$location', 'Authentication', 'QcForms',
	function($scope, $stateParams, $location, Authentication, QcForms) {
		$scope.authentication = Authentication;

		// Create new Qc form
		$scope.create = function() {
			// Create new Qc form object
			var qcForm = new QcForms ({
				orderNo: this.orderNo,
				qCName: this.qCName,
				inspectionDate: this.inspectionDate,
				reportName: this.reportName,
				sLNo: this.sLNo,
				refNo: this.refNo,
				partMeasured: this.partMeasured,
				uoM: this.uoM,
				refUnits: this.refUnits,
				observedUnits: this.observedUnits

			});

			// Redirect after save
			qcForm.$save(function(response) {
				$location.path('qc-forms/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Qc form
		$scope.remove = function(qcForm) {
			if ( qcForm ) { 
				qcForm.$remove();

				for (var i in $scope.qcForms) {
					if ($scope.qcForms [i] === qcForm) {
						$scope.qcForms.splice(i, 1);
					}
				}
			} else {
				$scope.qcForm.$remove(function() {
					$location.path('qc-forms');
				});
			}
		};

		// Update existing Qc form
		$scope.update = function() {
			var qcForm = $scope.qcForm;

			qcForm.$update(function() {
				$location.path('qc-forms/' + qcForm._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Qc forms
		$scope.find = function() {
			$scope.qcForms = QcForms.query();
		};

		// Find existing Qc form
		$scope.findOne = function() {
			$scope.qcForm = QcForms.get({ 
				qcFormId: $stateParams.qcFormId
			});
		};
	}
]);