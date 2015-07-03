'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Order enquiry form Schema
 */
var OrderEnquiryFormSchema = new Schema({
	enquiryNo: {
		type: Number,
		default: '',
		required: 'Please fill Order enquiry number',
		trim: false
	},
	enquiryDate: {
		type: Date,
		default: '',
		required: 'Please fill Order enquiry date',
		trim: false
	},
	buyerName: {
		type: String,
		default: '',
		required: 'Please fill Order enquiry buyer name',
		trim: true
	},
	styleName: {
		type: String,
		default: '',
		required: 'Please fill Order enquiry style name',
		trim: true
	},
	styleNo: {
		type: Number,
		default: '',
		required: 'Please fill Order enquiry style number',
		trim: false
	},
	orderQuantity: {
		type: Number,
		default: '',
		required: 'Please fill Order quantity',
		trim: false
	},
	samplingRequiredQty: {
		type: Number,
		default: '',
		required: 'Please fill sampling required quantity',
		trim: false
	},
	costingRequiredDate: {
		type: Date,
		default: '',
		required: 'Please fill costing required date',
		trim: false
	},
	samplingRequiredDate: {
		type: Date,
		default: '',
		required: 'Please fill sampling required date',
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

mongoose.model('OrderEnquiryForm', OrderEnquiryFormSchema);