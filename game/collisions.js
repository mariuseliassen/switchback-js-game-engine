/**
 * ================ == Celldweller == ================ a created with Switchback
 * Javascript Game Engine (http://gamedev.exchange.no/switchback/)
 * 
 * Copyright Exchange Media 2011 http://gamedev.exchange.no/celldweller/
 */

window.onload = function() {

	var x = 0;
	var polygonA = new Array();
	
	// simple tri-angle
	Switchback.bind( 'draw', function( dt ) {
	    Switchback.graphics.clear();
	    Switchback.graphics.polygon( 'fill', polygonA );
	});
		    
	Switchback.bind( 'update', function( dt ) {
		
		polygonA = [ 100 + x, 100, 200 + x, 100, 150 + x, 200 ];
	});
	
	Switchback.entity('performancer', {
        performancer: { width: 600 }
    });
	
	Switchback.init(this, {
	    consoleLog: false,        // Logging
	    graphics:
	    {
	        id: "celldwellerGame",   // The element id
	        type: "canvas",          // canvas for now, might add dom
	        backgroundColor: '#fff', // Background color
	        customCursor: {
	            normal:    'images/cursors/gam1088.cur'
	        }
	    },
	    // mode: "fullscreen"
	
	});
	

};
