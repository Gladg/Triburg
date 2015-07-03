'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	OrderEnquiryForm = mongoose.model('OrderEnquiryForm');

/**
 * Globals
 */
var user, orderEnquiryForm;

/**
 * Unit tests
 */
describe('Order enquiry form Model Unit Tests:', function() {
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
			orderEnquiryForm = new OrderEnquiryForm({
				name: 'Order enquiry form Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return orderEnquiryForm.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			orderEnquiryForm.name = '';

			return orderEnquiryForm.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		OrderEnquiryForm.remove().exec();
		User.remove().exec();

		done();
	});
});