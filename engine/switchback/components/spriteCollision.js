/**
* ================
* == Switchback ==
* ================
* a Javascript Game Engine
* 
* Package: Switchback.Components
* 
* Components game engine functionality
* 
* Copyright Exchange Media 2011
* http://gamedev.exchange.no/switchback/
*/

(function(window) {
    var Switchback = window.Switchback || Switchback;

    var spriteCollision = Switchback.component('spriteCollision', {

        init : function(param) {
            this.bind('update', this.update);
        }
    
        update: function(dt) {
            
        }
    });

    window.Switchback = Switchback;
})(window);