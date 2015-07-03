'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	CuttingRegister = mongoose.model('CuttingRegister'),
	_ = require('lodash');

/**
 * Create a Cutting register
 */
exports.create = function(req, res) {
	var cuttingRegister = new CuttingRegister(req.body);
	cuttingRegister.user = req.user;

	cuttingRegister.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(cuttingRegister);
		}
	});
};

/**
 * Show the current Cutting register
 */
exports.read = function(req, res) {
	res.jsonp(req.cuttingRegister);
};

/**
 * Update a Cutting register
 */
exports.update = function(req, res) {
	var cuttingRegister = req.cuttingRegister ;

	cuttingRegister = _.extend(cuttingRegister , req.body);

	cuttingRegister.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(cuttingRegister);
		}
	});
};

/**
 * Delete an Cutting register
 */
exports.delete = function(req, res) {
	var cuttingRegister = req.cuttingRegister ;

	cuttingRegister.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(cuttingRegister);
		}
	});
};

/**
 * List of Cutting registers
 */
exports.list = function(req, res) { 
	CuttingRegister.find().sort('-created').populate('user', 'displayName').exec(function(err, cuttingRegisters) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(cuttingRegisters);
		}
	});
};

/**
 * Cutting register middleware
 */
exports.cuttingRegisterByID = function(req, res, next, id) { 
	CuttingRegister.findById(id).populate('user', 'displayName').exec(function(err, cuttingRegister) {
		if (err) return next(err);
		if (! cuttingRegister) return next(new Error('Failed to load Cutting register ' + id));
		req.cuttingRegister = cuttingRegister ;
		next();
	});
};

/**
 * Cutting register authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.cuttingRegister.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
