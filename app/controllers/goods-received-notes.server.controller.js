'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	GoodsReceivedNote = mongoose.model('GoodsReceivedNote'),
	_ = require('lodash');

/**
 * Create a Goods received note
 */
exports.create = function(req, res) {
	var goodsReceivedNote = new GoodsReceivedNote(req.body);
	goodsReceivedNote.user = req.user;

	goodsReceivedNote.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(goodsReceivedNote);
		}
	});
};

/**
 * Show the current Goods received note
 */
exports.read = function(req, res) {
	res.jsonp(req.goodsReceivedNote);
};

/**
 * Update a Goods received note
 */
exports.update = function(req, res) {
	var goodsReceivedNote = req.goodsReceivedNote ;

	goodsReceivedNote = _.extend(goodsReceivedNote , req.body);

	goodsReceivedNote.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(goodsReceivedNote);
		}
	});
};

/**
 * Delete an Goods received note
 */
exports.delete = function(req, res) {
	var goodsReceivedNote = req.goodsReceivedNote ;

	goodsReceivedNote.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(goodsReceivedNote);
		}
	});
};

/**
 * List of Goods received notes
 */
exports.list = function(req, res) { 
	GoodsReceivedNote.find().sort('-created').populate('user', 'displayName').exec(function(err, goodsReceivedNotes) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(goodsReceivedNotes);
		}
	});
};

/**
 * Goods received note middleware
 */
exports.goodsReceivedNoteByID = function(req, res, next, id) { 
	GoodsReceivedNote.findById(id).populate('user', 'displayName').exec(function(err, goodsReceivedNote) {
		if (err) return next(err);
		if (! goodsReceivedNote) return next(new Error('Failed to load Goods received note ' + id));
		req.goodsReceivedNote = goodsReceivedNote ;
		next();
	});
};

/**
 * Goods received note authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.goodsReceivedNote.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
