'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var orderEnquiryForms = require('../../app/controllers/order-enquiry-forms.server.controller');

	// Order enquiry forms Routes
	app.route('/order-enquiry-forms')
		.get(orderEnquiryForms.list)
		.post(users.requiresLogin, orderEnquiryForms.create);

	app.route('/order-enquiry-forms/:orderEnquiryFormId')
		.get(orderEnquiryForms.read)
		.put(users.requiresLogin, orderEnquiryForms.hasAuthorization, orderEnquiryForms.update)
		.delete(users.requiresLogin, orderEnquiryForms.hasAuthorization, orderEnquiryForms.delete);

	// Finish by binding the Order enquiry form middleware
	app.param('orderEnquiryFormId', orderEnquiryForms.orderEnquiryFormByID);
};
