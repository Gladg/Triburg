'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	EntityRoot = mongoose.model('EntityRoot'),
	_ = require('lodash');

/**
 * Create a Entity root
 */
exports.create = function(req, res) {
	var entityRoot = new EntityRoot(req.body);
	entityRoot.user = req.user;

	entityRoot.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(entityRoot);
		}
	});
};

/**
 * Show the current Entity root
 */
exports.read = function(req, res) {
	res.jsonp(req.entityRoot);
};

/**
 * Update a Entity root
 */
exports.update = function(req, res) {
	var entityRoot = req.entityRoot ;

	entityRoot = _.extend(entityRoot , req.body);

	entityRoot.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(entityRoot);
		}
	});
};

/**
 * Delete an Entity root
 */
exports.delete = function(req, res) {
	var entityRoot = req.entityRoot ;

	entityRoot.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(entityRoot);
		}
	});
};

/**
 * List of Entity roots
 */
exports.list = function(req, res) { 
	EntityRoot.find().sort('-created').populate('user', 'displayName').exec(function(err, entityRoots) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(entityRoots);
		}
	});
};

/**
 * Entity root middleware
 */
exports.entityRootByID = function(req, res, next, id) { 
	EntityRoot.findById(id).populate('user', 'displayName').exec(function(err, entityRoot) {
		if (err) return next(err);
		if (! entityRoot) return next(new Error('Failed to load Entity root ' + id));
		req.entityRoot = entityRoot ;
		next();
	});
};

/**
 * Entity root authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.entityRoot.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
