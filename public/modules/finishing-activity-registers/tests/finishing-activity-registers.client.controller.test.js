'use strict';

(function() {
	// Finishing activity registers Controller Spec
	describe('Finishing activity registers Controller Tests', function() {
		// Initialize global variables
		var FinishingActivityRegistersController,
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

			// Initialize the Finishing activity registers controller.
			FinishingActivityRegistersController = $controller('FinishingActivityRegistersController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Finishing activity register object fetched from XHR', inject(function(FinishingActivityRegisters) {
			// Create sample Finishing activity register using the Finishing activity registers service
			var sampleFinishingActivityRegister = new FinishingActivityRegisters({
				name: 'New Finishing activity register'
			});

			// Create a sample Finishing activity registers array that includes the new Finishing activity register
			var sampleFinishingActivityRegisters = [sampleFinishingActivityRegister];

			// Set GET response
			$httpBackend.expectGET('finishing-activity-registers').respond(sampleFinishingActivityRegisters);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.finishingActivityRegisters).toEqualData(sampleFinishingActivityRegisters);
		}));

		it('$scope.findOne() should create an array with one Finishing activity register object fetched from XHR using a finishingActivityRegisterId URL parameter', inject(function(FinishingActivityRegisters) {
			// Define a sample Finishing activity register object
			var sampleFinishingActivityRegister = new FinishingActivityRegisters({
				name: 'New Finishing activity register'
			});

			// Set the URL parameter
			$stateParams.finishingActivityRegisterId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/finishing-activity-registers\/([0-9a-fA-F]{24})$/).respond(sampleFinishingActivityRegister);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.finishingActivityRegister).toEqualData(sampleFinishingActivityRegister);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(FinishingActivityRegisters) {
			// Create a sample Finishing activity register object
			var sampleFinishingActivityRegisterPostData = new FinishingActivityRegisters({
				name: 'New Finishing activity register'
			});

			// Create a sample Finishing activity register response
			var sampleFinishingActivityRegisterResponse = new FinishingActivityRegisters({
				_id: '525cf20451979dea2c000001',
				name: 'New Finishing activity register'
			});

			// Fixture mock form input values
			scope.name = 'New Finishing activity register';

			// Set POST response
			$httpBackend.expectPOST('finishing-activity-registers', sampleFinishingActivityRegisterPostData).respond(sampleFinishingActivityRegisterResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Finishing activity register was created
			expect($location.path()).toBe('/finishing-activity-registers/' + sampleFinishingActivityRegisterResponse._id);
		}));

		it('$scope.update() should update a valid Finishing activity register', inject(function(FinishingActivityRegisters) {
			// Define a sample Finishing activity register put data
			var sampleFinishingActivityRegisterPutData = new FinishingActivityRegisters({
				_id: '525cf20451979dea2c000001',
				name: 'New Finishing activity register'
			});

			// Mock Finishing activity register in scope
			scope.finishingActivityRegister = sampleFinishingActivityRegisterPutData;

			// Set PUT response
			$httpBackend.expectPUT(/finishing-activity-registers\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/finishing-activity-registers/' + sampleFinishingActivityRegisterPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid finishingActivityRegisterId and remove the Finishing activity register from the scope', inject(function(FinishingActivityRegisters) {
			// Create new Finishing activity register object
			var sampleFinishingActivityRegister = new FinishingActivityRegisters({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Finishing activity registers array and include the Finishing activity register
			scope.finishingActivityRegisters = [sampleFinishingActivityRegister];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/finishing-activity-registers\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleFinishingActivityRegister);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.finishingActivityRegisters.length).toBe(0);
		}));
	});
}());