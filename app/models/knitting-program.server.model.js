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