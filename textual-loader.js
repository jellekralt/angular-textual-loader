(function() {
    'use strict';
    
    angular.module('textualLoader', []);

    angular
        .module('textualLoader')
        .directive('textualLoader', textualLoader);

    textualLoader.$inject = [];
    /* @ngInject */
    function textualLoader() {
        //Usage:
        //<button>Loading <span textual-loader></span></div>
        var directive = {
            restrict: 'AE',
            link: linkFunc
        };
        return directive;

        function linkFunc(scope, element, attrs, ctrl) {
          var elementText = element.text();
          var characters = [];
          var character;
          var currentChar = 0;
          
          // Clear element
          element.html('');
          
          for(var i=0;i<elementText.length;i++) {
              character = angular.element('<span class="tl-char">.</span>');
              element.append(character);
              characters.push(character);
          }
          
          setInterval(function() {
            
            if(currentChar === -1) {
                            
              for(var i=0;i<characters.length;i++) {
                characters[i].removeClass('tl-fadein');
              }

            } else {
            
              characters[currentChar].addClass('tl-fadein');
            }
            
            if(currentChar === characters.length-1) {
              currentChar = -1;
            } else {
              currentChar++;
            }
          }, 1000);
         // console.log(elementText.split());
        }
    }

})();
