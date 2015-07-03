'use strict';

(function() {
	// Entity attributes details Controller Spec
	describe('Entity attributes details Controller Tests', function() {
		// Initialize global variables
		var EntityAttributesDetailsController,
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

			// Initialize the Entity attributes details controller.
			EntityAttributesDetailsController = $controller('EntityAttributesDetailsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Entity attributes detail object fetched from XHR', inject(function(EntityAttributesDetails) {
			// Create sample Entity attributes detail using the Entity attributes details service
			var sampleEntityAttributesDetail = new EntityAttributesDetails({
				name: 'New Entity attributes detail'
			});

			// Create a sample Entity attributes details array that includes the new Entity attributes detail
			var sampleEntityAttributesDetails = [sampleEntityAttributesDetail];

			// Set GET response
			$httpBackend.expectGET('entity-attributes-details').respond(sampleEntityAttributesDetails);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.entityAttributesDetails).toEqualData(sampleEntityAttributesDetails);
		}));

		it('$scope.findOne() should create an array with one Entity attributes detail object fetched from XHR using a entityAttributesDetailId URL parameter', inject(function(EntityAttributesDetails) {
			// Define a sample Entity attributes detail object
			var sampleEntityAttributesDetail = new EntityAttributesDetails({
				name: 'New Entity attributes detail'
			});

			// Set the URL parameter
			$stateParams.entityAttributesDetailId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/entity-attributes-details\/([0-9a-fA-F]{24})$/).respond(sampleEntityAttributesDetail);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.entityAttributesDetail).toEqualData(sampleEntityAttributesDetail);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(EntityAttributesDetails) {
			// Create a sample Entity attributes detail object
			var sampleEntityAttributesDetailPostData = new EntityAttributesDetails({
				name: 'New Entity attributes detail'
			});

			// Create a sample Entity attributes detail response
			var sampleEntityAttributesDetailResponse = new EntityAttributesDetails({
				_id: '525cf20451979dea2c000001',
				name: 'New Entity attributes detail'
			});

			// Fixture mock form input values
			scope.name = 'New Entity attributes detail';

			// Set POST response
			$httpBackend.expectPOST('entity-attributes-details', sampleEntityAttributesDetailPostData).respond(sampleEntityAttributesDetailResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Entity attributes detail was created
			expect($location.path()).toBe('/entity-attributes-details/' + sampleEntityAttributesDetailResponse._id);
		}));

		it('$scope.update() should update a valid Entity attributes detail', inject(function(EntityAttributesDetails) {
			// Define a sample Entity attributes detail put data
			var sampleEntityAttributesDetailPutData = new EntityAttributesDetails({
				_id: '525cf20451979dea2c000001',
				name: 'New Entity attributes detail'
			});

			// Mock Entity attributes detail in scope
			scope.entityAttributesDetail = sampleEntityAttributesDetailPutData;

			// Set PUT response
			$httpBackend.expectPUT(/entity-attributes-details\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/entity-attributes-details/' + sampleEntityAttributesDetailPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid entityAttributesDetailId and remove the Entity attributes detail from the scope', inject(function(EntityAttributesDetails) {
			// Create new Entity attributes detail object
			var sampleEntityAttributesDetail = new EntityAttributesDetails({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Entity attributes details array and include the Entity attributes detail
			scope.entityAttributesDetails = [sampleEntityAttributesDetail];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/entity-attributes-details\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleEntityAttributesDetail);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.entityAttributesDetails.length).toBe(0);
		}));
	});
}());