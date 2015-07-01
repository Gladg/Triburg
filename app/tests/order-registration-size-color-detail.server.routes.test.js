'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	OrderRegistrationSizeColorDetail = mongoose.model('OrderRegistrationSizeColorDetail'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, orderRegistrationSizeColorDetail;

/**
 * Order registration size color detail routes tests
 */
describe('Order registration size color detail CRUD tests', function() {
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

		// Save a user to the test db and create new Order registration size color detail
		user.save(function() {
			orderRegistrationSizeColorDetail = {
				name: 'Order registration size color detail Name'
			};

			done();
		});
	});

	it('should be able to save Order registration size color detail instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Order registration size color detail
				agent.post('/order-registration-size-color-details')
					.send(orderRegistrationSizeColorDetail)
					.expect(200)
					.end(function(orderRegistrationSizeColorDetailSaveErr, orderRegistrationSizeColorDetailSaveRes) {
						// Handle Order registration size color detail save error
						if (orderRegistrationSizeColorDetailSaveErr) done(orderRegistrationSizeColorDetailSaveErr);

						// Get a list of Order registration size color details
						agent.get('/order-registration-size-color-details')
							.end(function(orderRegistrationSizeColorDetailsGetErr, orderRegistrationSizeColorDetailsGetRes) {
								// Handle Order registration size color detail save error
								if (orderRegistrationSizeColorDetailsGetErr) done(orderRegistrationSizeColorDetailsGetErr);

								// Get Order registration size color details list
								var orderRegistrationSizeColorDetails = orderRegistrationSizeColorDetailsGetRes.body;

								// Set assertions
								(orderRegistrationSizeColorDetails[0].user._id).should.equal(userId);
								(orderRegistrationSizeColorDetails[0].name).should.match('Order registration size color detail Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Order registration size color detail instance if not logged in', function(done) {
		agent.post('/order-registration-size-color-details')
			.send(orderRegistrationSizeColorDetail)
			.expect(401)
			.end(function(orderRegistrationSizeColorDetailSaveErr, orderRegistrationSizeColorDetailSaveRes) {
				// Call the assertion callback
				done(orderRegistrationSizeColorDetailSaveErr);
			});
	});

	it('should not be able to save Order registration size color detail instance if no name is provided', function(done) {
		// Invalidate name field
		orderRegistrationSizeColorDetail.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Order registration size color detail
				agent.post('/order-registration-size-color-details')
					.send(orderRegistrationSizeColorDetail)
					.expect(400)
					.end(function(orderRegistrationSizeColorDetailSaveErr, orderRegistrationSizeColorDetailSaveRes) {
						// Set message assertion
						(orderRegistrationSizeColorDetailSaveRes.body.message).should.match('Please fill Order registration size color detail name');
						
						// Handle Order registration size color detail save error
						done(orderRegistrationSizeColorDetailSaveErr);
					});
			});
	});

	it('should be able to update Order registration size color detail instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Order registration size color detail
				agent.post('/order-registration-size-color-details')
					.send(orderRegistrationSizeColorDetail)
					.expect(200)
					.end(function(orderRegistrationSizeColorDetailSaveErr, orderRegistrationSizeColorDetailSaveRes) {
						// Handle Order registration size color detail save error
						if (orderRegistrationSizeColorDetailSaveErr) done(orderRegistrationSizeColorDetailSaveErr);

						// Update Order registration size color detail name
						orderRegistrationSizeColorDetail.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Order registration size color detail
						agent.put('/order-registration-size-color-details/' + orderRegistrationSizeColorDetailSaveRes.body._id)
							.send(orderRegistrationSizeColorDetail)
							.expect(200)
							.end(function(orderRegistrationSizeColorDetailUpdateErr, orderRegistrationSizeColorDetailUpdateRes) {
								// Handle Order registration size color detail update error
								if (orderRegistrationSizeColorDetailUpdateErr) done(orderRegistrationSizeColorDetailUpdateErr);

								// Set assertions
								(orderRegistrationSizeColorDetailUpdateRes.body._id).should.equal(orderRegistrationSizeColorDetailSaveRes.body._id);
								(orderRegistrationSizeColorDetailUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Order registration size color details if not signed in', function(done) {
		// Create new Order registration size color detail model instance
		var orderRegistrationSizeColorDetailObj = new OrderRegistrationSizeColorDetail(orderRegistrationSizeColorDetail);

		// Save the Order registration size color detail
		orderRegistrationSizeColorDetailObj.save(function() {
			// Request Order registration size color details
			request(app).get('/order-registration-size-color-details')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Order registration size color detail if not signed in', function(done) {
		// Create new Order registration size color detail model instance
		var orderRegistrationSizeColorDetailObj = new OrderRegistrationSizeColorDetail(orderRegistrationSizeColorDetail);

		// Save the Order registration size color detail
		orderRegistrationSizeColorDetailObj.save(function() {
			request(app).get('/order-registration-size-color-details/' + orderRegistrationSizeColorDetailObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', orderRegistrationSizeColorDetail.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Order registration size color detail instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Order registration size color detail
				agent.post('/order-registration-size-color-details')
					.send(orderRegistrationSizeColorDetail)
					.expect(200)
					.end(function(orderRegistrationSizeColorDetailSaveErr, orderRegistrationSizeColorDetailSaveRes) {
						// Handle Order registration size color detail save error
						if (orderRegistrationSizeColorDetailSaveErr) done(orderRegistrationSizeColorDetailSaveErr);

						// Delete existing Order registration size color detail
						agent.delete('/order-registration-size-color-details/' + orderRegistrationSizeColorDetailSaveRes.body._id)
							.send(orderRegistrationSizeColorDetail)
							.expect(200)
							.end(function(orderRegistrationSizeColorDetailDeleteErr, orderRegistrationSizeColorDetailDeleteRes) {
								// Handle Order registration size color detail error error
								if (orderRegistrationSizeColorDetailDeleteErr) done(orderRegistrationSizeColorDetailDeleteErr);

								// Set assertions
								(orderRegistrationSizeColorDetailDeleteRes.body._id).should.equal(orderRegistrationSizeColorDetailSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Order registration size color detail instance if not signed in', function(done) {
		// Set Order registration size color detail user 
		orderRegistrationSizeColorDetail.user = user;

		// Create new Order registration size color detail model instance
		var orderRegistrationSizeColorDetailObj = new OrderRegistrationSizeColorDetail(orderRegistrationSizeColorDetail);

		// Save the Order registration size color detail
		orderRegistrationSizeColorDetailObj.save(function() {
			// Try deleting Order registration size color detail
			request(app).delete('/order-registration-size-color-details/' + orderRegistrationSizeColorDetailObj._id)
			.expect(401)
			.end(function(orderRegistrationSizeColorDetailDeleteErr, orderRegistrationSizeColorDetailDeleteRes) {
				// Set message assertion
				(orderRegistrationSizeColorDetailDeleteRes.body.message).should.match('User is not logged in');

				// Handle Order registration size color detail error error
				done(orderRegistrationSizeColorDetailDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		OrderRegistrationSizeColorDetail.remove().exec();
		done();
	});
});