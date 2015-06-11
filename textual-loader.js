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
          scope: {
            enabled: '=tlEnabled'
          },
          restrict: 'AE',
          link: linkFunc
        };
        return directive;

        function linkFunc(scope, element, attrs) {
          var elementText = element.text();
          var characters = [];
          var currentChar = 0;
          var character;
          var interval;

          // Clear element
          empty();
          build();

          // Set enabled by default (if not set)
          if(typeof scope.enabled === 'undefined') {
            scope.enabled = true;
          }

          if(scope.enabled) {
            start();
          }

          // Watch for changes on the enabled state
          scope.$watch('enabled', function(newValue, oldValue) {
            var diff = (newValue !== oldValue);

            if(newValue && diff && scope.enabled) {
              start();
            } else if(diff) {
              stop();
            }
          });

          /**
           * Starts the loader
           */
          function start() {
            console.info('start');

            interval = setInterval(function() {
              nextChar();
            }, 500);

          }

          /**
           * Stops the loader
           */
          function stop() {
            clearInterval(interval);
            //empty();
          }

          /**
           * Shows a single character
           * @param  {integer} index Character index
           */
          function showChar(index) {
            characters[index].addClass('tl-fadein');
          }

          /**
           * Processes the next character
           */
          function nextChar() {
            if(currentChar === -1) {   
              clearChars(); 
            } else {
              showChar(currentChar);
            }
            
            if(currentChar === characters.length-1) {
              currentChar = -1;
            } else {
              currentChar++;
            }            
          }

          /**
           * Hides all the characters
           */
          function clearChars() {
            for(var i=0;i<characters.length;i++) {
              characters[i].removeClass('tl-fadein');
            }
          }

          /**
           * Empties the directive container
           */
          function empty() {
            element.html('');
          }

          /**
           * Builds the html template
           */
          function build() {
            for(var i=0;i<elementText.length;i++) {
              character = angular.element('<span class="tl-char">.</span>');
              element.append(character);
              characters.push(character);
            } 
          }

        }
    }

})();
