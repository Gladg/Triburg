'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	OrderRegistrationRoot = mongoose.model('OrderRegistrationRoot'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, orderRegistrationRoot;

/**
 * Order registration root routes tests
 */
describe('Order registration root CRUD tests', function() {
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

		// Save a user to the test db and create new Order registration root
		user.save(function() {
			orderRegistrationRoot = {
				name: 'Order registration root Name'
			};

			done();
		});
	});

	it('should be able to save Order registration root instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Order registration root
				agent.post('/order-registration-roots')
					.send(orderRegistrationRoot)
					.expect(200)
					.end(function(orderRegistrationRootSaveErr, orderRegistrationRootSaveRes) {
						// Handle Order registration root save error
						if (orderRegistrationRootSaveErr) done(orderRegistrationRootSaveErr);

						// Get a list of Order registration roots
						agent.get('/order-registration-roots')
							.end(function(orderRegistrationRootsGetErr, orderRegistrationRootsGetRes) {
								// Handle Order registration root save error
								if (orderRegistrationRootsGetErr) done(orderRegistrationRootsGetErr);

								// Get Order registration roots list
								var orderRegistrationRoots = orderRegistrationRootsGetRes.body;

								// Set assertions
								(orderRegistrationRoots[0].user._id).should.equal(userId);
								(orderRegistrationRoots[0].name).should.match('Order registration root Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Order registration root instance if not logged in', function(done) {
		agent.post('/order-registration-roots')
			.send(orderRegistrationRoot)
			.expect(401)
			.end(function(orderRegistrationRootSaveErr, orderRegistrationRootSaveRes) {
				// Call the assertion callback
				done(orderRegistrationRootSaveErr);
			});
	});

	it('should not be able to save Order registration root instance if no name is provided', function(done) {
		// Invalidate name field
		orderRegistrationRoot.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Order registration root
				agent.post('/order-registration-roots')
					.send(orderRegistrationRoot)
					.expect(400)
					.end(function(orderRegistrationRootSaveErr, orderRegistrationRootSaveRes) {
						// Set message assertion
						(orderRegistrationRootSaveRes.body.message).should.match('Please fill Order registration root name');
						
						// Handle Order registration root save error
						done(orderRegistrationRootSaveErr);
					});
			});
	});

	it('should be able to update Order registration root instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Order registration root
				agent.post('/order-registration-roots')
					.send(orderRegistrationRoot)
					.expect(200)
					.end(function(orderRegistrationRootSaveErr, orderRegistrationRootSaveRes) {
						// Handle Order registration root save error
						if (orderRegistrationRootSaveErr) done(orderRegistrationRootSaveErr);

						// Update Order registration root name
						orderRegistrationRoot.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Order registration root
						agent.put('/order-registration-roots/' + orderRegistrationRootSaveRes.body._id)
							.send(orderRegistrationRoot)
							.expect(200)
							.end(function(orderRegistrationRootUpdateErr, orderRegistrationRootUpdateRes) {
								// Handle Order registration root update error
								if (orderRegistrationRootUpdateErr) done(orderRegistrationRootUpdateErr);

								// Set assertions
								(orderRegistrationRootUpdateRes.body._id).should.equal(orderRegistrationRootSaveRes.body._id);
								(orderRegistrationRootUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Order registration roots if not signed in', function(done) {
		// Create new Order registration root model instance
		var orderRegistrationRootObj = new OrderRegistrationRoot(orderRegistrationRoot);

		// Save the Order registration root
		orderRegistrationRootObj.save(function() {
			// Request Order registration roots
			request(app).get('/order-registration-roots')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Order registration root if not signed in', function(done) {
		// Create new Order registration root model instance
		var orderRegistrationRootObj = new OrderRegistrationRoot(orderRegistrationRoot);

		// Save the Order registration root
		orderRegistrationRootObj.save(function() {
			request(app).get('/order-registration-roots/' + orderRegistrationRootObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', orderRegistrationRoot.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Order registration root instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Order registration root
				agent.post('/order-registration-roots')
					.send(orderRegistrationRoot)
					.expect(200)
					.end(function(orderRegistrationRootSaveErr, orderRegistrationRootSaveRes) {
						// Handle Order registration root save error
						if (orderRegistrationRootSaveErr) done(orderRegistrationRootSaveErr);

						// Delete existing Order registration root
						agent.delete('/order-registration-roots/' + orderRegistrationRootSaveRes.body._id)
							.send(orderRegistrationRoot)
							.expect(200)
							.end(function(orderRegistrationRootDeleteErr, orderRegistrationRootDeleteRes) {
								// Handle Order registration root error error
								if (orderRegistrationRootDeleteErr) done(orderRegistrationRootDeleteErr);

								// Set assertions
								(orderRegistrationRootDeleteRes.body._id).should.equal(orderRegistrationRootSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Order registration root instance if not signed in', function(done) {
		// Set Order registration root user 
		orderRegistrationRoot.user = user;

		// Create new Order registration root model instance
		var orderRegistrationRootObj = new OrderRegistrationRoot(orderRegistrationRoot);

		// Save the Order registration root
		orderRegistrationRootObj.save(function() {
			// Try deleting Order registration root
			request(app).delete('/order-registration-roots/' + orderRegistrationRootObj._id)
			.expect(401)
			.end(function(orderRegistrationRootDeleteErr, orderRegistrationRootDeleteRes) {
				// Set message assertion
				(orderRegistrationRootDeleteRes.body.message).should.match('User is not logged in');

				// Handle Order registration root error error
				done(orderRegistrationRootDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		OrderRegistrationRoot.remove().exec();
		done();
	});
});