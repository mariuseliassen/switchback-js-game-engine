/**
* ================
* == Switchback ==
* ================
* a Javascript Game Engine
* 
* Package: Switchback.graphics
* 
* Graphics game engine functionality
* 
* Copyright Exchange Media 2011
* http://gamedev.exchange.no/switchback/
*/

(function(window) {
    var Switchback = window.Switchback || Switchback;
    
    /**
     * Graphics control
     */
    Switchback.extend({
        graphics: {
    
            /**
             * The viewport and settings
             */
            viewport: {
                el: null,
                type: 'canvas',
                width: 0,
                height: 0,
                ctx: null,
                
                //PK: We should use a different file in case we develop element based rendering
                // So we should drop this if statement I think
                resize: function() {
                    if (this.el) {
                        // Canvas we can set the element properties
                        if (this.type == 'canvas') {
                            this.el.width = this.width;
                            this.el.height = this.height;
                        // Else use style
                        } else {
                            this.el.style.width = this.width + "px";
                            this.el.style.height = this.height + "px";
                        }
                    }
                }
            },
        
            /**
             * Initialize function
             */
            init: function(param) {
                var events = Switchback.get('events');
                
                // Default parameters
                if (!param.id) param.id = 'canvas';        // Default fallbac canvas id
                if (!param.type) param.type = 'canvas';    // Default to canvas type
                if (!param.mode) param.mode = 'windowed';  // Default to windowed mode
                if (!param.width) param.width = 640;       // Default to 640 width
                if (!param.height) param.height = 400;     // Default to 400 height
                
                // Get drawing element
                var el = document.getElementById(param.id);
    
                if (el == null) {
                    alert('Unable to get drawing element: ' + param.id);
                    return;
                }
                
                // Set viewport element
                this.viewport.el = el;
                this.viewport.type = param.type;
                
                this.viewport.ctx = el.getContext('2d');
                
                // Viewport size
                if (param.mode == 'windowed') {
                    this.viewport.width  = param.width;
                    this.viewport.height = param.height;
                } else {
                    document.body.style.overflow = "hidden";
                    this.viewport.width = this.getScreenWidth();
                    this.viewport.height = this.getScreenHeight();
                    
                    // Fullscreen mode we need to add resize event
                    events.add(this, window, "resize", function() {
                        this.viewport.width = this.getScreenWidth();
                        this.viewport.height = this.getScreenHeight();
                        this.viewport.resize();
                    });
                }
                // Resize the viewport
                this.viewport.resize();
                
                // Set background color
                if (param.backgroundColor) {
                    this.setBackgroundColor(param.backgroundColor);
                }
                
                if (param.customCursor) {
                    var events = Switchback.get('events');
                    
                    if (param.customCursor.normal) {
                        var style = document.createElement('style');
                        style.type = 'text/css';
                        style.innerHTML = 'canvas { cursor: url('+param.customCursor.normal+'), default !important; } ';
                        
                        document.getElementsByTagName('head')[0].appendChild(style);
                    }
                    
                }
            },
            
            /**
             * Function to get the screen width
             * 
             * @return int
             */
            getScreenWidth: function() {
                return window.innerWidth || (window.document.documentElement.clientWidth || window.document.body.clientWidth);
            },
            
            /**
             * Function to get the screen height
             * 
             * @return int
             */
            getScreenHeight: function() {
                return window.innerHeight || (window.document.documentElement.clientHeight || window.document.body.clientHeight);
            },
            
            /**
             * Function to set the background color of the canvas
             * 
             * @return boolean
             */
            setBackgroundColor: function(color) {
                if (this.viewport.el) this.viewport.el.style.backgroundColor = color;
                
                return (this.viewport.el.style.backgroundColor == color);
            },
            
            /**
             * Function to get the current background color
             * 
             * @return string The background color
             */
            getBackgroundColor: function() {
                return (this.viewport.el.style.backgroundColor) ? this.viewport.el.style.backgroundColor : '#fff';
            },
            
            /**
             * Function to clear the canvas
             * 
             * @return void
             */
            clear: function() {
            	// PK: not sure if we need that condition
            	//var viewport = (this.viewport) ? this.viewport : Switchback.get('graphics').viewport;
                
            	var canvas = this.viewport.ctx.canvas;
            	
                this.viewport.ctx.clearRect(0, 0, canvas.width, canvas.height);
            	
                var w = canvas.width;
            	canvas.width = 1;
            	canvas.width = w;
            },
            
            /**
             * Draw a rectangle
             * 
             */
            rectangle : function( mode, x, y, width, height ) {
            	this.viewport.ctx.fillRect(x, y, width, height);
            },
            
            /*
             * Set drawing color
             */
            
            setColor : function( redOrHex, green, blue, alpha ) {
                
            	var color = '';
            	if( arguments.length == 1 )
            	{
            		color = this.hexToColor( redOrHex );
            	}
            	else
            	{
	            	alpha = alpha || 255;
	            	color = 'rgba('+ redOrHex +','+ green +','+ blue +','+ alpha +')';
            	}
            	
            	this.viewport.ctx.fillStyle = color;
            },
            
            /**
             * Draw a circle on the canvas
             * 
             * @param mode   "fill" or "line"
             * @param x      The x-coord
             * @param y      The y-coord
             * @param radius The radius
             * @param colors String or object, object = {fill: '#fff', stroke: '#000'}
             * 
             * @return canvas 2d context
             */
            circle: function(mode, x, y, radius, colors) {
                // Default values
                x = x || 0; y = y || 0; radius = radius || 10; colors = colors || '#000';
           
                // string2object
                if (typeof(colors) == 'string') {
                    var c = colors;
                    colors = {fill: c, stroke: c};
                }
    
                // Create a 2d context
                var ctx = this.viewport.ctx;
    
                // Draw the circle
                ctx.beginPath();
                ctx.arc(x, y, radius, 0, Math.PI*2, true);
                ctx.closePath();
                
                // Fill the colors
                if (mode == 'fill') {
                    ctx.fillStyle = colors.fill;
                    ctx.fill();
                } 
                if (mode == 'line' || mode == 'outline' || (mode == 'fill' && colors.stroke != colors.fill)) {
                    ctx.strokeStyle = colors.stroke;
                    ctx.stroke();
                }
                
                // Return the context
                return ctx;
            },
            
            /**
             * Draw a line
             * You can draw multiple lines with one call
             */
            line: function(color, x1, y1, x2, y2) {

            	var ctx = this.viewport.ctx, points = [], moveTo = [];
                
                for (i in arguments) {
                    if (i > 0) {
                        if (i == 1 || i == 2) {
                            moveTo.push(arguments[i]);
                        } else {
                            if (parseInt(arguments[i], 10) > 0) {
                                points.push(arguments[i]);
                            }
                        }
                    }
                }
    
                this.viewport.ctx.strokeStyle = color;

                this.viewport.ctx.beginPath();
                this.viewport.ctx.moveTo(moveTo[0], moveTo[1]);
                
                for (i in points) {
                    if (i % 2 == 1 ) {
                    	this.viewport.ctx.lineTo(points[i-1], points[i]);
                    }
                }
            	this.viewport.ctx.stroke();
                
                return ctx;
            },
            
            /**
             * Print Text on canvas
             */
            print : function( text, x, y ) {
            	if( typeof( text ) == 'string' ) {
                    this.viewport.ctx.fillText( text, x, y);
            	}
            },
            
            /**
             * Returns an image object
             */
            newImage : function( file ) {
            	var img = null;
            	
            	if( typeof( file ) == 'string' && file != '' ) {
            		 img = new Image();
            		 img.src = file;
            	}
            	
            	return img;
            },
            
            /**
             * Draw a drawable
             */
            draw : function( drawable, x, y, r, sx, sy, ox, oy ) {
            	var type = Object.prototype.toString.call( drawable );
            	
            	// that probably doesn't work in IE
            	if( type == '[object HTMLImageElement]' ) {
            		if( sx == null ) {
            			sx = drawable.width;
            		}
            		
            		if( sy == null )
            		{
            			sy = drawable.height;
            		}
            		
            		// pk: disabled because seems to be expensive - at least my fans do say so
            		//this.viewport.ctx.rotate( 0.05 );
            	    this.viewport.ctx.drawImage( drawable, x, y, sx, sy );
            		//this.viewport.ctx.rotate( -0.05 );
            	}
            },
            
            newQuad : function( in_x, in_y, in_width, in_height, in_sw, in_sh ) {
            	return { x      : in_x,
            		     y      : in_y,
            		     width  : in_width,
            		     height : in_height,
            		     sw     : in_sw,
            		     sh     : in_sh
            	};
            },
            
            drawq : function( image, quad, x, y, r, sx, sy, ox, oy ) {
            	if( image && quad ) {
    	        	this.viewport.ctx.drawImage( image,
    	        			                     quad.x, quad.y,
    	        			                     quad.width, quad.height,
    	        			                     x, y,
    	        			                     quad.width, quad.height );
            	}
            	else {
            		Switchback.log( 'Missing parameters', true );
            	}
            },
            
            drawqtrans: function(image, quad, x, y, transcolor) {
                if( image && quad ) {
                    this.viewport.ctx.drawImage( image,
                                                 quad.x, quad.y,
                                                 quad.width, quad.height,
                                                 x, y,
                                                 quad.width, quad.height );
                    
                    var imageData = this.viewport.ctx.getImageData(x, y, quad.width, quad.height);

                    var len = imageData.data.length, color;
                    for (var i = 0; i < len; i+=4) {
                        color = "rgb(" + imageData.data[i] + "," + imageData.data[i+1] + "," + imageData.data[i+2] + ")";

                        if (color == transcolor) {
                            
                            // Setting alpha to 0. 
                            // This does not seem to work on some systems, need some fallback
                            imageData.data[i+3] = 0;
                        }
                    }
                    
                    this.viewport.ctx.putImageData(imageData, x, y);
                }
                else {
                    Switchback.log( 'Missing parameters', true );
                }
            },
            
            colorToHex: function(color) {
                if (color.substr(0, 1) === '#') {
                    return color;
                }
                var digits = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(color);
                
                var red = parseInt(digits[2]);
                var green = parseInt(digits[3]);
                var blue = parseInt(digits[4]);
                
                var rgb = blue | (green << 8) | (red << 16);
                return digits[1] + '#' + rgb.toString(16);
            },
            
            hexToColor : function( h )
            {
                h = ( h.charAt(0) == "#") ? h.substring(1,7) : h;
                
                return 'rgb(' +
                       parseInt( h.substring(0,2), 16 ) + ',' +
                       parseInt( h.substring(2,4), 16 ) + ',' +
                       parseInt( h.substring(4,6), 16 ) + ')';
            },
            
            polygon : function( mode, vertices )
            {
            	var context = this.viewport.ctx;
            	
            	if( arguments > 2 )
            	{
            		for( i in arguments )
            		{
            			// build vertics
            		}
            	}

            	context.fillStyle = '#f00';
            	context.beginPath();
            	
            	for( i in vertices )
            	{
            		if( i % 2 == 1 )
            		{
            			if( i == 1 )
            			{
            	           	context.moveTo( vertices[ (i -1) ], vertices[ i ] );
            			}
            			else
            			{
                        	context.lineTo( vertices[ (i -1) ], vertices[ i ] );
            			}
            		}
            	}
            	context.closePath();
            	context.fill();
            }
            
            
        }
    });
    
    Switchback.registerModule('graphics');
    
    window.Switchback = Switchback;
})(window);
