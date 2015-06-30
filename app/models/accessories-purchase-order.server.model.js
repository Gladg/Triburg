'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Accessories purchase order Schema
 */
var AccessoriesPurchaseOrderSchema = new Schema({
	orderNo: {
		type: Number,
		required: 'Please fill Accessories purchase order no.',
		trim: true
	},
	
	styleNo: {
		type: Number,
		required: 'Please fill Accessories purchase style no.',
		trim: true
	},
	
	poDate: {
		type: Date,
		required: 'Please fill Accessories purchase order date',
		trim: true
	},
	
	poNo: {
		type: Number,
		required: 'Please fill Accessories purchase order number',
		trim: true
	},
	
	orderQuantity: {
		type: Number,
		required: 'Please fill Accessories purchase order quantity',
		trim: true
	},
	
	supplier: {
		type: String,
		default: '',
		required: 'Please fill Accessories supplier name',
		trim: true
	},
	
	specialNote: {
		type: String,
		default: '',
		trim: true
	},
	slNo: {
		type: Number,
		required: 'Please fill Accessories purchase serial no.',
		trim: true
	},
	itemName: {
		type: String,
		default: '',
		required: 'Please fill Accessories purchase item name',
		trim: true
	},
	uom: {
		type: String,
		default: '',
		required: 'Please fill item unit of measurement',
		trim: true
	},
	units: {
		type: Number,
		required: 'Please fill no. of units',
		trim: true
	},
	requiredDate: {
		type: Date,
		required: 'Please fill item require date',
		trim: true
	},
	remarks: {
		type: String,
		default: '',
		required: 'Please fill any additional remarks if needed!',
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

mongoose.model('AccessoriesPurchaseOrder', AccessoriesPurchaseOrderSchema);