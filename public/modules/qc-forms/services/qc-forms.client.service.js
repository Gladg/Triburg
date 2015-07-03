'use strict';

//Qc forms service used to communicate Qc forms REST endpoints
angular.module('qc-forms').factory('QcForms', ['$resource',
	function($resource) {
		return $resource('qc-forms/:qcFormId', { qcFormId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);