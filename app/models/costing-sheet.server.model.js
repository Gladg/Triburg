'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Costing sheet Schema
 */
var CostingSheetSchema = new Schema({
	orderNo: {
		type: Number,
		default: '',
		required: 'Please fill Costing sheet order number',
		trim: false
	},
	styleNo: {
		type: Number,
		default: '',
		required: 'Please fill Costing sheet style number',
		trim: false
	},
	description: {
		type: String,
		default: '',
		required: 'Please fill Costing sheet description',
		trim: true
	},
	deliverydate: {
		type: Date,
		default: '',
		required: 'Please fill Costing sheet delivery date',
		trim: false
	},
	gSM: {
		type: Number,
		default: '',
		required: 'Please fill Costing sheet gSM',
		trim: false
	},
	yarnCount: {
		type: Number,
		default: '',
		required: 'Please fill Costing sheet yarn count',
		trim: false
	},
	orderQuantity: {
		type: Number,
		default: '',
		required: 'Please fill Costing sheet order quantity',
		trim: false
	},
	buyerName: {
		type: String,
		default: '',
		required: 'Please fill order buyer name',
		trim: true
	},
	sLNo: {
		type: Number,
		default: '',
		required: 'Please fill Costing sheet serial number',
		trim: false
	},
	itemName: {
		type: String,
		default: '',
		required: 'Please fill Costing sheet item name',
		trim: true
	},
	uoM: {
		type: String,
		default: '',
		required: 'Please fill Costing sheet units of measurement',
		trim: false
	},
	units: {
		type: Number,
		default: '',
		required: 'Please fill Costing sheet units',
		trim: false
	},
	unitCost1: {
		type: Number,
		default: '',
		required: 'Please fill first unit cost',
		trim: false
	},
	unitCost2: {
		type: Number,
		default: '',
		required: 'Please fill second unit cost',
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

mongoose.model('CostingSheet', CostingSheetSchema);
