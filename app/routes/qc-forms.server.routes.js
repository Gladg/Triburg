'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var qcForms = require('../../app/controllers/qc-forms.server.controller');

	// Qc forms Routes
	app.route('/qc-forms')
		.get(qcForms.list)
		.post(users.requiresLogin, qcForms.create);

	app.route('/qc-forms/:qcFormId')
		.get(qcForms.read)
		.put(users.requiresLogin, qcForms.hasAuthorization, qcForms.update)
		.delete(users.requiresLogin, qcForms.hasAuthorization, qcForms.delete);

	// Finish by binding the Qc form middleware
	app.param('qcFormId', qcForms.qcFormByID);
};
