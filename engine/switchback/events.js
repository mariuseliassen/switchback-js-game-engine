/**
* ================
* == Switchback ==
* ================
* a Javascript Game Engine
* 
* Package: Switchback.events
* 
* Event game engine functionality
* 
* Copyright Exchange Media 2011
* http://gamedev.exchange.no/switchback/
*/
(function(window) {
    var Switchback = window.Switchback || Switchback;
    
    Switchback.extend({
        events: {
            _eventStack: {},
                       
            getEventTarget: function(e) {
                e = e || window.event;  
                return e.target || e.srcElement;
            },
            
            add: function(c, o, t, f) {
               
                if(arguments.length === 3) {
                    f = t;
                    t = o;
                    o = window.document;
                }
        
                // Function to removal
                var a = function(e) { var e = e || window.event; f.call(c,e); }, id = c[0] || "";
        
                if(this._eventStack[id+o+t+f]) return;
        
                // Add to stack
                this._eventStack[id+o+t+f] = a;
                
                // IE5+
                if (o.attachEvent) { 
                    o.attachEvent('on'+t, a);
                } else if (o.addEventListener) {
                    o.addEventListener(t, a, false);
                } else {
                    delete this._eventStack[id+o+t+f];
                }
        
            },
            remove: function(c, o, t, f) {
                if(arguments.length === 3) {
                    f = t;
                    t = o;
                    o = window.document;
                }
        
                // Function to removal
                var id = c[0] || "", a = this._eventStack[id+o+t+f];
        
                if(a) {
                    // IE5+
                    if (o.detachEvent) {
                        o.detachEvent('on'+t, a);
                    } else {
                        o.removeEventListener(t, a, false);
                    }
                    
                    delete this._eventStack[id+o+t+f];
                }
            }
        }
    });
    
    Switchback.registerModule('events');
    
    window.Switchback = Switchback;
})(window);