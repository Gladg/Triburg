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
 	sLNo: {
		type: Number,
		default: '',
		required: 'Please fill assortment serial number',
		trim: false
	},
	bundleDescription: {
		type: String,
		default: '',
		required: 'Please fill bundle description',
		trim: true
	},
	size: {
		type: number,
		default: '',
		required: 'Please fill Packing list bundle size',
		trim: false
	},
	color: {
		type: String,
		default: '',
		required: 'Please fill Packing list bundle color',
		trim: false
	},
	pcs: {
		type: Number,
		default: '',
		required: 'Please fill Packing list bundle pieces number',
		trim: false
	},
 	sLNo1: {
		type: Number,
		default: '',
		required: 'Please fill carton serial number',
		trim: false
	},
	cartonNo: {
		type: Number,
		default: '',
		required: 'Please fill Packing list carton number',
		trim: false
	},
	color: {
		type: String,
		default: '',
		required: 'Please fill Packing list carton color',
		trim: false
	},
	size: {
		type: Number,
		default: '',
		required: 'Please fill Packing list carton size',
		trim: false
	},
	uoM: {
		type: String,
		default: '',
		required: 'Please fill Packing list unit of measurement',
		trim: false
	},
	units: {
		type: Number,
		default: '',
		required: 'Please fill Packing list units',
		trim: false
	},
	netWt: {
		type: Number,
		default: '',
		required: 'Please fill Packing list net weight',
		trim: false
	},
	grsWt: {
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


orderNo
styleNo
description
buyerName
packingListNo
packingListDate
sLNo
bundleDescription
size
color
pcs
sLNo1
cartonNo
color
size
uoM
units
netWt
grsWt



	name: {
		type: String,
		default: '',
		required: 'Please fill Packing list name',
		trim: true
	},
