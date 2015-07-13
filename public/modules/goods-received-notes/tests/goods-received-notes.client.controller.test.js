'use strict';

(function() {
	// Goods received notes Controller Spec
	describe('Goods received notes Controller Tests', function() {
		// Initialize global variables
		var GoodsReceivedNotesController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Goods received notes controller.
			GoodsReceivedNotesController = $controller('GoodsReceivedNotesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Goods received note object fetched from XHR', inject(function(GoodsReceivedNotes) {
			// Create sample Goods received note using the Goods received notes service
			var sampleGoodsReceivedNote = new GoodsReceivedNotes({
				name: 'New Goods received note'
			});

			// Create a sample Goods received notes array that includes the new Goods received note
			var sampleGoodsReceivedNotes = [sampleGoodsReceivedNote];

			// Set GET response
			$httpBackend.expectGET('goods-received-notes').respond(sampleGoodsReceivedNotes);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.goodsReceivedNotes).toEqualData(sampleGoodsReceivedNotes);
		}));

		it('$scope.findOne() should create an array with one Goods received note object fetched from XHR using a goodsReceivedNoteId URL parameter', inject(function(GoodsReceivedNotes) {
			// Define a sample Goods received note object
			var sampleGoodsReceivedNote = new GoodsReceivedNotes({
				name: 'New Goods received note'
			});

			// Set the URL parameter
			$stateParams.goodsReceivedNoteId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/goods-received-notes\/([0-9a-fA-F]{24})$/).respond(sampleGoodsReceivedNote);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.goodsReceivedNote).toEqualData(sampleGoodsReceivedNote);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(GoodsReceivedNotes) {
			// Create a sample Goods received note object
			var sampleGoodsReceivedNotePostData = new GoodsReceivedNotes({
				name: 'New Goods received note'
			});

			// Create a sample Goods received note response
			var sampleGoodsReceivedNoteResponse = new GoodsReceivedNotes({
				_id: '525cf20451979dea2c000001',
				name: 'New Goods received note'
			});

			// Fixture mock form input values
			scope.name = 'New Goods received note';

			// Set POST response
			$httpBackend.expectPOST('goods-received-notes', sampleGoodsReceivedNotePostData).respond(sampleGoodsReceivedNoteResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Goods received note was created
			expect($location.path()).toBe('/goods-received-notes/' + sampleGoodsReceivedNoteResponse._id);
		}));

		it('$scope.update() should update a valid Goods received note', inject(function(GoodsReceivedNotes) {
			// Define a sample Goods received note put data
			var sampleGoodsReceivedNotePutData = new GoodsReceivedNotes({
				_id: '525cf20451979dea2c000001',
				name: 'New Goods received note'
			});

			// Mock Goods received note in scope
			scope.goodsReceivedNote = sampleGoodsReceivedNotePutData;

			// Set PUT response
			$httpBackend.expectPUT(/goods-received-notes\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/goods-received-notes/' + sampleGoodsReceivedNotePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid goodsReceivedNoteId and remove the Goods received note from the scope', inject(function(GoodsReceivedNotes) {
			// Create new Goods received note object
			var sampleGoodsReceivedNote = new GoodsReceivedNotes({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Goods received notes array and include the Goods received note
			scope.goodsReceivedNotes = [sampleGoodsReceivedNote];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/goods-received-notes\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleGoodsReceivedNote);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.goodsReceivedNotes.length).toBe(0);
		}));
	});
}());