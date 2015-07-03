'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	OrderRegistrationAccessoryDetail = mongoose.model('OrderRegistrationAccessoryDetail');

/**
 * Globals
 */
var user, orderRegistrationAccessoryDetail;

/**
 * Unit tests
 */
describe('Order registration accessory detail Model Unit Tests:', function() {
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
			orderRegistrationAccessoryDetail = new OrderRegistrationAccessoryDetail({
				name: 'Order registration accessory detail Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return orderRegistrationAccessoryDetail.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			orderRegistrationAccessoryDetail.name = '';

			return orderRegistrationAccessoryDetail.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		OrderRegistrationAccessoryDetail.remove().exec();
		User.remove().exec();

		done();
	});
});