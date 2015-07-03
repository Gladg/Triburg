'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Entity root Schema
 */
var EntityRootSchema = new Schema({
	code: {
		type: String,
		default: '',
		required: 'Please fill Entity root code',
		trim: false
	},
	name: {
		type: String,
		default: '',
		required: 'Please fill Entity root name',
		trim: false
	},
	contactName: {
		type: String,
		default: '',
		required: 'Please fill Entity root contact name',
		trim: true
	},
	addressline1: {
		type: String,
		default: '',
		required: 'Please fill Entity root address line 1',
		trim: true
	},
	addressline2: {
		type: String,
		default: '',
		required: 'Please fill Entity root address line 2',
		trim: true
	},
	city: {
		type: String,
		default: '',
		required: 'Please fill Entity root city',
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

mongoose.model('EntityRoot', EntityRootSchema);