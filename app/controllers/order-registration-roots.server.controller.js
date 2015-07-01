'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	OrderRegistrationRoot = mongoose.model('OrderRegistrationRoot'),
	_ = require('lodash');

/**
 * Create a Order registration root
 */
exports.create = function(req, res) {
	var orderRegistrationRoot = new OrderRegistrationRoot(req.body);
	orderRegistrationRoot.user = req.user;

	orderRegistrationRoot.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(orderRegistrationRoot);
		}
	});
};

/**
 * Show the current Order registration root
 */
exports.read = function(req, res) {
	res.jsonp(req.orderRegistrationRoot);
};

/**
 * Update a Order registration root
 */
exports.update = function(req, res) {
	var orderRegistrationRoot = req.orderRegistrationRoot ;

	orderRegistrationRoot = _.extend(orderRegistrationRoot , req.body);

	orderRegistrationRoot.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(orderRegistrationRoot);
		}
	});
};

/**
 * Delete an Order registration root
 */
exports.delete = function(req, res) {
	var orderRegistrationRoot = req.orderRegistrationRoot ;

	orderRegistrationRoot.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(orderRegistrationRoot);
		}
	});
};

/**
 * List of Order registration roots
 */
exports.list = function(req, res) { 
	OrderRegistrationRoot.find().sort('-created').populate('user', 'displayName').exec(function(err, orderRegistrationRoots) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(orderRegistrationRoots);
		}
	});
};

/**
 * Order registration root middleware
 */
exports.orderRegistrationRootByID = function(req, res, next, id) { 
	OrderRegistrationRoot.findById(id).populate('user', 'displayName').exec(function(err, orderRegistrationRoot) {
		if (err) return next(err);
		if (! orderRegistrationRoot) return next(new Error('Failed to load Order registration root ' + id));
		req.orderRegistrationRoot = orderRegistrationRoot ;
		next();
	});
};

/**
 * Order registration root authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.orderRegistrationRoot.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
