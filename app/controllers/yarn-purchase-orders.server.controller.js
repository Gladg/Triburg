'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	YarnPurchaseOrder = mongoose.model('YarnPurchaseOrder'),
	_ = require('lodash');

/**
 * Create a Yarn purchase order
 */
exports.create = function(req, res) {
	var yarnPurchaseOrder = new YarnPurchaseOrder(req.body);
	yarnPurchaseOrder.user = req.user;

	yarnPurchaseOrder.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(yarnPurchaseOrder);
		}
	});
};

/**
 * Show the current Yarn purchase order
 */
exports.read = function(req, res) {
	res.jsonp(req.yarnPurchaseOrder);
};

/**
 * Update a Yarn purchase order
 */
exports.update = function(req, res) {
	var yarnPurchaseOrder = req.yarnPurchaseOrder ;

	yarnPurchaseOrder = _.extend(yarnPurchaseOrder , req.body);

	yarnPurchaseOrder.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(yarnPurchaseOrder);
		}
	});
};

/**
 * Delete an Yarn purchase order
 */
exports.delete = function(req, res) {
	var yarnPurchaseOrder = req.yarnPurchaseOrder ;

	yarnPurchaseOrder.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(yarnPurchaseOrder);
		}
	});
};

/**
 * List of Yarn purchase orders
 */
exports.list = function(req, res) { 
	YarnPurchaseOrder.find().sort('-created').populate('user', 'displayName').exec(function(err, yarnPurchaseOrders) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(yarnPurchaseOrders);
		}
	});
};

/**
 * Yarn purchase order middleware
 */
exports.yarnPurchaseOrderByID = function(req, res, next, id) { 
	YarnPurchaseOrder.findById(id).populate('user', 'displayName').exec(function(err, yarnPurchaseOrder) {
		if (err) return next(err);
		if (! yarnPurchaseOrder) return next(new Error('Failed to load Yarn purchase order ' + id));
		req.yarnPurchaseOrder = yarnPurchaseOrder ;
		next();
	});
};

/**
 * Yarn purchase order authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.yarnPurchaseOrder.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
