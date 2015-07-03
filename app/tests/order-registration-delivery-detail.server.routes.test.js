'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	OrderRegistrationDeliveryDetail = mongoose.model('OrderRegistrationDeliveryDetail'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, orderRegistrationDeliveryDetail;

/**
 * Order registration delivery detail routes tests
 */
describe('Order registration delivery detail CRUD tests', function() {
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

		// Save a user to the test db and create new Order registration delivery detail
		user.save(function() {
			orderRegistrationDeliveryDetail = {
				name: 'Order registration delivery detail Name'
			};

			done();
		});
	});

	it('should be able to save Order registration delivery detail instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Order registration delivery detail
				agent.post('/order-registration-delivery-details')
					.send(orderRegistrationDeliveryDetail)
					.expect(200)
					.end(function(orderRegistrationDeliveryDetailSaveErr, orderRegistrationDeliveryDetailSaveRes) {
						// Handle Order registration delivery detail save error
						if (orderRegistrationDeliveryDetailSaveErr) done(orderRegistrationDeliveryDetailSaveErr);

						// Get a list of Order registration delivery details
						agent.get('/order-registration-delivery-details')
							.end(function(orderRegistrationDeliveryDetailsGetErr, orderRegistrationDeliveryDetailsGetRes) {
								// Handle Order registration delivery detail save error
								if (orderRegistrationDeliveryDetailsGetErr) done(orderRegistrationDeliveryDetailsGetErr);

								// Get Order registration delivery details list
								var orderRegistrationDeliveryDetails = orderRegistrationDeliveryDetailsGetRes.body;

								// Set assertions
								(orderRegistrationDeliveryDetails[0].user._id).should.equal(userId);
								(orderRegistrationDeliveryDetails[0].name).should.match('Order registration delivery detail Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Order registration delivery detail instance if not logged in', function(done) {
		agent.post('/order-registration-delivery-details')
			.send(orderRegistrationDeliveryDetail)
			.expect(401)
			.end(function(orderRegistrationDeliveryDetailSaveErr, orderRegistrationDeliveryDetailSaveRes) {
				// Call the assertion callback
				done(orderRegistrationDeliveryDetailSaveErr);
			});
	});

	it('should not be able to save Order registration delivery detail instance if no name is provided', function(done) {
		// Invalidate name field
		orderRegistrationDeliveryDetail.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Order registration delivery detail
				agent.post('/order-registration-delivery-details')
					.send(orderRegistrationDeliveryDetail)
					.expect(400)
					.end(function(orderRegistrationDeliveryDetailSaveErr, orderRegistrationDeliveryDetailSaveRes) {
						// Set message assertion
						(orderRegistrationDeliveryDetailSaveRes.body.message).should.match('Please fill Order registration delivery detail name');
						
						// Handle Order registration delivery detail save error
						done(orderRegistrationDeliveryDetailSaveErr);
					});
			});
	});

	it('should be able to update Order registration delivery detail instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Order registration delivery detail
				agent.post('/order-registration-delivery-details')
					.send(orderRegistrationDeliveryDetail)
					.expect(200)
					.end(function(orderRegistrationDeliveryDetailSaveErr, orderRegistrationDeliveryDetailSaveRes) {
						// Handle Order registration delivery detail save error
						if (orderRegistrationDeliveryDetailSaveErr) done(orderRegistrationDeliveryDetailSaveErr);

						// Update Order registration delivery detail name
						orderRegistrationDeliveryDetail.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Order registration delivery detail
						agent.put('/order-registration-delivery-details/' + orderRegistrationDeliveryDetailSaveRes.body._id)
							.send(orderRegistrationDeliveryDetail)
							.expect(200)
							.end(function(orderRegistrationDeliveryDetailUpdateErr, orderRegistrationDeliveryDetailUpdateRes) {
								// Handle Order registration delivery detail update error
								if (orderRegistrationDeliveryDetailUpdateErr) done(orderRegistrationDeliveryDetailUpdateErr);

								// Set assertions
								(orderRegistrationDeliveryDetailUpdateRes.body._id).should.equal(orderRegistrationDeliveryDetailSaveRes.body._id);
								(orderRegistrationDeliveryDetailUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Order registration delivery details if not signed in', function(done) {
		// Create new Order registration delivery detail model instance
		var orderRegistrationDeliveryDetailObj = new OrderRegistrationDeliveryDetail(orderRegistrationDeliveryDetail);

		// Save the Order registration delivery detail
		orderRegistrationDeliveryDetailObj.save(function() {
			// Request Order registration delivery details
			request(app).get('/order-registration-delivery-details')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Order registration delivery detail if not signed in', function(done) {
		// Create new Order registration delivery detail model instance
		var orderRegistrationDeliveryDetailObj = new OrderRegistrationDeliveryDetail(orderRegistrationDeliveryDetail);

		// Save the Order registration delivery detail
		orderRegistrationDeliveryDetailObj.save(function() {
			request(app).get('/order-registration-delivery-details/' + orderRegistrationDeliveryDetailObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', orderRegistrationDeliveryDetail.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Order registration delivery detail instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Order registration delivery detail
				agent.post('/order-registration-delivery-details')
					.send(orderRegistrationDeliveryDetail)
					.expect(200)
					.end(function(orderRegistrationDeliveryDetailSaveErr, orderRegistrationDeliveryDetailSaveRes) {
						// Handle Order registration delivery detail save error
						if (orderRegistrationDeliveryDetailSaveErr) done(orderRegistrationDeliveryDetailSaveErr);

						// Delete existing Order registration delivery detail
						agent.delete('/order-registration-delivery-details/' + orderRegistrationDeliveryDetailSaveRes.body._id)
							.send(orderRegistrationDeliveryDetail)
							.expect(200)
							.end(function(orderRegistrationDeliveryDetailDeleteErr, orderRegistrationDeliveryDetailDeleteRes) {
								// Handle Order registration delivery detail error error
								if (orderRegistrationDeliveryDetailDeleteErr) done(orderRegistrationDeliveryDetailDeleteErr);

								// Set assertions
								(orderRegistrationDeliveryDetailDeleteRes.body._id).should.equal(orderRegistrationDeliveryDetailSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Order registration delivery detail instance if not signed in', function(done) {
		// Set Order registration delivery detail user 
		orderRegistrationDeliveryDetail.user = user;

		// Create new Order registration delivery detail model instance
		var orderRegistrationDeliveryDetailObj = new OrderRegistrationDeliveryDetail(orderRegistrationDeliveryDetail);

		// Save the Order registration delivery detail
		orderRegistrationDeliveryDetailObj.save(function() {
			// Try deleting Order registration delivery detail
			request(app).delete('/order-registration-delivery-details/' + orderRegistrationDeliveryDetailObj._id)
			.expect(401)
			.end(function(orderRegistrationDeliveryDetailDeleteErr, orderRegistrationDeliveryDetailDeleteRes) {
				// Set message assertion
				(orderRegistrationDeliveryDetailDeleteRes.body.message).should.match('User is not logged in');

				// Handle Order registration delivery detail error error
				done(orderRegistrationDeliveryDetailDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		OrderRegistrationDeliveryDetail.remove().exec();
		done();
	});
});