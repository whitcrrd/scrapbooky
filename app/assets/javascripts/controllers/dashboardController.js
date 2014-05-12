angular.module('todoApp').controller("DashboardController", function($scope, $routeParams, $location, BookBoard) {
				
  var serverErrorHandler;
  $scope.init = function() {
	  
	this.bookBoardService = new BookBoard(serverErrorHandler);
	$scope.coverItems = this.bookBoardService.all();
	return $scope.coverItems;

  };
   
  return serverErrorHandler = function() {
    return alert("There was a server error, please reload the page and try again.");
  };
  
  $scope.customItemMap = {
         sizeX: 'item.randX',
         sizeY: 'item.randY',
         row: 'item.position[0]',
         col: 'item.position[1]'
     };
   	   
$scope.gridsterOpts = {
      minRows: 1, 
      maxRows: 10,
      columns: 6, 
      colWidth: 'auto',
      rowHeight: 'match', 
      margins: [5, 5], 
      defaultSizeX: 2, 
      defaultSizeY: 1, 
      mobileBreakPoint: 400, 
      resizable: {
         enabled: false
      },
      draggable: {
         enabled: false
      }
    };
});