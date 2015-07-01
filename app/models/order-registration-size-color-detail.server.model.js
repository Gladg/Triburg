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
	sLNo: {
		type: Number,
		default: '',
		required: 'Please fill Order serial number',
		trim: false
	},
	color: {
		type: String,
		default: '',
		required: 'Please fill color',
		trim: false
	},
	size: {
		type: Number,
		default: '',
		required: 'Please fill size',
		trim: false
	},
	quantity: {
		type: Number,
		default: '',
		required: 'Please fill quantity',
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


