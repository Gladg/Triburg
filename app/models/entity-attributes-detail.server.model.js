'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Entity attributes detail Schema
 */
var EntityAttributesDetailSchema = new Schema({
	attributename: {
		type: String,
		default: '',
		required: 'Please fill Entity attributes name',
		trim: true
	},
	attributevalue: {
		type: String,
		default: '',
		required: 'Please fill Entity attributes value',
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

mongoose.model('EntityAttributesDetail', EntityAttributesDetailSchema);