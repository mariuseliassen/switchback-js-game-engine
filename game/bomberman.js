/**
 * =================
 * == Celldweller == 
 * =================
 * a created with Switchback
 * Javascript Game Engine (http://gamedev.exchange.no/switchback/)
 * 
 * Copyright Exchange Media 2011 http://gamedev.exchange.no/celldweller/
 */

window.onload = function() {
    // First we bind a clear screen drawing method
    Switchback.bind('draw', function(dt) {
        Switchback.graphics.clear();
    });
    
    var player = Switchback.entity('player', {
        sprite: {
            image            : 'images/BombermanDS.png',
            transparentColor : "rgb(82,123,156)",
            width            : 20,
            height           : 34,
            animations       : {
                idle: {
                    x: 112,
                    y: 0,
                    n: 1
                },
                moveEast: {
                    x: 3,
                    y: 33,
                    n: 5,
                    b: true
                },
                moveNorth: {
                    x: 4,
                    y: 65,
                    n: 5,
                    b: true
                },
                moveSouth: {
                    x: 4,
                    y: 0,
                    n: 5,
                    b: true
                },
                moveWest: {
                    x: 3,
                    y: 96,
                    n: 5,
                    b: true
                }
            }
        },
        controls: {
            animations : 'sprite',
            speed      : 3,
            keymap     : {
                w: {
                    move      : '-y',
                    animation : 'moveNorth',
                },
                a: {
                    move      : '-x',
                    animation : 'moveWest',
                },
                s: {
                    move      : function(entity, speed) {
                        var dt = Switchback.get('timer').getDelta() / 25;
                        return entity.coords(entity.getX(), entity.getY()+ (speed * dt));
                    },
                    animation : 'moveSouth',
                },
                d: {
                    move      : '+x',
                    animation : 'moveEast'
                }
            }
        }
    }).coords(20,20);
    
    
	Switchback.init(this, {
	    consoleLog: false,        // Logging
	    graphics:
	    {
	        id: "celldwellerGame",   // The element id
	        type: "canvas",          // canvas for now, might add dom
	        width: 800,
	        height: 600,
	        backgroundColor: '#fff', // Background color
	        customCursor: {
	            //normal:    'images/cursors/gam1088.cur'
	        }
	    },
	    // mode: "fullscreen"
	
	});
	

};
