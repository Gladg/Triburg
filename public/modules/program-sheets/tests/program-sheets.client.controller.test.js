'use strict';

(function() {
	// Program sheets Controller Spec
	describe('Program sheets Controller Tests', function() {
		// Initialize global variables
		var ProgramSheetsController,
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

			// Initialize the Program sheets controller.
			ProgramSheetsController = $controller('ProgramSheetsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Program sheet object fetched from XHR', inject(function(ProgramSheets) {
			// Create sample Program sheet using the Program sheets service
			var sampleProgramSheet = new ProgramSheets({
				name: 'New Program sheet'
			});

			// Create a sample Program sheets array that includes the new Program sheet
			var sampleProgramSheets = [sampleProgramSheet];

			// Set GET response
			$httpBackend.expectGET('program-sheets').respond(sampleProgramSheets);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.programSheets).toEqualData(sampleProgramSheets);
		}));

		it('$scope.findOne() should create an array with one Program sheet object fetched from XHR using a programSheetId URL parameter', inject(function(ProgramSheets) {
			// Define a sample Program sheet object
			var sampleProgramSheet = new ProgramSheets({
				name: 'New Program sheet'
			});

			// Set the URL parameter
			$stateParams.programSheetId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/program-sheets\/([0-9a-fA-F]{24})$/).respond(sampleProgramSheet);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.programSheet).toEqualData(sampleProgramSheet);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(ProgramSheets) {
			// Create a sample Program sheet object
			var sampleProgramSheetPostData = new ProgramSheets({
				name: 'New Program sheet'
			});

			// Create a sample Program sheet response
			var sampleProgramSheetResponse = new ProgramSheets({
				_id: '525cf20451979dea2c000001',
				name: 'New Program sheet'
			});

			// Fixture mock form input values
			scope.name = 'New Program sheet';

			// Set POST response
			$httpBackend.expectPOST('program-sheets', sampleProgramSheetPostData).respond(sampleProgramSheetResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Program sheet was created
			expect($location.path()).toBe('/program-sheets/' + sampleProgramSheetResponse._id);
		}));

		it('$scope.update() should update a valid Program sheet', inject(function(ProgramSheets) {
			// Define a sample Program sheet put data
			var sampleProgramSheetPutData = new ProgramSheets({
				_id: '525cf20451979dea2c000001',
				name: 'New Program sheet'
			});

			// Mock Program sheet in scope
			scope.programSheet = sampleProgramSheetPutData;

			// Set PUT response
			$httpBackend.expectPUT(/program-sheets\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/program-sheets/' + sampleProgramSheetPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid programSheetId and remove the Program sheet from the scope', inject(function(ProgramSheets) {
			// Create new Program sheet object
			var sampleProgramSheet = new ProgramSheets({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Program sheets array and include the Program sheet
			scope.programSheets = [sampleProgramSheet];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/program-sheets\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleProgramSheet);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.programSheets.length).toBe(0);
		}));
	});
}());