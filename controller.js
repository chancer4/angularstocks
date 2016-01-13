var stockApp = angular.module('stockApp', ['ngAnimate', 'ui.bootstrap']);
stockApp.controller('stockCtrl', function ($scope, $http){

$scope.userStocks = "";

	$scope.getStocks = function(){

		var encodedTickers = encodeURIComponent($scope.userStocks);
		url = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20("'+encodedTickers+'")%0A%09%09&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json';
		$http.get(url).success(function (stockData){
			// console.log(stockData);
			// console.log(encodedTickers);
			if ($scope.userStocks.indexOf(',') === -1){
				listOfStocks = [stockData.query.results.quote]
			} else{
				listOfStocks = stockData.query.results.quote
			}
			$scope.listOfStocks = listOfStocks;
			// if(indexOf)
			console.log(stockData.query.results);

			// $scope.loadStock($scope)
		})
	}

	$scope.loadStock = function(stockData){
		//init array
		$scope.dataList = [];
		for(name in stockData){
			$scope.dataList.push({
				prop: name,
				value: stockData[name]
			})
		}
		getChart(stockData);
	}

	function getChart (stockData){
		$scope.chart1="http://chart.finance.yahoo.com/z?s="+stockData.symbol+"&t=1ym&q=l&l=on&z=s&p=m10,m100"
		$scope.chart2= "http://chart.finance.yahoo.com/z?s="+stockData.symbol+"&t=1ym&q=l&l=on&z=s&p=m50,m200";
	}

	$scope.getChangeClass = function (change){
            if(change.indexOf('+') > -1){
                return 'change-positive';
            }else if(change.indexOf('-') > 01){
                return 'change-negative';
            }
        }
     //******Begin TypeAhead Code*******
     //*********************************
  var _selected;

  $scope.selected = undefined;
  $scope.states = ['AAPL','GOOG','BAC','YHOO','HOG','GE','SPY','DIA','QQQ','AAP','ACN','AEO','AFL'];
  //Any function returning a promise object can be used to load values asynchronously
  $scope.getSymbol = function(val) {
    return $http.get('http://ec2-54-200-226-68.us-west-2.compute.amazonaws.com/stocks.php?stock='+val, {
      params: {
        symbol: val,
        sensor: false
      }
    }).then(function(response){
    	console.log(response);
      	return response.data
    });
  };

  $scope.ngModelOptionsSelected = function(value) {
    if (arguments.length) {
      _selected = value;
    } else {
      return _selected;
    }
  };

  $scope.modelOptions = {
    debounce: {
      default: 500,
      blur: 250
    },
    getterSetter: true
  };

});

// angular.module('stockApp', ['ngAnimate', 'ui.bootstrap']);

