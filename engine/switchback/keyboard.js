/**
* ================
* == Switchback ==
* ================
* a Javascript Game Engine
* 
* Package: Switchback.Keyboard
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
        keyboard : {
    	
            keysDown: {},
                
            /**
             * Initialize the mouse
             * 
             * @return void
             */
            init: function(param) {
               	Switchback.events.add(this, window.document, 'keydown', this._keydown );
               	Switchback.events.add(this, window.document, 'keyup', this._keyup);
            },
            
            _keyup: function(e) {
                var unicode = null;
                var key = null;
                
                if (e.keyCode) {
                    unicode = e.keyCode; //IE
                }
                else if (e.which) {
                    unicode = e.which; // All others
                }
                else {
                    // Special keys
                }
                
                if( unicode ) {
                    key = String.fromCharCode( unicode ).toLowerCase();
                }
                
                var t = {};
                for (k in this.keysDown) {
                    if (k == key) {
                        delete this.keysDown[key];
                        continue;
                    }
                    t[k] = true;
                }

                this.keysDown = t;
                
                Switchback.keypressed( this.keysDown )
            },
            
            _keydown: function(e) {
                var unicode = null;
                var key = null;
                
                if (e.keyCode) {
                    unicode = e.keyCode; //IE
                }
                else if (e.which) {
                    unicode = e.which; // All others
                }
                else {
                    // Special keys
                }
                
                if( unicode ) {
                    key = String.fromCharCode( unicode ).toLowerCase();
                }
                
                this.keysDown[key] = true;
                
                Switchback.keypressed( this.keysDown )
            }
        }
    });
    
    Switchback.registerModule('keyboard');
    
    window.Switchback = Switchback;
})(window);