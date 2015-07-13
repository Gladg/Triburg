'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Yarn purchase order Schema
 */
var YarnPurchaseOrderSchema = new Schema({
	orderNo: {
		type: Number,
		default: '',
		required: 'Please fill order number',
		trim: false
	},
	styleNo: {
		type: Number,
		default: '',
		required: 'Please fill style number',
		trim: false
	},
	supplier: {
		type: String,
		default: '',
		required: 'Please fill Yarn purchase order supplier name',
		trim: true
	},
	pONo: {
		type: Number,
		default: '',
		required: 'Please fill Yarn purchase order number',
		trim: false
	},
	pODate: {
		type: Date,
		default: '',
		required: 'Please fill Yarn purchase order date',
		trim: false
	},
	deliveryDate: {
		type: Date,
		default: '',
		required: 'Please fill delivery date',
		trim: false
	},
	payment: {
		type: Number,
		default: '',
		required: 'Please fill payment details',
		trim: false
	},
	specialNote: {
		type: String,
		default: '',
		required: 'Please fill required special note',
		trim: true
	},
	sLNo: {
		type: Number,
		default: '',
		required: 'Please fill Yarn purchase order serial number',
		trim: false
	},
	yarnDescription: {
		type: String,
		default: '',
		required: 'Please fill Yarn purchase description',
		trim: true
	},
	count: {
		type: Number,
		default: '',
		required: 'Please fill Yarn purchase order count',
		trim: false
	},
	color: {
		type: String,
		default: '',
		required: 'Please fill Yarn purchase order color',
		trim: false
	},
	quantity: {
		type: Number,
		default: '',
		required: 'Please fill Yarn purchase order quantity',
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

mongoose.model('YarnPurchaseOrder', YarnPurchaseOrderSchema);
