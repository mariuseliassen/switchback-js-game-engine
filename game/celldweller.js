/**
 * =================
 * == Celldweller ==
 * =================
 * created with Switchback Javascript Game Engine (http://gamedev.exchange.no/switchback/)
 * 
 * Copyright Exchange Media 2011 http://gamedev.exchange.no/celldweller/
 */

var Celldweller_Game = {

	gridSize : 32,
	
	entities : {
	    background : {},
		foreground : {}
	},
				    
    /*
	 * Function to initialize the Switchback engine
	 */
    init: function() {
        // First we bind a clear screen drawing method
        Switchback.bind('draw', function(dt) {
            Switchback.graphics.clear();
        });
        
        // On load add bg, fps and player entity
        Switchback.bind('load', function() {
            // Define the bg with component map and bind map.draw
            var bg = Switchback.entity("background", {
                map: {
                    sprite: 'images/land.png'
                }
            }).getComponent('map').bind('draw', function(dt) {
                for (y = 0; y < this.map.length; y++)
                {
                    for (x = 0; x < this.map[y].length; x++)
                    {
                        Switchback.graphics.drawq(this.sprite, this.tileQuads[this.map[x][y]], y * this.smallTileSize, x * this.smallTileSize);
                    }
                } 
            });

            // Add fps component, no config needed here
            var fps = Switchback.entity("fps", {
                fps: {}
            }); 
                        
            // Initialize the player with component player and bind player.keypressed, player.draw and player.update
            var player = Switchback.entity("player", {
                player: {}
            }).getComponent('player').bind('keypressed', function(keysDown) {
                if( keysDown['a'] ) {
                    this.grid_x = this.grid_x - this.gridSize;
                }
                if( keysDown['s'] ) {
                    this.grid_y = this.grid_y + this.gridSize;
                }
                if( keysDown['d'] ) {
                    this.grid_x = this.grid_x + this.gridSize;
                }
                if( keysDown['w'] ){
                    this.grid_y = this.grid_y - this.gridSize;
                }
                
                if (keysDown['q']) {
                    this.unbind('keypressed');
                }
            }).bind('update', function(dt) {
                this.act_y = this.act_y - ((this.act_y - this.grid_y) * this.speed * ( dt / 1000 ) );
                this.act_x = this.act_x - ((this.act_x - this.grid_x) * this.speed * ( dt / 1000 ) );
            }).bind('draw', function(dt) {
                Switchback.graphics.rectangle("fill", this.act_x, this.act_y, 32, 32)
            });
        });
            
        // Initialize the game
        Switchback.init(this, {
            consoleLog: true,        // Logging
            graphics:
            {
                id: "celldwellerGame",   // The element id
                type: "canvas",          // canvas for now, might add dom
                backgroundColor: '#fff', // Background color
                customCursor: {
                    normal:    'images/cursors/gam1088.cur'
                }
            },
            audio: {
                // useDOM: true,
                files: {
                    gunfire: 'sound/gunfire.mp3',
                    lazer:   'sound/lazer.mp3'
                }
            },
            gameTime: {
                //fps: 60
            }
            // mode: "fullscreen"

        });
	}
};

// Call the init function when windows has loaded
window.onload = function() {
    Celldweller_Game.init();
};
