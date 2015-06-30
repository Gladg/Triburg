'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	AccessoriesPurchaseOrder = mongoose.model('AccessoriesPurchaseOrder'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, accessoriesPurchaseOrder;

/**
 * Accessories purchase order routes tests
 */
describe('Accessories purchase order CRUD tests', function() {
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

		// Save a user to the test db and create new Accessories purchase order
		user.save(function() {
			accessoriesPurchaseOrder = {
				name: 'Accessories purchase order Name'
			};

			done();
		});
	});

	it('should be able to save Accessories purchase order instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Accessories purchase order
				agent.post('/accessories-purchase-orders')
					.send(accessoriesPurchaseOrder)
					.expect(200)
					.end(function(accessoriesPurchaseOrderSaveErr, accessoriesPurchaseOrderSaveRes) {
						// Handle Accessories purchase order save error
						if (accessoriesPurchaseOrderSaveErr) done(accessoriesPurchaseOrderSaveErr);

						// Get a list of Accessories purchase orders
						agent.get('/accessories-purchase-orders')
							.end(function(accessoriesPurchaseOrdersGetErr, accessoriesPurchaseOrdersGetRes) {
								// Handle Accessories purchase order save error
								if (accessoriesPurchaseOrdersGetErr) done(accessoriesPurchaseOrdersGetErr);

								// Get Accessories purchase orders list
								var accessoriesPurchaseOrders = accessoriesPurchaseOrdersGetRes.body;

								// Set assertions
								(accessoriesPurchaseOrders[0].user._id).should.equal(userId);
								(accessoriesPurchaseOrders[0].name).should.match('Accessories purchase order Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Accessories purchase order instance if not logged in', function(done) {
		agent.post('/accessories-purchase-orders')
			.send(accessoriesPurchaseOrder)
			.expect(401)
			.end(function(accessoriesPurchaseOrderSaveErr, accessoriesPurchaseOrderSaveRes) {
				// Call the assertion callback
				done(accessoriesPurchaseOrderSaveErr);
			});
	});

	it('should not be able to save Accessories purchase order instance if no name is provided', function(done) {
		// Invalidate name field
		accessoriesPurchaseOrder.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Accessories purchase order
				agent.post('/accessories-purchase-orders')
					.send(accessoriesPurchaseOrder)
					.expect(400)
					.end(function(accessoriesPurchaseOrderSaveErr, accessoriesPurchaseOrderSaveRes) {
						// Set message assertion
						(accessoriesPurchaseOrderSaveRes.body.message).should.match('Please fill Accessories purchase order name');
						
						// Handle Accessories purchase order save error
						done(accessoriesPurchaseOrderSaveErr);
					});
			});
	});

	it('should be able to update Accessories purchase order instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Accessories purchase order
				agent.post('/accessories-purchase-orders')
					.send(accessoriesPurchaseOrder)
					.expect(200)
					.end(function(accessoriesPurchaseOrderSaveErr, accessoriesPurchaseOrderSaveRes) {
						// Handle Accessories purchase order save error
						if (accessoriesPurchaseOrderSaveErr) done(accessoriesPurchaseOrderSaveErr);

						// Update Accessories purchase order name
						accessoriesPurchaseOrder.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Accessories purchase order
						agent.put('/accessories-purchase-orders/' + accessoriesPurchaseOrderSaveRes.body._id)
							.send(accessoriesPurchaseOrder)
							.expect(200)
							.end(function(accessoriesPurchaseOrderUpdateErr, accessoriesPurchaseOrderUpdateRes) {
								// Handle Accessories purchase order update error
								if (accessoriesPurchaseOrderUpdateErr) done(accessoriesPurchaseOrderUpdateErr);

								// Set assertions
								(accessoriesPurchaseOrderUpdateRes.body._id).should.equal(accessoriesPurchaseOrderSaveRes.body._id);
								(accessoriesPurchaseOrderUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Accessories purchase orders if not signed in', function(done) {
		// Create new Accessories purchase order model instance
		var accessoriesPurchaseOrderObj = new AccessoriesPurchaseOrder(accessoriesPurchaseOrder);

		// Save the Accessories purchase order
		accessoriesPurchaseOrderObj.save(function() {
			// Request Accessories purchase orders
			request(app).get('/accessories-purchase-orders')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Accessories purchase order if not signed in', function(done) {
		// Create new Accessories purchase order model instance
		var accessoriesPurchaseOrderObj = new AccessoriesPurchaseOrder(accessoriesPurchaseOrder);

		// Save the Accessories purchase order
		accessoriesPurchaseOrderObj.save(function() {
			request(app).get('/accessories-purchase-orders/' + accessoriesPurchaseOrderObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', accessoriesPurchaseOrder.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Accessories purchase order instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Accessories purchase order
				agent.post('/accessories-purchase-orders')
					.send(accessoriesPurchaseOrder)
					.expect(200)
					.end(function(accessoriesPurchaseOrderSaveErr, accessoriesPurchaseOrderSaveRes) {
						// Handle Accessories purchase order save error
						if (accessoriesPurchaseOrderSaveErr) done(accessoriesPurchaseOrderSaveErr);

						// Delete existing Accessories purchase order
						agent.delete('/accessories-purchase-orders/' + accessoriesPurchaseOrderSaveRes.body._id)
							.send(accessoriesPurchaseOrder)
							.expect(200)
							.end(function(accessoriesPurchaseOrderDeleteErr, accessoriesPurchaseOrderDeleteRes) {
								// Handle Accessories purchase order error error
								if (accessoriesPurchaseOrderDeleteErr) done(accessoriesPurchaseOrderDeleteErr);

								// Set assertions
								(accessoriesPurchaseOrderDeleteRes.body._id).should.equal(accessoriesPurchaseOrderSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Accessories purchase order instance if not signed in', function(done) {
		// Set Accessories purchase order user 
		accessoriesPurchaseOrder.user = user;

		// Create new Accessories purchase order model instance
		var accessoriesPurchaseOrderObj = new AccessoriesPurchaseOrder(accessoriesPurchaseOrder);

		// Save the Accessories purchase order
		accessoriesPurchaseOrderObj.save(function() {
			// Try deleting Accessories purchase order
			request(app).delete('/accessories-purchase-orders/' + accessoriesPurchaseOrderObj._id)
			.expect(401)
			.end(function(accessoriesPurchaseOrderDeleteErr, accessoriesPurchaseOrderDeleteRes) {
				// Set message assertion
				(accessoriesPurchaseOrderDeleteRes.body.message).should.match('User is not logged in');

				// Handle Accessories purchase order error error
				done(accessoriesPurchaseOrderDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		AccessoriesPurchaseOrder.remove().exec();
		done();
	});
});