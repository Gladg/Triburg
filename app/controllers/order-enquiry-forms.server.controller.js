'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	OrderEnquiryForm = mongoose.model('OrderEnquiryForm'),
	_ = require('lodash');

/**
 * Create a Order enquiry form
 */
exports.create = function(req, res) {
	var orderEnquiryForm = new OrderEnquiryForm(req.body);
	orderEnquiryForm.user = req.user;

	orderEnquiryForm.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(orderEnquiryForm);
		}
	});
};

/**
 * Show the current Order enquiry form
 */
exports.read = function(req, res) {
	res.jsonp(req.orderEnquiryForm);
};

/**
 * Update a Order enquiry form
 */
exports.update = function(req, res) {
	var orderEnquiryForm = req.orderEnquiryForm ;

	orderEnquiryForm = _.extend(orderEnquiryForm , req.body);

	orderEnquiryForm.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(orderEnquiryForm);
		}
	});
};

/**
 * Delete an Order enquiry form
 */
exports.delete = function(req, res) {
	var orderEnquiryForm = req.orderEnquiryForm ;

	orderEnquiryForm.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(orderEnquiryForm);
		}
	});
};

/**
 * List of Order enquiry forms
 */
exports.list = function(req, res) { 
	OrderEnquiryForm.find().sort('-created').populate('user', 'displayName').exec(function(err, orderEnquiryForms) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(orderEnquiryForms);
		}
	});
};

/**
 * Order enquiry form middleware
 */
exports.orderEnquiryFormByID = function(req, res, next, id) { 
	OrderEnquiryForm.findById(id).populate('user', 'displayName').exec(function(err, orderEnquiryForm) {
		if (err) return next(err);
		if (! orderEnquiryForm) return next(new Error('Failed to load Order enquiry form ' + id));
		req.orderEnquiryForm = orderEnquiryForm ;
		next();
	});
};

/**
 * Order enquiry form authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.orderEnquiryForm.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
