'use strict';

(function() {
	// Entity classification details Controller Spec
	describe('Entity classification details Controller Tests', function() {
		// Initialize global variables
		var EntityClassificationDetailsController,
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

			// Initialize the Entity classification details controller.
			EntityClassificationDetailsController = $controller('EntityClassificationDetailsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Entity classification detail object fetched from XHR', inject(function(EntityClassificationDetails) {
			// Create sample Entity classification detail using the Entity classification details service
			var sampleEntityClassificationDetail = new EntityClassificationDetails({
				name: 'New Entity classification detail'
			});

			// Create a sample Entity classification details array that includes the new Entity classification detail
			var sampleEntityClassificationDetails = [sampleEntityClassificationDetail];

			// Set GET response
			$httpBackend.expectGET('entity-classification-details').respond(sampleEntityClassificationDetails);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.entityClassificationDetails).toEqualData(sampleEntityClassificationDetails);
		}));

		it('$scope.findOne() should create an array with one Entity classification detail object fetched from XHR using a entityClassificationDetailId URL parameter', inject(function(EntityClassificationDetails) {
			// Define a sample Entity classification detail object
			var sampleEntityClassificationDetail = new EntityClassificationDetails({
				name: 'New Entity classification detail'
			});

			// Set the URL parameter
			$stateParams.entityClassificationDetailId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/entity-classification-details\/([0-9a-fA-F]{24})$/).respond(sampleEntityClassificationDetail);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.entityClassificationDetail).toEqualData(sampleEntityClassificationDetail);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(EntityClassificationDetails) {
			// Create a sample Entity classification detail object
			var sampleEntityClassificationDetailPostData = new EntityClassificationDetails({
				name: 'New Entity classification detail'
			});

			// Create a sample Entity classification detail response
			var sampleEntityClassificationDetailResponse = new EntityClassificationDetails({
				_id: '525cf20451979dea2c000001',
				name: 'New Entity classification detail'
			});

			// Fixture mock form input values
			scope.name = 'New Entity classification detail';

			// Set POST response
			$httpBackend.expectPOST('entity-classification-details', sampleEntityClassificationDetailPostData).respond(sampleEntityClassificationDetailResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Entity classification detail was created
			expect($location.path()).toBe('/entity-classification-details/' + sampleEntityClassificationDetailResponse._id);
		}));

		it('$scope.update() should update a valid Entity classification detail', inject(function(EntityClassificationDetails) {
			// Define a sample Entity classification detail put data
			var sampleEntityClassificationDetailPutData = new EntityClassificationDetails({
				_id: '525cf20451979dea2c000001',
				name: 'New Entity classification detail'
			});

			// Mock Entity classification detail in scope
			scope.entityClassificationDetail = sampleEntityClassificationDetailPutData;

			// Set PUT response
			$httpBackend.expectPUT(/entity-classification-details\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/entity-classification-details/' + sampleEntityClassificationDetailPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid entityClassificationDetailId and remove the Entity classification detail from the scope', inject(function(EntityClassificationDetails) {
			// Create new Entity classification detail object
			var sampleEntityClassificationDetail = new EntityClassificationDetails({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Entity classification details array and include the Entity classification detail
			scope.entityClassificationDetails = [sampleEntityClassificationDetail];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/entity-classification-details\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleEntityClassificationDetail);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.entityClassificationDetails.length).toBe(0);
		}));
	});
}());