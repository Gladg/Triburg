'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	OrderRegistrationMeasurementDetail = mongoose.model('OrderRegistrationMeasurementDetail'),
	_ = require('lodash');

/**
 * Create a Order registration measurement detail
 */
exports.create = function(req, res) {
	var orderRegistrationMeasurementDetail = new OrderRegistrationMeasurementDetail(req.body);
	orderRegistrationMeasurementDetail.user = req.user;

	orderRegistrationMeasurementDetail.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(orderRegistrationMeasurementDetail);
		}
	});
};

/**
 * Show the current Order registration measurement detail
 */
exports.read = function(req, res) {
	res.jsonp(req.orderRegistrationMeasurementDetail);
};

/**
 * Update a Order registration measurement detail
 */
exports.update = function(req, res) {
	var orderRegistrationMeasurementDetail = req.orderRegistrationMeasurementDetail ;

	orderRegistrationMeasurementDetail = _.extend(orderRegistrationMeasurementDetail , req.body);

	orderRegistrationMeasurementDetail.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(orderRegistrationMeasurementDetail);
		}
	});
};

/**
 * Delete an Order registration measurement detail
 */
exports.delete = function(req, res) {
	var orderRegistrationMeasurementDetail = req.orderRegistrationMeasurementDetail ;

	orderRegistrationMeasurementDetail.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(orderRegistrationMeasurementDetail);
		}
	});
};

/**
 * List of Order registration measurement details
 */
exports.list = function(req, res) { 
	OrderRegistrationMeasurementDetail.find().sort('-created').populate('user', 'displayName').exec(function(err, orderRegistrationMeasurementDetails) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(orderRegistrationMeasurementDetails);
		}
	});
};

/**
 * Order registration measurement detail middleware
 */
exports.orderRegistrationMeasurementDetailByID = function(req, res, next, id) { 
	OrderRegistrationMeasurementDetail.findById(id).populate('user', 'displayName').exec(function(err, orderRegistrationMeasurementDetail) {
		if (err) return next(err);
		if (! orderRegistrationMeasurementDetail) return next(new Error('Failed to load Order registration measurement detail ' + id));
		req.orderRegistrationMeasurementDetail = orderRegistrationMeasurementDetail ;
		next();
	});
};

/**
 * Order registration measurement detail authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.orderRegistrationMeasurementDetail.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
