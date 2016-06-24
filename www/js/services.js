angular.module('starter.services', [])
.factory('oAuth',function($cordovaOauth)
{
  return {
    facebookAuth: function(){
         $cordovaOauth.facebook("942918379127837", ["email"]).then(function(result)
         {
            // $state.go('asignaturas');
             console.log("Response Object -> " + JSON.stringify(result));
         }, function(error)
         {
              console.log("Response Object -> " + JSON.stringify(error));
         });

    }
  };
})
.factory('Asignaturas', function() {
// Might use a resource here that returns a JSON array

// Some fake testing data
var asignaturas =
[{
     id: 0,
     name: 'Calculo I',
     approveNote: 4,
     maxNote: 7,
     tests: [{
          id: 1,
          name: 'Prueba 1',
          note: 7.0,
          percent: 50
     },
     {
          id: 2,
          name: 'Prueba 2',
          note: 7.0,
          percent: 50
     }
     ],
     prom: '6,7'
}, {
     id: 1,
     name: 'Calculo II',
     approveNote: 4,
     maxNote: 7,
     tests: [{
          id: 1,
          name: 'Prueba 1',
          note: 6.2,
          percent: 30
     },
     {
          id: 2,
          name: 'Prueba 2',
          note: 4.2,
          percent: 40
     }
     ],
     prom: '5,5'
}, {
     id: 2,
     name: 'Calculo III',
     approveNote: 4,
     maxNote: 7,
     tests: [{
          id: 1,
          name: 'Prueba 1',
          note: 6.2,
          percent: 50
     },
     {
          id: 2,
          name: 'Prueba 2',
          note: 4.2,
          percent: 40
     }
     ],
     prom: '4,5'
}, {
     id: 3,
     name: 'Física',
     approveNote: 4,
     maxNote: 7,
     tests: [{
          id: 1,
          name: 'Prueba 1',
          note: 6.2,
          percent: 30
     },
     {
          id: 2,
          name: 'Prueba 2',
          note: 4.2,
          percent: 30
     }
     ],
     prom: '5,4'
}, {
     id: 4,
     name: 'Diseño',
     approveNote: 4,
     maxNote: 7,
     tests: [{
          id: 1,
          name: 'Prueba 1',
          note: 6.2,
          percent: 10
     },
     {
          id: 2,
          name: 'Prueba 2',
          note: 4.2,
          percent: 30
     }
     ]
}];

return {
     all: function() {
          return asignaturas;
     },
     remove: function(asignatura) {
          asignaturas.splice(asignaturas.indexOf(asignatura), 1);
     },
     removeTest: function(test, asignatura) {
          asignatura.tests.splice(asignatura.tests.indexOf(test), 1);  /* asignatura.tests.indexOf(test.id) */
     },
     add: function(asignatura) {
          asignaturas.push(asignatura);
     },
     addTest: function(test, asignatura) {
          asignatura.tests.push(test);
     },
     addNota: function(nota, test, asignatura) {
          test.note = nota;
          asignatura.tests.splice(asignatura.tests.indexOf(test), 1, test);
     },
     addPercent: function(percent, test, asignatura) {
          test.percent = percent;
          asignatura.tests.splice(asignatura.tests.indexOf(test), 1, test);
     },
     get: function(asignaturaId) {
          for (var i = 0; i < asignaturas.length; i++) {
               if (asignaturas[i].id === parseInt(asignaturaId)) {
                    return asignaturas[i];
               }
          }
          return null;
     }
     };
});
