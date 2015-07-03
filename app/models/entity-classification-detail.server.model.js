'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Entity classification detail Schema
 */
var EntityClassificationDetailSchema = new Schema({
	classcode: {
		type: String,
		default: '',
		required: 'Please fill Entity class code',
		trim: false
	},
	classname: {
		type: String,
		default: '',
		required: 'Please fill Entity class name',
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

mongoose.model('EntityClassificationDetail', EntityClassificationDetailSchema);