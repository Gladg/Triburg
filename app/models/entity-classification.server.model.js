'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Entity classification Schema
 */
var EntityClassificationSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Entity classification name',
		trim: true
	},
	code: {
		type: String,
		default: '',
		required: 'Please fill Entity classification code',
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

mongoose.model('EntityClassification', EntityClassificationSchema);