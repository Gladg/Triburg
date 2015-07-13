'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	OrderPlanningOperationDetail = mongoose.model('OrderPlanningOperationDetail'),
	_ = require('lodash');

/**
 * Create a Order planning operation detail
 */
exports.create = function(req, res) {
	var orderPlanningOperationDetail = new OrderPlanningOperationDetail(req.body);
	orderPlanningOperationDetail.user = req.user;

	orderPlanningOperationDetail.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(orderPlanningOperationDetail);
		}
	});
};

/**
 * Show the current Order planning operation detail
 */
exports.read = function(req, res) {
	res.jsonp(req.orderPlanningOperationDetail);
};

/**
 * Update a Order planning operation detail
 */
exports.update = function(req, res) {
	var orderPlanningOperationDetail = req.orderPlanningOperationDetail ;

	orderPlanningOperationDetail = _.extend(orderPlanningOperationDetail , req.body);

	orderPlanningOperationDetail.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(orderPlanningOperationDetail);
		}
	});
};

/**
 * Delete an Order planning operation detail
 */
exports.delete = function(req, res) {
	var orderPlanningOperationDetail = req.orderPlanningOperationDetail ;

	orderPlanningOperationDetail.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(orderPlanningOperationDetail);
		}
	});
};

/**
 * List of Order planning operation details
 */
exports.list = function(req, res) { 
	OrderPlanningOperationDetail.find().sort('-created').populate('user', 'displayName').exec(function(err, orderPlanningOperationDetails) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(orderPlanningOperationDetails);
		}
	});
};

/**
 * Order planning operation detail middleware
 */
exports.orderPlanningOperationDetailByID = function(req, res, next, id) { 
	OrderPlanningOperationDetail.findById(id).populate('user', 'displayName').exec(function(err, orderPlanningOperationDetail) {
		if (err) return next(err);
		if (! orderPlanningOperationDetail) return next(new Error('Failed to load Order planning operation detail ' + id));
		req.orderPlanningOperationDetail = orderPlanningOperationDetail ;
		next();
	});
};

/**
 * Order planning operation detail authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.orderPlanningOperationDetail.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
