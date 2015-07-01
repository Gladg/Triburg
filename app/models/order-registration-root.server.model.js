'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Order registration root Schema
 */
var OrderRegistrationRootSchema = new Schema({
	orderNo: {
		type: Number,
		default: '',
		required: 'Please fill Order number',
		trim: false
	},
	orderDate: {
		type: Date,
		default: '',
		required: 'Please fill Order date',
		trim: false
	},
	styleNo: {
		type: Number,
		default: '',
		required: 'Please fill style number',
		trim: false
	},
	buyerName: {
		type: String,
		default: '',
		required: 'Please fill buyer name',
		trim: true
	},
	quantity: {
		type: String,
		default: '',
		required: 'Please fill the quantity for the order',
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

mongoose.model('OrderRegistrationRoot', OrderRegistrationRootSchema);
