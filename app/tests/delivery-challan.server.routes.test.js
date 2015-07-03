'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	DeliveryChallan = mongoose.model('DeliveryChallan'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, deliveryChallan;

/**
 * Delivery challan routes tests
 */
describe('Delivery challan CRUD tests', function() {
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

		// Save a user to the test db and create new Delivery challan
		user.save(function() {
			deliveryChallan = {
				name: 'Delivery challan Name'
			};

			done();
		});
	});

	it('should be able to save Delivery challan instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Delivery challan
				agent.post('/delivery-challans')
					.send(deliveryChallan)
					.expect(200)
					.end(function(deliveryChallanSaveErr, deliveryChallanSaveRes) {
						// Handle Delivery challan save error
						if (deliveryChallanSaveErr) done(deliveryChallanSaveErr);

						// Get a list of Delivery challans
						agent.get('/delivery-challans')
							.end(function(deliveryChallansGetErr, deliveryChallansGetRes) {
								// Handle Delivery challan save error
								if (deliveryChallansGetErr) done(deliveryChallansGetErr);

								// Get Delivery challans list
								var deliveryChallans = deliveryChallansGetRes.body;

								// Set assertions
								(deliveryChallans[0].user._id).should.equal(userId);
								(deliveryChallans[0].name).should.match('Delivery challan Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Delivery challan instance if not logged in', function(done) {
		agent.post('/delivery-challans')
			.send(deliveryChallan)
			.expect(401)
			.end(function(deliveryChallanSaveErr, deliveryChallanSaveRes) {
				// Call the assertion callback
				done(deliveryChallanSaveErr);
			});
	});

	it('should not be able to save Delivery challan instance if no name is provided', function(done) {
		// Invalidate name field
		deliveryChallan.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Delivery challan
				agent.post('/delivery-challans')
					.send(deliveryChallan)
					.expect(400)
					.end(function(deliveryChallanSaveErr, deliveryChallanSaveRes) {
						// Set message assertion
						(deliveryChallanSaveRes.body.message).should.match('Please fill Delivery challan name');
						
						// Handle Delivery challan save error
						done(deliveryChallanSaveErr);
					});
			});
	});

	it('should be able to update Delivery challan instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Delivery challan
				agent.post('/delivery-challans')
					.send(deliveryChallan)
					.expect(200)
					.end(function(deliveryChallanSaveErr, deliveryChallanSaveRes) {
						// Handle Delivery challan save error
						if (deliveryChallanSaveErr) done(deliveryChallanSaveErr);

						// Update Delivery challan name
						deliveryChallan.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Delivery challan
						agent.put('/delivery-challans/' + deliveryChallanSaveRes.body._id)
							.send(deliveryChallan)
							.expect(200)
							.end(function(deliveryChallanUpdateErr, deliveryChallanUpdateRes) {
								// Handle Delivery challan update error
								if (deliveryChallanUpdateErr) done(deliveryChallanUpdateErr);

								// Set assertions
								(deliveryChallanUpdateRes.body._id).should.equal(deliveryChallanSaveRes.body._id);
								(deliveryChallanUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Delivery challans if not signed in', function(done) {
		// Create new Delivery challan model instance
		var deliveryChallanObj = new DeliveryChallan(deliveryChallan);

		// Save the Delivery challan
		deliveryChallanObj.save(function() {
			// Request Delivery challans
			request(app).get('/delivery-challans')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Delivery challan if not signed in', function(done) {
		// Create new Delivery challan model instance
		var deliveryChallanObj = new DeliveryChallan(deliveryChallan);

		// Save the Delivery challan
		deliveryChallanObj.save(function() {
			request(app).get('/delivery-challans/' + deliveryChallanObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', deliveryChallan.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Delivery challan instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Delivery challan
				agent.post('/delivery-challans')
					.send(deliveryChallan)
					.expect(200)
					.end(function(deliveryChallanSaveErr, deliveryChallanSaveRes) {
						// Handle Delivery challan save error
						if (deliveryChallanSaveErr) done(deliveryChallanSaveErr);

						// Delete existing Delivery challan
						agent.delete('/delivery-challans/' + deliveryChallanSaveRes.body._id)
							.send(deliveryChallan)
							.expect(200)
							.end(function(deliveryChallanDeleteErr, deliveryChallanDeleteRes) {
								// Handle Delivery challan error error
								if (deliveryChallanDeleteErr) done(deliveryChallanDeleteErr);

								// Set assertions
								(deliveryChallanDeleteRes.body._id).should.equal(deliveryChallanSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Delivery challan instance if not signed in', function(done) {
		// Set Delivery challan user 
		deliveryChallan.user = user;

		// Create new Delivery challan model instance
		var deliveryChallanObj = new DeliveryChallan(deliveryChallan);

		// Save the Delivery challan
		deliveryChallanObj.save(function() {
			// Try deleting Delivery challan
			request(app).delete('/delivery-challans/' + deliveryChallanObj._id)
			.expect(401)
			.end(function(deliveryChallanDeleteErr, deliveryChallanDeleteRes) {
				// Set message assertion
				(deliveryChallanDeleteRes.body.message).should.match('User is not logged in');

				// Handle Delivery challan error error
				done(deliveryChallanDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		DeliveryChallan.remove().exec();
		done();
	});
});