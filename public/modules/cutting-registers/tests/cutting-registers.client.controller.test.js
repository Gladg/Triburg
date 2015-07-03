'use strict';

(function() {
	// Cutting registers Controller Spec
	describe('Cutting registers Controller Tests', function() {
		// Initialize global variables
		var CuttingRegistersController,
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

			// Initialize the Cutting registers controller.
			CuttingRegistersController = $controller('CuttingRegistersController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Cutting register object fetched from XHR', inject(function(CuttingRegisters) {
			// Create sample Cutting register using the Cutting registers service
			var sampleCuttingRegister = new CuttingRegisters({
				name: 'New Cutting register'
			});

			// Create a sample Cutting registers array that includes the new Cutting register
			var sampleCuttingRegisters = [sampleCuttingRegister];

			// Set GET response
			$httpBackend.expectGET('cutting-registers').respond(sampleCuttingRegisters);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.cuttingRegisters).toEqualData(sampleCuttingRegisters);
		}));

		it('$scope.findOne() should create an array with one Cutting register object fetched from XHR using a cuttingRegisterId URL parameter', inject(function(CuttingRegisters) {
			// Define a sample Cutting register object
			var sampleCuttingRegister = new CuttingRegisters({
				name: 'New Cutting register'
			});

			// Set the URL parameter
			$stateParams.cuttingRegisterId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/cutting-registers\/([0-9a-fA-F]{24})$/).respond(sampleCuttingRegister);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.cuttingRegister).toEqualData(sampleCuttingRegister);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(CuttingRegisters) {
			// Create a sample Cutting register object
			var sampleCuttingRegisterPostData = new CuttingRegisters({
				name: 'New Cutting register'
			});

			// Create a sample Cutting register response
			var sampleCuttingRegisterResponse = new CuttingRegisters({
				_id: '525cf20451979dea2c000001',
				name: 'New Cutting register'
			});

			// Fixture mock form input values
			scope.name = 'New Cutting register';

			// Set POST response
			$httpBackend.expectPOST('cutting-registers', sampleCuttingRegisterPostData).respond(sampleCuttingRegisterResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Cutting register was created
			expect($location.path()).toBe('/cutting-registers/' + sampleCuttingRegisterResponse._id);
		}));

		it('$scope.update() should update a valid Cutting register', inject(function(CuttingRegisters) {
			// Define a sample Cutting register put data
			var sampleCuttingRegisterPutData = new CuttingRegisters({
				_id: '525cf20451979dea2c000001',
				name: 'New Cutting register'
			});

			// Mock Cutting register in scope
			scope.cuttingRegister = sampleCuttingRegisterPutData;

			// Set PUT response
			$httpBackend.expectPUT(/cutting-registers\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/cutting-registers/' + sampleCuttingRegisterPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid cuttingRegisterId and remove the Cutting register from the scope', inject(function(CuttingRegisters) {
			// Create new Cutting register object
			var sampleCuttingRegister = new CuttingRegisters({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Cutting registers array and include the Cutting register
			scope.cuttingRegisters = [sampleCuttingRegister];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/cutting-registers\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleCuttingRegister);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.cuttingRegisters.length).toBe(0);
		}));
	});
}());