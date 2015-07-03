'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	OrderEnquiryForm = mongoose.model('OrderEnquiryForm'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, orderEnquiryForm;

/**
 * Order enquiry form routes tests
 */
describe('Order enquiry form CRUD tests', function() {
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

		// Save a user to the test db and create new Order enquiry form
		user.save(function() {
			orderEnquiryForm = {
				name: 'Order enquiry form Name'
			};

			done();
		});
	});

	it('should be able to save Order enquiry form instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Order enquiry form
				agent.post('/order-enquiry-forms')
					.send(orderEnquiryForm)
					.expect(200)
					.end(function(orderEnquiryFormSaveErr, orderEnquiryFormSaveRes) {
						// Handle Order enquiry form save error
						if (orderEnquiryFormSaveErr) done(orderEnquiryFormSaveErr);

						// Get a list of Order enquiry forms
						agent.get('/order-enquiry-forms')
							.end(function(orderEnquiryFormsGetErr, orderEnquiryFormsGetRes) {
								// Handle Order enquiry form save error
								if (orderEnquiryFormsGetErr) done(orderEnquiryFormsGetErr);

								// Get Order enquiry forms list
								var orderEnquiryForms = orderEnquiryFormsGetRes.body;

								// Set assertions
								(orderEnquiryForms[0].user._id).should.equal(userId);
								(orderEnquiryForms[0].name).should.match('Order enquiry form Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Order enquiry form instance if not logged in', function(done) {
		agent.post('/order-enquiry-forms')
			.send(orderEnquiryForm)
			.expect(401)
			.end(function(orderEnquiryFormSaveErr, orderEnquiryFormSaveRes) {
				// Call the assertion callback
				done(orderEnquiryFormSaveErr);
			});
	});

	it('should not be able to save Order enquiry form instance if no name is provided', function(done) {
		// Invalidate name field
		orderEnquiryForm.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Order enquiry form
				agent.post('/order-enquiry-forms')
					.send(orderEnquiryForm)
					.expect(400)
					.end(function(orderEnquiryFormSaveErr, orderEnquiryFormSaveRes) {
						// Set message assertion
						(orderEnquiryFormSaveRes.body.message).should.match('Please fill Order enquiry form name');
						
						// Handle Order enquiry form save error
						done(orderEnquiryFormSaveErr);
					});
			});
	});

	it('should be able to update Order enquiry form instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Order enquiry form
				agent.post('/order-enquiry-forms')
					.send(orderEnquiryForm)
					.expect(200)
					.end(function(orderEnquiryFormSaveErr, orderEnquiryFormSaveRes) {
						// Handle Order enquiry form save error
						if (orderEnquiryFormSaveErr) done(orderEnquiryFormSaveErr);

						// Update Order enquiry form name
						orderEnquiryForm.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Order enquiry form
						agent.put('/order-enquiry-forms/' + orderEnquiryFormSaveRes.body._id)
							.send(orderEnquiryForm)
							.expect(200)
							.end(function(orderEnquiryFormUpdateErr, orderEnquiryFormUpdateRes) {
								// Handle Order enquiry form update error
								if (orderEnquiryFormUpdateErr) done(orderEnquiryFormUpdateErr);

								// Set assertions
								(orderEnquiryFormUpdateRes.body._id).should.equal(orderEnquiryFormSaveRes.body._id);
								(orderEnquiryFormUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Order enquiry forms if not signed in', function(done) {
		// Create new Order enquiry form model instance
		var orderEnquiryFormObj = new OrderEnquiryForm(orderEnquiryForm);

		// Save the Order enquiry form
		orderEnquiryFormObj.save(function() {
			// Request Order enquiry forms
			request(app).get('/order-enquiry-forms')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Order enquiry form if not signed in', function(done) {
		// Create new Order enquiry form model instance
		var orderEnquiryFormObj = new OrderEnquiryForm(orderEnquiryForm);

		// Save the Order enquiry form
		orderEnquiryFormObj.save(function() {
			request(app).get('/order-enquiry-forms/' + orderEnquiryFormObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', orderEnquiryForm.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Order enquiry form instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Order enquiry form
				agent.post('/order-enquiry-forms')
					.send(orderEnquiryForm)
					.expect(200)
					.end(function(orderEnquiryFormSaveErr, orderEnquiryFormSaveRes) {
						// Handle Order enquiry form save error
						if (orderEnquiryFormSaveErr) done(orderEnquiryFormSaveErr);

						// Delete existing Order enquiry form
						agent.delete('/order-enquiry-forms/' + orderEnquiryFormSaveRes.body._id)
							.send(orderEnquiryForm)
							.expect(200)
							.end(function(orderEnquiryFormDeleteErr, orderEnquiryFormDeleteRes) {
								// Handle Order enquiry form error error
								if (orderEnquiryFormDeleteErr) done(orderEnquiryFormDeleteErr);

								// Set assertions
								(orderEnquiryFormDeleteRes.body._id).should.equal(orderEnquiryFormSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Order enquiry form instance if not signed in', function(done) {
		// Set Order enquiry form user 
		orderEnquiryForm.user = user;

		// Create new Order enquiry form model instance
		var orderEnquiryFormObj = new OrderEnquiryForm(orderEnquiryForm);

		// Save the Order enquiry form
		orderEnquiryFormObj.save(function() {
			// Try deleting Order enquiry form
			request(app).delete('/order-enquiry-forms/' + orderEnquiryFormObj._id)
			.expect(401)
			.end(function(orderEnquiryFormDeleteErr, orderEnquiryFormDeleteRes) {
				// Set message assertion
				(orderEnquiryFormDeleteRes.body.message).should.match('User is not logged in');

				// Handle Order enquiry form error error
				done(orderEnquiryFormDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		OrderEnquiryForm.remove().exec();
		done();
	});
});