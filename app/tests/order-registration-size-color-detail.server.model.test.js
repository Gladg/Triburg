'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	OrderRegistrationSizeColorDetail = mongoose.model('OrderRegistrationSizeColorDetail');

/**
 * Globals
 */
var user, orderRegistrationSizeColorDetail;

/**
 * Unit tests
 */
describe('Order registration size color detail Model Unit Tests:', function() {
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
			orderRegistrationSizeColorDetail = new OrderRegistrationSizeColorDetail({
				name: 'Order registration size color detail Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return orderRegistrationSizeColorDetail.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			orderRegistrationSizeColorDetail.name = '';

			return orderRegistrationSizeColorDetail.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		OrderRegistrationSizeColorDetail.remove().exec();
		User.remove().exec();

		done();
	});
});