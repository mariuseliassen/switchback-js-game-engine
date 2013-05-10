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
        timer: {
    		debug : true,
    	    fps: 50,
            
            _prevTick: (new Date()).getTime(),
            _currTick: (new Date()).getTime(),
            _nextTick: null,
            
            _currentFps : 0,
            _currentDelta : 0,

            drawDelta : 0,
            drawDeltaStart : 0,
            drawDeltaStop : 0,

            updateDelta : 0,
            updateDeltaStart : 0,
            updateDeltaStop : 0,
            
            skip: 0,
                                    
            init: function(param) {
                if (param.fps) {
                    this.fps = param.fps;
                }
                
                this.skip = 1000 / this.fps;
                this.nextTick = (new Date).getTime();

                window.requestAnimFrame = (function(){
                    return  window.requestAnimationFrame       || 
                            window.webkitRequestAnimationFrame || 
                            window.mozRequestAnimationFrame    || 
                            window.oRequestAnimationFrame      || 
                            window.msRequestAnimationFrame     || 
                            function(/* function */ callback, /* DOMElement */ element){
                              window.setTimeout(callback, 1000 / 60);
                            };
                  })();
                
                (function gameloop(){
                    Switchback.timer.run();
                    requestAnimFrame( gameloop, Switchback.graphics.viewport.el );
                  })();
            },
            
            // This is what happens every tick
            run: function() {
            	this._prevTick = this._currTick;
            	this._currTick = (new Date()).getTime();

            	if( this.debug )
            	{
            		this.drawDelta = this.drawDeltaStop - this.drawDeltaStart;
            		this.updateDelta = this.updateDeltaStop - this.updateDeltaStart;
            	}
            	
            	this._currentDelta = this._currTick - this._prevTick;
                this._currentFps   = Math.round( 1000 / this._currentDelta );
            	
                var runFrame = true;
                
                // Force fps - only for non standard FPS
                if( this.fps != 50 ) {
                    while((new Date).getTime() > this.nextTick) {
                        this.nextTick += this.skip;
                        runFrame = true;
                    }
                } else {
                    runFrame = true;
                }
                    
                if( runFrame ) {
                    
                    if( this.debug ) this.updateDeltaStart = (new Date()).getTime();
                    Switchback.update( this._currentDelta );
                    if( this.debug ) this.updateDeltaStop = (new Date()).getTime();
                    
                    if( this.debug ) this.drawDeltaStart = (new Date()).getTime();
                    Switchback.draw( this._currentDelta );
                    if( this.debug ) this.drawDeltaStop = (new Date()).getTime();
                }
            },
            
            getFPS : function () {
                return this._currentFps;
            },
            
            getDelta : function() {
            	return this._currentDelta;
            }
        }
    });
    
    Switchback.registerModule( 'timer' );
    
    window.Switchback = Switchback;
})(window);