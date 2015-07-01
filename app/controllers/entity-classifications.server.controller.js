'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	EntityClassification = mongoose.model('EntityClassification'),
	_ = require('lodash');

/**
 * Create a Entity classification
 */
exports.create = function(req, res) {
	var entityClassification = new EntityClassification(req.body);
	entityClassification.user = req.user;

	entityClassification.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(entityClassification);
		}
	});
};

/**
 * Show the current Entity classification
 */
exports.read = function(req, res) {
	res.jsonp(req.entityClassification);
};

/**
 * Update a Entity classification
 */
exports.update = function(req, res) {
	var entityClassification = req.entityClassification ;

	entityClassification = _.extend(entityClassification , req.body);

	entityClassification.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(entityClassification);
		}
	});
};

/**
 * Delete an Entity classification
 */
exports.delete = function(req, res) {
	var entityClassification = req.entityClassification ;

	entityClassification.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(entityClassification);
		}
	});
};

/**
 * List of Entity classifications
 */
exports.list = function(req, res) { 
	EntityClassification.find().sort('-created').populate('user', 'displayName').exec(function(err, entityClassifications) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(entityClassifications);
		}
	});
};

/**
 * Entity classification middleware
 */
exports.entityClassificationByID = function(req, res, next, id) { 
	EntityClassification.findById(id).populate('user', 'displayName').exec(function(err, entityClassification) {
		if (err) return next(err);
		if (! entityClassification) return next(new Error('Failed to load Entity classification ' + id));
		req.entityClassification = entityClassification ;
		next();
	});
};

/**
 * Entity classification authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.entityClassification.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
