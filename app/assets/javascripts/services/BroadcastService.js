angular.module('todoApp').factory('broadcastService', function($rootScope) {
		
	var sharedService = {};
	sharedService.newBookItem = {};
	sharedService.editItemInformation = {};
	sharedService.loadedBook = {};

	// EDIT/SAVE BUTTON => SAVES, REMOVES DRAGGABLE
	sharedService.broadcastBookSave = function() {
		$rootScope.$broadcast('broadcastBookSave');
	};
	
	// EDIT/SAVE BUTTON => MAKES DRAGGABLE
	sharedService.broadcastBookEdit = function() {
		$rootScope.$broadcast('broadcastBookEdit');
	};
	
	// USED FOR LOCATION OF EDIT ITEM MODAL (CLICK X,Y), SHOULD MAKE FULL MODAL
	sharedService.prepForBroadcastEdit = function(msg) {
		this.editItemInformation = msg;
		this.broadcastLocation();
	};
	
	sharedService.broadcastLocation = function() {
		$rootScope.$broadcast('editItem');
	};
	
	// BROADCASTS BOOK LOADED FROM SHOW PAGE => TELLS NAV TO CHECK USER
	sharedService.prepForBroadcastBookLoaded = function(book) {
		this.loadedBook = book;
		this.broadcastBookLoaded();
	};
	
	sharedService.broadcastBookLoaded = function() {
		$rootScope.$broadcast('bookLoaded');
	}
	
	// ADDED PHOTO / VIDEO RESPONSE, PUSHED INTO BOOK_ITEMS
	sharedService.broadcastNewBookItem = function(newBookItem) {
		this.newBookItem = newBookItem;
		this.broadcastAddedBookItem();
	};
	
	sharedService.broadcastAddedBookItem = function() {
		$rootScope.$broadcast('newBookItem');
	};
	
	return sharedService;
	
});