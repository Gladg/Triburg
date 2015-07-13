'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Goods received note Schema
 */
var GoodsReceivedNoteSchema = new Schema({
	orderNo: {
		type: Number,
		default: '',
		required: 'Please fill Goods received order number',
		trim: false
	},
	styleNo: {
		type: Number,
		default: '',
		required: 'Please fill Goods received style number',
		trim: false
	},
	party: {
		type: String,
		default: '',
		required: 'Please fill Goods received party name',
		trim: true
	},
	dCNo: {
		type: Number,
		default: '',
		required: 'Please fill Goods received delivery challan number',
		trim: false
	},
	dCDate: {
		type: Date,
		default: '',
		required: 'Please fill Goods received delivery challan date',
		trim: false
	},
	sLNo: {
		type: Number,
		default: '',
		required: 'Please fill Goods received serial number',
		trim: false
	},
	refNo: {
		type: Number,
		default: '',
		required: 'Please fill Goods received reference number',
		trim: false
	},
	itemName: {
		type: String,
		default: '',
		required: 'Please fill Goods received item name',
		trim: true
	},
	uoM: {
		type: String,
		default: '',
		required: 'Please fill Goods received units of measurement',
		trim: false
	},
	units: {
		type: Number,
		default: '',
		required: 'Please fill Goods received number of units',
		trim: false
	},
	uoM2: {
		type: String,
		default: '',
		required: 'Please fill Goods received second units of measurement',
		trim: false
	},
	units2: {
		type: Number,
		default: '',
		required: 'Please fill Goods received second number of units units',
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

mongoose.model('GoodsReceivedNote', GoodsReceivedNoteSchema);