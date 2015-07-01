'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Resource Schema
 */
var ResourceSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Resource name',
		trim: true
	},	
	code: {
		type: String,
		default: '',
		required: 'Please fill Resource code',
		trim: false
	},
	
	type: {
		type: String,
		default: '',
		required: 'Please fill Resource type',
		trim: false
	},
	dol: {
		type: Date,
		default: '',
		required: 'Please fill Resource date of leaving',
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

mongoose.model('Resource', ResourceSchema);