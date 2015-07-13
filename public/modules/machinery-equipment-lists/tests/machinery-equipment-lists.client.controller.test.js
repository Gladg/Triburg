'use strict';

(function() {
	// Machinery equipment lists Controller Spec
	describe('Machinery equipment lists Controller Tests', function() {
		// Initialize global variables
		var MachineryEquipmentListsController,
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

			// Initialize the Machinery equipment lists controller.
			MachineryEquipmentListsController = $controller('MachineryEquipmentListsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Machinery equipment list object fetched from XHR', inject(function(MachineryEquipmentLists) {
			// Create sample Machinery equipment list using the Machinery equipment lists service
			var sampleMachineryEquipmentList = new MachineryEquipmentLists({
				name: 'New Machinery equipment list'
			});

			// Create a sample Machinery equipment lists array that includes the new Machinery equipment list
			var sampleMachineryEquipmentLists = [sampleMachineryEquipmentList];

			// Set GET response
			$httpBackend.expectGET('machinery-equipment-lists').respond(sampleMachineryEquipmentLists);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.machineryEquipmentLists).toEqualData(sampleMachineryEquipmentLists);
		}));

		it('$scope.findOne() should create an array with one Machinery equipment list object fetched from XHR using a machineryEquipmentListId URL parameter', inject(function(MachineryEquipmentLists) {
			// Define a sample Machinery equipment list object
			var sampleMachineryEquipmentList = new MachineryEquipmentLists({
				name: 'New Machinery equipment list'
			});

			// Set the URL parameter
			$stateParams.machineryEquipmentListId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/machinery-equipment-lists\/([0-9a-fA-F]{24})$/).respond(sampleMachineryEquipmentList);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.machineryEquipmentList).toEqualData(sampleMachineryEquipmentList);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(MachineryEquipmentLists) {
			// Create a sample Machinery equipment list object
			var sampleMachineryEquipmentListPostData = new MachineryEquipmentLists({
				name: 'New Machinery equipment list'
			});

			// Create a sample Machinery equipment list response
			var sampleMachineryEquipmentListResponse = new MachineryEquipmentLists({
				_id: '525cf20451979dea2c000001',
				name: 'New Machinery equipment list'
			});

			// Fixture mock form input values
			scope.name = 'New Machinery equipment list';

			// Set POST response
			$httpBackend.expectPOST('machinery-equipment-lists', sampleMachineryEquipmentListPostData).respond(sampleMachineryEquipmentListResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Machinery equipment list was created
			expect($location.path()).toBe('/machinery-equipment-lists/' + sampleMachineryEquipmentListResponse._id);
		}));

		it('$scope.update() should update a valid Machinery equipment list', inject(function(MachineryEquipmentLists) {
			// Define a sample Machinery equipment list put data
			var sampleMachineryEquipmentListPutData = new MachineryEquipmentLists({
				_id: '525cf20451979dea2c000001',
				name: 'New Machinery equipment list'
			});

			// Mock Machinery equipment list in scope
			scope.machineryEquipmentList = sampleMachineryEquipmentListPutData;

			// Set PUT response
			$httpBackend.expectPUT(/machinery-equipment-lists\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/machinery-equipment-lists/' + sampleMachineryEquipmentListPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid machineryEquipmentListId and remove the Machinery equipment list from the scope', inject(function(MachineryEquipmentLists) {
			// Create new Machinery equipment list object
			var sampleMachineryEquipmentList = new MachineryEquipmentLists({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Machinery equipment lists array and include the Machinery equipment list
			scope.machineryEquipmentLists = [sampleMachineryEquipmentList];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/machinery-equipment-lists\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleMachineryEquipmentList);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.machineryEquipmentLists.length).toBe(0);
		}));
	});
}());