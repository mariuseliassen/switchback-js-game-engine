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

	var controlsComponent = Switchback.component('controls', {

	    _animations : null,
	    _speed      : 0,
	    _keymap     : {},
	    _lastAni    : null,
	    
		init : function(param) {
		    if (param.keymap && typeof(param.keymap) == 'object') this._keymap = param.keymap;
		    if (param.animations) this._animations = param.animations;
		    if (param.speed) this.setSpeed(param.speed);
		    
		    this.bind('update', this.update);
		    this.bind('keypressed', this.keypressed);
		},
		
		update: function(dt) {
		    if (this._animations) {
		        //var ani = this.getEnitity().getComponent(this._animations);
		        
		        
		    }
		},
		
		move: function(string) {
		    var e = this.getEntity();
		    if (string == '+x') {
		        e.coords(e.getX()+this._speed, e.getY());
		    } else if (string == '-x') {
		        e.coords(e.getX()-this._speed, e.getY());
		    } else if (string == '+y') {
		        e.coords(e.getX(), e.getY()+this._speed);
		    } else if (string == '-y') {
		        e.coords(e.getX(), e.getY()-this._speed);
		    }
		    
		    return this;
		},
		
		keypressed: function(keysDown) {
		    var ani = this.getEntity().getComponent(this._animations);
		    var override = false;
		    
		    for (k in keysDown) {
		        if (this._keymap[k]) {
		            if (this._keymap[k].animation) {
		                override = (this._lastAni != this._keymap[k].animation) ? true : false;
		                ani.animate(this._keymap[k].animation, override);
		                
		                
		                this._lastAni = this._keymap[k].animation;
		            }
		            
		            
		            if (typeof(this._keymap[k].move) == 'string') {
		                this.move(this._keymap[k].move);
		            } else if (typeof(this._keymap[k].move) == 'function') {
		                this._keymap[k].move.call(this, this.getEntity(), this._speed);
		            }
		        }
		    }
		},
		
		setSpeed: function(speed) {
		    this._speed = speed;
		}
	
	});

	window.Switchback = Switchback;
})(window);