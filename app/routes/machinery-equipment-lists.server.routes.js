'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var machineryEquipmentLists = require('../../app/controllers/machinery-equipment-lists.server.controller');

	// Machinery equipment lists Routes
	app.route('/machinery-equipment-lists')
		.get(machineryEquipmentLists.list)
		.post(users.requiresLogin, machineryEquipmentLists.create);

	app.route('/machinery-equipment-lists/:machineryEquipmentListId')
		.get(machineryEquipmentLists.read)
		.put(users.requiresLogin, machineryEquipmentLists.hasAuthorization, machineryEquipmentLists.update)
		.delete(users.requiresLogin, machineryEquipmentLists.hasAuthorization, machineryEquipmentLists.delete);

	// Finish by binding the Machinery equipment list middleware
	app.param('machineryEquipmentListId', machineryEquipmentLists.machineryEquipmentListByID);
};
