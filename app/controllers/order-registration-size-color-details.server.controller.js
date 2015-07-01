'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	OrderRegistrationSizeColorDetail = mongoose.model('OrderRegistrationSizeColorDetail'),
	_ = require('lodash');

/**
 * Create a Order registration size color detail
 */
exports.create = function(req, res) {
	var orderRegistrationSizeColorDetail = new OrderRegistrationSizeColorDetail(req.body);
	orderRegistrationSizeColorDetail.user = req.user;

	orderRegistrationSizeColorDetail.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(orderRegistrationSizeColorDetail);
		}
	});
};

/**
 * Show the current Order registration size color detail
 */
exports.read = function(req, res) {
	res.jsonp(req.orderRegistrationSizeColorDetail);
};

/**
 * Update a Order registration size color detail
 */
exports.update = function(req, res) {
	var orderRegistrationSizeColorDetail = req.orderRegistrationSizeColorDetail ;

	orderRegistrationSizeColorDetail = _.extend(orderRegistrationSizeColorDetail , req.body);

	orderRegistrationSizeColorDetail.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(orderRegistrationSizeColorDetail);
		}
	});
};

/**
 * Delete an Order registration size color detail
 */
exports.delete = function(req, res) {
	var orderRegistrationSizeColorDetail = req.orderRegistrationSizeColorDetail ;

	orderRegistrationSizeColorDetail.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(orderRegistrationSizeColorDetail);
		}
	});
};

/**
 * List of Order registration size color details
 */
exports.list = function(req, res) { 
	OrderRegistrationSizeColorDetail.find().sort('-created').populate('user', 'displayName').exec(function(err, orderRegistrationSizeColorDetails) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(orderRegistrationSizeColorDetails);
		}
	});
};

/**
 * Order registration size color detail middleware
 */
exports.orderRegistrationSizeColorDetailByID = function(req, res, next, id) { 
	OrderRegistrationSizeColorDetail.findById(id).populate('user', 'displayName').exec(function(err, orderRegistrationSizeColorDetail) {
		if (err) return next(err);
		if (! orderRegistrationSizeColorDetail) return next(new Error('Failed to load Order registration size color detail ' + id));
		req.orderRegistrationSizeColorDetail = orderRegistrationSizeColorDetail ;
		next();
	});
};

/**
 * Order registration size color detail authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.orderRegistrationSizeColorDetail.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
