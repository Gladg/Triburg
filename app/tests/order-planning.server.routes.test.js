'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	OrderPlanning = mongoose.model('OrderPlanning'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, orderPlanning;

/**
 * Order planning routes tests
 */
describe('Order planning CRUD tests', function() {
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

		// Save a user to the test db and create new Order planning
		user.save(function() {
			orderPlanning = {
				name: 'Order planning Name'
			};

			done();
		});
	});

	it('should be able to save Order planning instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Order planning
				agent.post('/order-plannings')
					.send(orderPlanning)
					.expect(200)
					.end(function(orderPlanningSaveErr, orderPlanningSaveRes) {
						// Handle Order planning save error
						if (orderPlanningSaveErr) done(orderPlanningSaveErr);

						// Get a list of Order plannings
						agent.get('/order-plannings')
							.end(function(orderPlanningsGetErr, orderPlanningsGetRes) {
								// Handle Order planning save error
								if (orderPlanningsGetErr) done(orderPlanningsGetErr);

								// Get Order plannings list
								var orderPlannings = orderPlanningsGetRes.body;

								// Set assertions
								(orderPlannings[0].user._id).should.equal(userId);
								(orderPlannings[0].name).should.match('Order planning Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Order planning instance if not logged in', function(done) {
		agent.post('/order-plannings')
			.send(orderPlanning)
			.expect(401)
			.end(function(orderPlanningSaveErr, orderPlanningSaveRes) {
				// Call the assertion callback
				done(orderPlanningSaveErr);
			});
	});

	it('should not be able to save Order planning instance if no name is provided', function(done) {
		// Invalidate name field
		orderPlanning.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Order planning
				agent.post('/order-plannings')
					.send(orderPlanning)
					.expect(400)
					.end(function(orderPlanningSaveErr, orderPlanningSaveRes) {
						// Set message assertion
						(orderPlanningSaveRes.body.message).should.match('Please fill Order planning name');
						
						// Handle Order planning save error
						done(orderPlanningSaveErr);
					});
			});
	});

	it('should be able to update Order planning instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Order planning
				agent.post('/order-plannings')
					.send(orderPlanning)
					.expect(200)
					.end(function(orderPlanningSaveErr, orderPlanningSaveRes) {
						// Handle Order planning save error
						if (orderPlanningSaveErr) done(orderPlanningSaveErr);

						// Update Order planning name
						orderPlanning.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Order planning
						agent.put('/order-plannings/' + orderPlanningSaveRes.body._id)
							.send(orderPlanning)
							.expect(200)
							.end(function(orderPlanningUpdateErr, orderPlanningUpdateRes) {
								// Handle Order planning update error
								if (orderPlanningUpdateErr) done(orderPlanningUpdateErr);

								// Set assertions
								(orderPlanningUpdateRes.body._id).should.equal(orderPlanningSaveRes.body._id);
								(orderPlanningUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Order plannings if not signed in', function(done) {
		// Create new Order planning model instance
		var orderPlanningObj = new OrderPlanning(orderPlanning);

		// Save the Order planning
		orderPlanningObj.save(function() {
			// Request Order plannings
			request(app).get('/order-plannings')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Order planning if not signed in', function(done) {
		// Create new Order planning model instance
		var orderPlanningObj = new OrderPlanning(orderPlanning);

		// Save the Order planning
		orderPlanningObj.save(function() {
			request(app).get('/order-plannings/' + orderPlanningObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', orderPlanning.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Order planning instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Order planning
				agent.post('/order-plannings')
					.send(orderPlanning)
					.expect(200)
					.end(function(orderPlanningSaveErr, orderPlanningSaveRes) {
						// Handle Order planning save error
						if (orderPlanningSaveErr) done(orderPlanningSaveErr);

						// Delete existing Order planning
						agent.delete('/order-plannings/' + orderPlanningSaveRes.body._id)
							.send(orderPlanning)
							.expect(200)
							.end(function(orderPlanningDeleteErr, orderPlanningDeleteRes) {
								// Handle Order planning error error
								if (orderPlanningDeleteErr) done(orderPlanningDeleteErr);

								// Set assertions
								(orderPlanningDeleteRes.body._id).should.equal(orderPlanningSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Order planning instance if not signed in', function(done) {
		// Set Order planning user 
		orderPlanning.user = user;

		// Create new Order planning model instance
		var orderPlanningObj = new OrderPlanning(orderPlanning);

		// Save the Order planning
		orderPlanningObj.save(function() {
			// Try deleting Order planning
			request(app).delete('/order-plannings/' + orderPlanningObj._id)
			.expect(401)
			.end(function(orderPlanningDeleteErr, orderPlanningDeleteRes) {
				// Set message assertion
				(orderPlanningDeleteRes.body.message).should.match('User is not logged in');

				// Handle Order planning error error
				done(orderPlanningDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		OrderPlanning.remove().exec();
		done();
	});
});