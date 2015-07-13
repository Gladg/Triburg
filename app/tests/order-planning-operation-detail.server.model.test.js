'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	OrderPlanningOperationDetail = mongoose.model('OrderPlanningOperationDetail');

/**
 * Globals
 */
var user, orderPlanningOperationDetail;

/**
 * Unit tests
 */
describe('Order planning operation detail Model Unit Tests:', function() {
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
			orderPlanningOperationDetail = new OrderPlanningOperationDetail({
				name: 'Order planning operation detail Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return orderPlanningOperationDetail.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			orderPlanningOperationDetail.name = '';

			return orderPlanningOperationDetail.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		OrderPlanningOperationDetail.remove().exec();
		User.remove().exec();

		done();
	});
});