'use strict';

(function() {
	// Knitting programs Controller Spec
	describe('Knitting programs Controller Tests', function() {
		// Initialize global variables
		var KnittingProgramsController,
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

			// Initialize the Knitting programs controller.
			KnittingProgramsController = $controller('KnittingProgramsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Knitting program object fetched from XHR', inject(function(KnittingPrograms) {
			// Create sample Knitting program using the Knitting programs service
			var sampleKnittingProgram = new KnittingPrograms({
				name: 'New Knitting program'
			});

			// Create a sample Knitting programs array that includes the new Knitting program
			var sampleKnittingPrograms = [sampleKnittingProgram];

			// Set GET response
			$httpBackend.expectGET('knitting-programs').respond(sampleKnittingPrograms);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.knittingPrograms).toEqualData(sampleKnittingPrograms);
		}));

		it('$scope.findOne() should create an array with one Knitting program object fetched from XHR using a knittingProgramId URL parameter', inject(function(KnittingPrograms) {
			// Define a sample Knitting program object
			var sampleKnittingProgram = new KnittingPrograms({
				name: 'New Knitting program'
			});

			// Set the URL parameter
			$stateParams.knittingProgramId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/knitting-programs\/([0-9a-fA-F]{24})$/).respond(sampleKnittingProgram);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.knittingProgram).toEqualData(sampleKnittingProgram);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(KnittingPrograms) {
			// Create a sample Knitting program object
			var sampleKnittingProgramPostData = new KnittingPrograms({
				name: 'New Knitting program'
			});

			// Create a sample Knitting program response
			var sampleKnittingProgramResponse = new KnittingPrograms({
				_id: '525cf20451979dea2c000001',
				name: 'New Knitting program'
			});

			// Fixture mock form input values
			scope.name = 'New Knitting program';

			// Set POST response
			$httpBackend.expectPOST('knitting-programs', sampleKnittingProgramPostData).respond(sampleKnittingProgramResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Knitting program was created
			expect($location.path()).toBe('/knitting-programs/' + sampleKnittingProgramResponse._id);
		}));

		it('$scope.update() should update a valid Knitting program', inject(function(KnittingPrograms) {
			// Define a sample Knitting program put data
			var sampleKnittingProgramPutData = new KnittingPrograms({
				_id: '525cf20451979dea2c000001',
				name: 'New Knitting program'
			});

			// Mock Knitting program in scope
			scope.knittingProgram = sampleKnittingProgramPutData;

			// Set PUT response
			$httpBackend.expectPUT(/knitting-programs\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/knitting-programs/' + sampleKnittingProgramPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid knittingProgramId and remove the Knitting program from the scope', inject(function(KnittingPrograms) {
			// Create new Knitting program object
			var sampleKnittingProgram = new KnittingPrograms({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Knitting programs array and include the Knitting program
			scope.knittingPrograms = [sampleKnittingProgram];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/knitting-programs\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleKnittingProgram);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.knittingPrograms.length).toBe(0);
		}));
	});
}());