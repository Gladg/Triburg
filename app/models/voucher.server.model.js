'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Voucher Schema
 */
var VoucherSchema = new Schema({
	voucherNo: {
		type: Number,   
		default: '000000',
		required: 'Please fill voucher number',
		trim: false
	},
	voucherDate: {
		type: Date,   
		default: '',
		required: 'Please fill voucher date',
		trim: false
	},
	narration: {
		type: String,   
		default: '',
		required: 'Please fill narration',
		trim: true
	},
	activityName: {
		type: String,   
		default: '',
		required: 'Please fill activity name',
		trim: true
	},
	debit: {
		type: Number,   
		default: '',
		required: 'Please fill voucher debit',
		trim: false
	},
	credit: {
		type: Number,   
		default: '',
		required: 'Please fill voucher credit',
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

mongoose.model('Voucher', VoucherSchema);