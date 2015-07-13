'use strict';

(function() {
	// Costing sheets Controller Spec
	describe('Costing sheets Controller Tests', function() {
		// Initialize global variables
		var CostingSheetsController,
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

			// Initialize the Costing sheets controller.
			CostingSheetsController = $controller('CostingSheetsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Costing sheet object fetched from XHR', inject(function(CostingSheets) {
			// Create sample Costing sheet using the Costing sheets service
			var sampleCostingSheet = new CostingSheets({
				name: 'New Costing sheet'
			});

			// Create a sample Costing sheets array that includes the new Costing sheet
			var sampleCostingSheets = [sampleCostingSheet];

			// Set GET response
			$httpBackend.expectGET('costing-sheets').respond(sampleCostingSheets);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.costingSheets).toEqualData(sampleCostingSheets);
		}));

		it('$scope.findOne() should create an array with one Costing sheet object fetched from XHR using a costingSheetId URL parameter', inject(function(CostingSheets) {
			// Define a sample Costing sheet object
			var sampleCostingSheet = new CostingSheets({
				name: 'New Costing sheet'
			});

			// Set the URL parameter
			$stateParams.costingSheetId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/costing-sheets\/([0-9a-fA-F]{24})$/).respond(sampleCostingSheet);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.costingSheet).toEqualData(sampleCostingSheet);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(CostingSheets) {
			// Create a sample Costing sheet object
			var sampleCostingSheetPostData = new CostingSheets({
				name: 'New Costing sheet'
			});

			// Create a sample Costing sheet response
			var sampleCostingSheetResponse = new CostingSheets({
				_id: '525cf20451979dea2c000001',
				name: 'New Costing sheet'
			});

			// Fixture mock form input values
			scope.name = 'New Costing sheet';

			// Set POST response
			$httpBackend.expectPOST('costing-sheets', sampleCostingSheetPostData).respond(sampleCostingSheetResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Costing sheet was created
			expect($location.path()).toBe('/costing-sheets/' + sampleCostingSheetResponse._id);
		}));

		it('$scope.update() should update a valid Costing sheet', inject(function(CostingSheets) {
			// Define a sample Costing sheet put data
			var sampleCostingSheetPutData = new CostingSheets({
				_id: '525cf20451979dea2c000001',
				name: 'New Costing sheet'
			});

			// Mock Costing sheet in scope
			scope.costingSheet = sampleCostingSheetPutData;

			// Set PUT response
			$httpBackend.expectPUT(/costing-sheets\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/costing-sheets/' + sampleCostingSheetPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid costingSheetId and remove the Costing sheet from the scope', inject(function(CostingSheets) {
			// Create new Costing sheet object
			var sampleCostingSheet = new CostingSheets({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Costing sheets array and include the Costing sheet
			scope.costingSheets = [sampleCostingSheet];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/costing-sheets\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleCostingSheet);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.costingSheets.length).toBe(0);
		}));
	});
}());