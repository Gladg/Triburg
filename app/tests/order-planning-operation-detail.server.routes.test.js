'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	OrderPlanningOperationDetail = mongoose.model('OrderPlanningOperationDetail'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, orderPlanningOperationDetail;

/**
 * Order planning operation detail routes tests
 */
describe('Order planning operation detail CRUD tests', function() {
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

		// Save a user to the test db and create new Order planning operation detail
		user.save(function() {
			orderPlanningOperationDetail = {
				name: 'Order planning operation detail Name'
			};

			done();
		});
	});

	it('should be able to save Order planning operation detail instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Order planning operation detail
				agent.post('/order-planning-operation-details')
					.send(orderPlanningOperationDetail)
					.expect(200)
					.end(function(orderPlanningOperationDetailSaveErr, orderPlanningOperationDetailSaveRes) {
						// Handle Order planning operation detail save error
						if (orderPlanningOperationDetailSaveErr) done(orderPlanningOperationDetailSaveErr);

						// Get a list of Order planning operation details
						agent.get('/order-planning-operation-details')
							.end(function(orderPlanningOperationDetailsGetErr, orderPlanningOperationDetailsGetRes) {
								// Handle Order planning operation detail save error
								if (orderPlanningOperationDetailsGetErr) done(orderPlanningOperationDetailsGetErr);

								// Get Order planning operation details list
								var orderPlanningOperationDetails = orderPlanningOperationDetailsGetRes.body;

								// Set assertions
								(orderPlanningOperationDetails[0].user._id).should.equal(userId);
								(orderPlanningOperationDetails[0].name).should.match('Order planning operation detail Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Order planning operation detail instance if not logged in', function(done) {
		agent.post('/order-planning-operation-details')
			.send(orderPlanningOperationDetail)
			.expect(401)
			.end(function(orderPlanningOperationDetailSaveErr, orderPlanningOperationDetailSaveRes) {
				// Call the assertion callback
				done(orderPlanningOperationDetailSaveErr);
			});
	});

	it('should not be able to save Order planning operation detail instance if no name is provided', function(done) {
		// Invalidate name field
		orderPlanningOperationDetail.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Order planning operation detail
				agent.post('/order-planning-operation-details')
					.send(orderPlanningOperationDetail)
					.expect(400)
					.end(function(orderPlanningOperationDetailSaveErr, orderPlanningOperationDetailSaveRes) {
						// Set message assertion
						(orderPlanningOperationDetailSaveRes.body.message).should.match('Please fill Order planning operation detail name');
						
						// Handle Order planning operation detail save error
						done(orderPlanningOperationDetailSaveErr);
					});
			});
	});

	it('should be able to update Order planning operation detail instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Order planning operation detail
				agent.post('/order-planning-operation-details')
					.send(orderPlanningOperationDetail)
					.expect(200)
					.end(function(orderPlanningOperationDetailSaveErr, orderPlanningOperationDetailSaveRes) {
						// Handle Order planning operation detail save error
						if (orderPlanningOperationDetailSaveErr) done(orderPlanningOperationDetailSaveErr);

						// Update Order planning operation detail name
						orderPlanningOperationDetail.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Order planning operation detail
						agent.put('/order-planning-operation-details/' + orderPlanningOperationDetailSaveRes.body._id)
							.send(orderPlanningOperationDetail)
							.expect(200)
							.end(function(orderPlanningOperationDetailUpdateErr, orderPlanningOperationDetailUpdateRes) {
								// Handle Order planning operation detail update error
								if (orderPlanningOperationDetailUpdateErr) done(orderPlanningOperationDetailUpdateErr);

								// Set assertions
								(orderPlanningOperationDetailUpdateRes.body._id).should.equal(orderPlanningOperationDetailSaveRes.body._id);
								(orderPlanningOperationDetailUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Order planning operation details if not signed in', function(done) {
		// Create new Order planning operation detail model instance
		var orderPlanningOperationDetailObj = new OrderPlanningOperationDetail(orderPlanningOperationDetail);

		// Save the Order planning operation detail
		orderPlanningOperationDetailObj.save(function() {
			// Request Order planning operation details
			request(app).get('/order-planning-operation-details')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Order planning operation detail if not signed in', function(done) {
		// Create new Order planning operation detail model instance
		var orderPlanningOperationDetailObj = new OrderPlanningOperationDetail(orderPlanningOperationDetail);

		// Save the Order planning operation detail
		orderPlanningOperationDetailObj.save(function() {
			request(app).get('/order-planning-operation-details/' + orderPlanningOperationDetailObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', orderPlanningOperationDetail.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Order planning operation detail instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Order planning operation detail
				agent.post('/order-planning-operation-details')
					.send(orderPlanningOperationDetail)
					.expect(200)
					.end(function(orderPlanningOperationDetailSaveErr, orderPlanningOperationDetailSaveRes) {
						// Handle Order planning operation detail save error
						if (orderPlanningOperationDetailSaveErr) done(orderPlanningOperationDetailSaveErr);

						// Delete existing Order planning operation detail
						agent.delete('/order-planning-operation-details/' + orderPlanningOperationDetailSaveRes.body._id)
							.send(orderPlanningOperationDetail)
							.expect(200)
							.end(function(orderPlanningOperationDetailDeleteErr, orderPlanningOperationDetailDeleteRes) {
								// Handle Order planning operation detail error error
								if (orderPlanningOperationDetailDeleteErr) done(orderPlanningOperationDetailDeleteErr);

								// Set assertions
								(orderPlanningOperationDetailDeleteRes.body._id).should.equal(orderPlanningOperationDetailSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Order planning operation detail instance if not signed in', function(done) {
		// Set Order planning operation detail user 
		orderPlanningOperationDetail.user = user;

		// Create new Order planning operation detail model instance
		var orderPlanningOperationDetailObj = new OrderPlanningOperationDetail(orderPlanningOperationDetail);

		// Save the Order planning operation detail
		orderPlanningOperationDetailObj.save(function() {
			// Try deleting Order planning operation detail
			request(app).delete('/order-planning-operation-details/' + orderPlanningOperationDetailObj._id)
			.expect(401)
			.end(function(orderPlanningOperationDetailDeleteErr, orderPlanningOperationDetailDeleteRes) {
				// Set message assertion
				(orderPlanningOperationDetailDeleteRes.body.message).should.match('User is not logged in');

				// Handle Order planning operation detail error error
				done(orderPlanningOperationDetailDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		OrderPlanningOperationDetail.remove().exec();
		done();
	});
});