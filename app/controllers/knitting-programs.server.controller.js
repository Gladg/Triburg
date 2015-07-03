'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	KnittingProgram = mongoose.model('KnittingProgram'),
	_ = require('lodash');

/**
 * Create a Knitting program
 */
exports.create = function(req, res) {
	var knittingProgram = new KnittingProgram(req.body);
	knittingProgram.user = req.user;

	knittingProgram.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(knittingProgram);
		}
	});
};

/**
 * Show the current Knitting program
 */
exports.read = function(req, res) {
	res.jsonp(req.knittingProgram);
};

/**
 * Update a Knitting program
 */
exports.update = function(req, res) {
	var knittingProgram = req.knittingProgram ;

	knittingProgram = _.extend(knittingProgram , req.body);

	knittingProgram.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(knittingProgram);
		}
	});
};

/**
 * Delete an Knitting program
 */
exports.delete = function(req, res) {
	var knittingProgram = req.knittingProgram ;

	knittingProgram.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(knittingProgram);
		}
	});
};

/**
 * List of Knitting programs
 */
exports.list = function(req, res) { 
	KnittingProgram.find().sort('-created').populate('user', 'displayName').exec(function(err, knittingPrograms) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(knittingPrograms);
		}
	});
};

/**
 * Knitting program middleware
 */
exports.knittingProgramByID = function(req, res, next, id) { 
	KnittingProgram.findById(id).populate('user', 'displayName').exec(function(err, knittingProgram) {
		if (err) return next(err);
		if (! knittingProgram) return next(new Error('Failed to load Knitting program ' + id));
		req.knittingProgram = knittingProgram ;
		next();
	});
};

/**
 * Knitting program authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.knittingProgram.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
