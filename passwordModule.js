angular.module('passwordModule', [])
  .controller('credentialsController', ['$scope',
    function($scope) {
      // Initialise the password as hello
      $scope.credentials = {
        password: 'hello@123'
      };
    }
  ])
  .directive('passwordStrength', [
    function() {
      return {
        require: 'ngModel',
        restrict: 'E',
        scope: {
          password: '=ngModel'
        },

        link: function(scope, elem, attrs, ctrl) {
          scope.$watch('password', function(newVal) {

            scope.strength = isSatisfied(newVal && newVal.length >= 8) +
              isSatisfied(newVal && /[A-z]/.test(newVal)) +
              isSatisfied(newVal && /(?=.*\W)/.test(newVal)) +
              isSatisfied(newVal && /\d/.test(newVal));
              
              scope.width= (function(){
                  if(!scope.strength){
                      return "width: 0%";
                  }
              else if(scope.strength ===1){
                  return "width: 25%; background: #d9534f";
              }
              else if(scope.strength ===2){
                  return "width: 50%; background:#f0ad4e";
              }
                  else if(scope.strength ===3){
                      return "width: 75%; background:#5bc0de";
                  }
                  else if(scope.strength ===4){
                      return "width: 100%; background:#5cb85c";
                  }
              })(); 

            function isSatisfied(criteria) {
              return criteria ? 1 : 0;
            }
          }, true);
        },
        template: '<div class="progress">' +
          '<div class="progress-bar progress-bar-warning" style="{{width}}"></div>' +        
          '</div>'
      }
    }
  ])
  .directive('patternValidator', [
    function() {
      return {
        require: 'ngModel',
        restrict: 'A',
        link: function(scope, elem, attrs, ctrl) {
          ctrl.$parsers.unshift(function(viewValue) {
            
            var patt = new RegExp(attrs.patternValidator);
            
            var isValid = patt.test(viewValue);

            ctrl.$setValidity('passwordPattern', isValid);

            // angular does this with all validators -> return isValid ? viewValue : undefined;
            // But it means that the ng-model will have a value of undefined
            // So just return viewValue!
            return viewValue;
            
          });
        }
      };
    }
  ]);