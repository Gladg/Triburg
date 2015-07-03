'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	OrderRegistrationAccessoryDetail = mongoose.model('OrderRegistrationAccessoryDetail'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, orderRegistrationAccessoryDetail;

/**
 * Order registration accessory detail routes tests
 */
describe('Order registration accessory detail CRUD tests', function() {
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

		// Save a user to the test db and create new Order registration accessory detail
		user.save(function() {
			orderRegistrationAccessoryDetail = {
				name: 'Order registration accessory detail Name'
			};

			done();
		});
	});

	it('should be able to save Order registration accessory detail instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Order registration accessory detail
				agent.post('/order-registration-accessory-details')
					.send(orderRegistrationAccessoryDetail)
					.expect(200)
					.end(function(orderRegistrationAccessoryDetailSaveErr, orderRegistrationAccessoryDetailSaveRes) {
						// Handle Order registration accessory detail save error
						if (orderRegistrationAccessoryDetailSaveErr) done(orderRegistrationAccessoryDetailSaveErr);

						// Get a list of Order registration accessory details
						agent.get('/order-registration-accessory-details')
							.end(function(orderRegistrationAccessoryDetailsGetErr, orderRegistrationAccessoryDetailsGetRes) {
								// Handle Order registration accessory detail save error
								if (orderRegistrationAccessoryDetailsGetErr) done(orderRegistrationAccessoryDetailsGetErr);

								// Get Order registration accessory details list
								var orderRegistrationAccessoryDetails = orderRegistrationAccessoryDetailsGetRes.body;

								// Set assertions
								(orderRegistrationAccessoryDetails[0].user._id).should.equal(userId);
								(orderRegistrationAccessoryDetails[0].name).should.match('Order registration accessory detail Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Order registration accessory detail instance if not logged in', function(done) {
		agent.post('/order-registration-accessory-details')
			.send(orderRegistrationAccessoryDetail)
			.expect(401)
			.end(function(orderRegistrationAccessoryDetailSaveErr, orderRegistrationAccessoryDetailSaveRes) {
				// Call the assertion callback
				done(orderRegistrationAccessoryDetailSaveErr);
			});
	});

	it('should not be able to save Order registration accessory detail instance if no name is provided', function(done) {
		// Invalidate name field
		orderRegistrationAccessoryDetail.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Order registration accessory detail
				agent.post('/order-registration-accessory-details')
					.send(orderRegistrationAccessoryDetail)
					.expect(400)
					.end(function(orderRegistrationAccessoryDetailSaveErr, orderRegistrationAccessoryDetailSaveRes) {
						// Set message assertion
						(orderRegistrationAccessoryDetailSaveRes.body.message).should.match('Please fill Order registration accessory detail name');
						
						// Handle Order registration accessory detail save error
						done(orderRegistrationAccessoryDetailSaveErr);
					});
			});
	});

	it('should be able to update Order registration accessory detail instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Order registration accessory detail
				agent.post('/order-registration-accessory-details')
					.send(orderRegistrationAccessoryDetail)
					.expect(200)
					.end(function(orderRegistrationAccessoryDetailSaveErr, orderRegistrationAccessoryDetailSaveRes) {
						// Handle Order registration accessory detail save error
						if (orderRegistrationAccessoryDetailSaveErr) done(orderRegistrationAccessoryDetailSaveErr);

						// Update Order registration accessory detail name
						orderRegistrationAccessoryDetail.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Order registration accessory detail
						agent.put('/order-registration-accessory-details/' + orderRegistrationAccessoryDetailSaveRes.body._id)
							.send(orderRegistrationAccessoryDetail)
							.expect(200)
							.end(function(orderRegistrationAccessoryDetailUpdateErr, orderRegistrationAccessoryDetailUpdateRes) {
								// Handle Order registration accessory detail update error
								if (orderRegistrationAccessoryDetailUpdateErr) done(orderRegistrationAccessoryDetailUpdateErr);

								// Set assertions
								(orderRegistrationAccessoryDetailUpdateRes.body._id).should.equal(orderRegistrationAccessoryDetailSaveRes.body._id);
								(orderRegistrationAccessoryDetailUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Order registration accessory details if not signed in', function(done) {
		// Create new Order registration accessory detail model instance
		var orderRegistrationAccessoryDetailObj = new OrderRegistrationAccessoryDetail(orderRegistrationAccessoryDetail);

		// Save the Order registration accessory detail
		orderRegistrationAccessoryDetailObj.save(function() {
			// Request Order registration accessory details
			request(app).get('/order-registration-accessory-details')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Order registration accessory detail if not signed in', function(done) {
		// Create new Order registration accessory detail model instance
		var orderRegistrationAccessoryDetailObj = new OrderRegistrationAccessoryDetail(orderRegistrationAccessoryDetail);

		// Save the Order registration accessory detail
		orderRegistrationAccessoryDetailObj.save(function() {
			request(app).get('/order-registration-accessory-details/' + orderRegistrationAccessoryDetailObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', orderRegistrationAccessoryDetail.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Order registration accessory detail instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Order registration accessory detail
				agent.post('/order-registration-accessory-details')
					.send(orderRegistrationAccessoryDetail)
					.expect(200)
					.end(function(orderRegistrationAccessoryDetailSaveErr, orderRegistrationAccessoryDetailSaveRes) {
						// Handle Order registration accessory detail save error
						if (orderRegistrationAccessoryDetailSaveErr) done(orderRegistrationAccessoryDetailSaveErr);

						// Delete existing Order registration accessory detail
						agent.delete('/order-registration-accessory-details/' + orderRegistrationAccessoryDetailSaveRes.body._id)
							.send(orderRegistrationAccessoryDetail)
							.expect(200)
							.end(function(orderRegistrationAccessoryDetailDeleteErr, orderRegistrationAccessoryDetailDeleteRes) {
								// Handle Order registration accessory detail error error
								if (orderRegistrationAccessoryDetailDeleteErr) done(orderRegistrationAccessoryDetailDeleteErr);

								// Set assertions
								(orderRegistrationAccessoryDetailDeleteRes.body._id).should.equal(orderRegistrationAccessoryDetailSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Order registration accessory detail instance if not signed in', function(done) {
		// Set Order registration accessory detail user 
		orderRegistrationAccessoryDetail.user = user;

		// Create new Order registration accessory detail model instance
		var orderRegistrationAccessoryDetailObj = new OrderRegistrationAccessoryDetail(orderRegistrationAccessoryDetail);

		// Save the Order registration accessory detail
		orderRegistrationAccessoryDetailObj.save(function() {
			// Try deleting Order registration accessory detail
			request(app).delete('/order-registration-accessory-details/' + orderRegistrationAccessoryDetailObj._id)
			.expect(401)
			.end(function(orderRegistrationAccessoryDetailDeleteErr, orderRegistrationAccessoryDetailDeleteRes) {
				// Set message assertion
				(orderRegistrationAccessoryDetailDeleteRes.body.message).should.match('User is not logged in');

				// Handle Order registration accessory detail error error
				done(orderRegistrationAccessoryDetailDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		OrderRegistrationAccessoryDetail.remove().exec();
		done();
	});
});