'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	OrderPlanningActivityDetail = mongoose.model('OrderPlanningActivityDetail'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, orderPlanningActivityDetail;

/**
 * Order planning activity detail routes tests
 */
describe('Order planning activity detail CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Order planning activity detail
		user.save(function() {
			orderPlanningActivityDetail = {
				name: 'Order planning activity detail Name'
			};

			done();
		});
	});

	it('should be able to save Order planning activity detail instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Order planning activity detail
				agent.post('/order-planning-activity-details')
					.send(orderPlanningActivityDetail)
					.expect(200)
					.end(function(orderPlanningActivityDetailSaveErr, orderPlanningActivityDetailSaveRes) {
						// Handle Order planning activity detail save error
						if (orderPlanningActivityDetailSaveErr) done(orderPlanningActivityDetailSaveErr);

						// Get a list of Order planning activity details
						agent.get('/order-planning-activity-details')
							.end(function(orderPlanningActivityDetailsGetErr, orderPlanningActivityDetailsGetRes) {
								// Handle Order planning activity detail save error
								if (orderPlanningActivityDetailsGetErr) done(orderPlanningActivityDetailsGetErr);

								// Get Order planning activity details list
								var orderPlanningActivityDetails = orderPlanningActivityDetailsGetRes.body;

								// Set assertions
								(orderPlanningActivityDetails[0].user._id).should.equal(userId);
								(orderPlanningActivityDetails[0].name).should.match('Order planning activity detail Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Order planning activity detail instance if not logged in', function(done) {
		agent.post('/order-planning-activity-details')
			.send(orderPlanningActivityDetail)
			.expect(401)
			.end(function(orderPlanningActivityDetailSaveErr, orderPlanningActivityDetailSaveRes) {
				// Call the assertion callback
				done(orderPlanningActivityDetailSaveErr);
			});
	});

	it('should not be able to save Order planning activity detail instance if no name is provided', function(done) {
		// Invalidate name field
		orderPlanningActivityDetail.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Order planning activity detail
				agent.post('/order-planning-activity-details')
					.send(orderPlanningActivityDetail)
					.expect(400)
					.end(function(orderPlanningActivityDetailSaveErr, orderPlanningActivityDetailSaveRes) {
						// Set message assertion
						(orderPlanningActivityDetailSaveRes.body.message).should.match('Please fill Order planning activity detail name');
						
						// Handle Order planning activity detail save error
						done(orderPlanningActivityDetailSaveErr);
					});
			});
	});

	it('should be able to update Order planning activity detail instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Order planning activity detail
				agent.post('/order-planning-activity-details')
					.send(orderPlanningActivityDetail)
					.expect(200)
					.end(function(orderPlanningActivityDetailSaveErr, orderPlanningActivityDetailSaveRes) {
						// Handle Order planning activity detail save error
						if (orderPlanningActivityDetailSaveErr) done(orderPlanningActivityDetailSaveErr);

						// Update Order planning activity detail name
						orderPlanningActivityDetail.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Order planning activity detail
						agent.put('/order-planning-activity-details/' + orderPlanningActivityDetailSaveRes.body._id)
							.send(orderPlanningActivityDetail)
							.expect(200)
							.end(function(orderPlanningActivityDetailUpdateErr, orderPlanningActivityDetailUpdateRes) {
								// Handle Order planning activity detail update error
								if (orderPlanningActivityDetailUpdateErr) done(orderPlanningActivityDetailUpdateErr);

								// Set assertions
								(orderPlanningActivityDetailUpdateRes.body._id).should.equal(orderPlanningActivityDetailSaveRes.body._id);
								(orderPlanningActivityDetailUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Order planning activity details if not signed in', function(done) {
		// Create new Order planning activity detail model instance
		var orderPlanningActivityDetailObj = new OrderPlanningActivityDetail(orderPlanningActivityDetail);

		// Save the Order planning activity detail
		orderPlanningActivityDetailObj.save(function() {
			// Request Order planning activity details
			request(app).get('/order-planning-activity-details')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Order planning activity detail if not signed in', function(done) {
		// Create new Order planning activity detail model instance
		var orderPlanningActivityDetailObj = new OrderPlanningActivityDetail(orderPlanningActivityDetail);

		// Save the Order planning activity detail
		orderPlanningActivityDetailObj.save(function() {
			request(app).get('/order-planning-activity-details/' + orderPlanningActivityDetailObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', orderPlanningActivityDetail.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Order planning activity detail instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Order planning activity detail
				agent.post('/order-planning-activity-details')
					.send(orderPlanningActivityDetail)
					.expect(200)
					.end(function(orderPlanningActivityDetailSaveErr, orderPlanningActivityDetailSaveRes) {
						// Handle Order planning activity detail save error
						if (orderPlanningActivityDetailSaveErr) done(orderPlanningActivityDetailSaveErr);

						// Delete existing Order planning activity detail
						agent.delete('/order-planning-activity-details/' + orderPlanningActivityDetailSaveRes.body._id)
							.send(orderPlanningActivityDetail)
							.expect(200)
							.end(function(orderPlanningActivityDetailDeleteErr, orderPlanningActivityDetailDeleteRes) {
								// Handle Order planning activity detail error error
								if (orderPlanningActivityDetailDeleteErr) done(orderPlanningActivityDetailDeleteErr);

								// Set assertions
								(orderPlanningActivityDetailDeleteRes.body._id).should.equal(orderPlanningActivityDetailSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Order planning activity detail instance if not signed in', function(done) {
		// Set Order planning activity detail user 
		orderPlanningActivityDetail.user = user;

		// Create new Order planning activity detail model instance
		var orderPlanningActivityDetailObj = new OrderPlanningActivityDetail(orderPlanningActivityDetail);

		// Save the Order planning activity detail
		orderPlanningActivityDetailObj.save(function() {
			// Try deleting Order planning activity detail
			request(app).delete('/order-planning-activity-details/' + orderPlanningActivityDetailObj._id)
			.expect(401)
			.end(function(orderPlanningActivityDetailDeleteErr, orderPlanningActivityDetailDeleteRes) {
				// Set message assertion
				(orderPlanningActivityDetailDeleteRes.body.message).should.match('User is not logged in');

				// Handle Order planning activity detail error error
				done(orderPlanningActivityDetailDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		OrderPlanningActivityDetail.remove().exec();
		done();
	});
});