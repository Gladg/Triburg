'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	KnittingProgramFabricDetail = mongoose.model('KnittingProgramFabricDetail'),
	_ = require('lodash');

/**
 * Create a Knitting program fabric detail
 */
exports.create = function(req, res) {
	var knittingProgramFabricDetail = new KnittingProgramFabricDetail(req.body);
	knittingProgramFabricDetail.user = req.user;

	knittingProgramFabricDetail.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(knittingProgramFabricDetail);
		}
	});
};

/**
 * Show the current Knitting program fabric detail
 */
exports.read = function(req, res) {
	res.jsonp(req.knittingProgramFabricDetail);
};

/**
 * Update a Knitting program fabric detail
 */
exports.update = function(req, res) {
	var knittingProgramFabricDetail = req.knittingProgramFabricDetail ;

	knittingProgramFabricDetail = _.extend(knittingProgramFabricDetail , req.body);

	knittingProgramFabricDetail.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(knittingProgramFabricDetail);
		}
	});
};

/**
 * Delete an Knitting program fabric detail
 */
exports.delete = function(req, res) {
	var knittingProgramFabricDetail = req.knittingProgramFabricDetail ;

	knittingProgramFabricDetail.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(knittingProgramFabricDetail);
		}
	});
};

/**
 * List of Knitting program fabric details
 */
exports.list = function(req, res) { 
	KnittingProgramFabricDetail.find().sort('-created').populate('user', 'displayName').exec(function(err, knittingProgramFabricDetails) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(knittingProgramFabricDetails);
		}
	});
};

/**
 * Knitting program fabric detail middleware
 */
exports.knittingProgramFabricDetailByID = function(req, res, next, id) { 
	KnittingProgramFabricDetail.findById(id).populate('user', 'displayName').exec(function(err, knittingProgramFabricDetail) {
		if (err) return next(err);
		if (! knittingProgramFabricDetail) return next(new Error('Failed to load Knitting program fabric detail ' + id));
		req.knittingProgramFabricDetail = knittingProgramFabricDetail ;
		next();
	});
};

/**
 * Knitting program fabric detail authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.knittingProgramFabricDetail.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
