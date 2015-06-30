'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	AccessoriesPurchaseOrder = mongoose.model('AccessoriesPurchaseOrder'),
	_ = require('lodash');

/**
 * Create a Accessories purchase order
 */
exports.create = function(req, res) {
	var accessoriesPurchaseOrder = new AccessoriesPurchaseOrder(req.body);
	accessoriesPurchaseOrder.user = req.user;

	accessoriesPurchaseOrder.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(accessoriesPurchaseOrder);
		}
	});
};

/**
 * Show the current Accessories purchase order
 */
exports.read = function(req, res) {
	res.jsonp(req.accessoriesPurchaseOrder);
};

/**
 * Update a Accessories purchase order
 */
exports.update = function(req, res) {
	var accessoriesPurchaseOrder = req.accessoriesPurchaseOrder ;

	accessoriesPurchaseOrder = _.extend(accessoriesPurchaseOrder , req.body);

	accessoriesPurchaseOrder.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(accessoriesPurchaseOrder);
		}
	});
};

/**
 * Delete an Accessories purchase order
 */
exports.delete = function(req, res) {
	var accessoriesPurchaseOrder = req.accessoriesPurchaseOrder ;

	accessoriesPurchaseOrder.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(accessoriesPurchaseOrder);
		}
	});
};

/**
 * List of Accessories purchase orders
 */
exports.list = function(req, res) { 
	AccessoriesPurchaseOrder.find().sort('-created').populate('user', 'displayName').exec(function(err, accessoriesPurchaseOrders) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(accessoriesPurchaseOrders);
		}
	});
};

/**
 * Accessories purchase order middleware
 */
exports.accessoriesPurchaseOrderByID = function(req, res, next, id) { 
	AccessoriesPurchaseOrder.findById(id).populate('user', 'displayName').exec(function(err, accessoriesPurchaseOrder) {
		if (err) return next(err);
		if (! accessoriesPurchaseOrder) return next(new Error('Failed to load Accessories purchase order ' + id));
		req.accessoriesPurchaseOrder = accessoriesPurchaseOrder ;
		next();
	});
};

/**
 * Accessories purchase order authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.accessoriesPurchaseOrder.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
