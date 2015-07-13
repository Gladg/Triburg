'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	GoodsReceivedNote = mongoose.model('GoodsReceivedNote'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, goodsReceivedNote;

/**
 * Goods received note routes tests
 */
describe('Goods received note CRUD tests', function() {
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

		// Save a user to the test db and create new Goods received note
		user.save(function() {
			goodsReceivedNote = {
				name: 'Goods received note Name'
			};

			done();
		});
	});

	it('should be able to save Goods received note instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Goods received note
				agent.post('/goods-received-notes')
					.send(goodsReceivedNote)
					.expect(200)
					.end(function(goodsReceivedNoteSaveErr, goodsReceivedNoteSaveRes) {
						// Handle Goods received note save error
						if (goodsReceivedNoteSaveErr) done(goodsReceivedNoteSaveErr);

						// Get a list of Goods received notes
						agent.get('/goods-received-notes')
							.end(function(goodsReceivedNotesGetErr, goodsReceivedNotesGetRes) {
								// Handle Goods received note save error
								if (goodsReceivedNotesGetErr) done(goodsReceivedNotesGetErr);

								// Get Goods received notes list
								var goodsReceivedNotes = goodsReceivedNotesGetRes.body;

								// Set assertions
								(goodsReceivedNotes[0].user._id).should.equal(userId);
								(goodsReceivedNotes[0].name).should.match('Goods received note Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Goods received note instance if not logged in', function(done) {
		agent.post('/goods-received-notes')
			.send(goodsReceivedNote)
			.expect(401)
			.end(function(goodsReceivedNoteSaveErr, goodsReceivedNoteSaveRes) {
				// Call the assertion callback
				done(goodsReceivedNoteSaveErr);
			});
	});

	it('should not be able to save Goods received note instance if no name is provided', function(done) {
		// Invalidate name field
		goodsReceivedNote.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Goods received note
				agent.post('/goods-received-notes')
					.send(goodsReceivedNote)
					.expect(400)
					.end(function(goodsReceivedNoteSaveErr, goodsReceivedNoteSaveRes) {
						// Set message assertion
						(goodsReceivedNoteSaveRes.body.message).should.match('Please fill Goods received note name');
						
						// Handle Goods received note save error
						done(goodsReceivedNoteSaveErr);
					});
			});
	});

	it('should be able to update Goods received note instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Goods received note
				agent.post('/goods-received-notes')
					.send(goodsReceivedNote)
					.expect(200)
					.end(function(goodsReceivedNoteSaveErr, goodsReceivedNoteSaveRes) {
						// Handle Goods received note save error
						if (goodsReceivedNoteSaveErr) done(goodsReceivedNoteSaveErr);

						// Update Goods received note name
						goodsReceivedNote.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Goods received note
						agent.put('/goods-received-notes/' + goodsReceivedNoteSaveRes.body._id)
							.send(goodsReceivedNote)
							.expect(200)
							.end(function(goodsReceivedNoteUpdateErr, goodsReceivedNoteUpdateRes) {
								// Handle Goods received note update error
								if (goodsReceivedNoteUpdateErr) done(goodsReceivedNoteUpdateErr);

								// Set assertions
								(goodsReceivedNoteUpdateRes.body._id).should.equal(goodsReceivedNoteSaveRes.body._id);
								(goodsReceivedNoteUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Goods received notes if not signed in', function(done) {
		// Create new Goods received note model instance
		var goodsReceivedNoteObj = new GoodsReceivedNote(goodsReceivedNote);

		// Save the Goods received note
		goodsReceivedNoteObj.save(function() {
			// Request Goods received notes
			request(app).get('/goods-received-notes')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Goods received note if not signed in', function(done) {
		// Create new Goods received note model instance
		var goodsReceivedNoteObj = new GoodsReceivedNote(goodsReceivedNote);

		// Save the Goods received note
		goodsReceivedNoteObj.save(function() {
			request(app).get('/goods-received-notes/' + goodsReceivedNoteObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', goodsReceivedNote.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Goods received note instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Goods received note
				agent.post('/goods-received-notes')
					.send(goodsReceivedNote)
					.expect(200)
					.end(function(goodsReceivedNoteSaveErr, goodsReceivedNoteSaveRes) {
						// Handle Goods received note save error
						if (goodsReceivedNoteSaveErr) done(goodsReceivedNoteSaveErr);

						// Delete existing Goods received note
						agent.delete('/goods-received-notes/' + goodsReceivedNoteSaveRes.body._id)
							.send(goodsReceivedNote)
							.expect(200)
							.end(function(goodsReceivedNoteDeleteErr, goodsReceivedNoteDeleteRes) {
								// Handle Goods received note error error
								if (goodsReceivedNoteDeleteErr) done(goodsReceivedNoteDeleteErr);

								// Set assertions
								(goodsReceivedNoteDeleteRes.body._id).should.equal(goodsReceivedNoteSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Goods received note instance if not signed in', function(done) {
		// Set Goods received note user 
		goodsReceivedNote.user = user;

		// Create new Goods received note model instance
		var goodsReceivedNoteObj = new GoodsReceivedNote(goodsReceivedNote);

		// Save the Goods received note
		goodsReceivedNoteObj.save(function() {
			// Try deleting Goods received note
			request(app).delete('/goods-received-notes/' + goodsReceivedNoteObj._id)
			.expect(401)
			.end(function(goodsReceivedNoteDeleteErr, goodsReceivedNoteDeleteRes) {
				// Set message assertion
				(goodsReceivedNoteDeleteRes.body.message).should.match('User is not logged in');

				// Handle Goods received note error error
				done(goodsReceivedNoteDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		GoodsReceivedNote.remove().exec();
		done();
	});
});