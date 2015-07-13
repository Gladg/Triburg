'use strict';

//Goods received notes service used to communicate Goods received notes REST endpoints
angular.module('goods-received-notes').factory('GoodsReceivedNotes', ['$resource',
	function($resource) {
		return $resource('goods-received-notes/:goodsReceivedNoteId', { goodsReceivedNoteId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);