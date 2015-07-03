'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	OrderRegistrationDeliveryDetail = mongoose.model('OrderRegistrationDeliveryDetail');

/**
 * Globals
 */
var user, orderRegistrationDeliveryDetail;

/**
 * Unit tests
 */
describe('Order registration delivery detail Model Unit Tests:', function() {
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
			orderRegistrationDeliveryDetail = new OrderRegistrationDeliveryDetail({
				name: 'Order registration delivery detail Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return orderRegistrationDeliveryDetail.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			orderRegistrationDeliveryDetail.name = '';

			return orderRegistrationDeliveryDetail.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		OrderRegistrationDeliveryDetail.remove().exec();
		User.remove().exec();

		done();
	});
});