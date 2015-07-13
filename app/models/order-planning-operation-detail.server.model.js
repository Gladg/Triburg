'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Order planning operation detail Schema
 */
var OrderPlanningOperationDetailSchema = new Schema({
	sLNo: {
		type: Number,
		default: '',
		required: 'Please fill Order planning activity serial number',
		trim: false
	},
	operationName: {
		type: String,
		default: '',
		required: 'Please fill Order planning operation name',
		trim: true
	},
	plannedStartDate: {
		type: Date,
		default: '',
		required: 'Please fill Order planning activity start date',
		trim: false
	},
	plannedEndDate: {
		type: Date,
		default: '',
		required: 'Please fill Order planning activity end date',
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

mongoose.model('OrderPlanningOperationDetail', OrderPlanningOperationDetailSchema);