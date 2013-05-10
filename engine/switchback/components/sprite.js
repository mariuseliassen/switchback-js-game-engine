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

	var spriteComponent = Switchback.component('sprite', {
        
	    _image: null,
	    _transcolor: null,
	    _animations: {},
	    
	    _animate: true,
	    _animation: null,
	    _animationCycle: 0,
	    _animationLength: 0,
	    
	    _interval : 60,
	    _dt       : 0,
	    _width    : 0,
	    _height   : 0,
	    _quads    : {},
	    
	    _buildQuads: function() {
	        var a;
	        if (this._image !== null) {
	            for (ani in this._animations) {
	                a = this._animations[ani];

	                this._quads[ani] = [];

	                if (a.n) {
                        for (var n = 0;n<a.n;n++) {
                            var w = a.w || this._width, h = a.h || this._height;
                            
                            this._quads[ani].push(Switchback.graphics.newQuad(a.x + (w * n), a.y, w, h));
                        }
                        
                        // Sometimes a sprite looks better if the animation is reversed at the end
                        if (a.b) {
                            for (var n = a.n-1;n>1;n--) {
                                var w = a.w || this._width, h = a.h || this._height;
                                
                                this._quads[ani].push(Switchback.graphics.newQuad(a.x + (w * n), a.y, w, h));
                            }
                        }
                        
	                } else {
	                    for (i in a) {
                            this._quads[ani].push(Switchback.graphics.newQuad(a[i][0] * this._width, a[i][1] * this._height, this._width, this._height));
	                    }
	                }

	            }
	        }
	        
	        // Set a default animation
	        if (this._quads['idle']) {
	            this.animate('idle', true);
	        } else {
	            for (a in this._quads) {
	                this.animate(a, true);
	                break;
	            }
	        }
	       
	    },
	    
		init : function(param) {
		    if (param.image)            this._image = Switchback.graphics.newImage(param.image);
		    if (param.animations)       this._animations = param.animations;
		    if (param.width)            this._width = param.width;
		    if (param.height)           this._height = param.height;
		    if (param.transparentColor) this._transcolor = param.transparentColor
		    if (param.interval)         this._interval = param.interval;
		    
		    this._buildQuads();
		    
		    
		    
		    this.bind('draw', this.draw);
		},
	    
	    draw: function(dt) {
            this._dt += Switchback.timer.getDelta();
            
            if (this._dt >= this._interval) {
                this._dt = 0;
                this._animate = true;
            }
            
	        var e = this.getEntity();
	        if (this._transcolor !== null) {
	            Switchback.graphics.drawqtrans(this._image, this._quads[this._animation][this._animationCycle], e.getX(), e.getY(), this._transcolor);
	        } else {
	            Switchback.graphics.drawq(this._image, this._quads[this._animation][this._animationCycle], e.getX(), e.getY());
	        }
	        
	    },
	    
	    animate: function(ani, override) {
	        override = override || false;
            
	        if ((this._animate && this._quads[ani]) || override == true) {
	            if (this._animation == ani) {
	                this._animationCycle++;
	                this._animate = false;
	                
	                if (this._animationCycle >= this._animationLength) this._animationCycle = 0;
	            } else {
	                this._animation = ani;
	                this._animationCycle = 0;
	                this._animationLength = this._quads[ani].length;
	            }

	        }

	    }
	
	});

	window.Switchback = Switchback;
})(window);