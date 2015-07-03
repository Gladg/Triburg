'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var entityClassificationDetails = require('../../app/controllers/entity-classification-details.server.controller');

	// Entity classification details Routes
	app.route('/entity-classification-details')
		.get(entityClassificationDetails.list)
		.post(users.requiresLogin, entityClassificationDetails.create);

	app.route('/entity-classification-details/:entityClassificationDetailId')
		.get(entityClassificationDetails.read)
		.put(users.requiresLogin, entityClassificationDetails.hasAuthorization, entityClassificationDetails.update)
		.delete(users.requiresLogin, entityClassificationDetails.hasAuthorization, entityClassificationDetails.delete);

	// Finish by binding the Entity classification detail middleware
	app.param('entityClassificationDetailId', entityClassificationDetails.entityClassificationDetailByID);
};
