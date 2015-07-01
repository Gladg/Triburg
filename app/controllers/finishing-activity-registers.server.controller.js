'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	FinishingActivityRegister = mongoose.model('FinishingActivityRegister'),
	_ = require('lodash');

/**
 * Create a Finishing activity register
 */
exports.create = function(req, res) {
	var finishingActivityRegister = new FinishingActivityRegister(req.body);
	finishingActivityRegister.user = req.user;

	finishingActivityRegister.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(finishingActivityRegister);
		}
	});
};

/**
 * Show the current Finishing activity register
 */
exports.read = function(req, res) {
	res.jsonp(req.finishingActivityRegister);
};

/**
 * Update a Finishing activity register
 */
exports.update = function(req, res) {
	var finishingActivityRegister = req.finishingActivityRegister ;

	finishingActivityRegister = _.extend(finishingActivityRegister , req.body);

	finishingActivityRegister.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(finishingActivityRegister);
		}
	});
};

/**
 * Delete an Finishing activity register
 */
exports.delete = function(req, res) {
	var finishingActivityRegister = req.finishingActivityRegister ;

	finishingActivityRegister.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(finishingActivityRegister);
		}
	});
};

/**
 * List of Finishing activity registers
 */
exports.list = function(req, res) { 
	FinishingActivityRegister.find().sort('-created').populate('user', 'displayName').exec(function(err, finishingActivityRegisters) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(finishingActivityRegisters);
		}
	});
};

/**
 * Finishing activity register middleware
 */
exports.finishingActivityRegisterByID = function(req, res, next, id) { 
	FinishingActivityRegister.findById(id).populate('user', 'displayName').exec(function(err, finishingActivityRegister) {
		if (err) return next(err);
		if (! finishingActivityRegister) return next(new Error('Failed to load Finishing activity register ' + id));
		req.finishingActivityRegister = finishingActivityRegister ;
		next();
	});
};

/**
 * Finishing activity register authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.finishingActivityRegister.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
