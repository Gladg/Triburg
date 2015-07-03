'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	QcForm = mongoose.model('QcForm'),
	_ = require('lodash');

/**
 * Create a Qc form
 */
exports.create = function(req, res) {
	var qcForm = new QcForm(req.body);
	qcForm.user = req.user;

	qcForm.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(qcForm);
		}
	});
};

/**
 * Show the current Qc form
 */
exports.read = function(req, res) {
	res.jsonp(req.qcForm);
};

/**
 * Update a Qc form
 */
exports.update = function(req, res) {
	var qcForm = req.qcForm ;

	qcForm = _.extend(qcForm , req.body);

	qcForm.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(qcForm);
		}
	});
};

/**
 * Delete an Qc form
 */
exports.delete = function(req, res) {
	var qcForm = req.qcForm ;

	qcForm.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(qcForm);
		}
	});
};

/**
 * List of Qc forms
 */
exports.list = function(req, res) { 
	QcForm.find().sort('-created').populate('user', 'displayName').exec(function(err, qcForms) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(qcForms);
		}
	});
};

/**
 * Qc form middleware
 */
exports.qcFormByID = function(req, res, next, id) { 
	QcForm.findById(id).populate('user', 'displayName').exec(function(err, qcForm) {
		if (err) return next(err);
		if (! qcForm) return next(new Error('Failed to load Qc form ' + id));
		req.qcForm = qcForm ;
		next();
	});
};

/**
 * Qc form authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.qcForm.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
