angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, $cordovaOauth, $state, $localStorage) {
     $scope.loginFB = function() {

         $cordovaOauth.facebook("942918379127837", ["email"]).then(function(result) {
           
           $localStorage.accessToken = result.access_token;
           $state.go('asignaturas');

         }, function(error) {
             alert(error);
         });
     };

})
.controller('testCtrl',function($scope, $stateParams)
{
     if($stateParams.testId)
          $scope.test = $stateParams.testId;
     else {
          $scope.test = {};
     }

})
.controller('AsignaturasCtrl', function($scope, $state, Asignaturas, $localStorage) {

     $scope.asignaturas = Asignaturas.all();
     $scope.init = function()
     {
        if($localStorage.hasOwnProperty("accessToken") === true) {
            $state.go('asignaturas');
        } else {
          $state.go('login');
        }
     };
     $scope.logout = function()
     {
        if($localStorage.hasOwnProperty("accessToken") === true) {
          $localStorage.$reset()
            $state.go('login');
        } else {
          $state.go('login');
        }
     };
     $scope.addAsignature = function()
     {
          $state.go('addAsignature');
     }

     $scope.prom = function(asignatura)
     {
          var sumProm = 0;
          if(asignatura.tests == 'undefined')
               return;
          if(!asignatura.tests.length)
          {
               return ;
          }
          else
          {
               for (var i = 0; i < asignatura.tests.length; i++)
               {
                    sumProm += asignatura.tests[i].note * asignatura.tests[i].percent;
               }
               while(sumProm>10)
               {
                 sumProm = sumProm/10;
               }
               if(sumProm < asignatura.approveNote)
               {
                    $scope.NoteColor={'color':'red'};
               }
               else
               {
                    $scope.NoteColor={'color':'blue'};
               }

               return Math.round(sumProm*100)/100;
          }
     };
     $scope.sumPercents = function(asignatura)
     {
          var sumPercents = 0;
          if(asignatura.tests == 'undefined')
               return;
          if(!asignatura.tests.length)
          {
               return ;
          }
          else
          {
               for (var i = 0; i < asignatura.tests.length; i++)
               {
                    sumPercents += asignatura.tests[i].percent;
               }
               return sumPercents;
             }
     }
     $scope.remove = function(asignatura)
     {
          Asignaturas.remove(asignatura);
     };
})
.controller('AddAsignatureCtrl', function($scope, $state, Asignaturas) {
     $scope.asignatura = {};
     $scope.asignatura.tests = {};
     $scope.add = function()
     {
          Asignaturas.add($scope.asignatura);
          $state.go('asignaturas');
     };
})
.controller('AsignaturaDetailCtrl', function($scope, $stateParams, $location, Asignaturas)
{
     $scope.asignatura = Asignaturas.get($stateParams.asignaturaId);

     $scope.remove = function(test, asignatura)
     {
          Asignaturas.removeTest(test, asignatura);
     };

     $scope.addTest = function(test, asignatura)
     {
          Asignaturas.addTest(test, asignatura);
     };

     $scope.getTotal = function(){
          var total = 0;

          for(var i = 0; i < $scope.asignatura.tests.length; i++){
               var product = $scope.asignatura.tests[i];
               total += (product.note * (product.percent / 100));
          }

          total = total.toFixed(2);
          return total;
     };
     $scope.getTotalPercent = function(){
          var total = 0;

          for(var i = 0; i < $scope.asignatura.tests.length; i++){
               var product = $scope.asignatura.tests[i];
               total += (product.percent);
          }
          total = total.toFixed(2);
          return total;
     };

     $scope.count = 0;
     $scope.addNota = function(val, test, asignatura) {
          if (isNaN(val) != true) {
               Asignaturas.addNota(val, test, asignatura);
          } else {
               // Mostrar mensaje que diga que solo puede usar numeros
          }
     };
     $scope.addPercent = function(percent, test, asignatura) {
          if (isNaN(percent) != true) {
               Asignaturas.addPercent(percent, test, asignatura);
          } else {
               // Mostrar mensaje que diga que solo puede usar numeros
          }
     };

});
