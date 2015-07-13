'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	OrderPlanningActivityDetail = mongoose.model('OrderPlanningActivityDetail');

/**
 * Globals
 */
var user, orderPlanningActivityDetail;

/**
 * Unit tests
 */
describe('Order planning activity detail Model Unit Tests:', function() {
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
			orderPlanningActivityDetail = new OrderPlanningActivityDetail({
				name: 'Order planning activity detail Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return orderPlanningActivityDetail.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			orderPlanningActivityDetail.name = '';

			return orderPlanningActivityDetail.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		OrderPlanningActivityDetail.remove().exec();
		User.remove().exec();

		done();
	});
});