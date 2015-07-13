'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	ProgramSheet = mongoose.model('ProgramSheet'),
	_ = require('lodash');

/**
 * Create a Program sheet
 */
exports.create = function(req, res) {
	var programSheet = new ProgramSheet(req.body);
	programSheet.user = req.user;

	programSheet.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(programSheet);
		}
	});
};

/**
 * Show the current Program sheet
 */
exports.read = function(req, res) {
	res.jsonp(req.programSheet);
};

/**
 * Update a Program sheet
 */
exports.update = function(req, res) {
	var programSheet = req.programSheet ;

	programSheet = _.extend(programSheet , req.body);

	programSheet.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(programSheet);
		}
	});
};

/**
 * Delete an Program sheet
 */
exports.delete = function(req, res) {
	var programSheet = req.programSheet ;

	programSheet.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(programSheet);
		}
	});
};

/**
 * List of Program sheets
 */
exports.list = function(req, res) { 
	ProgramSheet.find().sort('-created').populate('user', 'displayName').exec(function(err, programSheets) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(programSheets);
		}
	});
};

/**
 * Program sheet middleware
 */
exports.programSheetByID = function(req, res, next, id) { 
	ProgramSheet.findById(id).populate('user', 'displayName').exec(function(err, programSheet) {
		if (err) return next(err);
		if (! programSheet) return next(new Error('Failed to load Program sheet ' + id));
		req.programSheet = programSheet ;
		next();
	});
};

/**
 * Program sheet authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.programSheet.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
