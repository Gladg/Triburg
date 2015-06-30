'use strict';

(function() {
	// Process programs Controller Spec
	describe('Process programs Controller Tests', function() {
		// Initialize global variables
		var ProcessProgramsController,
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

			// Initialize the Process programs controller.
			ProcessProgramsController = $controller('ProcessProgramsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Process program object fetched from XHR', inject(function(ProcessPrograms) {
			// Create sample Process program using the Process programs service
			var sampleProcessProgram = new ProcessPrograms({
				name: 'New Process program'
			});

			// Create a sample Process programs array that includes the new Process program
			var sampleProcessPrograms = [sampleProcessProgram];

			// Set GET response
			$httpBackend.expectGET('process-programs').respond(sampleProcessPrograms);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.processPrograms).toEqualData(sampleProcessPrograms);
		}));

		it('$scope.findOne() should create an array with one Process program object fetched from XHR using a processProgramId URL parameter', inject(function(ProcessPrograms) {
			// Define a sample Process program object
			var sampleProcessProgram = new ProcessPrograms({
				name: 'New Process program'
			});

			// Set the URL parameter
			$stateParams.processProgramId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/process-programs\/([0-9a-fA-F]{24})$/).respond(sampleProcessProgram);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.processProgram).toEqualData(sampleProcessProgram);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(ProcessPrograms) {
			// Create a sample Process program object
			var sampleProcessProgramPostData = new ProcessPrograms({
				name: 'New Process program'
			});

			// Create a sample Process program response
			var sampleProcessProgramResponse = new ProcessPrograms({
				_id: '525cf20451979dea2c000001',
				name: 'New Process program'
			});

			// Fixture mock form input values
			scope.name = 'New Process program';

			// Set POST response
			$httpBackend.expectPOST('process-programs', sampleProcessProgramPostData).respond(sampleProcessProgramResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Process program was created
			expect($location.path()).toBe('/process-programs/' + sampleProcessProgramResponse._id);
		}));

		it('$scope.update() should update a valid Process program', inject(function(ProcessPrograms) {
			// Define a sample Process program put data
			var sampleProcessProgramPutData = new ProcessPrograms({
				_id: '525cf20451979dea2c000001',
				name: 'New Process program'
			});

			// Mock Process program in scope
			scope.processProgram = sampleProcessProgramPutData;

			// Set PUT response
			$httpBackend.expectPUT(/process-programs\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/process-programs/' + sampleProcessProgramPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid processProgramId and remove the Process program from the scope', inject(function(ProcessPrograms) {
			// Create new Process program object
			var sampleProcessProgram = new ProcessPrograms({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Process programs array and include the Process program
			scope.processPrograms = [sampleProcessProgram];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/process-programs\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleProcessProgram);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.processPrograms.length).toBe(0);
		}));
	});
}());