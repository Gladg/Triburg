'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	OrderPlanning = mongoose.model('OrderPlanning'),
	_ = require('lodash');

/**
 * Create a Order planning
 */
exports.create = function(req, res) {
	var orderPlanning = new OrderPlanning(req.body);
	orderPlanning.user = req.user;

	orderPlanning.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(orderPlanning);
		}
	});
};

/**
 * Show the current Order planning
 */
exports.read = function(req, res) {
	res.jsonp(req.orderPlanning);
};

/**
 * Update a Order planning
 */
exports.update = function(req, res) {
	var orderPlanning = req.orderPlanning ;

	orderPlanning = _.extend(orderPlanning , req.body);

	orderPlanning.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(orderPlanning);
		}
	});
};

/**
 * Delete an Order planning
 */
exports.delete = function(req, res) {
	var orderPlanning = req.orderPlanning ;

	orderPlanning.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(orderPlanning);
		}
	});
};

/**
 * List of Order plannings
 */
exports.list = function(req, res) { 
	OrderPlanning.find().sort('-created').populate('user', 'displayName').exec(function(err, orderPlannings) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(orderPlannings);
		}
	});
};

/**
 * Order planning middleware
 */
exports.orderPlanningByID = function(req, res, next, id) { 
	OrderPlanning.findById(id).populate('user', 'displayName').exec(function(err, orderPlanning) {
		if (err) return next(err);
		if (! orderPlanning) return next(new Error('Failed to load Order planning ' + id));
		req.orderPlanning = orderPlanning ;
		next();
	});
};

/**
 * Order planning authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.orderPlanning.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
