'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Order registration accessory detail Schema
 */
var OrderRegistrationAccessoryDetailSchema = new Schema({
	accessoryTRIMSName: {
		type: String,
		default: '',
		required: 'Please fill Order registration accessory-trimsname',
		trim: false
	},
	uoM: {
		type: String,
		default: '',
		required: 'Please fill Order registration accessory unit of measurement',
		trim: false
	},
	units: {
		type: Number,
		default: '',
		required: 'Please fill Order registration accessory units',
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

mongoose.model('OrderRegistrationAccessoryDetail', OrderRegistrationAccessoryDetailSchema);

