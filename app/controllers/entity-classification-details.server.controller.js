'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	EntityClassificationDetail = mongoose.model('EntityClassificationDetail'),
	_ = require('lodash');

/**
 * Create a Entity classification detail
 */
exports.create = function(req, res) {
	var entityClassificationDetail = new EntityClassificationDetail(req.body);
	entityClassificationDetail.user = req.user;

	entityClassificationDetail.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(entityClassificationDetail);
		}
	});
};

/**
 * Show the current Entity classification detail
 */
exports.read = function(req, res) {
	res.jsonp(req.entityClassificationDetail);
};

/**
 * Update a Entity classification detail
 */
exports.update = function(req, res) {
	var entityClassificationDetail = req.entityClassificationDetail ;

	entityClassificationDetail = _.extend(entityClassificationDetail , req.body);

	entityClassificationDetail.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(entityClassificationDetail);
		}
	});
};

/**
 * Delete an Entity classification detail
 */
exports.delete = function(req, res) {
	var entityClassificationDetail = req.entityClassificationDetail ;

	entityClassificationDetail.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(entityClassificationDetail);
		}
	});
};

/**
 * List of Entity classification details
 */
exports.list = function(req, res) { 
	EntityClassificationDetail.find().sort('-created').populate('user', 'displayName').exec(function(err, entityClassificationDetails) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(entityClassificationDetails);
		}
	});
};

/**
 * Entity classification detail middleware
 */
exports.entityClassificationDetailByID = function(req, res, next, id) { 
	EntityClassificationDetail.findById(id).populate('user', 'displayName').exec(function(err, entityClassificationDetail) {
		if (err) return next(err);
		if (! entityClassificationDetail) return next(new Error('Failed to load Entity classification detail ' + id));
		req.entityClassificationDetail = entityClassificationDetail ;
		next();
	});
};

/**
 * Entity classification detail authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.entityClassificationDetail.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
