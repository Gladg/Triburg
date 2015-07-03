'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	EntityAttributesDetail = mongoose.model('EntityAttributesDetail'),
	_ = require('lodash');

/**
 * Create a Entity attributes detail
 */
exports.create = function(req, res) {
	var entityAttributesDetail = new EntityAttributesDetail(req.body);
	entityAttributesDetail.user = req.user;

	entityAttributesDetail.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(entityAttributesDetail);
		}
	});
};

/**
 * Show the current Entity attributes detail
 */
exports.read = function(req, res) {
	res.jsonp(req.entityAttributesDetail);
};

/**
 * Update a Entity attributes detail
 */
exports.update = function(req, res) {
	var entityAttributesDetail = req.entityAttributesDetail ;

	entityAttributesDetail = _.extend(entityAttributesDetail , req.body);

	entityAttributesDetail.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(entityAttributesDetail);
		}
	});
};

/**
 * Delete an Entity attributes detail
 */
exports.delete = function(req, res) {
	var entityAttributesDetail = req.entityAttributesDetail ;

	entityAttributesDetail.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(entityAttributesDetail);
		}
	});
};

/**
 * List of Entity attributes details
 */
exports.list = function(req, res) { 
	EntityAttributesDetail.find().sort('-created').populate('user', 'displayName').exec(function(err, entityAttributesDetails) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(entityAttributesDetails);
		}
	});
};

/**
 * Entity attributes detail middleware
 */
exports.entityAttributesDetailByID = function(req, res, next, id) { 
	EntityAttributesDetail.findById(id).populate('user', 'displayName').exec(function(err, entityAttributesDetail) {
		if (err) return next(err);
		if (! entityAttributesDetail) return next(new Error('Failed to load Entity attributes detail ' + id));
		req.entityAttributesDetail = entityAttributesDetail ;
		next();
	});
};

/**
 * Entity attributes detail authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.entityAttributesDetail.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
