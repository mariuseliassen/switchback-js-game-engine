/**
* ================
* == Switchback ==
* ================
* a Javascript Game Engine
* 
* Package: Switchback.gameTime
* 
* Gametime engine functionality
* 
* Copyright Exchange Media 2011
* http://gamedev.exchange.no/switchback/
*/
(function(window) {
    var Switchback = window.Switchback || Switchback;
    
    Switchback.extend({
        gameTime: {
            fps: 50,
            
            prev: (new Date),
            current: (new Date),
            next: null,
            
            currentFps : 0,
            frame: 0,
            skip: 0,
            
            windowTimer: null,
            
            clearTimer: function() {
                if (this.windowTimer !== null) {
                    window.clearTimeout(this.windowTimer);
                    this.windowTimer = null;
                }  
            },
            
            startTimer: function() {
                this.windowTimer = window.setTimeout(function() { Switchback.gameTime.run.call(Switchback.gameTime); }, this.skip);
            },
            
            init: function(param) {
                if (param.fps) {
                    this.fps = param.fps;
                }
                
                this.skip = 1000 / this.fps;
                this.next = (new Date).getTime();
                
                this.startTimer();
            },
            
            // This is what happens every tick
            run: function() {
                this.clearTimer();
                
                var runFrame = true;
                
                
                // Run game commands every X-fps
                this.prev = this.current;
                this.current = (new Date);
    
                // store current FPS to mesure performance
                Switchback.time.currentFps = Math.round( 1000 / ( this.current - this.prev ) );
                
                if( runFrame ) {
                    var gameTime = this.current.getTime();
                    
                    // Run the update command
                    Switchback.update(gameTime);
                    
                    // Run the draw command
                    Switchback.draw(gameTime);
                }
                
                this.startTimer();
            }
        }
    });
    
    Switchback.registerModule('gameTime');
    
    window.Switchback = Switchback;
})(window);