'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	ProcessProgram = mongoose.model('ProcessProgram'),
	_ = require('lodash');

/**
 * Create a Process program
 */
exports.create = function(req, res) {
	var processProgram = new ProcessProgram(req.body);
	processProgram.user = req.user;

	processProgram.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(processProgram);
		}
	});
};

/**
 * Show the current Process program
 */
exports.read = function(req, res) {
	res.jsonp(req.processProgram);
};

/**
 * Update a Process program
 */
exports.update = function(req, res) {
	var processProgram = req.processProgram ;

	processProgram = _.extend(processProgram , req.body);

	processProgram.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(processProgram);
		}
	});
};

/**
 * Delete an Process program
 */
exports.delete = function(req, res) {
	var processProgram = req.processProgram ;

	processProgram.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(processProgram);
		}
	});
};

/**
 * List of Process programs
 */
exports.list = function(req, res) { 
	ProcessProgram.find().sort('-created').populate('user', 'displayName').exec(function(err, processPrograms) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(processPrograms);
		}
	});
};

/**
 * Process program middleware
 */
exports.processProgramByID = function(req, res, next, id) { 
	ProcessProgram.findById(id).populate('user', 'displayName').exec(function(err, processProgram) {
		if (err) return next(err);
		if (! processProgram) return next(new Error('Failed to load Process program ' + id));
		req.processProgram = processProgram ;
		next();
	});
};

/**
 * Process program authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.processProgram.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
