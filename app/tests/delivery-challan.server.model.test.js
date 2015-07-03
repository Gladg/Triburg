'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	DeliveryChallan = mongoose.model('DeliveryChallan');

/**
 * Globals
 */
var user, deliveryChallan;

/**
 * Unit tests
 */
describe('Delivery challan Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() { 
			deliveryChallan = new DeliveryChallan({
				name: 'Delivery challan Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return deliveryChallan.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			deliveryChallan.name = '';

			return deliveryChallan.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		DeliveryChallan.remove().exec();
		User.remove().exec();

		done();
	});
});