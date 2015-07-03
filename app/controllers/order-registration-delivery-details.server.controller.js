'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	OrderRegistrationDeliveryDetail = mongoose.model('OrderRegistrationDeliveryDetail'),
	_ = require('lodash');

/**
 * Create a Order registration delivery detail
 */
exports.create = function(req, res) {
	var orderRegistrationDeliveryDetail = new OrderRegistrationDeliveryDetail(req.body);
	orderRegistrationDeliveryDetail.user = req.user;

	orderRegistrationDeliveryDetail.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(orderRegistrationDeliveryDetail);
		}
	});
};

/**
 * Show the current Order registration delivery detail
 */
exports.read = function(req, res) {
	res.jsonp(req.orderRegistrationDeliveryDetail);
};

/**
 * Update a Order registration delivery detail
 */
exports.update = function(req, res) {
	var orderRegistrationDeliveryDetail = req.orderRegistrationDeliveryDetail ;

	orderRegistrationDeliveryDetail = _.extend(orderRegistrationDeliveryDetail , req.body);

	orderRegistrationDeliveryDetail.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(orderRegistrationDeliveryDetail);
		}
	});
};

/**
 * Delete an Order registration delivery detail
 */
exports.delete = function(req, res) {
	var orderRegistrationDeliveryDetail = req.orderRegistrationDeliveryDetail ;

	orderRegistrationDeliveryDetail.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(orderRegistrationDeliveryDetail);
		}
	});
};

/**
 * List of Order registration delivery details
 */
exports.list = function(req, res) { 
	OrderRegistrationDeliveryDetail.find().sort('-created').populate('user', 'displayName').exec(function(err, orderRegistrationDeliveryDetails) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(orderRegistrationDeliveryDetails);
		}
	});
};

/**
 * Order registration delivery detail middleware
 */
exports.orderRegistrationDeliveryDetailByID = function(req, res, next, id) { 
	OrderRegistrationDeliveryDetail.findById(id).populate('user', 'displayName').exec(function(err, orderRegistrationDeliveryDetail) {
		if (err) return next(err);
		if (! orderRegistrationDeliveryDetail) return next(new Error('Failed to load Order registration delivery detail ' + id));
		req.orderRegistrationDeliveryDetail = orderRegistrationDeliveryDetail ;
		next();
	});
};

/**
 * Order registration delivery detail authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.orderRegistrationDeliveryDetail.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
