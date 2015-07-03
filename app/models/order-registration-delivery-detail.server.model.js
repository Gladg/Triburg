'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Order registration delivery detail Schema
 */
var OrderRegistrationDeliveryDetailSchema = new Schema({
	sLNo: {
		type: Number,
		default: '',
		required: 'Please fill serial number',
		trim: false
	},
	deliveryDate: {
		type: Date,
		default: '',
		required: 'Please fill Order registration delivery detail date',
		trim: false
	},
	quantity: {
		type: Number,
		default: '',
		required: 'Please fill Order registration delivery detail quantity',
		trim: false
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

mongoose.model('OrderRegistrationDeliveryDetail', OrderRegistrationDeliveryDetailSchema);