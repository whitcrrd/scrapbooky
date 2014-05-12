angular.module('todoApp').controller("ShowPageController", function($scope, $timeout, $routeParams, Book, broadcastService) {
	
	$scope.bookEditableStatus = false;	
	$scope.bookItems = [];
	
    serverErrorHandler = function() {
      return alert("There was a server error, please reload the page and try again.");
    };
	
	$scope.init = function() {
		this.bookService = new Book(serverErrorHandler);		
		$scope.book = this.bookService.find($routeParams.book_id, function(book) {
			$scope.bookItems = book.book_items;			
			broadcastService.prepForBroadcastBookLoaded(book);	
		});
		
		return $scope.book;	
	};
		   
	$scope.showItem = function(item) {
		$scope.$broadcast('showItem', item);
	};
   	
	$scope.$on('newBookItem', function() {
		$scope.bookItems.push(broadcastService.newBookItem);
	});
	
	$scope.$on('broadcastBookSave', function() {
		$scope.bookEditableStatus = false;
		$scope.gridsterOpts.resizable = {enabled: false};
		$scope.gridsterOpts.draggable = {enabled: false};
	});
				
	$scope.$on('broadcastBookEdit', function() {
		$scope.bookEditableStatus = true;
		$scope.gridsterOpts.resizable = {enabled: true};
		$scope.gridsterOpts.draggable = {enabled: true};
	});
	
	$scope.gridsterOpts = {
		minRows: 1, 
		maxRows: 3,
		columns: 6,
		colWidth: 'auto',
		rowHeight: 'match', 
		margins: [5, 5], 
		defaultSizeX: 1, 
		defaultSizeY: 1, 
		mobileBreakPoint: 400, 
		resizable: {
	         enabled: false
	      },
		draggable: {
			enabled: false
		}
	    };
		
    $scope.customItemMap = {
		sizeX: 'item.size.x',
		sizeY: 'item.size.y',
		row: 'item.position[0]',
		col: 'item.position[1]'
	};
		
});