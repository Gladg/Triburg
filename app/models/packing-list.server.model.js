'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Packing list Schema
 */
var PackingListSchema = new Schema({
	orderNo: {
		type: Number,
		default: '',
		required: 'Please fill Packing list order number',
		trim: false
	},
	styleNo: {
		type: Number,
		default: '',
		required: 'Please fill Packing list style number',
		trim: false
	},
	description: {
		type: String,
		default: '',
		required: 'Please fill Packing list description',
		trim: true
	},
	buyerName: {
		type: String,
		default: '',
		required: 'Please fill buyer name',
		trim: true
	},
	packingListNo: {
		type: Number,
		default: '',
		required: 'Please fill Packing list number',
		trim: false
	},
	packingListDate: {
		type: Date,
		default: '',
		required: 'Please fill Packing list date',
		trim: false
	},
 	asLNo: {
		type: Number,
		default: '',
		required: 'Please fill assortment serial number',
		trim: false
	},
	abundleDescription: {
		type: String,
		default: '',
		required: 'Please fill bundle description',
		trim: true
	},
	asize: {
		type: Number,
		default: '',
		required: 'Please fill Packing list bundle size',
		trim: false
	},
	acolor: {
		type: String,
		default: '',
		required: 'Please fill Packing list bundle color',
		trim: false
	},
	apcs: {
		type: Number,
		default: '',
		required: 'Please fill Packing list bundle pieces number',
		trim: false
	},
 	CsLNo: {
		type: Number,
		default: '',
		required: 'Please fill carton serial number',
		trim: false
	},
	ccartonNo: {
		type: Number,
		default: '',
		required: 'Please fill Packing list carton number',
		trim: false
	},
	ccolor: {
		type: String,
		default: '',
		required: 'Please fill Packing list carton color',
		trim: false
	},
	csize: {
		type: Number,
		default: '',
		required: 'Please fill Packing list carton size',
		trim: false
	},
	cuoM: {
		type: String,
		default: '',
		required: 'Please fill Packing list unit of measurement',
		trim: false
	},
	cunits: {
		type: Number,
		default: '',
		required: 'Please fill Packing list units',
		trim: false
	},
	cnetWt: {
		type: Number,
		default: '',
		required: 'Please fill Packing list net weight',
		trim: false
	},
	cgrsWt: {
		type: Number,
		default: '',
		required: 'Please fill Packing list gross weight',
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

mongoose.model('PackingList', PackingListSchema);