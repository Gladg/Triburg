'use strict';

//Setting up route
angular.module('qc-forms').config(['$stateProvider',
	function($stateProvider) {
		// Qc forms state routing
		$stateProvider.
		state('listQcForms', {
			url: '/qc-forms',
			templateUrl: 'modules/qc-forms/views/list-qc-forms.client.view.html'
		}).
		state('createQcForm', {
			url: '/qc-forms/create',
			templateUrl: 'modules/qc-forms/views/create-qc-form.client.view.html'
		}).
		state('viewQcForm', {
			url: '/qc-forms/:qcFormId',
			templateUrl: 'modules/qc-forms/views/view-qc-form.client.view.html'
		}).
		state('editQcForm', {
			url: '/qc-forms/:qcFormId/edit',
			templateUrl: 'modules/qc-forms/views/edit-qc-form.client.view.html'
		});
	}
]);