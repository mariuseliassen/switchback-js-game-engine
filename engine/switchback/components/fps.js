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
    
    var fpsComponent = Switchback.component('fps', {
        last_update : 0,
        interval : 1000,
        currentFps : 0,
        
        init: function(param) {
            // bind draw
            this.bind('draw', this.draw);
            
            // bind update
            this.bind('update', this.update);
        },
        
        update: function(dt) {           
            if ( this.last_update + this.interval < (+new Date)  ) {
                
                this.last_update = (+new Date);
                this.currentFps = Switchback.timer.getFPS();
            }
        },
        
        draw : function(dt) {
            Switchback.graphics.print( "fps: " + this.currentFps, 0, 9 );
        }
    });
    
    window.Switchback = Switchback;
})(window);