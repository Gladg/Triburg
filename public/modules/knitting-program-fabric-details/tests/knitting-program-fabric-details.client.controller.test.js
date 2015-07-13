'use strict';

(function() {
	// Knitting program fabric details Controller Spec
	describe('Knitting program fabric details Controller Tests', function() {
		// Initialize global variables
		var KnittingProgramFabricDetailsController,
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

			// Initialize the Knitting program fabric details controller.
			KnittingProgramFabricDetailsController = $controller('KnittingProgramFabricDetailsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Knitting program fabric detail object fetched from XHR', inject(function(KnittingProgramFabricDetails) {
			// Create sample Knitting program fabric detail using the Knitting program fabric details service
			var sampleKnittingProgramFabricDetail = new KnittingProgramFabricDetails({
				name: 'New Knitting program fabric detail'
			});

			// Create a sample Knitting program fabric details array that includes the new Knitting program fabric detail
			var sampleKnittingProgramFabricDetails = [sampleKnittingProgramFabricDetail];

			// Set GET response
			$httpBackend.expectGET('knitting-program-fabric-details').respond(sampleKnittingProgramFabricDetails);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.knittingProgramFabricDetails).toEqualData(sampleKnittingProgramFabricDetails);
		}));

		it('$scope.findOne() should create an array with one Knitting program fabric detail object fetched from XHR using a knittingProgramFabricDetailId URL parameter', inject(function(KnittingProgramFabricDetails) {
			// Define a sample Knitting program fabric detail object
			var sampleKnittingProgramFabricDetail = new KnittingProgramFabricDetails({
				name: 'New Knitting program fabric detail'
			});

			// Set the URL parameter
			$stateParams.knittingProgramFabricDetailId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/knitting-program-fabric-details\/([0-9a-fA-F]{24})$/).respond(sampleKnittingProgramFabricDetail);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.knittingProgramFabricDetail).toEqualData(sampleKnittingProgramFabricDetail);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(KnittingProgramFabricDetails) {
			// Create a sample Knitting program fabric detail object
			var sampleKnittingProgramFabricDetailPostData = new KnittingProgramFabricDetails({
				name: 'New Knitting program fabric detail'
			});

			// Create a sample Knitting program fabric detail response
			var sampleKnittingProgramFabricDetailResponse = new KnittingProgramFabricDetails({
				_id: '525cf20451979dea2c000001',
				name: 'New Knitting program fabric detail'
			});

			// Fixture mock form input values
			scope.name = 'New Knitting program fabric detail';

			// Set POST response
			$httpBackend.expectPOST('knitting-program-fabric-details', sampleKnittingProgramFabricDetailPostData).respond(sampleKnittingProgramFabricDetailResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Knitting program fabric detail was created
			expect($location.path()).toBe('/knitting-program-fabric-details/' + sampleKnittingProgramFabricDetailResponse._id);
		}));

		it('$scope.update() should update a valid Knitting program fabric detail', inject(function(KnittingProgramFabricDetails) {
			// Define a sample Knitting program fabric detail put data
			var sampleKnittingProgramFabricDetailPutData = new KnittingProgramFabricDetails({
				_id: '525cf20451979dea2c000001',
				name: 'New Knitting program fabric detail'
			});

			// Mock Knitting program fabric detail in scope
			scope.knittingProgramFabricDetail = sampleKnittingProgramFabricDetailPutData;

			// Set PUT response
			$httpBackend.expectPUT(/knitting-program-fabric-details\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/knitting-program-fabric-details/' + sampleKnittingProgramFabricDetailPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid knittingProgramFabricDetailId and remove the Knitting program fabric detail from the scope', inject(function(KnittingProgramFabricDetails) {
			// Create new Knitting program fabric detail object
			var sampleKnittingProgramFabricDetail = new KnittingProgramFabricDetails({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Knitting program fabric details array and include the Knitting program fabric detail
			scope.knittingProgramFabricDetails = [sampleKnittingProgramFabricDetail];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/knitting-program-fabric-details\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleKnittingProgramFabricDetail);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.knittingProgramFabricDetails.length).toBe(0);
		}));
	});
}());