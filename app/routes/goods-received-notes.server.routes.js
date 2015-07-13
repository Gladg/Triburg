'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var goodsReceivedNotes = require('../../app/controllers/goods-received-notes.server.controller');

	// Goods received notes Routes
	app.route('/goods-received-notes')
		.get(goodsReceivedNotes.list)
		.post(users.requiresLogin, goodsReceivedNotes.create);

	app.route('/goods-received-notes/:goodsReceivedNoteId')
		.get(goodsReceivedNotes.read)
		.put(users.requiresLogin, goodsReceivedNotes.hasAuthorization, goodsReceivedNotes.update)
		.delete(users.requiresLogin, goodsReceivedNotes.hasAuthorization, goodsReceivedNotes.delete);

	// Finish by binding the Goods received note middleware
	app.param('goodsReceivedNoteId', goodsReceivedNotes.goodsReceivedNoteByID);
};
