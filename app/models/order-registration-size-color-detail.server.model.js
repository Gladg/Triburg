'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Order registration size color detail Schema
 */
var OrderRegistrationSizeColorDetailSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Order registration size color detail name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('OrderRegistrationSizeColorDetail', OrderRegistrationSizeColorDetailSchema);