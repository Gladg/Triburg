'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var entityAttributesDetails = require('../../app/controllers/entity-attributes-details.server.controller');

	// Entity attributes details Routes
	app.route('/entity-attributes-details')
		.get(entityAttributesDetails.list)
		.post(users.requiresLogin, entityAttributesDetails.create);

	app.route('/entity-attributes-details/:entityAttributesDetailId')
		.get(entityAttributesDetails.read)
		.put(users.requiresLogin, entityAttributesDetails.hasAuthorization, entityAttributesDetails.update)
		.delete(users.requiresLogin, entityAttributesDetails.hasAuthorization, entityAttributesDetails.delete);

	// Finish by binding the Entity attributes detail middleware
	app.param('entityAttributesDetailId', entityAttributesDetails.entityAttributesDetailByID);
};
