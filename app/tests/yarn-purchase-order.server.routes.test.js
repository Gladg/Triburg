'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	YarnPurchaseOrder = mongoose.model('YarnPurchaseOrder'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, yarnPurchaseOrder;

/**
 * Yarn purchase order routes tests
 */
describe('Yarn purchase order CRUD tests', function() {
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

		// Save a user to the test db and create new Yarn purchase order
		user.save(function() {
			yarnPurchaseOrder = {
				name: 'Yarn purchase order Name'
			};

			done();
		});
	});

	it('should be able to save Yarn purchase order instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Yarn purchase order
				agent.post('/yarn-purchase-orders')
					.send(yarnPurchaseOrder)
					.expect(200)
					.end(function(yarnPurchaseOrderSaveErr, yarnPurchaseOrderSaveRes) {
						// Handle Yarn purchase order save error
						if (yarnPurchaseOrderSaveErr) done(yarnPurchaseOrderSaveErr);

						// Get a list of Yarn purchase orders
						agent.get('/yarn-purchase-orders')
							.end(function(yarnPurchaseOrdersGetErr, yarnPurchaseOrdersGetRes) {
								// Handle Yarn purchase order save error
								if (yarnPurchaseOrdersGetErr) done(yarnPurchaseOrdersGetErr);

								// Get Yarn purchase orders list
								var yarnPurchaseOrders = yarnPurchaseOrdersGetRes.body;

								// Set assertions
								(yarnPurchaseOrders[0].user._id).should.equal(userId);
								(yarnPurchaseOrders[0].name).should.match('Yarn purchase order Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Yarn purchase order instance if not logged in', function(done) {
		agent.post('/yarn-purchase-orders')
			.send(yarnPurchaseOrder)
			.expect(401)
			.end(function(yarnPurchaseOrderSaveErr, yarnPurchaseOrderSaveRes) {
				// Call the assertion callback
				done(yarnPurchaseOrderSaveErr);
			});
	});

	it('should not be able to save Yarn purchase order instance if no name is provided', function(done) {
		// Invalidate name field
		yarnPurchaseOrder.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Yarn purchase order
				agent.post('/yarn-purchase-orders')
					.send(yarnPurchaseOrder)
					.expect(400)
					.end(function(yarnPurchaseOrderSaveErr, yarnPurchaseOrderSaveRes) {
						// Set message assertion
						(yarnPurchaseOrderSaveRes.body.message).should.match('Please fill Yarn purchase order name');
						
						// Handle Yarn purchase order save error
						done(yarnPurchaseOrderSaveErr);
					});
			});
	});

	it('should be able to update Yarn purchase order instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Yarn purchase order
				agent.post('/yarn-purchase-orders')
					.send(yarnPurchaseOrder)
					.expect(200)
					.end(function(yarnPurchaseOrderSaveErr, yarnPurchaseOrderSaveRes) {
						// Handle Yarn purchase order save error
						if (yarnPurchaseOrderSaveErr) done(yarnPurchaseOrderSaveErr);

						// Update Yarn purchase order name
						yarnPurchaseOrder.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Yarn purchase order
						agent.put('/yarn-purchase-orders/' + yarnPurchaseOrderSaveRes.body._id)
							.send(yarnPurchaseOrder)
							.expect(200)
							.end(function(yarnPurchaseOrderUpdateErr, yarnPurchaseOrderUpdateRes) {
								// Handle Yarn purchase order update error
								if (yarnPurchaseOrderUpdateErr) done(yarnPurchaseOrderUpdateErr);

								// Set assertions
								(yarnPurchaseOrderUpdateRes.body._id).should.equal(yarnPurchaseOrderSaveRes.body._id);
								(yarnPurchaseOrderUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Yarn purchase orders if not signed in', function(done) {
		// Create new Yarn purchase order model instance
		var yarnPurchaseOrderObj = new YarnPurchaseOrder(yarnPurchaseOrder);

		// Save the Yarn purchase order
		yarnPurchaseOrderObj.save(function() {
			// Request Yarn purchase orders
			request(app).get('/yarn-purchase-orders')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Yarn purchase order if not signed in', function(done) {
		// Create new Yarn purchase order model instance
		var yarnPurchaseOrderObj = new YarnPurchaseOrder(yarnPurchaseOrder);

		// Save the Yarn purchase order
		yarnPurchaseOrderObj.save(function() {
			request(app).get('/yarn-purchase-orders/' + yarnPurchaseOrderObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', yarnPurchaseOrder.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Yarn purchase order instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Yarn purchase order
				agent.post('/yarn-purchase-orders')
					.send(yarnPurchaseOrder)
					.expect(200)
					.end(function(yarnPurchaseOrderSaveErr, yarnPurchaseOrderSaveRes) {
						// Handle Yarn purchase order save error
						if (yarnPurchaseOrderSaveErr) done(yarnPurchaseOrderSaveErr);

						// Delete existing Yarn purchase order
						agent.delete('/yarn-purchase-orders/' + yarnPurchaseOrderSaveRes.body._id)
							.send(yarnPurchaseOrder)
							.expect(200)
							.end(function(yarnPurchaseOrderDeleteErr, yarnPurchaseOrderDeleteRes) {
								// Handle Yarn purchase order error error
								if (yarnPurchaseOrderDeleteErr) done(yarnPurchaseOrderDeleteErr);

								// Set assertions
								(yarnPurchaseOrderDeleteRes.body._id).should.equal(yarnPurchaseOrderSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Yarn purchase order instance if not signed in', function(done) {
		// Set Yarn purchase order user 
		yarnPurchaseOrder.user = user;

		// Create new Yarn purchase order model instance
		var yarnPurchaseOrderObj = new YarnPurchaseOrder(yarnPurchaseOrder);

		// Save the Yarn purchase order
		yarnPurchaseOrderObj.save(function() {
			// Try deleting Yarn purchase order
			request(app).delete('/yarn-purchase-orders/' + yarnPurchaseOrderObj._id)
			.expect(401)
			.end(function(yarnPurchaseOrderDeleteErr, yarnPurchaseOrderDeleteRes) {
				// Set message assertion
				(yarnPurchaseOrderDeleteRes.body.message).should.match('User is not logged in');

				// Handle Yarn purchase order error error
				done(yarnPurchaseOrderDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		YarnPurchaseOrder.remove().exec();
		done();
	});
});