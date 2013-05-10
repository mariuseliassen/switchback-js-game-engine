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
    
    var PerformancerComponent = Switchback.component('performancer', {

		pos    : 0,
		height : 151,
		width  : 500,
		factor : 1,
		
		drawLine   : null,
		updateLine : null,
		systemLine : null,
		
		fbViewport  : null,

		doClear : true,

        init: function( param ) {
    	
    		this._buildfbViewport( param );    		
    		
            // bind draw
            this.bind('draw', this.draw);
            
            // bind update
            this.bind('update', this.update);
        },
        
        _buildfbViewport : function( param )
        {
    	    this.width  = param.width  || 500;
    		
    		//this.framebuffer = document.createElement( 'canvas' );
    		
    		this.fbViewport = {
                    el     : document.getElementById( 'framebuffer' ),
                    type   : 'canvas',
                    width  : this.width,
                    height : this.height,
                    ctx    : document.getElementById( 'framebuffer' ).getContext( '2d' ),
    		};
        },
        
        update: function(dt) {
	    	this.pos = this.pos % this.width;
	    	this.doClear = this.pos == 0;
	    	this.pos++;
	    		    	    	
	    	var remaining = Switchback.timer.getDelta() - Switchback.timer.drawDelta - Switchback.timer.updateDelta;
	    	
	    	this.drawLine = { y1 : 0,
	    			          y2 : Math.floor( Switchback.timer.drawDelta * this.factor )
	    	};
	    	
	    	this.updateLine = { y1 : this.drawLine.y2,
   			     		        y2 : Math.floor( this.drawLine.y2 + ( Switchback.timer.updateDelta * this.factor ) )
	    	};

	    	this.systemLine = { y1 : this.updateLine.y2,
		     		            y2 : Math.floor( this.updateLine.y2 + ( remaining * this.factor ) )
	    	};
        },
        
        draw : function(dt) {
        	
        	// draw in framebuffer
        	var gameViewport = Switchback.graphics.viewport;
        	Switchback.graphics.viewport = this.fbViewport;
        	
        	if( this.doClear )
        	{
    	        Switchback.graphics.clear();
            	Switchback.graphics.setColor( 0, 0, 0, 255 );
            	Switchback.graphics.rectangle( 'fill', 0,0, this.width, this.height );
            	
            	// roaster
            	var interval = 20;
                for( var i = interval; i < this.height; i = i + interval )
            	{
                    Switchback.graphics.line( '#3a3a3a', 1, this.height - i, this.width, this.height - i );
                    
                    Switchback.graphics.setColor( '#7c776e' );
                    Switchback.graphics.print( i + 'ms', 3, this.height - (i + 4 ) );
            	}
        	}

        	Switchback.graphics.line( '#13baff', this.pos, this.height - this.drawLine.y1,   this.pos, this.height - this.drawLine.y2 );
	        Switchback.graphics.line( '#bb0fff', this.pos, this.height - this.updateLine.y1, this.pos, this.height - this.updateLine.y2 );
	        Switchback.graphics.line( '#ff7200', this.pos, this.height - this.systemLine.y1, this.pos, this.height - this.systemLine.y2 );
	        
	        //reset viewport
	        Switchback.graphics.viewport = gameViewport;
        }
    });
    
})(window);