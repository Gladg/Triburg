'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	CostingSheet = mongoose.model('CostingSheet'),
	_ = require('lodash');

/**
 * Create a Costing sheet
 */
exports.create = function(req, res) {
	var costingSheet = new CostingSheet(req.body);
	costingSheet.user = req.user;

	costingSheet.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(costingSheet);
		}
	});
};

/**
 * Show the current Costing sheet
 */
exports.read = function(req, res) {
	res.jsonp(req.costingSheet);
};

/**
 * Update a Costing sheet
 */
exports.update = function(req, res) {
	var costingSheet = req.costingSheet ;

	costingSheet = _.extend(costingSheet , req.body);

	costingSheet.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(costingSheet);
		}
	});
};

/**
 * Delete an Costing sheet
 */
exports.delete = function(req, res) {
	var costingSheet = req.costingSheet ;

	costingSheet.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(costingSheet);
		}
	});
};

/**
 * List of Costing sheets
 */
exports.list = function(req, res) { 
	CostingSheet.find().sort('-created').populate('user', 'displayName').exec(function(err, costingSheets) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(costingSheets);
		}
	});
};

/**
 * Costing sheet middleware
 */
exports.costingSheetByID = function(req, res, next, id) { 
	CostingSheet.findById(id).populate('user', 'displayName').exec(function(err, costingSheet) {
		if (err) return next(err);
		if (! costingSheet) return next(new Error('Failed to load Costing sheet ' + id));
		req.costingSheet = costingSheet ;
		next();
	});
};

/**
 * Costing sheet authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.costingSheet.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
