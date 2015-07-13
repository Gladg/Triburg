'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Machinery equipment list Schema
 */
var MachineryEquipmentListSchema = new Schema({
	sLNo: {
		type: Number,
		default: '',
		required: 'Please fill Machinery equipment list serial number',
		trim: false
	},
	machineName: {
		type: String,
		default: '',
		required: 'Please fill Machinery equipment list machine name',
		trim: true
	},
	machineCode: {
		type: String,
		default: '',
		required: 'Please fill Machinery equipment machine code',
		trim: false
	},
	machineNo: {
		type: Number,
		default: '',
		required: 'Please fill Machinery equipment machine number',
		trim: false
	},
	modelNo: {
		type: Number,
		default: '',
		required: 'Please fill Machinery equipment machine model number',
		trim: false
	},
	manufacturerName: {
		type: String,
		default: '',
		required: 'Please fill Machinery equipment manufacturer name',
		trim: true
	},
	capacity: {
		type: Number,
		default: '',
		required: 'Please fill Machinery equipment machine capacity',
		trim: false
	},
	application: {
		type: String,
		default: '',
		required: 'Please fill Machinery equipment machine application',
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

mongoose.model('MachineryEquipmentList', MachineryEquipmentListSchema);
