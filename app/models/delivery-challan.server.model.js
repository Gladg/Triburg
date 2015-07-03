'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Delivery challan Schema
 */
var DeliveryChallanSchema = new Schema({
	orderNo: {
		type: Number,
		default: '',
		required: 'Please fill Delivery challan order number',
		trim: false
	},
	styleNo: {
		type: Number,
		default: '',
		required: 'Please fill Delivery challan style number',
		trim: false
	},
	party: {
		type: String,
		default: '',
		required: 'Please fill Delivery challan party name',
		trim: true
	},
	dCNo: {
		type: Number,
		default: '',
		required: 'Please fill Delivery challan number',
		trim: false
	},
	dCDate: {
		type: Date,
		default: '',
		required: 'Please fill Delivery challan date',
		trim: false
	},
	sLNo: {
		type: Number,
		default: '',
		required: 'Please fill Delivery challan serial number',
		trim: false
	},
	refNo: {
		type: Number,
		default: '',
		required: 'Please fill Delivery challan reference number',
		trim: false
	},
	itemName: {
		type: String,
		default: '',
		required: 'Please fill Delivery challan item name',
		trim: true
	},
	uoM: {
		type: String,
		default: '',
		required: 'Please fill Delivery challan unit of measurement',
		trim: false
	},
	units: {
		type: Number,
		default: '',
		required: 'Please fill Delivery challan units',
		trim: false
	},
	uoM2: {
		type: String,
		default: '',
		required: 'Please fill Delivery challan unit of measurement2',
		trim: false
	},
	units2: {
		type: Number,
		default: '',
		required: 'Please fill Delivery challan units2',
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

mongoose.model('DeliveryChallan', DeliveryChallanSchema);

