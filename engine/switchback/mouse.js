/**
* ================
* == Switchback ==
* ================
* a Javascript Game Engine
* 
* Package: Switchback.Mouse
* 
* Core game engine functionality
* 
* Copyright Exchange Media 2011
* http://gamedev.exchange.no/switchback/
*/

(function(window) {
    var Switchback = window.Switchback || Switchback;
    
    /**
     * Mouse control
     */
    Switchback.extend( { 
        mouse : {
            /**
            * Mouse constants
            */
            constants: {
                L: 1,
                M: 3,
                R: 2
            },
                
                
            mouseDown: false,
            lastButton: null,
                
            /**
             * Initialize the mouse
             * 
             * @return void
             */
            init: function(param) {
                var graphics = Switchback.get('graphics'), events = Switchback.get('events');

                // Disable mouseclicks?
                if (!param.disableMouseClicks) {
                    // Add events to viewport
                    Switchback.events.add(this, Switchback.graphics.viewport.el, 'mousedown', this._mousedown);
                    Switchback.events.add(this, Switchback.graphics.viewport.el, 'mouseup', this._mouseup);
                }
                
                // Disable context menu?
                if (!param.disableContextMenu) {
                    Switchback.events.add(this, Switchback.graphics.viewport.el, 'contextmenu', this._contextmenu);
                }
            },
            
            _contextmenu: function(e) {
                e.preventDefault ? e.preventDefault() : e.returnValue = false;
                return false;
            },
            
            _mousedown: function(e) {
                var button = (e.button) ? e.button : e.which;
                
                this.mouseDown = true;
                this.lastButton = button;
                var game = Switchback.get('gameObject');
                
                if (game.mouseclick) {
                    // Figure out if it clicked an object
                    var obj = false;
                    
                    game.mouseclick(e, obj);
                }
            },
            
            _mouseup: function(e) {
                this.mouseDown = false;
                
                var game = Switchback.get('gameObject');
                
                if (game.mouseclick) {
                    // Figure out if it clicked an object
                    var obj = false;
                    
                    game.mouseclick(e, obj);
                }
            },
                
            /**
             * Check if a mouse button is pressed
             * 
             * @param button See Switchback.mouse.constants
             * 
             * @return boolean Returns true if the button is pressed
             */
             isDown: function(button) {
                return (this.mouseDown && this.lastButton == this.constants[button]);
             }
        }
    });
    
    Switchback.registerModule('mouse');
    
    window.Switchback = Switchback;
})(window);