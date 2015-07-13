'use strict';

//Setting up route
angular.module('goods-received-notes').config(['$stateProvider',
	function($stateProvider) {
		// Goods received notes state routing
		$stateProvider.
		state('listGoodsReceivedNotes', {
			url: '/goods-received-notes',
			templateUrl: 'modules/goods-received-notes/views/list-goods-received-notes.client.view.html'
		}).
		state('createGoodsReceivedNote', {
			url: '/goods-received-notes/create',
			templateUrl: 'modules/goods-received-notes/views/create-goods-received-note.client.view.html'
		}).
		state('viewGoodsReceivedNote', {
			url: '/goods-received-notes/:goodsReceivedNoteId',
			templateUrl: 'modules/goods-received-notes/views/view-goods-received-note.client.view.html'
		}).
		state('editGoodsReceivedNote', {
			url: '/goods-received-notes/:goodsReceivedNoteId/edit',
			templateUrl: 'modules/goods-received-notes/views/edit-goods-received-note.client.view.html'
		});
	}
]);