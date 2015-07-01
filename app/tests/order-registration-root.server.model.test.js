'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	OrderRegistrationRoot = mongoose.model('OrderRegistrationRoot');

/**
 * Globals
 */
var user, orderRegistrationRoot;

/**
 * Unit tests
 */
describe('Order registration root Model Unit Tests:', function() {
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
			orderRegistrationRoot = new OrderRegistrationRoot({
				name: 'Order registration root Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return orderRegistrationRoot.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			orderRegistrationRoot.name = '';

			return orderRegistrationRoot.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		OrderRegistrationRoot.remove().exec();
		User.remove().exec();

		done();
	});
});