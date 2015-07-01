'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Item Schema
 */
var ItemSchema = new Schema({
	itemName: {
		type: String,
		default: '',
		required: 'Please fill Item name',
		trim: true
	},
	code: {
		type: String,
		default: '',
		required: 'Please fill code for the item',
		trim: true
	},
	category: {
		type: String,
		default: '',
		required: 'Please fill the category',
		trim: true
	},
	uoM: {
		type: String,
		default: '',
		required: 'Please fill unit of measurement',
		trim: true
	},
	price: {
		type: Number,
		default: '00',
		required: 'Please enter the price',
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

mongoose.model('Item', ItemSchema);