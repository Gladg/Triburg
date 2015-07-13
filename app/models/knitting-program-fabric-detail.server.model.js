'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Knitting program fabric detail Schema
 */
var KnittingProgramFabricDetailSchema = new Schema({
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
		type: Number,
		default: '',
		required: 'Please fill Knitting program gauge',
		trim: false
	},
	gREYGSM: {
		type: Number,
		default: '',
		required: 'Please fill Knitting program grey GSM',
		trim: false
	},
	gREYTexture: {
		type: String,
		default: '',
		required: 'Please fill Knitting program grey texture',
		trim: false
	},
	dia: {
		type: Number,
		default: '',
		required: 'Please fill diameter',
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

mongoose.model('KnittingProgramFabricDetail', KnittingProgramFabricDetailSchema);