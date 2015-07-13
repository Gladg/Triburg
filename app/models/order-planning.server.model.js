'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Order planning Schema
 */
var OrderPlanningSchema = new Schema({
	orderNo: {
		type: Number,
		default: '',
		required: 'Please fill Order planning number',
		trim: false
	},
	description: {
		type: String,
		default: '',
		required: 'Please fill Order planning description',
		trim: true
	},
	buyerName: {
		type: String,
		default: '',
		required: 'Please fill Order buyer name',
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

mongoose.model('OrderPlanning', OrderPlanningSchema);
