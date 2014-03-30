angular.module('components', [])
 
    .directive('tabs', function() {
	return {
	    restrict: 'E',
	    transclude: true,
	    scope: {},
	    controller: function($scope, $element) {
		var panes = $scope.panes = [];
 
		$scope.select = function(pane) {
		    angular.forEach(panes, function(pane) {
			pane.selected = false;
		    });
		    pane.selected = true;
		}
 
		this.addPane = function(pane) {
		    if (panes.length == 0) $scope.select(pane);
		    panes.push(pane);
		}
	    },
	    template:
        '<div class="tabbable">' +
          '<ul class="nav nav-tabs">' +
            '<li ng-repeat="pane in panes" ng-class="{active:pane.selected}">'+
              '<a href="" ng-click="select(pane)">{{pane.title}}</a>' +
            '</li>' +
          '</ul>' +
          '<div class="tab-content" ng-transclude></div>' +
		'</div>',
	    replace: true
	};
    })
 
    .directive('pane', function() {
	return {
	    require: '^tabs',
	    restrict: 'E',
	    transclude: true,
	    scope: { title: '@' },
	    link: function(scope, element, attrs, tabsCtrl) {
		tabsCtrl.addPane(scope);
	    },
	    template:
        '<div class="tab-pane" ng-class="{active: selected}" ng-transclude>' +
		'</div>',
	    replace: true
	};
    })

function rectangular($scope){
    $scope.x = 3;
    $scope.y = 4
    $scope.recalculate = function() {
	$scope.result =  Math.sqrt(Math.pow($scope.y, 2) + Math.pow($scope.x,2));
    };
    $scope.recalculate();
};

function polar($scope){
    $scope.r = 12;
    $scope.o = 2;
    $scope.conversion = 1;
    $scope.degrees = true;
    $scope.recalculate = function() {
	$scope.x = Math.cos($scope.o * $scope.conversion) * $scope.r;
	$scope.y = Math.sin($scope.o * $scope.conversion) * $scope.r;
    };
    $scope.recalculate();
    $scope.convert = function(unit) {
	if (unit === 'radians'){
	    $scope.conversion = 1;
	    if ($scope.degrees === true){
		$scope.degrees = false;
	    };
	} else if (unit === 'degrees'){
	    $scope.conversion = Math.PI/180;
	    if ($scope.radians === true) { 
		$scope.radians = false;
	    }
	};
    };
}