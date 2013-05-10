/**
 * ================ == Celldweller == ================ a created with Switchback
 * Javascript Game Engine (http://gamedev.exchange.no/switchback/)
 * 
 * Copyright Exchange Media 2011 http://gamedev.exchange.no/celldweller/
 */

var Debug_Game = {

				    
    /*
	 * Function to initialize the Switchback engine
	 */
    init: function() {
	
		var pos = 0;
		var height = 201;
		var factor = 3;
		
		var drawLine;
		var updateLine;
		var systemLine;

		var doClear = false;
		
        Switchback.draw = (function( dt ) {
        	
        	if( doClear )
        	{
    	        Switchback.graphics.clear();
        	}

        	Switchback.graphics.line( 'blue',   pos, height - drawLine.y1,   pos, height - drawLine.y2 );
	        Switchback.graphics.line( 'green',  pos, height - updateLine.y1, pos, height - updateLine.y2 );
	        Switchback.graphics.line( 'yellow', pos, height - systemLine.y1, pos, height - systemLine.y2 );
	    });
    	    
	    Switchback.update = (function( dt ) {
	    	pos++;
	    	pos = pos % 1000;
	    	doClear = pos == 0;
	    	
	    	
	    	var test;
	    	for( i = 0; i < 100000; i++ )
	    	{
	    		test = test + i;
	    		
	    	}
	    		    	
	    	var remaining = Switchback.timer.getDelta() - Switchback.timer.drawDelta - Switchback.timer.updateDelta;
	    	
	    	drawLine = { y1 : 0,
	    			     y2 : Math.floor( Switchback.timer.drawDelta * factor )
	    	};
	    	
	    	updateLine = { y1 : drawLine.y2,
   			     		   y2 : Math.floor( drawLine.y2 + ( Switchback.timer.updateDelta * factor ) )
	    	};

	    	systemLine = { y1 : updateLine.y2,
		     		       y2 : Math.floor( updateLine.y2 + ( remaining * factor ) )
	    	};
	    });

        Switchback.load = (function() {
        });
    
        Switchback.init(this, {
            consoleLog: false,        // Logging
            graphics:
            {
                id: "celldwellerGame",   // The element id
                type: "canvas",          // canvas for now, might add dom
                backgroundColor: '#fff', // Background color
                customCursor: {
                    normal:    'imdrawages/cursors/gam1088.cur'
                },
                width  : 1000,
                height : 200
            },
            // mode: "fullscreen"

        });
	}
};

// Call the init function when windows has loaded
window.onload = function() {
	Debug_Game.init();
};
