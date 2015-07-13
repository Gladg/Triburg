'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	OrderPlanningActivityDetail = mongoose.model('OrderPlanningActivityDetail'),
	_ = require('lodash');

/**
 * Create a Order planning activity detail
 */
exports.create = function(req, res) {
	var orderPlanningActivityDetail = new OrderPlanningActivityDetail(req.body);
	orderPlanningActivityDetail.user = req.user;

	orderPlanningActivityDetail.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(orderPlanningActivityDetail);
		}
	});
};

/**
 * Show the current Order planning activity detail
 */
exports.read = function(req, res) {
	res.jsonp(req.orderPlanningActivityDetail);
};

/**
 * Update a Order planning activity detail
 */
exports.update = function(req, res) {
	var orderPlanningActivityDetail = req.orderPlanningActivityDetail ;

	orderPlanningActivityDetail = _.extend(orderPlanningActivityDetail , req.body);

	orderPlanningActivityDetail.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(orderPlanningActivityDetail);
		}
	});
};

/**
 * Delete an Order planning activity detail
 */
exports.delete = function(req, res) {
	var orderPlanningActivityDetail = req.orderPlanningActivityDetail ;

	orderPlanningActivityDetail.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(orderPlanningActivityDetail);
		}
	});
};

/**
 * List of Order planning activity details
 */
exports.list = function(req, res) { 
	OrderPlanningActivityDetail.find().sort('-created').populate('user', 'displayName').exec(function(err, orderPlanningActivityDetails) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(orderPlanningActivityDetails);
		}
	});
};

/**
 * Order planning activity detail middleware
 */
exports.orderPlanningActivityDetailByID = function(req, res, next, id) { 
	OrderPlanningActivityDetail.findById(id).populate('user', 'displayName').exec(function(err, orderPlanningActivityDetail) {
		if (err) return next(err);
		if (! orderPlanningActivityDetail) return next(new Error('Failed to load Order planning activity detail ' + id));
		req.orderPlanningActivityDetail = orderPlanningActivityDetail ;
		next();
	});
};

/**
 * Order planning activity detail authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.orderPlanningActivityDetail.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
