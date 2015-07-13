'use strict';

(function() {
	// Packing lists Controller Spec
	describe('Packing lists Controller Tests', function() {
		// Initialize global variables
		var PackingListsController,
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

			// Initialize the Packing lists controller.
			PackingListsController = $controller('PackingListsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Packing list object fetched from XHR', inject(function(PackingLists) {
			// Create sample Packing list using the Packing lists service
			var samplePackingList = new PackingLists({
				name: 'New Packing list'
			});

			// Create a sample Packing lists array that includes the new Packing list
			var samplePackingLists = [samplePackingList];

			// Set GET response
			$httpBackend.expectGET('packing-lists').respond(samplePackingLists);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.packingLists).toEqualData(samplePackingLists);
		}));

		it('$scope.findOne() should create an array with one Packing list object fetched from XHR using a packingListId URL parameter', inject(function(PackingLists) {
			// Define a sample Packing list object
			var samplePackingList = new PackingLists({
				name: 'New Packing list'
			});

			// Set the URL parameter
			$stateParams.packingListId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/packing-lists\/([0-9a-fA-F]{24})$/).respond(samplePackingList);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.packingList).toEqualData(samplePackingList);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(PackingLists) {
			// Create a sample Packing list object
			var samplePackingListPostData = new PackingLists({
				name: 'New Packing list'
			});

			// Create a sample Packing list response
			var samplePackingListResponse = new PackingLists({
				_id: '525cf20451979dea2c000001',
				name: 'New Packing list'
			});

			// Fixture mock form input values
			scope.name = 'New Packing list';

			// Set POST response
			$httpBackend.expectPOST('packing-lists', samplePackingListPostData).respond(samplePackingListResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Packing list was created
			expect($location.path()).toBe('/packing-lists/' + samplePackingListResponse._id);
		}));

		it('$scope.update() should update a valid Packing list', inject(function(PackingLists) {
			// Define a sample Packing list put data
			var samplePackingListPutData = new PackingLists({
				_id: '525cf20451979dea2c000001',
				name: 'New Packing list'
			});

			// Mock Packing list in scope
			scope.packingList = samplePackingListPutData;

			// Set PUT response
			$httpBackend.expectPUT(/packing-lists\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/packing-lists/' + samplePackingListPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid packingListId and remove the Packing list from the scope', inject(function(PackingLists) {
			// Create new Packing list object
			var samplePackingList = new PackingLists({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Packing lists array and include the Packing list
			scope.packingLists = [samplePackingList];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/packing-lists\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(samplePackingList);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.packingLists.length).toBe(0);
		}));
	});
}());