'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	PackingList = mongoose.model('PackingList'),
	_ = require('lodash');

/**
 * Create a Packing list
 */
exports.create = function(req, res) {
	var packingList = new PackingList(req.body);
	packingList.user = req.user;

	packingList.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(packingList);
		}
	});
};

/**
 * Show the current Packing list
 */
exports.read = function(req, res) {
	res.jsonp(req.packingList);
};

/**
 * Update a Packing list
 */
exports.update = function(req, res) {
	var packingList = req.packingList ;

	packingList = _.extend(packingList , req.body);

	packingList.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(packingList);
		}
	});
};

/**
 * Delete an Packing list
 */
exports.delete = function(req, res) {
	var packingList = req.packingList ;

	packingList.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(packingList);
		}
	});
};

/**
 * List of Packing lists
 */
exports.list = function(req, res) { 
	PackingList.find().sort('-created').populate('user', 'displayName').exec(function(err, packingLists) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(packingLists);
		}
	});
};

/**
 * Packing list middleware
 */
exports.packingListByID = function(req, res, next, id) { 
	PackingList.findById(id).populate('user', 'displayName').exec(function(err, packingList) {
		if (err) return next(err);
		if (! packingList) return next(new Error('Failed to load Packing list ' + id));
		req.packingList = packingList ;
		next();
	});
};

/**
 * Packing list authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.packingList.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
