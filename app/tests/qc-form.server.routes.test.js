'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	QcForm = mongoose.model('QcForm'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, qcForm;

/**
 * Qc form routes tests
 */
describe('Qc form CRUD tests', function() {
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

		// Save a user to the test db and create new Qc form
		user.save(function() {
			qcForm = {
				name: 'Qc form Name'
			};

			done();
		});
	});

	it('should be able to save Qc form instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Qc form
				agent.post('/qc-forms')
					.send(qcForm)
					.expect(200)
					.end(function(qcFormSaveErr, qcFormSaveRes) {
						// Handle Qc form save error
						if (qcFormSaveErr) done(qcFormSaveErr);

						// Get a list of Qc forms
						agent.get('/qc-forms')
							.end(function(qcFormsGetErr, qcFormsGetRes) {
								// Handle Qc form save error
								if (qcFormsGetErr) done(qcFormsGetErr);

								// Get Qc forms list
								var qcForms = qcFormsGetRes.body;

								// Set assertions
								(qcForms[0].user._id).should.equal(userId);
								(qcForms[0].name).should.match('Qc form Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Qc form instance if not logged in', function(done) {
		agent.post('/qc-forms')
			.send(qcForm)
			.expect(401)
			.end(function(qcFormSaveErr, qcFormSaveRes) {
				// Call the assertion callback
				done(qcFormSaveErr);
			});
	});

	it('should not be able to save Qc form instance if no name is provided', function(done) {
		// Invalidate name field
		qcForm.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Qc form
				agent.post('/qc-forms')
					.send(qcForm)
					.expect(400)
					.end(function(qcFormSaveErr, qcFormSaveRes) {
						// Set message assertion
						(qcFormSaveRes.body.message).should.match('Please fill Qc form name');
						
						// Handle Qc form save error
						done(qcFormSaveErr);
					});
			});
	});

	it('should be able to update Qc form instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Qc form
				agent.post('/qc-forms')
					.send(qcForm)
					.expect(200)
					.end(function(qcFormSaveErr, qcFormSaveRes) {
						// Handle Qc form save error
						if (qcFormSaveErr) done(qcFormSaveErr);

						// Update Qc form name
						qcForm.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Qc form
						agent.put('/qc-forms/' + qcFormSaveRes.body._id)
							.send(qcForm)
							.expect(200)
							.end(function(qcFormUpdateErr, qcFormUpdateRes) {
								// Handle Qc form update error
								if (qcFormUpdateErr) done(qcFormUpdateErr);

								// Set assertions
								(qcFormUpdateRes.body._id).should.equal(qcFormSaveRes.body._id);
								(qcFormUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Qc forms if not signed in', function(done) {
		// Create new Qc form model instance
		var qcFormObj = new QcForm(qcForm);

		// Save the Qc form
		qcFormObj.save(function() {
			// Request Qc forms
			request(app).get('/qc-forms')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Qc form if not signed in', function(done) {
		// Create new Qc form model instance
		var qcFormObj = new QcForm(qcForm);

		// Save the Qc form
		qcFormObj.save(function() {
			request(app).get('/qc-forms/' + qcFormObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', qcForm.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Qc form instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Qc form
				agent.post('/qc-forms')
					.send(qcForm)
					.expect(200)
					.end(function(qcFormSaveErr, qcFormSaveRes) {
						// Handle Qc form save error
						if (qcFormSaveErr) done(qcFormSaveErr);

						// Delete existing Qc form
						agent.delete('/qc-forms/' + qcFormSaveRes.body._id)
							.send(qcForm)
							.expect(200)
							.end(function(qcFormDeleteErr, qcFormDeleteRes) {
								// Handle Qc form error error
								if (qcFormDeleteErr) done(qcFormDeleteErr);

								// Set assertions
								(qcFormDeleteRes.body._id).should.equal(qcFormSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Qc form instance if not signed in', function(done) {
		// Set Qc form user 
		qcForm.user = user;

		// Create new Qc form model instance
		var qcFormObj = new QcForm(qcForm);

		// Save the Qc form
		qcFormObj.save(function() {
			// Try deleting Qc form
			request(app).delete('/qc-forms/' + qcFormObj._id)
			.expect(401)
			.end(function(qcFormDeleteErr, qcFormDeleteRes) {
				// Set message assertion
				(qcFormDeleteRes.body.message).should.match('User is not logged in');

				// Handle Qc form error error
				done(qcFormDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		QcForm.remove().exec();
		done();
	});
});