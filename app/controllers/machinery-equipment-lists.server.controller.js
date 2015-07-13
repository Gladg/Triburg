'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	MachineryEquipmentList = mongoose.model('MachineryEquipmentList'),
	_ = require('lodash');

/**
 * Create a Machinery equipment list
 */
exports.create = function(req, res) {
	var machineryEquipmentList = new MachineryEquipmentList(req.body);
	machineryEquipmentList.user = req.user;

	machineryEquipmentList.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(machineryEquipmentList);
		}
	});
};

/**
 * Show the current Machinery equipment list
 */
exports.read = function(req, res) {
	res.jsonp(req.machineryEquipmentList);
};

/**
 * Update a Machinery equipment list
 */
exports.update = function(req, res) {
	var machineryEquipmentList = req.machineryEquipmentList ;

	machineryEquipmentList = _.extend(machineryEquipmentList , req.body);

	machineryEquipmentList.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(machineryEquipmentList);
		}
	});
};

/**
 * Delete an Machinery equipment list
 */
exports.delete = function(req, res) {
	var machineryEquipmentList = req.machineryEquipmentList ;

	machineryEquipmentList.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(machineryEquipmentList);
		}
	});
};

/**
 * List of Machinery equipment lists
 */
exports.list = function(req, res) { 
	MachineryEquipmentList.find().sort('-created').populate('user', 'displayName').exec(function(err, machineryEquipmentLists) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(machineryEquipmentLists);
		}
	});
};

/**
 * Machinery equipment list middleware
 */
exports.machineryEquipmentListByID = function(req, res, next, id) { 
	MachineryEquipmentList.findById(id).populate('user', 'displayName').exec(function(err, machineryEquipmentList) {
		if (err) return next(err);
		if (! machineryEquipmentList) return next(new Error('Failed to load Machinery equipment list ' + id));
		req.machineryEquipmentList = machineryEquipmentList ;
		next();
	});
};

/**
 * Machinery equipment list authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.machineryEquipmentList.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
