'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Knitting program Schema
 */
var KnittingProgramSchema = new Schema({
	orderNo: {
		type: Number,
		default: '',
		required: 'Please fill Knitting program order number',
		trim: false
	},
	styleNo: {
		type: Number,
		default: '',
		required: 'Please fill Knitting program style number',
		trim: false
	},
	workOrderNo: {
		type: Number,
		default: '',
		required: 'Please fill Knitting program work order number',
		trim: false
	},
	workOrderDate: {
		type: Date,
		default: '',
		required: 'Please fill Knitting program work order number',
		trim: false
	},
	party: {
		type: String,
		default: '',
		required: 'Please fill Knitting program party name',
		trim: true
	},
	requiredDate: {
		type: Date,
		default: '',
		required: 'Please fill Knitting program required date',
		trim: false
	},
	remarks: {
		type: String,
		default: '',
		required: 'Please fill relevant remarks',
		trim: true
	},
	sLNo: {
		type: Number,
		default: '',
		required: 'Please fill Knitting program serial number',
		trim: false
	},
	fabricType: {
		type: String,
		default: '',
		required: 'Please fill Knitting program fabric type',
		trim: false
	},
	gauge: {
		type: String,
		default: '',
		required: 'Please fill Knitting program name',
		trim: true
	},
	gREYGSM: {
		type: String,
		default: '',
		required: 'Please fill Knitting program name',
		trim: true
	},
	gREYTexture: {
		type: String,
		default: '',
		required: 'Please fill Knitting program name',
		trim: true
	},
	dia: {
		type: String,
		default: '',
		required: 'Please fill Knitting program name',
		trim: true
	},
	weight: {
		type: Number,
		default: '',
		required: 'Please fill Knitting program weight',
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

mongoose.model('KnittingProgram', KnittingProgramSchema);


orderNo
styleNo
workOrderNo
workOrderDate
party
requiredDate
remarks
sLNo
fabricType
gauge
gREYGSM
gREYTexture
dia
weight(Kgs)



	weight: {
		type: String,
		default: '',
		required: 'Please fill Knitting program name',
		trim: true
	},