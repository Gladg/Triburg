'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	OrderRegistrationMeasurementDetail = mongoose.model('OrderRegistrationMeasurementDetail');

/**
 * Globals
 */
var user, orderRegistrationMeasurementDetail;

/**
 * Unit tests
 */
describe('Order registration measurement detail Model Unit Tests:', function() {
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
			orderRegistrationMeasurementDetail = new OrderRegistrationMeasurementDetail({
				name: 'Order registration measurement detail Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return orderRegistrationMeasurementDetail.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			orderRegistrationMeasurementDetail.name = '';

			return orderRegistrationMeasurementDetail.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		OrderRegistrationMeasurementDetail.remove().exec();
		User.remove().exec();

		done();
	});
});