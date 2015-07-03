'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	OrderRegistrationMeasurementDetail = mongoose.model('OrderRegistrationMeasurementDetail'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, orderRegistrationMeasurementDetail;

/**
 * Order registration measurement detail routes tests
 */
describe('Order registration measurement detail CRUD tests', function() {
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

		// Save a user to the test db and create new Order registration measurement detail
		user.save(function() {
			orderRegistrationMeasurementDetail = {
				name: 'Order registration measurement detail Name'
			};

			done();
		});
	});

	it('should be able to save Order registration measurement detail instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Order registration measurement detail
				agent.post('/order-registration-measurement-details')
					.send(orderRegistrationMeasurementDetail)
					.expect(200)
					.end(function(orderRegistrationMeasurementDetailSaveErr, orderRegistrationMeasurementDetailSaveRes) {
						// Handle Order registration measurement detail save error
						if (orderRegistrationMeasurementDetailSaveErr) done(orderRegistrationMeasurementDetailSaveErr);

						// Get a list of Order registration measurement details
						agent.get('/order-registration-measurement-details')
							.end(function(orderRegistrationMeasurementDetailsGetErr, orderRegistrationMeasurementDetailsGetRes) {
								// Handle Order registration measurement detail save error
								if (orderRegistrationMeasurementDetailsGetErr) done(orderRegistrationMeasurementDetailsGetErr);

								// Get Order registration measurement details list
								var orderRegistrationMeasurementDetails = orderRegistrationMeasurementDetailsGetRes.body;

								// Set assertions
								(orderRegistrationMeasurementDetails[0].user._id).should.equal(userId);
								(orderRegistrationMeasurementDetails[0].name).should.match('Order registration measurement detail Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Order registration measurement detail instance if not logged in', function(done) {
		agent.post('/order-registration-measurement-details')
			.send(orderRegistrationMeasurementDetail)
			.expect(401)
			.end(function(orderRegistrationMeasurementDetailSaveErr, orderRegistrationMeasurementDetailSaveRes) {
				// Call the assertion callback
				done(orderRegistrationMeasurementDetailSaveErr);
			});
	});

	it('should not be able to save Order registration measurement detail instance if no name is provided', function(done) {
		// Invalidate name field
		orderRegistrationMeasurementDetail.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Order registration measurement detail
				agent.post('/order-registration-measurement-details')
					.send(orderRegistrationMeasurementDetail)
					.expect(400)
					.end(function(orderRegistrationMeasurementDetailSaveErr, orderRegistrationMeasurementDetailSaveRes) {
						// Set message assertion
						(orderRegistrationMeasurementDetailSaveRes.body.message).should.match('Please fill Order registration measurement detail name');
						
						// Handle Order registration measurement detail save error
						done(orderRegistrationMeasurementDetailSaveErr);
					});
			});
	});

	it('should be able to update Order registration measurement detail instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Order registration measurement detail
				agent.post('/order-registration-measurement-details')
					.send(orderRegistrationMeasurementDetail)
					.expect(200)
					.end(function(orderRegistrationMeasurementDetailSaveErr, orderRegistrationMeasurementDetailSaveRes) {
						// Handle Order registration measurement detail save error
						if (orderRegistrationMeasurementDetailSaveErr) done(orderRegistrationMeasurementDetailSaveErr);

						// Update Order registration measurement detail name
						orderRegistrationMeasurementDetail.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Order registration measurement detail
						agent.put('/order-registration-measurement-details/' + orderRegistrationMeasurementDetailSaveRes.body._id)
							.send(orderRegistrationMeasurementDetail)
							.expect(200)
							.end(function(orderRegistrationMeasurementDetailUpdateErr, orderRegistrationMeasurementDetailUpdateRes) {
								// Handle Order registration measurement detail update error
								if (orderRegistrationMeasurementDetailUpdateErr) done(orderRegistrationMeasurementDetailUpdateErr);

								// Set assertions
								(orderRegistrationMeasurementDetailUpdateRes.body._id).should.equal(orderRegistrationMeasurementDetailSaveRes.body._id);
								(orderRegistrationMeasurementDetailUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Order registration measurement details if not signed in', function(done) {
		// Create new Order registration measurement detail model instance
		var orderRegistrationMeasurementDetailObj = new OrderRegistrationMeasurementDetail(orderRegistrationMeasurementDetail);

		// Save the Order registration measurement detail
		orderRegistrationMeasurementDetailObj.save(function() {
			// Request Order registration measurement details
			request(app).get('/order-registration-measurement-details')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Order registration measurement detail if not signed in', function(done) {
		// Create new Order registration measurement detail model instance
		var orderRegistrationMeasurementDetailObj = new OrderRegistrationMeasurementDetail(orderRegistrationMeasurementDetail);

		// Save the Order registration measurement detail
		orderRegistrationMeasurementDetailObj.save(function() {
			request(app).get('/order-registration-measurement-details/' + orderRegistrationMeasurementDetailObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', orderRegistrationMeasurementDetail.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Order registration measurement detail instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Order registration measurement detail
				agent.post('/order-registration-measurement-details')
					.send(orderRegistrationMeasurementDetail)
					.expect(200)
					.end(function(orderRegistrationMeasurementDetailSaveErr, orderRegistrationMeasurementDetailSaveRes) {
						// Handle Order registration measurement detail save error
						if (orderRegistrationMeasurementDetailSaveErr) done(orderRegistrationMeasurementDetailSaveErr);

						// Delete existing Order registration measurement detail
						agent.delete('/order-registration-measurement-details/' + orderRegistrationMeasurementDetailSaveRes.body._id)
							.send(orderRegistrationMeasurementDetail)
							.expect(200)
							.end(function(orderRegistrationMeasurementDetailDeleteErr, orderRegistrationMeasurementDetailDeleteRes) {
								// Handle Order registration measurement detail error error
								if (orderRegistrationMeasurementDetailDeleteErr) done(orderRegistrationMeasurementDetailDeleteErr);

								// Set assertions
								(orderRegistrationMeasurementDetailDeleteRes.body._id).should.equal(orderRegistrationMeasurementDetailSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Order registration measurement detail instance if not signed in', function(done) {
		// Set Order registration measurement detail user 
		orderRegistrationMeasurementDetail.user = user;

		// Create new Order registration measurement detail model instance
		var orderRegistrationMeasurementDetailObj = new OrderRegistrationMeasurementDetail(orderRegistrationMeasurementDetail);

		// Save the Order registration measurement detail
		orderRegistrationMeasurementDetailObj.save(function() {
			// Try deleting Order registration measurement detail
			request(app).delete('/order-registration-measurement-details/' + orderRegistrationMeasurementDetailObj._id)
			.expect(401)
			.end(function(orderRegistrationMeasurementDetailDeleteErr, orderRegistrationMeasurementDetailDeleteRes) {
				// Set message assertion
				(orderRegistrationMeasurementDetailDeleteRes.body.message).should.match('User is not logged in');

				// Handle Order registration measurement detail error error
				done(orderRegistrationMeasurementDetailDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		OrderRegistrationMeasurementDetail.remove().exec();
		done();
	});
});