'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	OrderRegistrationAccessoryDetail = mongoose.model('OrderRegistrationAccessoryDetail'),
	_ = require('lodash');

/**
 * Create a Order registration accessory detail
 */
exports.create = function(req, res) {
	var orderRegistrationAccessoryDetail = new OrderRegistrationAccessoryDetail(req.body);
	orderRegistrationAccessoryDetail.user = req.user;

	orderRegistrationAccessoryDetail.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(orderRegistrationAccessoryDetail);
		}
	});
};

/**
 * Show the current Order registration accessory detail
 */
exports.read = function(req, res) {
	res.jsonp(req.orderRegistrationAccessoryDetail);
};

/**
 * Update a Order registration accessory detail
 */
exports.update = function(req, res) {
	var orderRegistrationAccessoryDetail = req.orderRegistrationAccessoryDetail ;

	orderRegistrationAccessoryDetail = _.extend(orderRegistrationAccessoryDetail , req.body);

	orderRegistrationAccessoryDetail.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(orderRegistrationAccessoryDetail);
		}
	});
};

/**
 * Delete an Order registration accessory detail
 */
exports.delete = function(req, res) {
	var orderRegistrationAccessoryDetail = req.orderRegistrationAccessoryDetail ;

	orderRegistrationAccessoryDetail.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(orderRegistrationAccessoryDetail);
		}
	});
};

/**
 * List of Order registration accessory details
 */
exports.list = function(req, res) { 
	OrderRegistrationAccessoryDetail.find().sort('-created').populate('user', 'displayName').exec(function(err, orderRegistrationAccessoryDetails) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(orderRegistrationAccessoryDetails);
		}
	});
};

/**
 * Order registration accessory detail middleware
 */
exports.orderRegistrationAccessoryDetailByID = function(req, res, next, id) { 
	OrderRegistrationAccessoryDetail.findById(id).populate('user', 'displayName').exec(function(err, orderRegistrationAccessoryDetail) {
		if (err) return next(err);
		if (! orderRegistrationAccessoryDetail) return next(new Error('Failed to load Order registration accessory detail ' + id));
		req.orderRegistrationAccessoryDetail = orderRegistrationAccessoryDetail ;
		next();
	});
};

/**
 * Order registration accessory detail authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.orderRegistrationAccessoryDetail.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
