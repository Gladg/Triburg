'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	DeliveryChallan = mongoose.model('DeliveryChallan'),
	_ = require('lodash');

/**
 * Create a Delivery challan
 */
exports.create = function(req, res) {
	var deliveryChallan = new DeliveryChallan(req.body);
	deliveryChallan.user = req.user;

	deliveryChallan.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(deliveryChallan);
		}
	});
};

/**
 * Show the current Delivery challan
 */
exports.read = function(req, res) {
	res.jsonp(req.deliveryChallan);
};

/**
 * Update a Delivery challan
 */
exports.update = function(req, res) {
	var deliveryChallan = req.deliveryChallan ;

	deliveryChallan = _.extend(deliveryChallan , req.body);

	deliveryChallan.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(deliveryChallan);
		}
	});
};

/**
 * Delete an Delivery challan
 */
exports.delete = function(req, res) {
	var deliveryChallan = req.deliveryChallan ;

	deliveryChallan.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(deliveryChallan);
		}
	});
};

/**
 * List of Delivery challans
 */
exports.list = function(req, res) { 
	DeliveryChallan.find().sort('-created').populate('user', 'displayName').exec(function(err, deliveryChallans) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(deliveryChallans);
		}
	});
};

/**
 * Delivery challan middleware
 */
exports.deliveryChallanByID = function(req, res, next, id) { 
	DeliveryChallan.findById(id).populate('user', 'displayName').exec(function(err, deliveryChallan) {
		if (err) return next(err);
		if (! deliveryChallan) return next(new Error('Failed to load Delivery challan ' + id));
		req.deliveryChallan = deliveryChallan ;
		next();
	});
};

/**
 * Delivery challan authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.deliveryChallan.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
